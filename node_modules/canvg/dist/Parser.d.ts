import { Fetch } from './types';
type DOMParserConstructor = typeof DOMParser;
export interface IParserOptions {
    /**
     * WHATWG-compatible `fetch` function.
     */
    fetch?: Fetch;
    /**
     * XML/HTML parser from string into DOM Document.
     */
    DOMParser?: DOMParserConstructor;
}
export declare class Parser {
    private readonly fetch;
    private readonly DOMParser;
    constructor({ fetch, DOMParser }?: IParserOptions);
    parse(resource: string): Promise<Document>;
    parseFromString(xml: string): Document;
    private checkDocument;
    load(url: string): Promise<Document>;
}
export {};
//# sourceMappingURL=Parser.d.ts.map