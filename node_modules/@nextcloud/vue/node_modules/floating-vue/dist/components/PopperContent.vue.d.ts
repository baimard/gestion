declare const _default: {
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
export default _default;
