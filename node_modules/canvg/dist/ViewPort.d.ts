export interface IViewPortSize {
    width: number;
    height: number;
}
export type Axis = 'x' | 'y';
export declare class ViewPort {
    static DEFAULT_VIEWPORT_WIDTH: number;
    static DEFAULT_VIEWPORT_HEIGHT: number;
    viewPorts: IViewPortSize[];
    clear(): void;
    setCurrent(width: number, height: number): void;
    removeCurrent(): void;
    getRoot(): IViewPortSize;
    getCurrent(): IViewPortSize;
    get width(): number;
    get height(): number;
    computeSize(d?: number | Axis): number;
}
//# sourceMappingURL=ViewPort.d.ts.map