// import "@nextcloud/dialogs/dist/style.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "../css/mycss.less";

import DataTable from "datatables.net";
import { globalConfiguration, optionDatatable } from "./modules/mainFunction.js";
import "./listener/main_listener";
import { Produit } from "./objects/produit.js";
import { updateDB } from "./modules/ajaxRequest.js";

window.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();

    Produit.loadProduitDT(new DataTable(".tabledt",optionDatatable));

    document.addEventListener("click", async event => {
        const toggle = event.target.closest(".product-header-toggle");
        if (!toggle || toggle.disabled) return;

        const previousValue = toggle.dataset.value;
        const nextValue = previousValue === "1" ? "0" : "1";
        toggle.disabled = true;

        const saved = await updateDB("produit", "header", nextValue, toggle.dataset.id);
        if (saved) {
            toggle.dataset.value = nextValue;
            toggle.classList.toggle("active", nextValue === "1");
            toggle.setAttribute("aria-pressed", nextValue === "1" ? "true" : "false");
        }
        toggle.disabled = false;
    });
});
