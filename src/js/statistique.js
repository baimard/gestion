// import "@nextcloud/dialogs/dist/style.css";
import "../css/mycss.less";

import { getAnnualTurnoverPerMonthNoVat} from "./modules/ajaxRequest.js";
import { cur, globalConfiguration } from "./modules/mainFunction.js";
import "./listener/main_listener";

window.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();
    getAnnualTurnoverPerMonthNoVat(cur);
});