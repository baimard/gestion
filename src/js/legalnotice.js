import "@nextcloud/dialogs/styles/toast.scss";
import "../css/mycss.less";
import { globalConfiguration } from "./modules/mainFunction.mjs";
import "./listener/main_listener";

window.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();
});