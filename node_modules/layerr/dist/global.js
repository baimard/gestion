const NAME = "Layerr";
let __name = NAME;
export function getGlobalName() {
    return __name;
}
export function setGlobalName(name = null) {
    __name = name ?? NAME;
}
