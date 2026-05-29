import { RenderingContext2D, Fetch } from './types';
import { ViewPort } from './ViewPort';
import { Mouse } from './Mouse';
import { Document, Element, AnimateElement } from './Document';
export interface IScreenOptions {
    /**
     * Window object.
     */
    window?: Window | null;
    /**
     * WHATWG-compatible `fetch` function.
     */
    fetch?: Fetch;
}
export interface IScreenStartOptions {
    /**
     * Whether enable the redraw.
     */
    enableRedraw?: boolean;
    /**
     * Ignore mouse events.
     */
    ignoreMouse?: boolean;
    /**
     * Ignore animations.
     */
    ignoreAnimation?: boolean;
    /**
     * Does not try to resize canvas.
     */
    ignoreDimensions?: boolean;
    /**
     * Does not clear canvas.
     */
    ignoreClear?: boolean;
    /**
     * Scales horizontally to width.
     */
    scaleWidth?: number;
    /**
     * Scales vertically to height.
     */
    scaleHeight?: number;
    /**
     * Draws at a x offset.
     */
    offsetX?: number;
    /**
     * Draws at a y offset.
     */
    offsetY?: number;
    /**
     * Will call the function on every frame, if it returns true, will redraw.
     */
    forceRedraw?(): boolean;
}
export interface IScreenViewBoxConfig {
    document: Document;
    ctx: RenderingContext2D;
    aspectRatio: string;
    width: number;
    desiredWidth: number;
    height: number;
    desiredHeight: number;
    minX?: number;
    minY?: number;
    refX?: number;
    refY?: number;
    clip?: boolean;
    clipX?: number;
    clipY?: number;
}
export declare class Screen {
    readonly ctx: RenderingContext2D;
    static readonly defaultWindow: Window & typeof globalThis;
    static readonly defaultFetch: typeof fetch;
    static FRAMERATE: number;
    static MAX_VIRTUAL_PIXELS: number;
    readonly window: Window | null;
    readonly fetch: Fetch;
    readonly viewPort: ViewPort;
    readonly mouse: Mouse;
    readonly animations: AnimateElement[];
    private readyPromise;
    private resolveReady;
    private waits;
    private frameDuration;
    private isReadyLock;
    private isFirstRender;
    private intervalId;
    constructor(ctx: RenderingContext2D, { fetch, window }?: IScreenOptions);
    wait(checker: () => boolean): void;
    ready(): Promise<void>;
    isReady(): boolean;
    setDefaults(ctx: RenderingContext2D): void;
    setViewBox({ document, ctx, aspectRatio, width, desiredWidth, height, desiredHeight, minX, minY, refX, refY, clip, clipX, clipY }: IScreenViewBoxConfig): void;
    start(element: Element, { enableRedraw, ignoreMouse, ignoreAnimation, ignoreDimensions, ignoreClear, forceRedraw, scaleWidth, scaleHeight, offsetX, offsetY }?: IScreenStartOptions): void;
    stop(): void;
    private shouldUpdate;
    private render;
}
//# sourceMappingURL=Screen.d.ts.map