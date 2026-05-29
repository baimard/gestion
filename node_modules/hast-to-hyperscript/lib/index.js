/**
 * @typedef {import('property-information').Schema} Schema
 * @typedef {import('hast').Content} Content
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Root} Root
 */

/**
 * @typedef {Root | Content} Node
 *
 * @callback CreateElementLike
 *   Function that works somewhat like `React.createElement`.
 * @param {string} name
 *   Element name.
 * @param {any} attributes
 *   Properties.
 * @param {Array<any>} [children]
 *   Children.
 * @returns {any}
 *   Something.
 *
 * @typedef State
 *   Info passed around.
 * @property {Schema} schema
 *   Current schema.
 * @property {string | undefined} prefix
 *   Prefix to use.
 * @property {number} key
 *   Current key.
 * @property {boolean} react
 *   Looks like React.
 * @property {boolean} vue
 *   Looks like Vue.
 * @property {boolean} vdom
 *   Looks like vdom.
 * @property {boolean} hyperscript
 *   Looks like `hyperscript`.
 *
 * @typedef Options
 *   Configuration.
 * @property {string | null | undefined} [prefix]
 *   Prefix to use as a prefix for keys passed in `props` to `h()`, this
 *   behavior is turned off by passing `false` and turned on by passing a
 *   `string`.
 *   By default, `h-` is used as a prefix if the given `h` is detected as being
 *   `virtual-dom/h` or `React.createElement`
 * @property {'html' | 'svg' | null | undefined} [space]
 *   Whether `node` is in the `'html'` or `'svg'` space.
 *   If an `<svg>` element is found when inside the HTML space, `toH`
 *   automatically switches to the SVG space when entering the element, and
 *   switches back when exiting.
 */

import {html, svg, find, hastToReact} from 'property-information'
import {stringify as spaces} from 'space-separated-tokens'
import {stringify as commas} from 'comma-separated-tokens'
import styleToObject from 'style-to-object'
import {webNamespaces} from 'web-namespaces'

const own = {}.hasOwnProperty

/**
 * @template {CreateElementLike} H
 *   Type of hyperscript function.
 * @param {H} h
 *   HyperScript function.
 * @param {Node} tree
 *   Tree to transform.
 * @param {string | boolean | Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {ReturnType<H>}
 *   Return type of the hyperscript function.
 */
// eslint-disable-next-line complexity
export function toH(h, tree, options) {
  if (typeof h !== 'function') {
    throw new TypeError('h is not a function')
  }

  const r = react(h)
  const v = vue(h)
  const vd = vdom(h)
  /** @type {string|boolean|null|undefined} */
  let prefix
  /** @type {Element} */
  let node

  if (typeof options === 'string' || typeof options === 'boolean') {
    prefix = options
    options = {}
  } else {
    if (!options) options = {}
    prefix = options.prefix
  }

  if (tree && tree.type === 'root') {
    const head = tree.children[0]
    // @ts-expect-error Allow `doctypes` in there, we’ll filter them out later.
    node =
      tree.children.length === 1 && head.type === 'element'
        ? head
        : {
            type: 'element',
            tagName: 'div',
            properties: {},
            children: tree.children
          }
  } else if (tree && tree.type === 'element') {
    node = tree
  } else {
    throw new Error(
      'Expected root or element, not `' + ((tree && tree.type) || tree) + '`'
    )
  }

  return transform(h, node, {
    schema: options.space === 'svg' ? svg : html,
    prefix:
      prefix === undefined || prefix === null
        ? r || v || vd
          ? 'h-'
          : undefined
        : typeof prefix === 'string'
        ? prefix
        : prefix
        ? 'h-'
        : undefined,
    key: 0,
    react: r,
    vue: v,
    vdom: vd,
    hyperscript: hyperscript(h)
  })
}

/**
 * Transform a hast node through a hyperscript interface to *anything*!
 *
 * @template {CreateElementLike} H
 *   Type of hyperscript function.
 * @param {H} h
 *   HyperScript function.
 * @param {Element} node
 *   Node to transform.
 * @param {State} state
 *   Info passed around.
 * @returns {ReturnType<H>}
 *   Return type of the hyperscript function.
 */
function transform(h, node, state) {
  const parentSchema = state.schema
  let schema = parentSchema
  let name = node.tagName
  /** @type {Record<string, unknown>} */
  const attributes = {}
  /** @type {Array<ReturnType<H>|string>} */
  const nodes = []
  let index = -1
  /** @type {string} */
  let key

  if (parentSchema.space === 'html' && name.toLowerCase() === 'svg') {
    schema = svg
    state.schema = schema
  }

  for (key in node.properties) {
    if (node.properties && own.call(node.properties, key)) {
      addAttribute(attributes, key, node.properties[key], state, name)
    }
  }

  if (state.vdom) {
    if (schema.space === 'html') {
      name = name.toUpperCase()
    } else if (schema.space) {
      attributes.namespace = webNamespaces[schema.space]
    }
  }

  if (state.prefix) {
    state.key++
    attributes.key = state.prefix + state.key
  }

  if (node.children) {
    while (++index < node.children.length) {
      const value = node.children[index]

      if (value.type === 'element') {
        nodes.push(transform(h, value, state))
      } else if (value.type === 'text') {
        nodes.push(value.value)
      }
    }
  }

  // Restore parent schema.
  state.schema = parentSchema

  // Ensure no React warnings are triggered for void elements having children
  // passed in.
  return nodes.length > 0
    ? h.call(node, name, attributes, nodes)
    : h.call(node, name, attributes)
}

