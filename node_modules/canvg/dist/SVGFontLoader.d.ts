import { Document } from './Document';
export declare class SVGFontLoader {
    private readonly document;
    loaded: boolean;
    constructor(document: Document);
    load(fontFamily: string, url: string): Promise<void>;
}
//# sourceMappingURL=SVGFontLoader.d.ts.map