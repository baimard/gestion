// import "@nextcloud/dialogs/dist/style.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "../css/mycss.less";

import DataTable from "datatables.net";
import { globalConfiguration, optionDatatable } from "./modules/mainFunction.js";
import "./listener/main_listener";
import { Produit } from "./objects/produit.js";
import { showMessage } from "@nextcloud/dialogs";
import { translate as t } from '@nextcloud/l10n';

window.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();

    Produit.loadProduitDT(new DataTable(".tabledt",optionDatatable));

    document.getElementById('vatCategoryHelp')?.addEventListener('click', () => {
        showMessage(t('gestion', 'France only: this category describes why VAT applies or does not apply in the Factur-X electronic invoice. Choose S for VAT at 5.5%, 10% or 20%; E for the French small-business exemption (article 293 B); Z only for a legally zero-rated taxable supply; O for an operation outside the scope of VAT; AE for reverse charge; G for export outside the EU; or K for an intra-Community supply.'));
    });
});
