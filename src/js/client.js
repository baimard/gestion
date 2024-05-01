// import "@nextcloud/dialogs/dist/index.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "../css/mycss.less";
import "./listener/main_listener";

import DataTable from "datatables.net";
import { globalConfiguration, optionDatatable } from "./modules/mainFunction.js";
import { Client } from "./objects/client.js";

document.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();
    Client.loadClientDT(new DataTable(".tabledt",optionDatatable));
});