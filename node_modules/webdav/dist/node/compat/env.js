export function isReactNative() {
    return typeof TARGET === "string" && TARGET === "react-native";
}
export function isWeb() {
    return typeof TARGET === "string" && TARGET === "web";
}
