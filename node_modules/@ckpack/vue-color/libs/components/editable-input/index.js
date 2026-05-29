import { openBlock, createElementBlock, withDirectives, createElementVNode, vModelText, toDisplayString } from 'vue';
import { s as styleInject } from '../../style-inject.es-746bb8ed.js';
import { install } from '../../utils/compoent.js';
import '../../defaultConfig.js';

var script = {
  name: 'EditableInput',
  props: {
    label: String,
    labelText: String,
    desc: String,
    value: [String, Number],
    max: Number,
    min: Number,
    arrowOffset: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(v) {
        // TODO: min
        if (!(this.max === undefined) && +v > this.max)
          this.$refs.input.value = this.max;
        else
          return v;
      },
    },
    labelId() {
      return `input__label__${this.label}__${Math.random().toString().slice(2, 5)}`;
    },
    labelSpanText() {
      return this.labelText || this.label;
    },
  },
  methods: {
    update(e) {
      this.handleChange(e.target.value);
    },
    handleChange(newVal) {
      const data = {};
      data[this.label] = newVal;
      if (data.hex === undefined && data['#'] === undefined)
        this.$emit('change', data);
      else if (newVal.length > 5)
        this.$emit('change', data);
    },
    // **** unused
    // handleBlur (e) {
    //   console.log(e)
    // },
    handleKeyDown(e) {
      let { val } = this;
      const number = Number(val);

      if (number) {
        const amount = this.arrowOffset || 1;

        // Up
        if (e.keyCode === 38) {
          val = number + amount;
          this.handleChange(val);
          e.preventDefault();
        }

        // Down
        if (e.keyCode === 40) {
          val = number - amount;
          this.handleChange(val);
          e.preventDefault();
        }
      }
    },
    // **** unused
    // handleDrag (e) {
    //   console.log(e)
    // },
    // handleMouseDown (e) {
    //   console.log(e)
    // }
  },
};

const _hoisted_1 = { class: "vc-editable-input" };
const _hoisted_2 = ["aria-labelledby"];
const _hoisted_3 = ["id", "for"];
const _hoisted_4 = { class: "vc-input__desc" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    withDirectives(createElementVNode("input", {
      ref: "input",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($options.val) = $event)),
      "aria-labelledby": $options.labelId,
      class: "vc-input__input",
      onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.handleKeyDown && $options.handleKeyDown(...args))),
      onInput: _cache[2] || (_cache[2] = (...args) => ($options.update && $options.update(...args)))
    }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2), [
      [vModelText, $options.val]
    ]),
    createElementVNode("span", {
      id: $options.labelId,
      for: $props.label,
      class: "vc-input__label"
    }, toDisplayString($options.labelSpanText), 9 /* TEXT, PROPS */, _hoisted_3),
    createElementVNode("span", _hoisted_4, toDisplayString($props.desc), 1 /* TEXT */)
  ]))
}

var css_248z = ".vc-editable-input{position:relative}.vc-input__input{border:0;outline:none;padding:0}.vc-input__label{text-transform:capitalize}";
styleInject(css_248z);

script.render = render;
script.__file = "src/components/editable-input/editable-input.vue";

script.install = install;

export { script as default };
