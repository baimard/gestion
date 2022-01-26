import '@nextcloud/dialogs/styles/toast.scss'
import '../css/mycss.less';

import { getAnnualTurnoverPerMonthNoVat} from "./modules/ajaxRequest.mjs";
import { cur, globalConfiguration } from "./modules/mainFunction.mjs";
import './listener/main_listener';


window.addEventListener('DOMContentLoaded', function () {
    globalConfiguration();

    getAnnualTurnoverPerMonthNoVat(cur);
});