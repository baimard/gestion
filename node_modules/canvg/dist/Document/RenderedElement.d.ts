import { RenderingContext2D } from '../types';
import { Element } from './Element';
export declare abstract class RenderedElement extends Element {
    private modifiedEmSizeStack;
    protected calculateOpacity(): number;
    setContext(ctx: RenderingContext2D, fromMeasure?: boolean): void;
    clearContext(ctx: RenderingContext2D): void;
}
//# sourceMappingURL=RenderedElement.d.ts.map