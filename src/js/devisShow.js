import "datatables.net-dt/css/dataTables.dataTables.css";
import "../css/mycss.less";

import { getMailServerFrom, getProduitsById, saveNextcloud} from "./modules/ajaxRequest.js";
import { globalConfiguration } from "./modules/mainFunction.js";
import "./listener/main_listener";
import { Client } from "./objects/client.js";
import { capture, sendMail } from "./pdf";

window.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();

    Client.getClientByIdDevis($("#devisid").data("id"));
    getProduitsById();

    var pdf = document.getElementById("pdf");
    pdf.addEventListener("click",function(){capture(saveNextcloud);});
});