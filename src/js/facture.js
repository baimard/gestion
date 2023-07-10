import "@nextcloud/dialogs/dist/index.css";
import "datatables.net-dt/css/jquery.dataTables.css";
import "../css/mycss.less";


import DataTable from "datatables.net";
import { globalConfiguration, optionDatatable } from "./modules/mainFunction.js";
import "./listener/main_listener";
import { Facture } from "./objects/facture.js";
// import { Devis } from './objects/devis.mjs';

window.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();

    var dt = new DataTable(".tabledt",optionDatatable);
    Facture.loadFactureDT(dt);
});