import colorMixin from '../../mixin/color.js';
import script$4 from '../editable-input/index.js';
import script$1 from '../saturation/index.js';
import script$2 from '../hue/index.js';
import script$3 from '../alpha/index.js';
import script$5 from '../checkboard/index.js';
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, createVNode, createCommentVNode, normalizeStyle, Fragment, renderList } from 'vue';
import { s as styleInject } from '../../style-inject.es-746bb8ed.js';
import { install } from '../../utils/compoent.js';
import '@ctrl/tinycolor';
import '../../defaultConfig.js';
import '../../utils/utils.js';

const presetColors = [
  '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
  '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
  'rgba(0,0,0,0)',
];

var script = {
  name: 'Sketch',
  components: {
    Saturation: script$1,
    Hue: script$2,
    Alpha: script$3,
    EdIn: script$4,
    Checkboard: script$5,
  },
  mixins: [colorMixin],
  props: {
    presetColors: {
      type: Array,
      default() {
        return presetColors;
      },
    },
    disableAlpha: {
      type: Boolean,
      default: false,
    },
    disableFields: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hex() {
      let hex;
      if (this.colors.a < 1)
        hex = this.colors.hex8;
      else
        hex = this.colors.hex;

      return hex.replace('#', '');
    },
    activeColor() {
      const { rgba } = this.colors;
      return `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(',')})`;
    },
  },
  methods: {
    handlePreset(c) {
      this.colorChange(c);
    },
    childChange(data) {
      this.colorChange(data);
    },
    inputChange(data) {
      if (!data)
        return;

      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex',
        });
      }
      else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba',
        });
      }
    },
  },
};

const _hoisted_1 = { class: "vc-sketch-saturation-wrap" };
const _hoisted_2 = { class: "vc-sketch-controls" };
const _hoisted_3 = { class: "vc-sketch-sliders" };
const _hoisted_4 = { class: "vc-sketch-hue-wrap" };
const _hoisted_5 = {
  key: 0,
  class: "vc-sketch-alpha-wrap"
};
const _hoisted_6 = { class: "vc-sketch-color-wrap" };
const _hoisted_7 = ["aria-label"];
const _hoisted_8 = {
  key: 0,
  class: "vc-sketch-field"
};
const _hoisted_9 = { class: "vc-sketch-field--double" };
const _hoisted_10 = { class: "vc-sketch-field--single" };
const _hoisted_11 = { class: "vc-sketch-field--single" };
const _hoisted_12 = { class: "vc-sketch-field--single" };
const _hoisted_13 = {
  key: 0,
  class: "vc-sketch-field--single"
};
const _hoisted_14 = {
  class: "vc-sketch-presets",
  role: "group",
  "aria-label": "A color preset, pick one to set as current color"
};
const _hoisted_15 = ["aria-label", "onClick"];
const _hoisted_16 = ["aria-label", "onClick"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Saturation = resolveComponent("Saturation");
  const _component_Hue = resolveComponent("Hue");
  const _component_Alpha = resolveComponent("Alpha");
  const _component_Checkboard = resolveComponent("Checkboard");
  const _component_EdIn = resolveComponent("EdIn");

  return (openBlock(), createElementBlock("div", {
    role: "application",
    "aria-label": "Sketch color picker",
    class: normalizeClass(["vc-sketch", [$props.disableAlpha ? 'vc-sketch__disable-alpha' : '']])
  }, [
    createElementVNode("div", _hoisted_1, [
      createVNode(_component_Saturation, {
        value: _ctx.colors,
        onChange: $options.childChange
      }, null, 8 /* PROPS */, ["value", "onChange"])
    ]),
    createElementVNode("div", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        createElementVNode("div", _hoisted_4, [
          createVNode(_component_Hue, {
            value: _ctx.colors,
            onChange: $options.childChange
          }, null, 8 /* PROPS */, ["value", "onChange"])
        ]),
        (!$props.disableAlpha)
          ? (openBlock(), createElementBlock("div", _hoisted_5, [
              createVNode(_component_Alpha, {
                value: _ctx.colors,
                onChange: $options.childChange
              }, null, 8 /* PROPS */, ["value", "onChange"])
            ]))
          : createCommentVNode("v-if", true)
      ]),
      createElementVNode("div", _hoisted_6, [
        createElementVNode("div", {
          "aria-label": `Current color is ${$options.activeColor}`,
          class: "vc-sketch-active-color",
          style: normalizeStyle({ background: $options.activeColor })
        }, null, 12 /* STYLE, PROPS */, _hoisted_7),
        createVNode(_component_Checkboard)
      ])
    ]),
    (!$props.disableFields)
      ? (openBlock(), createElementBlock("div", _hoisted_8, [
          createCommentVNode(" rgba "),
          createElementVNode("div", _hoisted_9, [
            createVNode(_component_EdIn, {
              label: "hex",
              value: $options.hex,
              onChange: $options.inputChange
            }, null, 8 /* PROPS */, ["value", "onChange"])
          ]),
          createElementVNode("div", _hoisted_10, [
            createVNode(_component_EdIn, {
              label: "r",
              value: _ctx.colors.rgba.r,
              onChange: $options.inputChange
            }, null, 8 /* PROPS */, ["value", "onChange"])
          ]),
          createElementVNode("div", _hoisted_11, [
            createVNode(_component_EdIn, {
              label: "g",
              value: _ctx.colors.rgba.g,
              onChange: $options.inputChange
            }, null, 8 /* PROPS */, ["value", "onChange"])
          ]),
          createElementVNode("div", _hoisted_12, [
            createVNode(_component_EdIn, {
              label: "b",
              value: _ctx.colors.rgba.b,
              onChange: $options.inputChange
            }, null, 8 /* PROPS */, ["value", "onChange"])
          ]),
          (!$props.disableAlpha)
            ? (openBlock(), createElementBlock("div", _hoisted_13, [
                createVNode(_component_EdIn, {
                  label: "a",
                  value: _ctx.colors.a,
                  "arrow-offset": 0.01,
                  max: 1,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "arrow-offset", "onChange"])
              ]))
            : createCommentVNode("v-if", true)
        ]))
      : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_14, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.presetColors, (c) => {
        return (openBlock(), createElementBlock(Fragment, null, [
          (!_ctx.isTransparent(c))
            ? (openBlock(), createElementBlock("div", {
                key: `!${c}`,
                class: "vc-sketch-presets-color",
                "aria-label": `Color:${c}`,
                style: normalizeStyle({ background: c }),
                onClick: $event => ($options.handlePreset(c))
              }, null, 12 /* STYLE, PROPS */, _hoisted_15))
            : (openBlock(), createElementBlock("div", {
                key: c,
                "aria-label": `Color:${c}`,
                class: "vc-sketch-presets-color",
                onClick: $event => ($options.handlePreset(c))
              }, [
                createVNode(_component_Checkboard)
              ], 8 /* PROPS */, _hoisted_16))
        ], 64 /* STABLE_FRAGMENT */))
      }), 256 /* UNKEYED_FRAGMENT */))
    ])
  ], 2 /* CLASS */))
}

