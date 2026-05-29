import Vue from 'vue';
/**
 * Support placement as directive modifier
 */
export declare function getPlacement(options: any, modifiers: any): any;
export declare function getOptions(el: any, value: any, modifiers: any): any;
export declare function createTooltip(el: any, value: any, modifiers: any): import("vue/types/vue").CombinedVueInstance<Vue, object, object, object, Record<never, any>>;
export declare function destroyTooltip(el: any): void;
export declare function bind(el: any, { value, oldValue, modifiers }: {
    value: any;
    oldValue: any;
    modifiers: any;
}): void;
declare const _default: {
    bind: typeof bind;
    update: typeof bind;
    unbind(el: any): void;
};
export default _default;
