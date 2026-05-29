import script$1 from '../editable-input/index.js';
import colorMixin from '../../mixin/color.js';
import { resolveComponent, openBlock, createElementBlock, createVNode, normalizeStyle, createElementVNode } from 'vue';
import { s as styleInject } from '../../style-inject.es-746bb8ed.js';
import { install } from '../../utils/compoent.js';
import '../../defaultConfig.js';
import '@ctrl/tinycolor';

var script = {
  name: 'Material',
  components: {
    EdIn: script$1,
  },
  mixins: [colorMixin],
  methods: {
    onChange(data) {
      if (!data)
        return;

      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex',
        });
      }
      else if (data.r || data.g || data.b) {
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

const _hoisted_1 = {
  role: "application",
  "aria-label": "Material color picker",
  class: "vc-material"
};
const _hoisted_2 = { class: "vc-material-split" };
const _hoisted_3 = { class: "vc-material-third" };
const _hoisted_4 = { class: "vc-material-third" };
const _hoisted_5 = { class: "vc-material-third" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EdIn = resolveComponent("EdIn");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_EdIn, {
      class: "vc-material-hex",
      label: "hex",
      value: _ctx.colors.hex,
      style: normalizeStyle({ borderColor: _ctx.colors.hex }),
      onChange: $options.onChange
    }, null, 8 /* PROPS */, ["value", "style", "onChange"]),
    createElementVNode("div", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        createVNode(_component_EdIn, {
          label: "r",
          value: _ctx.colors.rgba.r,
          onChange: $options.onChange
        }, null, 8 /* PROPS */, ["value", "onChange"])
      ]),
      createElementVNode("div", _hoisted_4, [
        createVNode(_component_EdIn, {
          label: "g",
          value: _ctx.colors.rgba.g,
          onChange: $options.onChange
        }, null, 8 /* PROPS */, ["value", "onChange"])
      ]),
      createElementVNode("div", _hoisted_5, [
        createVNode(_component_EdIn, {
          label: "b",
          value: _ctx.colors.rgba.b,
          onChange: $options.onChange
        }, null, 8 /* PROPS */, ["value", "onChange"])
      ])
    ])
  ]))
}

var css_248z = ".vc-material{background-color:#fff;border-radius:2px;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);font-family:Roboto;height:98px;padding:16px;position:relative;width:98px}.vc-material .vc-input__input{color:#333;font-size:15px;height:30px;margin-top:12px;width:100%}.vc-material .vc-input__label{color:#999;font-size:11px;left:0;position:absolute;text-transform:capitalize;top:0}.vc-material-hex{border-bottom-style:solid;border-bottom-width:2px}.vc-material-split{display:flex;margin-right:-10px;padding-top:11px}.vc-material-third{flex:1;padding-right:10px}";
styleInject(css_248z);

script.render = render;
script.__file = "src/components/material/material.vue";

script.install = install;

export { script as default };
