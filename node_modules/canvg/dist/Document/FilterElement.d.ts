import { RenderingContext2D } from '../types';
import { Element } from './Element';
import { PathElement } from './PathElement';
export declare class FilterElement extends Element {
    static ignoreStyles: string[];
    type: string;
    apply(ctx: RenderingContext2D, element: Element | PathElement): void;
    render(_: RenderingContext2D): void;
}
//# sourceMappingURL=FilterElement.d.ts.map