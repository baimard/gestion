(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@floating-ui/core')) :
  typeof define === 'function' && define.amd ? define(['exports', '@floating-ui/core'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FloatingUIDOM = {}, global.FloatingUICore));
})(this, (function (exports, core) { 'use strict';

  function isWindow(value) {
    return (value == null ? void 0 : value.toString()) === '[object Window]';
  }
  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (!isWindow(node)) {
      const ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function getNodeName(node) {
    return isWindow(node) ? '' : node ? (node.nodeName || '').toLowerCase() : '';
  }

  function isHTMLElement(value) {
    return value instanceof getWindow(value).HTMLElement;
  }
  function isElement(value) {
    return value instanceof getWindow(value).Element;
  }
  function isNode(value) {
    return value instanceof getWindow(value).Node;
  }
  function isShadowRoot(node) {
    const OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }
  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    const {
      overflow,
      overflowX,
      overflowY
    } = getComputedStyle$1(element);
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }
  function isTableElement(element) {
    return ['table', 'td', 'th'].includes(getNodeName(element));
  }
  function isContainingBlock(element) {
    // TODO: Try and use feature detection here instead
    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
    const css = getComputedStyle$1(element); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    return css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].includes(css.willChange) || isFirefox && css.willChange === 'filter' || isFirefox && (css.filter ? css.filter !== 'none' : false);
  }

  const min = Math.min;
  const max = Math.max;
  const round = Math.round;

  function getBoundingClientRect(element, includeScale) {
    if (includeScale === void 0) {
      includeScale = false;
    }

    const clientRect = element.getBoundingClientRect();
    let scaleX = 1;
    let scaleY = 1;

    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }

    return {
      width: clientRect.width / scaleX,
      height: clientRect.height / scaleY,
      top: clientRect.top / scaleY,
      right: clientRect.right / scaleX,
      bottom: clientRect.bottom / scaleY,
      left: clientRect.left / scaleX,
      x: clientRect.left / scaleX,
      y: clientRect.top / scaleY
    };
  }

  function getDocumentElement(node) {
    return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
  }

  function getNodeScroll(element) {
    if (isWindow(element)) {
      return {
        scrollLeft: element.pageXOffset,
        scrollTop: element.pageYOffset
      };
    }

    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
  }

  function isScaled(element) {
    const rect = getBoundingClientRect(element);
    return round(rect.width) !== element.offsetWidth || round(rect.height) !== element.offsetHeight;
  }

  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const rect = getBoundingClientRect(element, isOffsetParentAnElement && isScaled(offsetParent));
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
      if (getNodeName(offsetParent) !== 'body' || isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent, true);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function getParentNode(node) {
    if (getNodeName(node) === 'html') {
      return node;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // @ts-ignore
      node.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      node.parentNode || ( // DOM Element detected
      isShadowRoot(node) ? node.host : null) || // ShadowRoot detected
      getDocumentElement(node) // fallback

    );
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  }

  function getContainingBlock(element) {
    let currentNode = getParentNode(element);

    while (isHTMLElement(currentNode) && !['html', 'body'].includes(getNodeName(currentNode))) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    const window = getWindow(element);
    let offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  function getDimensions(element) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }

  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);

    if (offsetParent === documentElement) {
      return rect;
    }

    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
      if (getNodeName(offsetParent) !== 'body' || isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent, true);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } // This doesn't appear to be need to be negated.
      // else if (documentElement) {
      //   offsets.x = getWindowScrollBarX(documentElement);
      // }

    }

    return { ...rect,
      x: rect.x - scroll.scrollLeft + offsets.x,
      y: rect.y - scroll.scrollTop + offsets.y
    };
  }

  function getViewportRect(element) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
      // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
      // errors due to floating point numbers, so we need to check precision.
      // Safari returns a number <= 0, usually < -1 when pinch-zoomed

      if (Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) < 0.01) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width,
      height,
      x,
      y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var _element$ownerDocumen;

    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    const width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    const height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;

    if (getComputedStyle$1(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width,
      height,
      x,
      y
    };
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].includes(getNodeName(node))) {
      // @ts-ignore assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  function getScrollParents(node, list) {
    var _node$ownerDocument;

    if (list === void 0) {
      list = [];
    }

    const scrollParent = getScrollParent(node);
    const isBody = scrollParent === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
    const win = getWindow(scrollParent);
    const target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    const updatedList = list.concat(target);
    return isBody ? updatedList : // @ts-ignore: isBody tells us target will be an HTMLElement here
    updatedList.concat(getScrollParents(getParentNode(target)));
  }

  function contains(parent, child) {
    const rootNode = child.getRootNode == null ? void 0 : child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
      let next = child;

      do {
        // use `===` replace node.isSameNode()
        if (next && parent === next) {
          return true;
        } // @ts-ignore: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    }

    return false;
  }

  function getInnerBoundingClientRect(element) {
    const clientRect = getBoundingClientRect(element);
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    return {
      top,
      left,
      x: left,
      y: top,
      right: left + element.clientWidth,
      bottom: top + element.clientHeight,
      width: element.clientWidth,
      height: element.clientHeight
    };
  }

  function getClientRectFromClippingParent(element, clippingParent) {
    if (clippingParent === 'viewport') {
      return core.rectToClientRect(getViewportRect(element));
    }

    if (isElement(clippingParent)) {
      return getInnerBoundingClientRect(clippingParent);
    }

    return core.rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    const clippingParents = getScrollParents(getParentNode(element));
    const canEscapeClipping = ['absolute', 'fixed'].includes(getComputedStyle$1(element).position);
    const clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // @ts-ignore isElement check ensures we return Array<Element>


    return clippingParents.filter(clippingParent => isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body');
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingClientRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary
    } = _ref;
    const mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    const clippingParents = [...mainClippingParents, rootBoundary];
    const firstClippingParent = clippingParents[0];
    const clippingRect = clippingParents.reduce((accRect, clippingParent) => {
      const rect = getClientRectFromClippingParent(element, clippingParent);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingParent(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  const platform = {
    getElementRects: _ref => {
      let {
        reference,
        floating,
        strategy
      } = _ref;
      return {
        reference: getRectRelativeToOffsetParent(reference, getOffsetParent(floating), strategy),
        floating: { ...getDimensions(floating),
          x: 0,
          y: 0
        }
      };
    },
    convertOffsetParentRelativeRectToViewportRelativeRect: args => convertOffsetParentRelativeRectToViewportRelativeRect(args),
    getOffsetParent: _ref2 => {
      let {
        element
      } = _ref2;
      return getOffsetParent(element);
    },
    isElement: value => isElement(value),
    getDocumentElement: _ref3 => {
      let {
        element
      } = _ref3;
      return getDocumentElement(element);
    },
    getClippingClientRect: args => getClippingClientRect(args),
    getDimensions: _ref4 => {
      let {
        element
      } = _ref4;
      return getDimensions(element);
    },
    getClientRects: _ref5 => {
      let {
        element
      } = _ref5;
      return element.getClientRects();
    }
  };

  const computePosition = (reference, floating, options) => core.computePosition(reference, floating, {
    platform,
    ...options
  });

  Object.defineProperty(exports, 'arrow', {
    enumerable: true,
    get: function () { return core.arrow; }
  });
  Object.defineProperty(exports, 'autoPlacement', {
    enumerable: true,
    get: function () { return core.autoPlacement; }
  });
  Object.defineProperty(exports, 'detectOverflow', {
    enumerable: true,
    get: function () { return core.detectOverflow; }
  });
  Object.defineProperty(exports, 'flip', {
    enumerable: true,
    get: function () { return core.flip; }
  });
  Object.defineProperty(exports, 'hide', {
    enumerable: true,
    get: function () { return core.hide; }
  });
  Object.defineProperty(exports, 'inline', {
    enumerable: true,
    get: function () { return core.inline; }
  });
  Object.defineProperty(exports, 'limitShift', {
    enumerable: true,
    get: function () { return core.limitShift; }
  });
  Object.defineProperty(exports, 'offset', {
    enumerable: true,
    get: function () { return core.offset; }
  });
  Object.defineProperty(exports, 'shift', {
    enumerable: true,
    get: function () { return core.shift; }
  });
  Object.defineProperty(exports, 'size', {
    enumerable: true,
    get: function () { return core.size; }
  });
  exports.computePosition = computePosition;
  exports.getScrollParents = getScrollParents;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
