import { FilePicker, showMessage, showError } from "@nextcloud/dialogs";
import { getCanonicalLocale, translate as t, translatePlural as n } from '@nextcloud/l10n'


import '@nextcloud/dialogs/styles/toast.scss'
import 'datatables.net-dt/css/jquery.dataTables.css';
import '../css/mycss.less';


import DataTable from 'datatables.net';
import { configuration, getStats, isconfig, loadClientDT } from "./modules/ajaxRequest.mjs";
import { getCurrency, optionDatatable, path } from "./modules/mainFunction.mjs";
import './listener/main_listener';
// import 'bootstrap/js/dist/util';


window.addEventListener('DOMContentLoaded', function () {
    getStats();
    isconfig();
    configuration(getCurrency);
    configuration(path);

    let table = new DataTable('.tabledt',optionDatatable);
    loadClientDT(table);

});

