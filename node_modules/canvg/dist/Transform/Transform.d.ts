import { RenderingContext2D } from '../types';
import { Property } from '../Property';
import { Point } from '../Point';
import { Document, Element } from '../Document';
import { ITransform } from './types';
interface ITransformConstructor {
    prototype: ITransform;
    new (document: Document, value: string, transformOrigin: readonly [Property<string>, Property<string>]): ITransform;
}
export declare class Transform {
    private readonly document;
    static fromElement(document: Document, element: Element): Transform;
    static transformTypes: Record<string, ITransformConstructor>;
    private readonly transforms;
    constructor(document: Document, transform: string, transformOrigin: readonly [Property<string>, Property<string>]);
    apply(ctx: RenderingContext2D): void;
    unapply(ctx: RenderingContext2D): void;
    applyToPoint(point: Point): void;
}
export {};
//# sourceMappingURL=Transform.d.ts.map