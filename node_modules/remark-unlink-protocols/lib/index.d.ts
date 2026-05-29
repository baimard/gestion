/**
 * Only keep links with the given protocols.
 *
 * @param {object} options Options
 * @param {string[]} options.except - Protocols to exclude. Defauls to `['http', 'https']`.
 * @returns
 *   Transform.
 */
export default function remarkUnlinkProtocols(options?: {
    except: string[];
}): (tree: Root) => undefined;
export type PhrasingContent = import("mdast").PhrasingContent;
export type Root = import("mdast").Root;
