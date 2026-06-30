import DataTable from 'datatables.net';
import { duplicateDB, deleteDB, getProduitsById, drop } from "../../modules/ajaxRequest.js";
import { Client } from '../../objects/client.js';
import { Devis } from '../../objects/devis.js';
import { Facture } from '../../objects/facture.js';
import { Produit } from '../../objects/produit.js';

const NEW_ITEM_HANDLERS = {
    newClient: Client.newClient,
    newDevis: Devis.newDevis,
    newInvoice: Facture.newFacture,
    newProduit: Produit.newProduct,
};

const RELOAD_HANDLERS = {
    getProduitsById: () => getProduitsById(),
    client: dt => Client.loadClientDT(dt),
    devis: dt => Devis.loadDevisDT(dt),
    facture: dt => Facture.loadFactureDT(dt),
    produit: dt => Produit.loadProduitDT(dt),
};

export function handleNewItemClick(target) {
    const handler = NEW_ITEM_HANDLERS[target.id];

    if (!handler) {
        return false;
    }

    handler(new DataTable('.tabledt'));
    return true;
}

export function duplicateItem(target) {
    duplicateDB(target.dataset.table, target.dataset.id, reloadDataTable, target.dataset.modifier);
}

export function deleteItem(target) {
    deleteDB(target.dataset.table, target.dataset.id, reloadDataTable, target.dataset.modifier);
}

export function dropItem(target, direction) {
    drop(target.dataset.id, reloadDataTable, target.dataset.modifier, direction);
}

function reloadDataTable(modifier) {
    const dt = new DataTable('.tabledt');
    const handler = RELOAD_HANDLERS[modifier];

    if (handler) {
        handler(dt);
    }
}
