import colorMixin from '../../mixin/color.js';
import script$3 from '../editable-input/index.js';
import script$1 from '../saturation/index.js';
import script$2 from '../hue/index.js';
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, toDisplayString, createVNode, withCtx, normalizeStyle, createCommentVNode } from 'vue';
import { s as styleInject } from '../../style-inject.es-746bb8ed.js';
import { install } from '../../utils/compoent.js';
import '@ctrl/tinycolor';
import '../../defaultConfig.js';
import '../../utils/utils.js';

var script = {
  name: 'Photoshop',
  components: {
    Saturation: script$1,
    Hue: script$2,
    EdIn: script$3,
  },
  mixins: [colorMixin],
  props: {
    head: {
      type: String,
      default: 'Color Picker',
    },
    disableFields: {
      type: Boolean,
      default: false,
    },
    hasResetButton: {
      type: Boolean,
      default: false,
    },
    acceptLabel: {
      type: String,
      default: 'OK',
    },
    cancelLabel: {
      type: String,
      default: 'Cancel',
    },
    resetLabel: {
      type: String,
      default: 'Reset',
    },
    newLabel: {
      type: String,
      default: 'new',
    },
    currentLabel: {
      type: String,
      default: 'current',
    },
  },
  data() {
    return {
      currentColor: '#FFF',
    };
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
  created() {
    this.currentColor = this.colors.hex;
  },
  methods: {
    childChange(data) {
      this.colorChange(data);
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
    clickCurrentColor() {
      this.colorChange({
        hex: this.currentColor,
        source: 'hex',
      });
    },
    handleAccept() {
      this.$emit('ok');
    },
    handleCancel() {
      this.$emit('cancel');
    },
    handleReset() {
      this.$emit('reset');
    },
  },

};

const _hoisted_1 = {
  role: "heading",
  class: "vc-ps-head"
};
const _hoisted_2 = { class: "vc-ps-body" };
const _hoisted_3 = { class: "vc-ps-saturation-wrap" };
const _hoisted_4 = { class: "vc-ps-hue-wrap" };
const _hoisted_5 = /*#__PURE__*/createElementVNode("div", { class: "vc-ps-hue-pointer" }, [
  /*#__PURE__*/createElementVNode("i", { class: "vc-ps-hue-pointer--left" }),
  /*#__PURE__*/createElementVNode("i", { class: "vc-ps-hue-pointer--right" })
], -1 /* HOISTED */);
const _hoisted_6 = { class: "vc-ps-previews" };
const _hoisted_7 = { class: "vc-ps-previews__label" };
const _hoisted_8 = { class: "vc-ps-previews__swatches" };
const _hoisted_9 = ["aria-label"];
const _hoisted_10 = ["aria-label"];
const _hoisted_11 = { class: "vc-ps-previews__label" };
const _hoisted_12 = {
  key: 0,
  class: "vc-ps-actions"
};
const _hoisted_13 = ["aria-label"];
const _hoisted_14 = ["aria-label"];
const _hoisted_15 = { class: "vc-ps-fields" };
const _hoisted_16 = /*#__PURE__*/createElementVNode("div", { class: "vc-ps-fields__divider" }, null, -1 /* HOISTED */);
const _hoisted_17 = /*#__PURE__*/createElementVNode("div", { class: "vc-ps-fields__divider" }, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Saturation = resolveComponent("Saturation");
  const _component_Hue = resolveComponent("Hue");
  const _component_EdIn = resolveComponent("EdIn");

  return (openBlock(), createElementBlock("div", {
    role: "application",
    "aria-label": "PhotoShop color picker",
    class: normalizeClass(["vc-photoshop", [$props.disableFields ? 'vc-photoshop__disable-fields' : '']])
  }, [
    createElementVNode("div", _hoisted_1, toDisplayString($props.head), 1 /* TEXT */),
    createElementVNode("div", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        createVNode(_component_Saturation, {
          value: _ctx.colors,
          onChange: $options.childChange
        }, null, 8 /* PROPS */, ["value", "onChange"])
      ]),
      createElementVNode("div", _hoisted_4, [
        createVNode(_component_Hue, {
          value: _ctx.colors,
          direction: "vertical",
          onChange: $options.childChange
        }, {
          default: withCtx(() => [
            _hoisted_5
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["value", "onChange"])
      ]),
      createElementVNode("div", {
        class: normalizeClass(["vc-ps-controls", [$props.disableFields ? 'vc-ps-controls__disable-fields' : '']])
      }, [
        createElementVNode("div", _hoisted_6, [
          createElementVNode("div", _hoisted_7, toDisplayString($props.newLabel), 1 /* TEXT */),
          createElementVNode("div", _hoisted_8, [
            createElementVNode("div", {
              class: "vc-ps-previews__pr-color",
              "aria-label": `New color is ${_ctx.colors.hex}`,
              style: normalizeStyle({ background: _ctx.colors.hex })
            }, null, 12 /* STYLE, PROPS */, _hoisted_9),
            createElementVNode("div", {
              class: "vc-ps-previews__pr-color",
              "aria-label": `Current color is ${$data.currentColor}`,
              style: normalizeStyle({ background: $data.currentColor }),
              onClick: _cache[0] || (_cache[0] = (...args) => ($options.clickCurrentColor && $options.clickCurrentColor(...args)))
            }, null, 12 /* STYLE, PROPS */, _hoisted_10)
          ]),
          createElementVNode("div", _hoisted_11, toDisplayString($props.currentLabel), 1 /* TEXT */)
        ]),
        (!$props.disableFields)
          ? (openBlock(), createElementBlock("div", _hoisted_12, [
              createElementVNode("div", {
                class: "vc-ps-ac-btn",
                role: "button",
                "aria-label": $props.acceptLabel,
                onClick: _cache[1] || (_cache[1] = (...args) => ($options.handleAccept && $options.handleAccept(...args)))
              }, toDisplayString($props.acceptLabel), 9 /* TEXT, PROPS */, _hoisted_13),
              createElementVNode("div", {
                class: "vc-ps-ac-btn",
                role: "button",
                "aria-label": $props.cancelLabel,
                onClick: _cache[2] || (_cache[2] = (...args) => ($options.handleCancel && $options.handleCancel(...args)))
              }, toDisplayString($props.cancelLabel), 9 /* TEXT, PROPS */, _hoisted_14),
              createElementVNode("div", _hoisted_15, [
                createCommentVNode(" hsla "),
                createVNode(_component_EdIn, {
                  label: "h",
                  desc: "°",
                  value: $options.hsv.h,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"]),
                createVNode(_component_EdIn, {
                  label: "s",
                  desc: "%",
                  value: $options.hsv.s,
                  max: 100,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"]),
                createVNode(_component_EdIn, {
                  label: "v",
                  desc: "%",
                  value: $options.hsv.v,
                  max: 100,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"]),
                _hoisted_16,
                createCommentVNode(" rgba "),
                createVNode(_component_EdIn, {
                  label: "r",
                  value: _ctx.colors.rgba.r,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"]),
                createVNode(_component_EdIn, {
                  label: "g",
                  value: _ctx.colors.rgba.g,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"]),
                createVNode(_component_EdIn, {
                  label: "b",
                  value: _ctx.colors.rgba.b,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"]),
                _hoisted_17,
                createCommentVNode(" hex "),
                createVNode(_component_EdIn, {
                  label: "#",
                  class: "vc-ps-fields__hex",
                  value: $options.hex,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"])
              ]),
              ($props.hasResetButton)
                ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "vc-ps-ac-btn",
                    "aria-label": "reset",
                    onClick: _cache[3] || (_cache[3] = (...args) => ($options.handleReset && $options.handleReset(...args)))
                  }, toDisplayString($props.resetLabel), 1 /* TEXT */))
                : createCommentVNode("v-if", true)
            ]))
          : createCommentVNode("v-if", true)
      ], 2 /* CLASS */)
    ])
  ], 2 /* CLASS */))
}

var css_248z = ".vc-photoshop{background:#dcdcdc;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.25),0 8px 16px rgba(0,0,0,.15);box-sizing:initial;font-family:Roboto;width:513px}.vc-photoshop__disable-fields{width:390px}.vc-ps-head{background-image:linear-gradient(-180deg,#f0f0f0,#d4d4d4);border-bottom:1px solid #b1b1b1;border-radius:4px 4px 0 0;box-shadow:inset 0 1px 0 0 hsla(0,0%,100%,.2),inset 0 -1px 0 0 rgba(0,0,0,.02);color:#4d4d4d;font-size:13px;height:23px;line-height:24px;text-align:center}.vc-ps-body{display:flex;padding:15px}.vc-ps-saturation-wrap{border:2px solid #b3b3b3;border-bottom-color:#f0f0f0;height:256px;overflow:hidden;position:relative;width:256px}.vc-ps-saturation-wrap .vc-saturation-circle{height:12px;width:12px}.vc-ps-hue-wrap{border:2px solid #b3b3b3;border-bottom-color:#f0f0f0;height:256px;margin-left:10px;width:19px}.vc-ps-hue-pointer,.vc-ps-hue-wrap{position:relative}.vc-ps-hue-pointer--left,.vc-ps-hue-pointer--right{border-color:transparent transparent transparent #555;border-style:solid;border-width:5px 0 5px 8px;height:0;position:absolute;width:0}.vc-ps-hue-pointer--left:after,.vc-ps-hue-pointer--right:after{border-color:transparent transparent transparent #fff;border-style:solid;border-width:4px 0 4px 6px;content:\"\";height:0;left:1px;position:absolute;top:1px;transform:translate(-8px,-5px);width:0}.vc-ps-hue-pointer--left{transform:translate(-13px,-4px)}.vc-ps-hue-pointer--right{transform:translate(20px,-4px) rotate(180deg)}.vc-ps-controls{display:flex;margin-left:10px;width:180px}.vc-ps-controls__disable-fields{width:auto}.vc-ps-actions{flex:1;margin-left:20px}.vc-ps-ac-btn{background-image:linear-gradient(-180deg,#fff,#e6e6e6);border:1px solid #878787;border-radius:2px;box-shadow:0 1px 0 0 #eaeaea;color:#000;cursor:pointer;font-size:14px;height:20px;line-height:20px;margin-bottom:10px;text-align:center}.vc-ps-previews{width:60px}.vc-ps-previews__swatches{border:1px solid #b3b3b3;border-bottom-color:#f0f0f0;margin-bottom:2px;margin-top:1px}.vc-ps-previews__pr-color{box-shadow:inset 1px 0 0 #000,inset -1px 0 0 #000,inset 0 1px 0 #000;height:34px}.vc-ps-previews__label{color:#000;font-size:14px;text-align:center}.vc-ps-fields{padding-bottom:9px;padding-top:5px;position:relative;width:80px}.vc-ps-fields .vc-input__input{border:1px solid #888;box-shadow:inset 0 1px 1px rgba(0,0,0,.1),0 1px 0 0 #ececec;font-size:13px;height:18px;margin-bottom:5px;margin-left:40%;margin-right:10px;padding-left:3px;width:40%}.vc-ps-fields .vc-input__desc,.vc-ps-fields .vc-input__label{font-size:13px;height:18px;line-height:22px;position:absolute;text-transform:uppercase;top:0}.vc-ps-fields .vc-input__label{left:0;width:34px}.vc-ps-fields .vc-input__desc{right:0;width:0}.vc-ps-fields__divider{height:5px}.vc-ps-fields__hex .vc-input__input{border:1px solid #888;box-shadow:inset 0 1px 1px rgba(0,0,0,.1),0 1px 0 0 #ececec;font-size:13px;height:18px;margin-bottom:6px;margin-left:20%;padding-left:3px;width:80%}.vc-ps-fields__hex .vc-input__label{font-size:13px;height:18px;left:0;line-height:22px;position:absolute;text-transform:uppercase;top:0;width:14px}";
styleInject(css_248z);

script.render = render;
script.__file = "src/components/photoshop/photoshop.vue";

script.install = install;

export { script as default };
