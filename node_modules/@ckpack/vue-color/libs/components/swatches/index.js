import material from 'material-colors';
import colorMixin from '../../mixin/color.js';
import { openBlock, createElementBlock, createElementVNode, Fragment, renderList, normalizeClass, normalizeStyle, withKeys, withDirectives, vShow } from 'vue';
import { s as styleInject } from '../../style-inject.es-746bb8ed.js';
import { install } from '../../utils/compoent.js';
import '@ctrl/tinycolor';
import '../../defaultConfig.js';

const colorMap = [
  'red', 'pink', 'purple', 'deepPurple',
  'indigo', 'blue', 'lightBlue', 'cyan',
  'teal', 'green', 'lightGreen', 'lime',
  'yellow', 'amber', 'orange', 'deepOrange',
  'brown', 'blueGrey', 'black',
];
const colorLevel = ['900', '700', '500', '300', '100'];
const defaultColors = (() => {
  const colors = [];
  colorMap.forEach((type) => {
    let typeColor = [];
    if (type.toLowerCase() === 'black' || type.toLowerCase() === 'white') {
      typeColor = typeColor.concat(['#000000', '#FFFFFF']);
    }
    else {
      colorLevel.forEach((level) => {
        const color = material[type][level];
        typeColor.push(color.toUpperCase());
      });
    }
    colors.push(typeColor);
  });
  return colors;
})();

var script = {
  name: 'Swatches',
  mixins: [colorMixin],
  props: {
    palette: {
      type: Array,
      default() {
        return defaultColors;
      },
    },
  },
  computed: {
    pick() {
      return this.colors.hex;
    },
  },
  methods: {
    equal(color) {
      return color.toLowerCase() === this.colors.hex.toLowerCase();
    },
    handlerClick(c) {
      this.colorChange({
        hex: c,
        source: 'hex',
      });
    },
  },

};

const _hoisted_1 = ["data-pick"];
const _hoisted_2 = {
  class: "vc-swatches-box",
  role: "listbox"
};
const _hoisted_3 = ["aria-label", "aria-selected", "data-color", "onKeyup", "onClick"];
const _hoisted_4 = { class: "vc-swatches-pick" };
const _hoisted_5 = {
  style: {"width":"24px","height":"24px"},
  viewBox: "0 0 24 24"
};
const _hoisted_6 = /*#__PURE__*/createElementVNode("path", { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" }, null, -1 /* HOISTED */);
const _hoisted_7 = [
  _hoisted_6
];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    role: "application",
    "aria-label": "Swatches color picker",
    class: "vc-swatches",
    "data-pick": $options.pick
  }, [
    createElementVNode("div", _hoisted_2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.palette, (group, $idx) => {
        return (openBlock(), createElementBlock("div", {
          key: $idx,
          class: "vc-swatches-color-group"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(group, (c) => {
            return (openBlock(), createElementBlock("div", {
              key: c,
              class: normalizeClass(["vc-swatches-color-it", [{ 'vc-swatches-color--white': c === '#FFFFFF' }]]),
              role: "option",
              "aria-label": `Color:${c}`,
              "aria-selected": $options.equal(c),
              "data-color": c,
              style: normalizeStyle({ background: c }),
              tabindex: "0",
              onKeyup: withKeys($event => ($options.handlerClick(c)), ["enter"]),
              onClick: $event => ($options.handlerClick(c))
            }, [
              withDirectives(createElementVNode("div", _hoisted_4, [
                (openBlock(), createElementBlock("svg", _hoisted_5, _hoisted_7))
              ], 512 /* NEED_PATCH */), [
                [vShow, $options.equal(c)]
              ])
            ], 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_3))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ], 8 /* PROPS */, _hoisted_1))
}

var css_248z = ".vc-swatches{background-color:#fff;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);height:240px;overflow-y:scroll;width:320px}.vc-swatches-box{overflow:hidden;padding:16px 0 6px 16px}.vc-swatches-color-group{float:left;margin-right:10px;padding-bottom:10px;width:40px}.vc-swatches-color-it{background:#880e4f;-ms-border-radius:2px 2px 0 0;-moz-border-radius:2px 2px 0 0;-o-border-radius:2px 2px 0 0;-webkit-border-radius:2px 2px 0 0;border-radius:2px 2px 0 0;box-sizing:border-box;cursor:pointer;height:24px;margin-bottom:1px;overflow:hidden;width:40px}.vc-swatches-color--white{border:1px solid #ddd}.vc-swatches-pick{fill:#fff;display:block;margin-left:8px}.vc-swatches-color--white .vc-swatches-pick{fill:#333}";
styleInject(css_248z);

script.render = render;
script.__file = "src/components/swatches/swatches.vue";

script.install = install;

export { script as default };
