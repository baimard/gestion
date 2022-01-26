import '@nextcloud/dialogs/styles/toast.scss'
import 'datatables.net-dt/css/jquery.dataTables.css';
import '../css/mycss.less';


import DataTable from 'datatables.net';
import { globalConfiguration, optionDatatable } from "./modules/mainFunction.mjs";
import './listener/main_listener';
import { Produit } from './objects/produit.mjs';

window.addEventListener('DOMContentLoaded', function () {
    globalConfiguration();

    Produit.loadProduitDT(new DataTable('.tabledt',optionDatatable));
});