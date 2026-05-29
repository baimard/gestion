import script$1 from '../checkboard/index.js';
import { resolveComponent, openBlock, createElementBlock, createElementVNode, createVNode, normalizeStyle } from 'vue';
import { s as styleInject } from '../../style-inject.es-746bb8ed.js';
import { install } from '../../utils/compoent.js';
import '../../defaultConfig.js';

var script = {
  name: 'Alpha',
  components: {
    Checkboard: script$1,
  },
  props: {
    value: Object,
    onChange: Function,
  },
  computed: {
    colors() {
      return this.value;
    },
    gradientColor() {
      const { rgba } = this.colors;
      const rgbStr = [rgba.r, rgba.g, rgba.b].join(',');
      return `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`;
    },
  },
  methods: {
    handleChange(e, skip) {
      !skip && e.preventDefault();
      const { container } = this.$refs;
      if (!container) {
        // for some edge cases, container may not exist. see #220
        return;
      }
      const containerWidth = container.clientWidth;

      const xOffset = container.getBoundingClientRect().left + window.pageXOffset;
      const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      const left = pageX - xOffset;

      let a;
      if (left < 0)
        a = 0;
      else if (left > containerWidth)
        a = 1;
      else
        a = Math.round(left * 100 / containerWidth) / 100;

      if (this.colors.a !== a) {
        this.$emit('change', {
          h: this.colors.hsl.h,
          s: this.colors.hsl.s,
          l: this.colors.hsl.l,
          a,
          source: 'rgba',
        });
      }
    },
    handleMouseDown(e) {
      this.handleChange(e, true);
      window.addEventListener('mousemove', this.handleChange);
      window.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseUp() {
      this.unbindEventListeners();
    },
    unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange);
      window.removeEventListener('mouseup', this.handleMouseUp);
    },
  },
};

const _hoisted_1 = { class: "vc-alpha" };
const _hoisted_2 = { class: "vc-alpha-checkboard-wrap" };
const _hoisted_3 = /*#__PURE__*/createElementVNode("div", { class: "vc-alpha-picker" }, null, -1 /* HOISTED */);
const _hoisted_4 = [
  _hoisted_3
];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Checkboard = resolveComponent("Checkboard");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      createVNode(_component_Checkboard)
    ]),
    createElementVNode("div", {
      class: "vc-alpha-gradient",
      style: normalizeStyle({ background: $options.gradientColor })
    }, null, 4 /* STYLE */),
    createElementVNode("div", {
      ref: "container",
      class: "vc-alpha-container",
      onMousedown: _cache[0] || (_cache[0] = (...args) => ($options.handleMouseDown && $options.handleMouseDown(...args))),
      onTouchmove: _cache[1] || (_cache[1] = (...args) => ($options.handleChange && $options.handleChange(...args))),
      onTouchstart: _cache[2] || (_cache[2] = (...args) => ($options.handleChange && $options.handleChange(...args)))
    }, [
      createElementVNode("div", {
        class: "vc-alpha-pointer",
        style: normalizeStyle({ left: `${$options.colors.a * 100}%` })
      }, _hoisted_4, 4 /* STYLE */)
    ], 544 /* HYDRATE_EVENTS, NEED_PATCH */)
  ]))
}

var css_248z = ".vc-alpha,.vc-alpha-checkboard-wrap{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-checkboard-wrap{overflow:hidden}.vc-alpha-gradient{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-container{cursor:pointer;height:100%;margin:0 3px;position:relative;z-index:2}.vc-alpha-pointer{position:absolute;z-index:2}.vc-alpha-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}";
styleInject(css_248z);

script.render = render;
script.__file = "src/components/alpha/alpha.vue";

script.install = install;

export { script as default };
