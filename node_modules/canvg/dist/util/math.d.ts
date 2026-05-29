import { VectorValue } from '../types';
export declare const PSEUDO_ZERO = 1e-8;
/**
 * Vector magnitude.
 * @param v
 * @returns Number result.
 */
export declare function vectorMagnitude(v: VectorValue): number;
/**
 * Ratio between two vectors.
 * @param u
 * @param v
 * @returns Number result.
 */
export declare function vectorsRatio(u: VectorValue, v: VectorValue): number;
/**
 * Angle between two vectors.
 * @param u
 * @param v
 * @returns Number result.
 */
export declare function vectorsAngle(u: VectorValue, v: VectorValue): number;
export declare function CB1(t: number): number;
export declare function CB2(t: number): number;
export declare function CB3(t: number): number;
export declare function CB4(t: number): number;
export declare function QB1(t: number): number;
export declare function QB2(t: number): number;
export declare function QB3(t: number): number;
//# sourceMappingURL=math.d.ts.map