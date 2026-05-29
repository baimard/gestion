import colorMixin from '../../mixin/color.js';
import { openBlock, createElementBlock, createElementVNode, Fragment, renderList, normalizeClass, normalizeStyle, withDirectives, vShow } from 'vue';
import { s as styleInject } from '../../style-inject.es-746bb8ed.js';
import { install } from '../../utils/compoent.js';
import '@ctrl/tinycolor';
import '../../defaultConfig.js';

const defaultColors = [
  '#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#B3B3B3',
  '#A6A6A6', '#999999', '#8C8C8C', '#808080', '#737373', '#666666', '#595959',
  '#4D4D4D', '#404040', '#333333', '#262626', '#0D0D0D', '#000000',
];

var script = {
  name: 'Grayscale',
  components: {

  },
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
  "aria-label": "Grayscale color picker",
  class: "vc-grayscale"
};
const _hoisted_2 = {
  class: "vc-grayscale-colors",
  role: "listbox"
};
const _hoisted_3 = ["aria-label", "aria-selected", "onClick"];
const _hoisted_4 = { class: "vc-grayscale-dot" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("ul", _hoisted_2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.paletteUpperCase($props.palette), (c) => {
        return (openBlock(), createElementBlock("li", {
          key: c,
          role: "option",
          "aria-label": `Color:${c}`,
          "aria-selected": c === $options.pick,
          class: normalizeClass(["vc-grayscale-color-item", { 'vc-grayscale-color-item--white': c === '#FFFFFF' }]),
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

var css_248z = ".vc-grayscale{background-color:#fff;border-radius:2px;box-shadow:0 2px 15px rgba(0,0,0,.12),0 2px 10px rgba(0,0,0,.16);width:125px}.vc-grayscale-colors{border-radius:2px;margin:0;overflow:hidden;padding:0}.vc-grayscale-color-item{cursor:pointer;float:left;height:25px;list-style:none;position:relative;width:25px}.vc-grayscale-color-item--white .vc-grayscale-dot{background:#000}.vc-grayscale-dot{background:#fff;border-radius:50%;height:6px;left:50%;margin:-3px 0 0 -2px;opacity:1;position:absolute;top:50%;width:6px}";
styleInject(css_248z);

script.render = render;
script.__file = "src/components/grayscale/grayscale.vue";

script.install = install;

export { script as default };
