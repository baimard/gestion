import { Property } from '../Property';
import { Document } from './Document';
import { Element } from './Element';
export interface IProgress {
    from: Property;
    to: Property;
    progress: number;
}
export declare class AnimateElement extends Element {
    type: string;
    protected readonly begin: number;
    protected readonly maxDuration: number;
    protected readonly from: Property;
    protected readonly to: Property;
    protected readonly values: Property<string[]>;
    protected duration: number;
    protected initialValue: string | undefined;
    protected initialUnits: string;
    protected removed: boolean;
    protected frozen: boolean;
    constructor(document: Document, node: HTMLElement, captureTextNodes?: boolean);
    protected getProperty(): Property<unknown>;
    calcValue(): string;
    update(delta: number): boolean;
    getProgress(): IProgress;
}
//# sourceMappingURL=AnimateElement.d.ts.map