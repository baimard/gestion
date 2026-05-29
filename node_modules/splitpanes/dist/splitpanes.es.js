var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var splitpanes_vue_vue_type_style_index_0_lang = "";
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script$1 = {
  name: "splitpanes",
  props: {
    horizontal: { type: Boolean },
    pushOtherPanes: { type: Boolean, default: true },
    dblClickSplitter: { type: Boolean, default: true },
    rtl: { type: Boolean, default: false },
    firstSplitter: { type: Boolean }
  },
  provide() {
    return {
      requestUpdate: this.requestUpdate,
      onPaneAdd: this.onPaneAdd,
      onPaneRemove: this.onPaneRemove,
      onPaneClick: this.onPaneClick
    };
  },
  data: () => ({
    container: null,
    ready: false,
    panes: [],
    touch: {
      mouseDown: false,
      dragging: false,
      activeSplitter: null
    },
    splitterTaps: {
      splitter: null,
      timeoutId: null
    }
  }),
  computed: {
    panesCount() {
      return this.panes.length;
    },
    indexedPanes() {
      return this.panes.reduce((obj, pane2) => (obj[pane2.id] = pane2) && obj, {});
    }
  },
  methods: {
    updatePaneComponents() {
      this.panes.forEach((pane2) => {
        pane2.update && pane2.update({
          [this.horizontal ? "height" : "width"]: `${this.indexedPanes[pane2.id].size}%`
        });
      });
    },
    bindEvents() {
      document.addEventListener("mousemove", this.onMouseMove, { passive: false });
      document.addEventListener("mouseup", this.onMouseUp);
      if ("ontouchstart" in window) {
        document.addEventListener("touchmove", this.onMouseMove, { passive: false });
        document.addEventListener("touchend", this.onMouseUp);
      }
    },
    unbindEvents() {
      document.removeEventListener("mousemove", this.onMouseMove, { passive: false });
      document.removeEventListener("mouseup", this.onMouseUp);
      if ("ontouchstart" in window) {
        document.removeEventListener("touchmove", this.onMouseMove, { passive: false });
        document.removeEventListener("touchend", this.onMouseUp);
      }
    },
    onMouseDown(event, splitterIndex) {
      this.bindEvents();
      this.touch.mouseDown = true;
      this.touch.activeSplitter = splitterIndex;
    },
    onMouseMove(event) {
      if (this.touch.mouseDown) {
        event.preventDefault();
        this.touch.dragging = true;
        this.calculatePanesSize(this.getCurrentMouseDrag(event));
        this.$emit("resize", this.panes.map((pane2) => ({ min: pane2.min, max: pane2.max, size: pane2.size })));
      }
    },
    onMouseUp() {
      if (this.touch.dragging) {
        this.$emit("resized", this.panes.map((pane2) => ({ min: pane2.min, max: pane2.max, size: pane2.size })));
      }
      this.touch.mouseDown = false;
      setTimeout(() => {
        this.touch.dragging = false;
        this.unbindEvents();
      }, 100);
    },
    onSplitterClick(event, splitterIndex) {
      if ("ontouchstart" in window) {
        event.preventDefault();
        if (this.dblClickSplitter) {
          if (this.splitterTaps.splitter === splitterIndex) {
            clearTimeout(this.splitterTaps.timeoutId);
            this.splitterTaps.timeoutId = null;
            this.onSplitterDblClick(event, splitterIndex);
            this.splitterTaps.splitter = null;
          } else {
            this.splitterTaps.splitter = splitterIndex;
            this.splitterTaps.timeoutId = setTimeout(() => {
              this.splitterTaps.splitter = null;
            }, 500);
          }
        }
      }
      if (!this.touch.dragging)
        this.$emit("splitter-click", this.panes[splitterIndex]);
    },
    onSplitterDblClick(event, splitterIndex) {
      let totalMinSizes = 0;
      this.panes = this.panes.map((pane2, i) => {
        pane2.size = i === splitterIndex ? pane2.max : pane2.min;
        if (i !== splitterIndex)
          totalMinSizes += pane2.min;
        return pane2;
      });
      this.panes[splitterIndex].size -= totalMinSizes;
      this.$emit("pane-maximize", this.panes[splitterIndex]);
    },
    onPaneClick(event, paneId) {
      this.$emit("pane-click", this.indexedPanes[paneId]);
    },
    getCurrentMouseDrag(event) {
      const rect = this.container.getBoundingClientRect();
      const { clientX, clientY } = "ontouchstart" in window && event.touches ? event.touches[0] : event;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    },
    getCurrentDragPercentage(drag) {
      drag = drag[this.horizontal ? "y" : "x"];
      const containerSize = this.container[this.horizontal ? "clientHeight" : "clientWidth"];
      if (this.rtl && !this.horizontal)
        drag = containerSize - drag;
      return drag * 100 / containerSize;
    },
    calculatePanesSize(drag) {
      const splitterIndex = this.touch.activeSplitter;
      let sums = {
        prevPanesSize: this.sumPrevPanesSize(splitterIndex),
        nextPanesSize: this.sumNextPanesSize(splitterIndex),
        prevReachedMinPanes: 0,
        nextReachedMinPanes: 0
      };
      const minDrag = 0 + (this.pushOtherPanes ? 0 : sums.prevPanesSize);
      const maxDrag = 100 - (this.pushOtherPanes ? 0 : sums.nextPanesSize);
      const dragPercentage = Math.max(Math.min(this.getCurrentDragPercentage(drag), maxDrag), minDrag);
      let panesToResize = [splitterIndex, splitterIndex + 1];
      let paneBefore = this.panes[panesToResize[0]] || null;
      let paneAfter = this.panes[panesToResize[1]] || null;
      const paneBeforeMaxReached = paneBefore.max < 100 && dragPercentage >= paneBefore.max + sums.prevPanesSize;
      const paneAfterMaxReached = paneAfter.max < 100 && dragPercentage <= 100 - (paneAfter.max + this.sumNextPanesSize(splitterIndex + 1));
      if (paneBeforeMaxReached || paneAfterMaxReached) {
        if (paneBeforeMaxReached) {
          paneBefore.size = paneBefore.max;
          paneAfter.size = Math.max(100 - paneBefore.max - sums.prevPanesSize - sums.nextPanesSize, 0);
        } else {
          paneBefore.size = Math.max(100 - paneAfter.max - sums.prevPanesSize - this.sumNextPanesSize(splitterIndex + 1), 0);
          paneAfter.size = paneAfter.max;
        }
        return;
      }
      if (this.pushOtherPanes) {
        const vars = this.doPushOtherPanes(sums, dragPercentage);
        if (!vars)
          return;
        ({ sums, panesToResize } = vars);
        paneBefore = this.panes[panesToResize[0]] || null;
        paneAfter = this.panes[panesToResize[1]] || null;
      }
      if (paneBefore !== null) {
        paneBefore.size = Math.min(Math.max(dragPercentage - sums.prevPanesSize - sums.prevReachedMinPanes, paneBefore.min), paneBefore.max);
      }
      if (paneAfter !== null) {
        paneAfter.size = Math.min(Math.max(100 - dragPercentage - sums.nextPanesSize - sums.nextReachedMinPanes, paneAfter.min), paneAfter.max);
      }
    },
    doPushOtherPanes(sums, dragPercentage) {
      const splitterIndex = this.touch.activeSplitter;
      const panesToResize = [splitterIndex, splitterIndex + 1];
      if (dragPercentage < sums.prevPanesSize + this.panes[panesToResize[0]].min) {
        panesToResize[0] = this.findPrevExpandedPane(splitterIndex).index;
        sums.prevReachedMinPanes = 0;
        if (panesToResize[0] < splitterIndex) {
          this.panes.forEach((pane2, i) => {
            if (i > panesToResize[0] && i <= splitterIndex) {
              pane2.size = pane2.min;
              sums.prevReachedMinPanes += pane2.min;
            }
          });
        }
        sums.prevPanesSize = this.sumPrevPanesSize(panesToResize[0]);
        if (panesToResize[0] === void 0) {
          sums.prevReachedMinPanes = 0;
          this.panes[0].size = this.panes[0].min;
          this.panes.forEach((pane2, i) => {
            if (i > 0 && i <= splitterIndex) {
              pane2.size = pane2.min;
              sums.prevReachedMinPanes += pane2.min;
            }
          });
          this.panes[panesToResize[1]].size = 100 - sums.prevReachedMinPanes - this.panes[0].min - sums.prevPanesSize - sums.nextPanesSize;
          return null;
        }
      }
      if (dragPercentage > 100 - sums.nextPanesSize - this.panes[panesToResize[1]].min) {
        panesToResize[1] = this.findNextExpandedPane(splitterIndex).index;
        sums.nextReachedMinPanes = 0;
        if (panesToResize[1] > splitterIndex + 1) {
          this.panes.forEach((pane2, i) => {
            if (i > splitterIndex && i < panesToResize[1]) {
              pane2.size = pane2.min;
              sums.nextReachedMinPanes += pane2.min;
            }
          });
        }
        sums.nextPanesSize = this.sumNextPanesSize(panesToResize[1] - 1);
        if (panesToResize[1] === void 0) {
          sums.nextReachedMinPanes = 0;
          this.panes[this.panesCount - 1].size = this.panes[this.panesCount - 1].min;
          this.panes.forEach((pane2, i) => {
            if (i < this.panesCount - 1 && i >= splitterIndex + 1) {
              pane2.size = pane2.min;
              sums.nextReachedMinPanes += pane2.min;
            }
          });
          this.panes[panesToResize[0]].size = 100 - sums.prevPanesSize - sums.nextReachedMinPanes - this.panes[this.panesCount - 1].min - sums.nextPanesSize;
          return null;
        }
      }
      return { sums, panesToResize };
    },
    sumPrevPanesSize(splitterIndex) {
      return this.panes.reduce((total, pane2, i) => total + (i < splitterIndex ? pane2.size : 0), 0);
    },
    sumNextPanesSize(splitterIndex) {
      return this.panes.reduce((total, pane2, i) => total + (i > splitterIndex + 1 ? pane2.size : 0), 0);
    },
    findPrevExpandedPane(splitterIndex) {
      const pane2 = [...this.panes].reverse().find((p) => p.index < splitterIndex && p.size > p.min);
      return pane2 || {};
    },
    findNextExpandedPane(splitterIndex) {
      const pane2 = this.panes.find((p) => p.index > splitterIndex + 1 && p.size > p.min);
      return pane2 || {};
    },
    checkSplitpanesNodes() {
      const children = Array.from(this.container.children);
      children.forEach((child) => {
        const isPane = child.classList.contains("splitpanes__pane");
        const isSplitter = child.classList.contains("splitpanes__splitter");
        if (!isPane && !isSplitter) {
          child.parentNode.removeChild(child);
          console.warn("Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed.");
          return;
        }
      });
    },
    addSplitter(paneIndex, nextPaneNode, isVeryFirst = false) {
      const splitterIndex = paneIndex - 1;
      const elm = document.createElement("div");
      elm.classList.add("splitpanes__splitter");
      if (!isVeryFirst) {
        elm.onmousedown = (event) => this.onMouseDown(event, splitterIndex);
        if (typeof window !== "undefined" && "ontouchstart" in window) {
          elm.ontouchstart = (event) => this.onMouseDown(event, splitterIndex);
        }
        elm.onclick = (event) => this.onSplitterClick(event, splitterIndex + 1);
      }
      if (this.dblClickSplitter) {
        elm.ondblclick = (event) => this.onSplitterDblClick(event, splitterIndex + 1);
      }
      nextPaneNode.parentNode.insertBefore(elm, nextPaneNode);
    },
    removeSplitter(node) {
      node.onmousedown = void 0;
      node.onclick = void 0;
      node.ondblclick = void 0;
      node.parentNode.removeChild(node);
    },
    redoSplitters() {
      const children = Array.from(this.container.children);
      children.forEach((el) => {
        if (el.className.includes("splitpanes__splitter"))
          this.removeSplitter(el);
      });
      let paneIndex = 0;
      children.forEach((el) => {
        if (el.className.includes("splitpanes__pane")) {
          if (!paneIndex && this.firstSplitter)
            this.addSplitter(paneIndex, el, true);
          else if (paneIndex)
            this.addSplitter(paneIndex, el);
          paneIndex++;
        }
      });
    },
    requestUpdate(_a) {
      var _b = _a, { target } = _b, args = __objRest(_b, ["target"]);
      const pane2 = this.indexedPanes[target._uid];
      Object.entries(args).forEach(([key, value]) => pane2[key] = value);
    },
    onPaneAdd(pane2) {
      let index = -1;
      Array.from(pane2.$el.parentNode.children).some((el) => {
        if (el.className.includes("splitpanes__pane"))
          index++;
        return el === pane2.$el;
      });
      const min = parseFloat(pane2.minSize);
      const max = parseFloat(pane2.maxSize);
      this.panes.splice(index, 0, {
        id: pane2._uid,
        index,
        min: isNaN(min) ? 0 : min,
        max: isNaN(max) ? 100 : max,
        size: pane2.size === null ? null : parseFloat(pane2.size),
        givenSize: pane2.size,
        update: pane2.update
      });
      this.panes.forEach((p, i) => p.index = i);
      if (this.ready) {
        this.$nextTick(() => {
          this.redoSplitters();
          this.resetPaneSizes({ addedPane: this.panes[index] });
          this.$emit("pane-add", { index, panes: this.panes.map((pane3) => ({ min: pane3.min, max: pane3.max, size: pane3.size })) });
        });
      }
    },
    onPaneRemove(pane2) {
      const index = this.panes.findIndex((p) => p.id === pane2._uid);
      const removed = this.panes.splice(index, 1)[0];
      this.panes.forEach((p, i) => p.index = i);
      this.$nextTick(() => {
        this.redoSplitters();
        this.resetPaneSizes({ removedPane: __spreadProps(__spreadValues({}, removed), { index }) });
        this.$emit("pane-remove", { removed, panes: this.panes.map((pane3) => ({ min: pane3.min, max: pane3.max, size: pane3.size })) });
      });
    },
    resetPaneSizes(changedPanes = {}) {
      if (!changedPanes.addedPane && !changedPanes.removedPane)
        this.initialPanesSizing();
      else if (this.panes.some((pane2) => pane2.givenSize !== null || pane2.min || pane2.max < 100))
        this.equalizeAfterAddOrRemove(changedPanes);
      else
        this.equalize();
      if (this.ready)
        this.$emit("resized", this.panes.map((pane2) => ({ min: pane2.min, max: pane2.max, size: pane2.size })));
    },
    equalize() {
      const equalSpace = 100 / this.panesCount;
      let leftToAllocate = 0;
      let ungrowable = [];
      let unshrinkable = [];
      this.panes.forEach((pane2) => {
        pane2.size = Math.max(Math.min(equalSpace, pane2.max), pane2.min);
        leftToAllocate -= pane2.size;
        if (pane2.size >= pane2.max)
          ungrowable.push(pane2.id);
        if (pane2.size <= pane2.min)
          unshrinkable.push(pane2.id);
      });
      if (leftToAllocate > 0.1)
        this.readjustSizes(leftToAllocate, ungrowable, unshrinkable);
    },
    initialPanesSizing() {
      100 / this.panesCount;
      let leftToAllocate = 100;
      let ungrowable = [];
      let unshrinkable = [];
      let definedSizes = 0;
      this.panes.forEach((pane2) => {
        leftToAllocate -= pane2.size;
        if (pane2.size !== null)
          definedSizes++;
        if (pane2.size >= pane2.max)
          ungrowable.push(pane2.id);
        if (pane2.size <= pane2.min)
          unshrinkable.push(pane2.id);
      });
      let leftToAllocate2 = 100;
      if (leftToAllocate > 0.1) {
        this.panes.forEach((pane2) => {
          if (pane2.size === null) {
            pane2.size = Math.max(Math.min(leftToAllocate / (this.panesCount - definedSizes), pane2.max), pane2.min);
          }
          leftToAllocate2 -= pane2.size;
        });
        if (leftToAllocate2 > 0.1)
          this.readjustSizes(leftToAllocate, ungrowable, unshrinkable);
      }
    },
    equalizeAfterAddOrRemove({ addedPane, removedPane } = {}) {
      let equalSpace = 100 / this.panesCount;
      let leftToAllocate = 0;
      let ungrowable = [];
      let unshrinkable = [];
      if (addedPane && addedPane.givenSize !== null) {
        equalSpace = (100 - addedPane.givenSize) / (this.panesCount - 1);
      }
      this.panes.forEach((pane2) => {
        leftToAllocate -= pane2.size;
        if (pane2.size >= pane2.max)
          ungrowable.push(pane2.id);
        if (pane2.size <= pane2.min)
          unshrinkable.push(pane2.id);
      });
      if (Math.abs(leftToAllocate) < 0.1)
        return;
      this.panes.forEach((pane2) => {
        if (addedPane && addedPane.givenSize !== null && addedPane.id === pane2.id)
          ;
        else
          pane2.size = Math.max(Math.min(equalSpace, pane2.max), pane2.min);
        leftToAllocate -= pane2.size;
        if (pane2.size >= pane2.max)
          ungrowable.push(pane2.id);
        if (pane2.size <= pane2.min)
          unshrinkable.push(pane2.id);
      });
      if (leftToAllocate > 0.1)
        this.readjustSizes(leftToAllocate, ungrowable, unshrinkable);
    },
    readjustSizes(leftToAllocate, ungrowable, unshrinkable) {
      let equalSpaceToAllocate;
      if (leftToAllocate > 0)
        equalSpaceToAllocate = leftToAllocate / (this.panesCount - ungrowable.length);
      else
        equalSpaceToAllocate = leftToAllocate / (this.panesCount - unshrinkable.length);
      this.panes.forEach((pane2, i) => {
        if (leftToAllocate > 0 && !ungrowable.includes(pane2.id)) {
          const newPaneSize = Math.max(Math.min(pane2.size + equalSpaceToAllocate, pane2.max), pane2.min);
          const allocated = newPaneSize - pane2.size;
          leftToAllocate -= allocated;
          pane2.size = newPaneSize;
        } else if (!unshrinkable.includes(pane2.id)) {
          const newPaneSize = Math.max(Math.min(pane2.size + equalSpaceToAllocate, pane2.max), pane2.min);
          const allocated = newPaneSize - pane2.size;
          leftToAllocate -= allocated;
          pane2.size = newPaneSize;
        }
        pane2.update({
          [this.horizontal ? "height" : "width"]: `${this.indexedPanes[pane2.id].size}%`
        });
      });
      if (Math.abs(leftToAllocate) > 0.1) {
        this.$nextTick(() => {
          if (this.ready) {
            console.warn("Splitpanes: Could not resize panes correctly due to their constraints.");
          }
        });
      }
    }
  },
  watch: {
    panes: {
      deep: true,
      immediate: false,
      handler() {
        this.updatePaneComponents();
      }
    },
    horizontal() {
      this.updatePaneComponents();
    },
    firstSplitter() {
      this.redoSplitters();
    },
    dblClickSplitter(enable) {
      const splitters = [...this.container.querySelectorAll(".splitpanes__splitter")];
      splitters.forEach((splitter, i) => {
        splitter.ondblclick = enable ? (event) => this.onSplitterDblClick(event, i) : void 0;
      });
    }
  },
  beforeDestroy() {
    this.ready = false;
  },
  mounted() {
    this.container = this.$refs.container;
    this.checkSplitpanesNodes();
    this.redoSplitters();
    this.resetPaneSizes();
    this.$emit("ready");
    this.ready = true;
  },
  render(h) {
    return h("div", {
      ref: "container",
      class: [
        "splitpanes",
        `splitpanes--${this.horizontal ? "horizontal" : "vertical"}`,
        {
          "splitpanes--dragging": this.touch.dragging
        }
      ]
    }, this.$slots.default);
  }
};
let __vue2_render, __vue2_staticRenderFns;
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, __vue2_render, __vue2_staticRenderFns, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var splitpanes = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "splitpanes__pane", style: _vm.style, on: { "click": function($event) {
    return _vm.onPaneClick($event, _vm._uid);
  } } }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
const __vue2_script = {
  name: "pane",
  inject: ["requestUpdate", "onPaneAdd", "onPaneRemove", "onPaneClick"],
  props: {
    size: { type: [Number, String], default: null },
    minSize: { type: [Number, String], default: 0 },
    maxSize: { type: [Number, String], default: 100 }
  },
  data: () => ({
    style: {}
  }),
  mounted() {
    this.onPaneAdd(this);
  },
  beforeDestroy() {
    this.onPaneRemove(this);
  },
  methods: {
    update(style) {
      this.style = style;
    }
  },
  computed: {
    sizeNumber() {
      return this.size || this.size === 0 ? parseFloat(this.size) : null;
    },
    minSizeNumber() {
      return parseFloat(this.minSize);
    },
    maxSizeNumber() {
      return parseFloat(this.maxSize);
    }
  },
  watch: {
    sizeNumber(size) {
      this.requestUpdate({ target: this, size });
    },
    minSizeNumber(min) {
      this.requestUpdate({ target: this, min });
    },
    maxSizeNumber(max) {
      this.requestUpdate({ target: this, max });
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var pane = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { pane as Pane, splitpanes as Splitpanes };
