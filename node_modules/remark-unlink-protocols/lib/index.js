/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: MIT
 */

/**
 * @typedef {import('mdast').PhrasingContent} PhrasingContent
 * @typedef {import('mdast').Root} Root
 */

import {squeezeParagraphs} from 'mdast-squeeze-paragraphs'
import {visit} from 'unist-util-visit'

/**
 * Only keep links with the given protocols.
 *
 * @param {object} options Options
 * @param {string[]} options.except - Protocols to exclude. Defauls to `['http', 'https']`.
 * @returns
 *   Transform.
 */
export default function remarkUnlinkProtocols(
  options = {except: ['http', 'https']}
) {
  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    /** @type {Map<string, string>} */
    const definitions = new Map()

    // Find definitions to look up linkReferences.
    visit(tree, 'definition', function (node, index, parent) {
      definitions.set(node.identifier, node.url)
      if (parent && typeof index === 'number') {
        const url = node.url
        if (
          url &&
          url.includes(':') &&
          !options.except.some((proto) => url.startsWith(`${proto}:`))
        ) {
          parent.children.splice(index, 1)
          return index
        }
      }
    })

    visit(tree, function (node, index, parent) {
      if (
        parent &&
        typeof index === 'number' &&
        (node.type === 'link' || node.type === 'linkReference')
      ) {
        const url =
          node.type === 'link' ? node.url : definitions.get(node.identifier)
        if (
          url &&
          url.includes(':') &&
          !options.except.some((proto) => url.startsWith(`${proto}:`))
        ) {
          parent.children.splice(index, 1, ...node.children)
          return index
        }
      }
    })

    squeezeParagraphs(tree)
  }
}
