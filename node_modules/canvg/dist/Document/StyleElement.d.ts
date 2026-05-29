import { parseExternalUrl } from '../util';
import { Document } from './Document';
import { Element } from './Element';
export declare class StyleElement extends Element {
    static readonly parseExternalUrl: typeof parseExternalUrl;
    type: string;
    constructor(document: Document, node: HTMLElement, captureTextNodes?: boolean);
}
//# sourceMappingURL=StyleElement.d.ts.map