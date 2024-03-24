// import "@nextcloud/dialogs/dist/style.css";
import "../css/mycss.less";
import { globalConfiguration } from "./modules/mainFunction.js";
import "./listener/main_listener";

window.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();
});