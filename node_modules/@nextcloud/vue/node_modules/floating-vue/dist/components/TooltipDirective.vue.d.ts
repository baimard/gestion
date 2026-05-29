declare const _default: {
    name: string;
    components: {
        Popper: {
            name: string;
            props: {
                theme: {
                    type: StringConstructor;
                    required: boolean;
                };
                targetNodes: {
                    type: FunctionConstructor;
                    required: boolean;
                };
                referenceNode: {
                    type: FunctionConstructor;
                    required: boolean;
                };
                popperNode: {
                    type: FunctionConstructor;
                    required: boolean;
                };
                shown: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                showGroup: {
                    type: StringConstructor;
                    default: any;
                };
                ariaId: {
                    default: any;
                };
                disabled: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                positioningDisabled: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                placement: {
                    type: StringConstructor;
                    default: (this: any) => any;
                    validator: (value: any) => boolean;
                };
                delay: {
                    type: (ObjectConstructor | StringConstructor | NumberConstructor)[];
                    default: (this: any) => any;
                };
                distance: {
                    type: (StringConstructor | NumberConstructor)[];
                    default: (this: any) => any;
                };
                skidding: {
                    type: (StringConstructor | NumberConstructor)[];
                    default: (this: any) => any;
                };
                triggers: {
                    type: ArrayConstructor;
                    default: (this: any) => any;
                };
                showTriggers: {
                    type: (FunctionConstructor | ArrayConstructor)[];
                    default: (this: any) => any;
                };
                hideTriggers: {
                    type: (FunctionConstructor | ArrayConstructor)[];
                    default: (this: any) => any;
                };
                popperTriggers: {
                    type: ArrayConstructor;
                    default: (this: any) => any;
                };
                popperShowTriggers: {
                    type: (FunctionConstructor | ArrayConstructor)[];
                    default: (this: any) => any;
                };
                popperHideTriggers: {
                    type: (FunctionConstructor | ArrayConstructor)[];
                    default: (this: any) => any;
                };
                container: {
                    type: any[];
                    default: (this: any) => any;
                };
                boundary: {
                    type: any[];
                    default: (this: any) => any;
                };
                strategy: {
                    type: StringConstructor;
                    validator: (value: any) => boolean;
                    default: (this: any) => any;
                };
                autoHide: {
                    type: (FunctionConstructor | BooleanConstructor)[];
                    default: (this: any) => any;
                };
                handleResize: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                instantMove: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                eagerMount: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                popperClass: {
                    type: (ObjectConstructor | StringConstructor | ArrayConstructor)[];
                    default: (this: any) => any;
                };
                computeTransformOrigin: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                autoMinSize: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                autoSize: {
                    type: (StringConstructor | BooleanConstructor)[];
                    default: (this: any) => any;
                };
                autoMaxSize: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                autoBoundaryMaxSize: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                preventOverflow: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                overflowPadding: {
                    type: (StringConstructor | NumberConstructor)[];
                    default: (this: any) => any;
                };
                arrowPadding: {
                    type: (StringConstructor | NumberConstructor)[];
                    default: (this: any) => any;
                };
                arrowOverflow: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                flip: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                shift: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                shiftCrossAxis: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
                noAutoFocus: {
                    type: BooleanConstructor;
                    default: (this: any) => any;
                };
            };
            provide(): {
                "__floating-vue__popper": {
                    parentPopper: any;
                };
            };
            inject: {
                "__floating-vue__popper": {
                    default: any;
                };
            };
            data(): {
                isShown: boolean;
                isMounted: boolean;
                skipTransition: boolean;
                classes: {
                    showFrom: boolean;
                    showTo: boolean;
                    hideFrom: boolean;
                    hideTo: boolean;
                };
                result: {
                    x: number;
                    y: number;
                    placement: string;
                    strategy: any;
                    arrow: {
                        x: number;
                        y: number;
                        centerOffset: number;
                    };
                    transformOrigin: any;
                };
                shownChildren: Set<unknown>;
                lastAutoHide: boolean;
            };
            computed: {
                popperId(): any;
                shouldMountContent(): any;
                slotData(): {
                    popperId: any;
                    isShown: any;
                    shouldMountContent: any;
                    skipTransition: any;
                    autoHide: any;
                    show: any;
                    hide: any;
                    handleResize: any;
                    onResize: any;
                    classes: any;
                    result: any;
                };
                parentPopper(): any;
                hasPopperShowTriggerHover(): any;
            };
            watch: {
                shown: string;
                disabled(value: any): void;
                container(): Promise<void>;
            };
            created(): void;
            mounted(): void;
            activated(): void;
            deactivated(): void;
            beforeDestroy(): void;
            methods: {
                show({ event, skipDelay, force }?: {
                    event?: any;
                    skipDelay?: boolean;
                    force?: boolean;
                }): void;
                hide({ event, skipDelay, skipAiming }?: {
                    event?: any;
                    skipDelay?: boolean;
                    skipAiming?: boolean;
                }): void;
                init(): void;
                dispose(): void;
                onResize(): Promise<void>;
                $_computePosition(): Promise<void>;
                $_scheduleShow(event?: any, skipDelay?: boolean): void;
                $_scheduleHide(event?: any, skipDelay?: boolean): void;
                $_computeDelay(type: any): number;
                $_applyShow(skipTransition?: boolean): Promise<void>;
                $_applyShowEffect(): Promise<void>;
                $_applyHide(skipTransition?: boolean): Promise<void>;
                $_autoShowHide(): void;
                $_ensureTeleport(): void;
                $_addEventListeners(): void;
                $_registerEventListeners(targetNodes: any[], eventType: string, handler: (event: Event) => void): void;
                $_registerTriggerListeners(targetNodes: any[], eventMap: Record<string, string>, commonTriggers: any, customTrigger: any, handler: (event: Event) => void): void;
                $_removeEventListeners(filterEventType?: string): void;
                $_refreshListeners(): void;
                $_handleGlobalClose(event: any, touch?: boolean): void;
                $_detachPopperNode(): void;
                $_swapTargetAttrs(attrFrom: any, attrTo: any): void;
                $_applyAttrsToTarget(attrs: any): void;
                $_updateParentShownChildren(value: any): void;
                $_isAimingPopper(): boolean;
            };
            render(): any;
        };
        PopperContent: {
            name: string;
            components: {
                ResizeObserver: any;
            };
            mixins: {
                computed: {
                    themeClass(): string[];
                };
            }[];
            props: {
                popperId: StringConstructor;
                theme: StringConstructor;
                shown: BooleanConstructor;
                mounted: BooleanConstructor;
                skipTransition: BooleanConstructor;
                autoHide: BooleanConstructor;
                handleResize: BooleanConstructor;
                classes: ObjectConstructor;
                result: ObjectConstructor;
            };
            methods: {
                toPx(value: any): string;
            };
        };
    };
    mixins: {
        methods: {
            show(...args: any[]): any;
            hide(...args: any[]): any;
            dispose(...args: any[]): any;
            onResize(...args: any[]): any;
        };
    }[];
    inheritAttrs: boolean;
    props: {
        theme: {
            type: StringConstructor;
            default: string;
        };
        html: {
            type: BooleanConstructor;
            default(): any;
        };
        content: {
            type: (FunctionConstructor | StringConstructor | NumberConstructor)[];
            default: any;
        };
        loadingContent: {
            type: StringConstructor;
            default(): any;
        };
    };
    data(): {
        asyncContent: any;
    };
    computed: {
        isContentAsync(): boolean;
        loading(): boolean;
        finalContent(): any;
    };
    watch: {
        content: {
            handler(): void;
            immediate: boolean;
        };
        finalContent(value: any): Promise<void>;
    };
    created(): void;
    methods: {
        fetchContent(force: any): void;
        onResult(fetchId: any, result: any): void;
        onShow(): void;
        onHide(): void;
    };
};
export default _default;
