// import "@nextcloud/dialogs/dist/index.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "../css/mycss.less";
import "./listener/main_listener";

import DataTable from "datatables.net";
import { globalConfiguration, optionDatatable } from "./modules/mainFunction.js";
import { Devis } from "./objects/devis.js";
import { bindDirectPdfDownloads } from "./pdf.js";

window.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();
    bindDirectPdfDownloads();
    Devis.loadDevisDT(new DataTable(".tabledt",optionDatatable));
});
