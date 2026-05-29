import colorMixin from '../../mixin/color.js';
import script$1 from '../hue/index.js';
import { resolveComponent, openBlock, createElementBlock, createElementVNode, createVNode, Fragment, renderList, normalizeClass, normalizeStyle } from 'vue';
import { s as styleInject } from '../../style-inject.es-746bb8ed.js';
import { install } from '../../utils/compoent.js';
import '@ctrl/tinycolor';
import '../../defaultConfig.js';

const DEFAULT_SATURATION = 0.5;

var script = {
  name: 'Slider',
  components: {
    Hue: script$1,
  },
  mixins: [colorMixin],
  props: {
    swatches: {
      type: Array,
      default() {
        // also accepts: ['.80', '.65', '.50', '.35', '.20']
        return [
          { s: DEFAULT_SATURATION, l: 0.8 },
          { s: DEFAULT_SATURATION, l: 0.65 },
          { s: DEFAULT_SATURATION, l: 0.5 },
          { s: DEFAULT_SATURATION, l: 0.35 },
          { s: DEFAULT_SATURATION, l: 0.2 },
        ];
      },
    },
  },
  computed: {
    normalizedSwatches() {
      const { swatches } = this;
      return swatches.map((swatch) => {
        // to be compatible with another data format ['.80', '.65', '.50', '.35', '.20']
        if (typeof swatch !== 'object') {
          return {
            s: DEFAULT_SATURATION,
            l: swatch,
          };
        }
        return swatch;
      });
    },
  },
  methods: {
    isActive(swatch, index) {
      const { hsl } = this.colors;
      if (hsl.l === 1 && swatch.l === 1)
        return true;

      if (hsl.l === 0 && swatch.l === 0)
        return true;

      return (
        Math.abs(hsl.l - swatch.l) < 0.01 && Math.abs(hsl.s - swatch.s) < 0.01
      );
    },
    hueChange(data) {
      this.colorChange(data);
    },
    handleSwClick(index, swatch) {
      this.colorChange({
        h: this.colors.hsl.h,
        s: swatch.s,
        l: swatch.l,
        source: 'hsl',
      });
    },
  },
};

const _hoisted_1 = {
  role: "application",
  "aria-label": "Slider color picker",
  class: "vc-slider"
};
const _hoisted_2 = { class: "vc-slider-hue-warp" };
const _hoisted_3 = {
  class: "vc-slider-swatches",
  role: "group"
};
const _hoisted_4 = ["data-index", "aria-label", "onClick"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Hue = resolveComponent("Hue");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      createVNode(_component_Hue, {
        value: _ctx.colors,
        onChange: $options.hueChange
      }, null, 8 /* PROPS */, ["value", "onChange"])
    ]),
    createElementVNode("div", _hoisted_3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.normalizedSwatches, (swatch, index) => {
        return (openBlock(), createElementBlock("div", {
          key: index,
          class: "vc-slider-swatch",
          "data-index": index,
          "aria-label": `color:${_ctx.colors.hex}`,
          role: "button",
          onClick: $event => ($options.handleSwClick(index, swatch))
        }, [
          createElementVNode("div", {
            class: normalizeClass(["vc-slider-swatch-picker", { 'vc-slider-swatch-picker--active': $options.isActive(swatch, index), 'vc-slider-swatch-picker--white': swatch.l === 1 }]),
            style: normalizeStyle({ background: `hsl(${_ctx.colors.hsl.h}, ${swatch.s * 100}%, ${swatch.l * 100}%)` })
          }, null, 6 /* CLASS, STYLE */)
        ], 8 /* PROPS */, _hoisted_4))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

var css_248z = ".vc-slider{position:relative;width:410px}.vc-slider-hue-warp{height:12px;position:relative}.vc-slider-hue-warp .vc-hue-picker{background-color:#f8f8f8;border-radius:6px;box-shadow:0 1px 4px 0 rgba(0,0,0,.37);height:14px;transform:translate(-7px,-2px);width:14px}.vc-slider-swatches{display:flex;margin-top:20px}.vc-slider-swatch{flex:1;margin-right:1px;width:20%}.vc-slider-swatch:first-child{margin-right:1px}.vc-slider-swatch:first-child .vc-slider-swatch-picker{border-radius:2px 0 0 2px}.vc-slider-swatch:last-child{margin-right:0}.vc-slider-swatch:last-child .vc-slider-swatch-picker{border-radius:0 2px 2px 0}.vc-slider-swatch-picker{cursor:pointer;height:12px}.vc-slider-swatch:nth-child(n) .vc-slider-swatch-picker.vc-slider-swatch-picker--active{border-radius:3.6px/2px;transform:scaleY(1.8)}.vc-slider-swatch-picker--white{box-shadow:inset 0 0 0 1px #ddd}.vc-slider-swatch-picker--active.vc-slider-swatch-picker--white{box-shadow:inset 0 0 0 .6px #ddd}";
styleInject(css_248z);

script.render = render;
script.__file = "src/components/slider/slider.vue";

script.install = install;

export { script as default };
