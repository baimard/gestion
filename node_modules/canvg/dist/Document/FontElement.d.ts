import { Document } from './Document';
import { Element } from './Element';
import { FontFaceElement } from './FontFaceElement';
import { MissingGlyphElement } from './MissingGlyphElement';
import { ArabicForm, GlyphElement } from './GlyphElement';
export declare class FontElement extends Element {
    type: string;
    readonly isArabic: boolean;
    readonly missingGlyph: MissingGlyphElement | undefined;
    readonly glyphs: Map<string, GlyphElement>;
    readonly arabicGlyphs: Map<string, Map<ArabicForm, GlyphElement>>;
    readonly horizAdvX: number;
    readonly isRTL: boolean;
    readonly fontFace: FontFaceElement | undefined;
    constructor(document: Document, node: HTMLElement, captureTextNodes?: boolean);
    render(): void;
}
//# sourceMappingURL=FontElement.d.ts.map