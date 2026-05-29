import script$1 from '../editable-input/index.js';
import colorMixin from '../../mixin/color.js';
import { resolveComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, Fragment, renderList, withKeys, createVNode } from 'vue';
import { s as styleInject } from '../../style-inject.es-746bb8ed.js';
import { install } from '../../utils/compoent.js';
import '../../defaultConfig.js';
import '@ctrl/tinycolor';

const defaultColors = [
  '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3',
  '#EB144C', '#F78DA7', '#9900EF',
];

var script = {
  name: 'Twitter',
  components: {
    EditableInput: script$1,
  },
  mixins: [colorMixin],
  props: {
    width: {
      type: [String, Number],
      default: 276,
    },
    defaultColors: {
      type: Array,
      default() {
        return defaultColors;
      },
    },
    triangle: {
      default: 'top-left',
      validator(value) {
        return ['hide', 'top-left', 'top-right'].includes(value);
      },
    },
  },
  computed: {
    hsv() {
      const { hsv } = this.colors;
      return {
        h: hsv.h.toFixed(),
        s: (hsv.s * 100).toFixed(),
        v: (hsv.v * 100).toFixed(),
      };
    },
    hex() {
      const { hex } = this.colors;
      return hex && hex.replace('#', '');
    },
  },
  methods: {
    equal(color) {
      return color.toLowerCase() === this.colors.hex.toLowerCase();
    },
    handlerClick(color) {
      this.colorChange({
        hex: color,
        source: 'hex',
      });
    },
    inputChange(data) {
      if (!data)
        return;

      if (data['#']) {
        this.isValidHex(data['#']) && this.colorChange({
          hex: data['#'],
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
      else if (data.h || data.s || data.v) {
        this.colorChange({
          h: data.h || this.colors.hsv.h,
          s: (data.s / 100) || this.colors.hsv.s,
          v: (data.v / 100) || this.colors.hsv.v,
          source: 'hsv',
        });
      }
    },
  },
};

const _hoisted_1 = /*#__PURE__*/createElementVNode("div", { class: "vc-twitter-triangle-shadow" }, null, -1 /* HOISTED */);
const _hoisted_2 = /*#__PURE__*/createElementVNode("div", { class: "vc-twitter-triangle" }, null, -1 /* HOISTED */);
const _hoisted_3 = { class: "vc-twitter-body" };
const _hoisted_4 = ["onKeyup", "onClick"];
const _hoisted_5 = /*#__PURE__*/createElementVNode("div", { class: "vc-twitter-hash" }, " # ", -1 /* HOISTED */);
const _hoisted_6 = /*#__PURE__*/createElementVNode("div", { class: "vc-twitter-clear" }, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EditableInput = resolveComponent("EditableInput");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["vc-twitter", {
      'vc-twitter-hide-triangle ': $props.triangle === 'hide',
      'vc-twitter-top-left-triangle ': $props.triangle === 'top-left',
      'vc-twitter-top-right-triangle ': $props.triangle === 'top-right',
    }]),
    style: normalizeStyle({
      width: typeof $props.width === 'number' ? `${$props.width}px` : $props.width,
    })
  }, [
    _hoisted_1,
    _hoisted_2,
    createElementVNode("div", _hoisted_3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.defaultColors, (color, index) => {
        return (openBlock(), createElementBlock("span", {
          key: index,
          class: "vc-twitter-swatch",
          style: normalizeStyle({
          background: color,
          boxShadow: `0 0 4px ${$options.equal(color) ? color : 'transparent'}`,
        }),
          role: "button",
          tabindex: "0",
          onKeyup: withKeys($event => ($options.handlerClick(color)), ["enter"]),
          onClick: $event => ($options.handlerClick(color))
        }, null, 44 /* STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_4))
      }), 128 /* KEYED_FRAGMENT */)),
      _hoisted_5,
      createVNode(_component_EditableInput, {
        label: "#",
        value: $options.hex,
        onChange: $options.inputChange
      }, null, 8 /* PROPS */, ["value", "onChange"]),
      _hoisted_6
    ])
  ], 6 /* CLASS, STYLE */))
}

var css_248z = ".vc-twitter{background:#fff;border:0 solid rgba(0,0,0,.25);border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,.25);position:relative}.vc-twitter-triangle{border-color:transparent transparent #fff}.vc-twitter-triangle,.vc-twitter-triangle-shadow{border-style:solid;border-width:0 9px 10px;height:0;position:absolute;width:0}.vc-twitter-triangle-shadow{border-color:transparent transparent rgba(0,0,0,.1)}.vc-twitter-body{padding:15px 9px 9px 15px}.vc-twitter .vc-editable-input{position:relative}.vc-twitter .vc-editable-input input{border:0;border-radius:0 4px 4px 0;box-shadow:inset 0 0 0 1px #f0f0f0;box-sizing:content-box;color:#666;float:left;font-size:14px;height:28px;outline:none;padding:1px 1px 1px 8px;width:100px}.vc-twitter .vc-editable-input span{display:none}.vc-twitter-hash{align-items:center;background:#f0f0f0;border-radius:4px 0 0 4px;color:#98a1a4;display:flex;float:left;height:30px;justify-content:center;width:30px}.vc-twitter-swatch{border-radius:4px;cursor:pointer;float:left;height:30px;margin:0 6px 6px 0;position:relative;width:30px}.vc-twitter-clear{clear:both}.vc-twitter-hide-triangle .vc-twitter-triangle,.vc-twitter-hide-triangle .vc-twitter-triangle-shadow{display:none}.vc-twitter-top-left-triangle .vc-twitter-triangle{left:12px;top:-10px}.vc-twitter-top-left-triangle .vc-twitter-triangle-shadow{left:12px;top:-11px}.vc-twitter-top-right-triangle .vc-twitter-triangle{right:12px;top:-10px}.vc-twitter-top-right-triangle .vc-twitter-triangle-shadow{right:12px;top:-11px}";
styleInject(css_248z);

script.render = render;
script.__file = "src/components/twitter/twitter.vue";

script.install = install;

export { script as default };
