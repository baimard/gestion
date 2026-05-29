import { Axis } from './ViewPort';
import { Document, Element, PathElement } from './Document';
export declare class Property<T = unknown> {
    private readonly document;
    private readonly name;
    private value;
    static empty(document: Document): Property<string>;
    static readonly textBaselineMapping: Record<string, string>;
    private isNormalizedColor;
    constructor(document: Document, name: string, value: T);
    split(separator?: string): Property<string>[];
    hasValue(zeroIsValue?: boolean): boolean;
    isString(regexp?: RegExp): boolean;
    isUrlDefinition(): boolean;
    isPixels(): boolean;
    setValue(value: T): this;
    getValue(def?: T): T;
    getNumber(def?: T): number;
    getString(def?: T): string;
    getColor(def?: T): string;
    getDpi(): number;
    getRem(): number;
    getEm(): number;
    getUnits(): string;
    getPixels(axis?: Axis, processPercent?: boolean): number;
    getPixels(isFontSize?: boolean): number;
    getMilliseconds(): number;
    getRadians(): number;
    getDefinition<T extends Element>(): T;
    getFillStyleDefinition(element: Element | PathElement, opacity: Property): string | CanvasGradient | CanvasPattern;
    getTextBaseline(): string;
    addOpacity(opacity: Property): Property<string>;
}
//# sourceMappingURL=Property.d.ts.map