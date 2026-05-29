import { RenderingContext2D } from '../types';
import { BoundingBox } from '../BoundingBox';
import { Document } from './Document';
import { RenderedElement } from './RenderedElement';
export declare class ImageElement extends RenderedElement {
    type: string;
    loaded: boolean;
    protected image: CanvasImageSource | string | undefined;
    constructor(document: Document, node: HTMLElement, captureTextNodes?: boolean);
    protected loadImage(href: string): Promise<void>;
    protected loadSvg(href: string): Promise<void>;
    renderChildren(ctx: RenderingContext2D): void;
    getBoundingBox(): BoundingBox;
}
//# sourceMappingURL=ImageElement.d.ts.map