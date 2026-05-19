// import "@nextcloud/dialogs/dist/style.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "../css/mycss.less";

import { getMailServerFrom, getProduitsById, saveNextcloud, generateFacturXmlRequest } from "./modules/ajaxRequest.js";
import { globalConfiguration } from "./modules/mainFunction.js";
import "./listener/main_listener";
import { Client } from "./objects/client.js";
import { capture, captureFacturX, captureFacturXml, sendMail } from "./pdf";

window.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();

    Client.getClientByIdDevis($("#devisid").data("id"));
    getProduitsById();

    // Bouton 1 — Sauvegarder dans Nextcloud (pdf)
    var pdf = document.getElementById("pdf");
    pdf.addEventListener("click", function(){ capture(saveNextcloud); });

    // Bouton 2 — Générer une facture électronique (pdf+xml)
    var facturx = document.getElementById("facturx");
    if (facturx) {
        facturx.addEventListener("click", function(){ captureFacturX(); });
    }

    // Bouton 3 — Générer la partie électronique (xml)
    var facturxXml = document.getElementById("facturx-xml");
    if (facturxXml) {
        facturxXml.addEventListener("click", function(){ captureFacturXml(); });
    }
    
});
