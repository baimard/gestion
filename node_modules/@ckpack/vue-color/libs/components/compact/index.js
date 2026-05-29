import colorMixin from '../../mixin/color.js';
import { openBlock, createElementBlock, createElementVNode, Fragment, renderList, normalizeClass, normalizeStyle, withDirectives, vShow } from 'vue';
import { s as styleInject } from '../../style-inject.es-746bb8ed.js';
import { install } from '../../utils/compoent.js';
import '@ctrl/tinycolor';
import '../../defaultConfig.js';

const defaultColors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
  '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
  '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400',
  '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
  '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
  '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E',
];

var script = {
  name: 'Compact',
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
      return this.colors.hex.toUpperCase();
    },
  },
  methods: {
    handlerClick(c) {
      this.colorChange({
        hex: c,
        source: 'hex',
      });
    },
  },
};

const _hoisted_1 = {
  role: "application",
  "aria-label": "Compact color picker",
  class: "vc-compact"
};
const _hoisted_2 = {
  class: "vc-compact-colors",
  role: "listbox"
};
const _hoisted_3 = ["aria-label", "aria-selected", "onClick"];
const _hoisted_4 = { class: "vc-compact-dot" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("ul", _hoisted_2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.paletteUpperCase($props.palette), (c) => {
        return (openBlock(), createElementBlock("li", {
          key: c,
          role: "option",
          "aria-label": `color:${c}`,
          "aria-selected": c === $options.pick,
          class: normalizeClass(["vc-compact-color-item", { 'vc-compact-color-item--white': c === '#FFFFFF' }]),
          style: normalizeStyle({ background: c }),
          onClick: $event => ($options.handlerClick(c))
        }, [
          withDirectives(createElementVNode("div", _hoisted_4, null, 512 /* NEED_PATCH */), [
            [vShow, c === $options.pick]
          ])
        ], 14 /* CLASS, STYLE, PROPS */, _hoisted_3))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

var css_248z = ".vc-compact{background-color:#fff;border-radius:2px;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);box-sizing:border-box;padding-left:5px;padding-top:5px;width:245px}.vc-compact-colors{margin:0;overflow:hidden;padding:0}.vc-compact-color-item{cursor:pointer;float:left;height:15px;list-style:none;margin-bottom:5px;margin-right:5px;position:relative;width:15px}.vc-compact-color-item--white{box-shadow:inset 0 0 0 1px #ddd}.vc-compact-color-item--white .vc-compact-dot{background:#000}.vc-compact-dot{background:#fff;border-radius:50%;bottom:5px;left:5px;opacity:1;position:absolute;right:5px;top:5px}";
styleInject(css_248z);

script.render = render;
script.__file = "src/components/compact/compact.vue";

script.install = install;

export { script as default };
