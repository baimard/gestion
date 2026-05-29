(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FloatingUICore = {}));
})(this, (function (exports) { 'use strict';

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  function getAlignment(placement) {
    return placement.split('-')[1];
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].includes(getBasePlacement(placement)) ? 'x' : 'y';
  }

  function getLengthFromAxis(axis) {
    return axis === 'y' ? 'height' : 'width';
  }

  function computeCoordsFromPlacement(_ref) {
    let {
      reference,
      floating,
      placement
    } = _ref;
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    let coords;

    switch (getBasePlacement(placement)) {
      case 'top':
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;

      case 'bottom':
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case 'right':
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case 'left':
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;

      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }

    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);

    switch (getAlignment(placement)) {
      case 'start':
        coords[mainAxis] = coords[mainAxis] - (reference[length] / 2 - floating[length] / 2);
        break;

      case 'end':
        coords[mainAxis] = coords[mainAxis] + (reference[length] / 2 - floating[length] / 2);
        break;
    }

    return coords;
  }

  const computePosition = async (reference, floating, config) => {
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform
    } = config;

    if (process.env.NODE_ENV !== "production") {
      if (platform == null) {
        console.error(['Floating UI: `platform` property was not passed to config. If you', 'want to use Floating UI on the web, install @floating-ui/dom', 'instead of the /core package. Otherwise, you can create your own', '`platform`: https://floating-ui.com/docs/platform'].join(' '));
      }

      if (middleware.filter(_ref => {
        let {
          name
        } = _ref;
        return name === 'autoPlacement' || name === 'flip';
      }).length > 1) {
        throw new Error(['Floating UI: duplicate `flip` and/or `autoPlacement`', 'middleware detected. This will lead to an infinite loop. Ensure only', 'one of either has been passed to the `middleware` array.'].join(' '));
      }
    }

    let rects = await platform.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement({ ...rects,
      placement
    });
    let statefulPlacement = placement;
    let middlewareData = {};
    let _debug_loop_count_ = 0;

    for (let i = 0; i < middleware.length; i++) {
      if (process.env.NODE_ENV !== "production") {
        _debug_loop_count_++;

        if (_debug_loop_count_ > 100) {
          throw new Error(['Floating UI: The middleware lifecycle appears to be', 'running in an infinite loop. This is usually caused by a `reset`', 'continually being returned without a break condition.'].join(' '));
        }
      }

      const {
        name,
        fn
      } = middleware[i];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = { ...middlewareData,
        [name]: data != null ? data : {}
      };

      if (reset) {
        if (typeof reset === 'object') {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }

          if (reset.rects) {
            rects = reset.rects === true ? await platform.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }

          ({
            x,
            y
          } = computeCoordsFromPlacement({ ...rects,
            placement: statefulPlacement
          }));
        }

        i = -1;
        continue;
      }
    }

    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };

  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }

  function getSideObjectFromPadding(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }

  function rectToClientRect(rect) {
    return { ...rect,
      top: rect.y,
      left: rect.x,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    };
  }

  async function detectOverflow(middlewareArguments, options) {
    if (options === void 0) {
      options = {};
    }

    const {
      x,
      y,
      platform,
      rects,
      elements,
      strategy
    } = middlewareArguments;
    const {
      boundary = 'clippingParents',
      rootBoundary = 'viewport',
      elementContext = 'floating',
      altBoundary = false,
      padding = 0
    } = options;
    const paddingObject = getSideObjectFromPadding(padding);
    const altContext = elementContext === 'floating' ? 'reference' : 'floating';
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = await platform.getClippingClientRect({
      element: (await platform.isElement(element)) ? element : element.contextElement || (await platform.getDocumentElement({
        element: elements.floating
      })),
      boundary,
      rootBoundary
    });
    const elementClientRect = rectToClientRect(await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      rect: elementContext === 'floating' ? { ...rects.floating,
        x,
        y
      } : rects.reference,
      offsetParent: await platform.getOffsetParent({
        element: elements.floating
      }),
      strategy
    })); // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    return {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
  }

  const min = Math.min;
  const max = Math.max;

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }

  const arrow = options => ({
    name: 'arrow',
    options,

    async fn(middlewareArguments) {
      // Since `element` is required, we don't Partial<> the type
      const {
        element,
        padding = 0
      } = options != null ? options : {};
      const {
        x,
        y,
        placement,
        rects,
        platform
      } = middlewareArguments;

      if (element == null) {
        if (process.env.NODE_ENV !== "production") {
          console.warn('Floating UI: No `element` was passed to the `arrow` middleware.');
        }

        return {};
      }

      const paddingObject = getSideObjectFromPadding(padding);
      const coords = {
        x,
        y
      };
      const basePlacement = getBasePlacement(placement);
      const axis = getMainAxisFromPlacement(basePlacement);
      const length = getLengthFromAxis(axis);
      const arrowDimensions = await platform.getDimensions({
        element
      });
      const minProp = axis === 'y' ? 'top' : 'left';
      const maxProp = axis === 'y' ? 'bottom' : 'right';
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await platform.getOffsetParent({
        element
      });
      const clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      const centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the floating element if the center
      // point is outside of the floating element's bounds

      const min = paddingObject[minProp];
      const max = clientSize - arrowDimensions[length] - paddingObject[maxProp];
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset = within(min, center, max);
      return {
        data: {
          [axis]: offset,
          centerOffset: center - offset
        }
      };
    }

  });

  const hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, matched => hash$1[matched]);
  }

  function getAlignmentSides(placement, rects) {
    const isStart = getAlignment(placement) === 'start';
    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);
    let mainAlignmentSide = mainAxis === 'x' ? isStart ? 'right' : 'left' : isStart ? 'bottom' : 'top';

    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }

    return {
      main: mainAlignmentSide,
      cross: getOppositePlacement(mainAlignmentSide)
    };
  }

  const hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, matched => hash[matched]);
  }

  const basePlacements = ['top', 'right', 'bottom', 'left'];
  const allPlacements = /*#__PURE__*/basePlacements.reduce((acc, basePlacement) => acc.concat(basePlacement, basePlacement + "-start", basePlacement + "-end"), []);

  function getPlacementList(alignment, autoAlignment, allowedPlacements) {
    const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => getAlignment(placement) === alignment), ...allowedPlacements.filter(placement => getAlignment(placement) !== alignment)] : allowedPlacements.filter(placement => getBasePlacement(placement) === placement);
    return allowedPlacementsSortedByAlignment.filter(placement => {
      if (alignment) {
        return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
      }

      return true;
    });
  }
  const autoPlacement = function (options) {
    if (options === void 0) {
      options = {};
    }

    return {
      name: 'autoPlacement',
      options,

      async fn(middlewareArguments) {
        var _middlewareData$autoP, _middlewareData$autoP2, _middlewareData$autoP3, _middlewareData$autoP4, _middlewareData$autoP5, _placementsSortedByLe;

        const {
          x,
          y,
          rects,
          middlewareData,
          placement
        } = middlewareArguments;
        const {
          alignment = null,
          allowedPlacements = allPlacements,
          autoAlignment = true,
          ...detectOverflowOptions
        } = options;

        if ((_middlewareData$autoP = middlewareData.autoPlacement) != null && _middlewareData$autoP.skip) {
          return {};
        }

        const placements = getPlacementList(alignment, autoAlignment, allowedPlacements);
        const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
        const currentIndex = (_middlewareData$autoP2 = (_middlewareData$autoP3 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP3.index) != null ? _middlewareData$autoP2 : 0;
        const currentPlacement = placements[currentIndex];
        const {
          main,
          cross
        } = getAlignmentSides(currentPlacement, rects); // Make `computeCoords` start from the right place

        if (placement !== currentPlacement) {
          return {
            x,
            y,
            reset: {
              placement: placements[0]
            }
          };
        }

        const currentOverflows = [overflow[getBasePlacement(currentPlacement)], overflow[main], overflow[cross]];
        const allOverflows = [...((_middlewareData$autoP4 = (_middlewareData$autoP5 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP5.overflows) != null ? _middlewareData$autoP4 : []), {
          placement: currentPlacement,
          overflows: currentOverflows
        }];
        const nextPlacement = placements[currentIndex + 1]; // There are more placements to check

        if (nextPlacement) {
          return {
            data: {
              index: currentIndex + 1,
              overflows: allOverflows
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        const placementsSortedByLeastOverflow = allOverflows.slice().sort((a, b) => a.overflows[0] - b.overflows[0]);
        const placementThatFitsOnAllSides = (_placementsSortedByLe = placementsSortedByLeastOverflow.find(_ref => {
          let {
            overflows
          } = _ref;
          return overflows.every(overflow => overflow <= 0);
        })) == null ? void 0 : _placementsSortedByLe.placement;
        return {
          data: {
            skip: true
          },
          reset: {
            placement: placementThatFitsOnAllSides != null ? placementThatFitsOnAllSides : placementsSortedByLeastOverflow[0].placement
          }
        };
      }

    };
  };

  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }

  const flip = function (options) {
    if (options === void 0) {
      options = {};
    }

    return {
      name: 'flip',
      options,

      async fn(middlewareArguments) {
        var _middlewareData$flip, _middlewareData$flip2;

        const {
          placement,
          middlewareData,
          rects,
          initialPlacement
        } = middlewareArguments;

        if ((_middlewareData$flip = middlewareData.flip) != null && _middlewareData$flip.skip) {
          return {};
        }

        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = 'bestFit',
          flipAlignment = true,
          ...detectOverflowOptions
        } = options;
        const basePlacement = getBasePlacement(placement);
        const isBasePlacement = basePlacement === initialPlacement;
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.overflows) || [];

        if (checkMainAxis) {
          overflows.push(overflow[basePlacement]);
        }

        if (checkCrossAxis) {
          const {
            main,
            cross
          } = getAlignmentSides(placement, rects);
          overflows.push(overflow[main], overflow[cross]);
        }

        overflowsData = [...overflowsData, {
          placement,
          overflows
        }]; // One or more sides is overflowing

        if (!overflows.every(side => side <= 0)) {
          var _middlewareData$flip$, _middlewareData$flip3;

          const nextIndex = ((_middlewareData$flip$ = (_middlewareData$flip3 = middlewareData.flip) == null ? void 0 : _middlewareData$flip3.index) != null ? _middlewareData$flip$ : 0) + 1;
          const nextPlacement = placements[nextIndex];

          if (nextPlacement) {
            // Try next placement and re-run the lifecycle
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }

          let resetPlacement = 'bottom';

          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$slice$;

                const placement = (_overflowsData$slice$ = overflowsData.slice().sort((a, b) => a.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0) - b.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0))[0]) == null ? void 0 : _overflowsData$slice$.placement;

                if (placement) {
                  resetPlacement = placement;
                }

                break;
              }

            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }

          return {
            data: {
              skip: true
            },
            reset: {
              placement: resetPlacement
            }
          };
        }

        return {};
      }

    };
  };

  function getSideOffsets(overflow, rect) {
    return {
      top: overflow.top - rect.height,
      right: overflow.right - rect.width,
      bottom: overflow.bottom - rect.height,
      left: overflow.left - rect.width
    };
  }

  function isAnySideFullyClipped(overflow) {
    return basePlacements.some(side => overflow[side] >= 0);
  }

  const hide = () => ({
    name: 'hide',

    async fn(modifierArguments) {
      const referenceOverflow = await detectOverflow(modifierArguments, {
        elementContext: 'reference'
      });
      const floatingAltOverflow = await detectOverflow(modifierArguments, {
        altBoundary: true
      });
      const referenceHiddenOffsets = getSideOffsets(referenceOverflow, modifierArguments.rects.reference);
      const escapedOffsets = getSideOffsets(floatingAltOverflow, modifierArguments.rects.floating);
      const referenceHidden = isAnySideFullyClipped(referenceHiddenOffsets);
      const escaped = isAnySideFullyClipped(escapedOffsets);
      return {
        data: {
          referenceHidden,
          referenceHiddenOffsets,
          escaped,
          escapedOffsets
        }
      };
    }

  });

  function convertValueToCoords(_ref) {
    let {
      placement,
      rects,
      value
    } = _ref;
    const basePlacement = getBasePlacement(placement);
    const multiplier = ['left', 'top'].includes(basePlacement) ? -1 : 1;
    const rawValue = typeof value === 'function' ? value({ ...rects,
      placement
    }) : value;
    const {
      mainAxis,
      crossAxis
    } = typeof rawValue === 'number' ? {
      mainAxis: rawValue,
      crossAxis: 0
    } : {
      mainAxis: 0,
      crossAxis: 0,
      ...rawValue
    };
    return getMainAxisFromPlacement(basePlacement) === 'x' ? {
      x: crossAxis,
      y: mainAxis * multiplier
    } : {
      x: mainAxis * multiplier,
      y: crossAxis
    };
  }
  const offset = function (value) {
    if (value === void 0) {
      value = 0;
    }

    return {
      name: 'offset',
      options: value,

      fn(middlewareArguments) {
        const {
          x,
          y,
          placement,
          rects
        } = middlewareArguments;
        const diffCoords = convertValueToCoords({
          placement,
          rects,
          value
        });
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: diffCoords
        };
      }

    };
  };

  function getCrossAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  const shift = function (options) {
    if (options === void 0) {
      options = {};
    }

    return {
      name: 'shift',
      options,

      async fn(middlewareArguments) {
        const {
          x,
          y,
          placement
        } = middlewareArguments;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: _ref => {
              let {
                x,
                y
              } = _ref;
              return {
                x,
                y
              };
            }
          },
          ...detectOverflowOptions
        } = options;
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
        const mainAxis = getMainAxisFromPlacement(getBasePlacement(placement));
        const crossAxis = getCrossAxis(mainAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];

        if (checkMainAxis) {
          const minSide = mainAxis === 'y' ? 'top' : 'left';
          const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
          const min = mainAxisCoord + overflow[minSide];
          const max = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = within(min, mainAxisCoord, max);
        }

        if (checkCrossAxis) {
          const minSide = crossAxis === 'y' ? 'top' : 'left';
          const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
          const min = crossAxisCoord + overflow[minSide];
          const max = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = within(min, crossAxisCoord, max);
        }

        const limitedCoords = limiter.fn({ ...middlewareArguments,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return { ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y
          }
        };
      }

    };
  };
  const limitShift = function (options) {
    if (options === void 0) {
      options = {};
    }

    return {
      options,

      fn(middlewareArguments) {
        const {
          x,
          y,
          placement,
          rects,
          middlewareData
        } = middlewareArguments;
        const {
          offset = 0,
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true
        } = options;
        const coords = {
          x,
          y
        };
        const mainAxis = getMainAxisFromPlacement(placement);
        const crossAxis = getCrossAxis(mainAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const rawOffset = typeof offset === 'function' ? offset({ ...rects,
          placement
        }) : offset;
        const computedOffset = typeof rawOffset === 'number' ? {
          mainAxis: rawOffset,
          crossAxis: 0
        } : {
          mainAxis: 0,
          crossAxis: 0,
          ...rawOffset
        };

        if (checkMainAxis) {
          const len = mainAxis === 'y' ? 'height' : 'width';
          const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
          const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;

          if (mainAxisCoord < limitMin) {
            mainAxisCoord = limitMin;
          } else if (mainAxisCoord > limitMax) {
            mainAxisCoord = limitMax;
          }
        }

        if (checkCrossAxis) {
          var _middlewareData$offse, _middlewareData$offse2, _middlewareData$offse3, _middlewareData$offse4;

          const len = mainAxis === 'y' ? 'width' : 'height';
          const isOriginSide = ['top', 'left'].includes(getBasePlacement(placement));
          const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? (_middlewareData$offse = (_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) != null ? _middlewareData$offse : 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
          const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : (_middlewareData$offse3 = (_middlewareData$offse4 = middlewareData.offset) == null ? void 0 : _middlewareData$offse4[crossAxis]) != null ? _middlewareData$offse3 : 0) - (isOriginSide ? computedOffset.crossAxis : 0);

          if (crossAxisCoord < limitMin) {
            crossAxisCoord = limitMin;
          } else if (crossAxisCoord > limitMax) {
            crossAxisCoord = limitMax;
          }
        }

        return {
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        };
      }

    };
  };

  const size = function (options) {
    if (options === void 0) {
      options = {};
    }

    return {
      name: 'size',
      options,

      async fn(middlewareArguments) {
        var _middlewareData$size;

        const {
          placement,
          rects,
          middlewareData
        } = middlewareArguments;
        const {
          apply,
          ...detectOverflowOptions
        } = options;

        if ((_middlewareData$size = middlewareData.size) != null && _middlewareData$size.skip) {
          return {};
        }

        const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
        const basePlacement = getBasePlacement(placement);
        const isEnd = getAlignment(placement) === 'end';
        let heightSide;
        let widthSide;

        if (basePlacement === 'top' || basePlacement === 'bottom') {
          heightSide = basePlacement;
          widthSide = isEnd ? 'left' : 'right';
        } else {
          widthSide = basePlacement;
          heightSide = isEnd ? 'top' : 'bottom';
        }

        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        const dimensions = {
          height: rects.floating.height - (['left', 'right'].includes(placement) ? 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom)) : overflow[heightSide]),
          width: rects.floating.width - (['top', 'bottom'].includes(placement) ? 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right)) : overflow[widthSide])
        };
        apply == null ? void 0 : apply({ ...dimensions,
          ...rects
        });
        return {
          data: {
            skip: true
          },
          reset: {
            rects: true
          }
        };
      }

    };
  };

  const inline = function (options) {
    if (options === void 0) {
      options = {};
    }

    return {
      name: 'inline',
      options,

      async fn(middlewareArguments) {
        var _middlewareData$inlin, _await$platform$getCl;

        const {
          placement,
          elements,
          rects,
          platform,
          strategy,
          middlewareData
        } = middlewareArguments; // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
        // ClientRect's bounds, despite the event listener being triggered. A
        // padding of 2 seems to handle this issue.

        const {
          padding = 2,
          x,
          y
        } = options;

        if ((_middlewareData$inlin = middlewareData.inline) != null && _middlewareData$inlin.skip) {
          return {};
        }

        const fallback = rectToClientRect(await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
          rect: rects.reference,
          offsetParent: await platform.getOffsetParent({
            element: elements.floating
          }),
          strategy
        }));
        const clientRects = Array.from((_await$platform$getCl = await (platform.getClientRects == null ? void 0 : platform.getClientRects({
          element: elements.reference
        }))) != null ? _await$platform$getCl : []);
        const paddingObject = getSideObjectFromPadding(padding);

        function getBoundingClientRect() {
          // There are two rects and they are disjoined
          if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
            var _clientRects$find;

            // Find the first rect in which the point is fully inside
            return (_clientRects$find = clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom)) != null ? _clientRects$find : fallback;
          } // There are 2 or more connected rects


          if (clientRects.length >= 2) {
            if (getMainAxisFromPlacement(placement) === 'x') {
              const firstRect = clientRects[0];
              const lastRect = clientRects[clientRects.length - 1];
              const isTop = getBasePlacement(placement) === 'top';
              const top = firstRect.top;
              const bottom = lastRect.bottom;
              const left = isTop ? firstRect.left : lastRect.left;
              const right = isTop ? firstRect.right : lastRect.right;
              const width = right - left;
              const height = bottom - top;
              return {
                top,
                bottom,
                left,
                right,
                width,
                height,
                x: left,
                y: top
              };
            }

            const isLeftPlacement = getBasePlacement(placement) === 'left';
            const maxRight = max(...clientRects.map(rect => rect.right));
            const minLeft = min(...clientRects.map(rect => rect.left));
            const measureRects = clientRects.filter(rect => isLeftPlacement ? rect.left === minLeft : rect.right === maxRight);
            const top = measureRects[0].top;
            const bottom = measureRects[measureRects.length - 1].bottom;
            const left = minLeft;
            const right = maxRight;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }

          return fallback;
        }

        return {
          data: {
            skip: true
          },
          reset: {
            rects: await platform.getElementRects({
              reference: {
                getBoundingClientRect
              },
              floating: elements.floating,
              strategy
            })
          }
        };
      }

    };
  };

  exports.arrow = arrow;
  exports.autoPlacement = autoPlacement;
  exports.computePosition = computePosition;
  exports.detectOverflow = detectOverflow;
  exports.flip = flip;
  exports.hide = hide;
  exports.inline = inline;
  exports.limitShift = limitShift;
  exports.offset = offset;
  exports.rectToClientRect = rectToClientRect;
  exports.shift = shift;
  exports.size = size;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
