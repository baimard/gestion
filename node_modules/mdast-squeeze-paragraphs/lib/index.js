/**
 * @typedef {import('mdast').Nodes} Nodes
 */

import {visit} from 'unist-util-visit'

/**
 * Remove empty paragraphs in `tree`.
 *
 * @param {Nodes} tree
 *   Tree to change.
 * @returns {undefined}
 *   Nothing.
 */
export function squeezeParagraphs(tree) {
  visit(tree, function (node, index, parent) {
    if (
      index !== undefined &&
      parent &&
      node.type === 'paragraph' &&
      node.children.every(function (child) {
        return child.type === 'text' && /^\s*$/.test(child.value)
      })
    ) {
      parent.children.splice(index, 1)
      return index
    }
  })
}
