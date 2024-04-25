// import "@nextcloud/dialogs/dist/index.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "../css/mycss.less";
import "./listener/main_listener";

import DataTable from "datatables.net";
import { globalConfiguration, optionDatatable } from "./modules/mainFunction.js";
import { Devis } from "./objects/devis.js";

window.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();
    Devis.loadDevisDT(new DataTable(".tabledt",optionDatatable));
});