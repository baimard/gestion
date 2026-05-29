import { Document } from '../Document';
import { Property } from '../Property';
import { Matrix } from './Matrix';
export declare class Skew extends Matrix {
    type: string;
    protected readonly angle: Property;
    constructor(document: Document, skew: string, transformOrigin: readonly [Property<string>, Property<string>]);
}
//# sourceMappingURL=Skew.d.ts.map