var css_248z = ".vc-sketch{background:#fff;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.15),0 8px 16px rgba(0,0,0,.15);box-sizing:initial;padding:10px 10px 0;position:relative;width:200px}.vc-sketch-saturation-wrap{overflow:hidden;padding-bottom:75%;position:relative;width:100%}.vc-sketch-controls{display:flex}.vc-sketch-sliders{flex:1;padding:4px 0}.vc-sketch-sliders .vc-alpha-gradient,.vc-sketch-sliders .vc-hue{border-radius:2px}.vc-sketch-alpha-wrap,.vc-sketch-hue-wrap{height:10px;position:relative}.vc-sketch-alpha-wrap{margin-top:4px;overflow:hidden}.vc-sketch-color-wrap{border-radius:3px;height:24px;margin-left:4px;margin-top:4px;position:relative;width:24px}.vc-sketch-active-color{border-radius:2px;bottom:0;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15),inset 0 0 4px rgba(0,0,0,.25);left:0;position:absolute;right:0;top:0;z-index:2}.vc-sketch-color-wrap .vc-checkerboard{background-size:auto}.vc-sketch-field{display:flex;padding-top:4px}.vc-sketch-field .vc-input__input{border:none;box-shadow:inset 0 0 0 1px #ccc;font-size:10px;padding:4px 0 3px 10%;width:90%}.vc-sketch-field .vc-input__label{color:#222;display:block;font-size:11px;padding-bottom:4px;padding-top:3px;text-align:center;text-transform:capitalize}.vc-sketch-field--single{flex:1;padding-left:6px}.vc-sketch-field--double{flex:2}.vc-sketch-presets{border-top:1px solid #eee;margin-left:-10px;margin-right:-10px;padding-left:10px;padding-top:10px}.vc-sketch-presets-color{cursor:pointer;display:inline-block;height:16px;margin:0 10px 10px 0;overflow:hidden;position:relative;vertical-align:top;width:16px}.vc-sketch-presets-color,.vc-sketch-presets-color .vc-checkerboard{border-radius:3px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}.vc-sketch__disable-alpha .vc-sketch-color-wrap{height:10px}";
styleInject(css_248z);

script.render = render;
script.__file = "src/components/sketch/sketch.vue";

script.install = install;

export { script as default };