/**
 * Add an attribute to `props`.
 *
 * @param {Record<string, unknown>} props
 *   Map.
 * @param {string} prop
 *   Key.
 * @param {unknown} value
 *   Value.
 * @param {State} state
 *   Info passed around.
 * @param {string} name
 *   Element name.
 * @returns {void}
 *   Nothing.
 */
// eslint-disable-next-line complexity, max-params
function addAttribute(props, prop, value, state, name) {
  const info = find(state.schema, prop)
  /** @type {string | undefined} */
  let subprop

  // Ignore nullish and `NaN` values.
  // Ignore `false` and falsey known booleans for hyperlike DSLs.
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'number' && Number.isNaN(value)) ||
    (value === false && (state.vue || state.vdom || state.hyperscript)) ||
    (!value && info.boolean && (state.vue || state.vdom || state.hyperscript))
  ) {
    return
  }

  if (Array.isArray(value)) {
    // Accept `array`.
    // Most props are space-separated.
    value = info.commaSeparated ? commas(value) : spaces(value)
  }

  // Treat `true` and truthy known booleans.
  if (info.boolean && state.hyperscript) {
    value = ''
  }

  // VDOM, Vue, and React accept `style` as object.
  if (
    info.property === 'style' &&
    typeof value === 'string' &&
    (state.react || state.vue || state.vdom)
  ) {
    value = parseStyle(value, name)
  }

  // Vue 3 (used in our tests) doesn’t need this anymore.
  // Some major in the future we can drop Vue 2 support.
  /* c8 ignore next 2 */
  if (state.vue) {
    if (info.property !== 'style') subprop = 'attrs'
  } else if (!info.mustUseProperty) {
    if (state.vdom) {
      if (info.property !== 'style') subprop = 'attributes'
    } else if (state.hyperscript) {
      subprop = 'attrs'
    }
  }

  if (subprop) {
    props[subprop] = Object.assign(props[subprop] || {}, {
      [info.attribute]: value
    })
  } else if (info.space && state.react) {
    props[hastToReact[info.property] || info.property] = value
  } else {
    props[info.attribute] = value
  }
}

/**
 * Check if `h` is `react.createElement`.
 *
 * @param {CreateElementLike} h
 *   HyperScript function.
 * @returns {boolean}
 *   Looks like React.
 */
function react(h) {
  const node = /** @type {unknown} */ (h('div', {}))
  return Boolean(
    node &&
      // @ts-expect-error Looks like a React node.
      ('_owner' in node || '_store' in node) &&
      // @ts-expect-error Looks like a React node.
      (node.key === undefined || node.key === null)
  )
}

/**
 * Check if `h` is `hyperscript`.
 *
 * @param {CreateElementLike} h
 *   HyperScript function.
 * @returns {boolean}
 *   Looks like `hyperscript`.
 */
function hyperscript(h) {
  return 'context' in h && 'cleanup' in h
}

/**
 * Check if `h` is `virtual-dom/h`.
 *
 * @param {CreateElementLike} h
 *   HyperScript function.
 * @returns {boolean}
 *   Looks like `virtual-dom`
 */
function vdom(h) {
  const node = /** @type {unknown} */ (h('div', {}))
  // @ts-expect-error Looks like a vnode.
  return node.type === 'VirtualNode'
}

/**
 * Check if `h` is Vue.
 *
 * @param {CreateElementLike} h
 *   HyperScript function.
 * @returns {boolean}
 *   Looks like Vue.
 */
function vue(h) {
  // Vue 3 (used in our tests) doesn’t need this anymore.
  // Some major in the future we can drop Vue 2 support.
  /* c8 ignore next 3 */
  const node = /** @type {unknown} */ (h('div', {}))
  // @ts-expect-error Looks like a Vue node.
  return Boolean(node && node.context && node.context._isVue)
}

/**
 * Parse a declaration into an object.
 *
 * @param {string} value
 *   CSS declarations.
 * @param {string} tagName
 *   Tag name.
 * @returns {Record<string, string>}
 *   Properties.
 */
function parseStyle(value, tagName) {
  /** @type {Record<string, string>} */
  const result = {}

  try {
    styleToObject(value, (name, value) => {
      if (name.slice(0, 4) === '-ms-') name = 'ms-' + name.slice(4)

      result[
        name.replace(
          /-([a-z])/g,
          /**
           * @param {string} _
           * @param {string} $1
           * @returns {string}
           */
          (_, $1) => $1.toUpperCase()
        )
      ] = value
    })
  } catch (error_) {
    const error = /** @type {Error} */ (error_)
    error.message =
      tagName + '[style]' + error.message.slice('undefined'.length)
    throw error
  }

  return result
}
