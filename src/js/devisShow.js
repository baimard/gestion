import "datatables.net-dt/css/dataTables.dataTables.css";
import "../css/mycss.less";

import { getProduitsById, saveNextcloud} from "./modules/ajaxRequest.js";
import { globalConfiguration } from "./modules/mainFunction.js";
import "./listener/main_listener";
import { Client } from "./objects/client.js";
import { capture } from "./pdf";

window.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();

    const documentReady = Promise.all([
        Client.getClientByIdDevis(document.getElementById("devisid").dataset.id),
        getProduitsById(),
    ]);

    var pdf = document.getElementById("pdf");
    pdf.addEventListener("click",function(){capture(saveNextcloud);});

    documentReady.then(() => {
        document.documentElement.dataset.gestionDocumentReady = "true";
        document.dispatchEvent(new CustomEvent("gestion:document-ready"));
    });
});
