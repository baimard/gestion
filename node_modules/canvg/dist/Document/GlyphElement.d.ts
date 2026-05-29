import { Document } from './Document';
import { PathElement } from './PathElement';
export type ArabicForm = 'isolated' | 'terminal' | 'medial' | 'initial';
export declare class GlyphElement extends PathElement {
    type: string;
    readonly horizAdvX: number;
    readonly unicode: string;
    readonly arabicForm: ArabicForm | undefined;
    constructor(document: Document, node: HTMLElement, captureTextNodes?: boolean);
}
//# sourceMappingURL=GlyphElement.d.ts.map