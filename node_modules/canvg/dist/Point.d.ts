import { MatrixValue } from './types';
export declare class Point {
    x: number;
    y: number;
    static parse(point: string, defaultValue?: number): Point;
    static parseScale(scale: string, defaultValue?: number): Point;
    static parsePath(path: string): Point[];
    constructor(x: number, y: number);
    angleTo(point: Point): number;
    applyTransform(transform: MatrixValue): void;
}
//# sourceMappingURL=Point.d.ts.map