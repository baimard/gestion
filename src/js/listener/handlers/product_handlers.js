import { showError } from "@nextcloud/dialogs";
import { baseUrl } from "../../modules/mainFunction.js";
import { getProduitsById, listProduit, updateDB } from "../../modules/ajaxRequest.js";

export function addProductToDevis() {
    const devisId = document.getElementById('devisid').dataset.id;
    const produitDevis = { id: devisId };

    fetch(baseUrl + '/insertProduitDevis', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produitDevis)
    })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(function() {
            getProduitsById();
        })
        .catch(function() {
            showError(t('gestion', "Please create a new product"));
        });
}

export function showProductSelect(target) {
    const id = target.dataset.id;
    const produitid = target.dataset.val;
    target.textContent = "";
    target.innerHTML = '<select id="listProduit">';
    listProduit(document.getElementById('listProduit'), id, produitid);
}

export async function updateSelectedProduct(event) {
    const option = event.target.options[event.target.selectedIndex];
    const id = option.dataset.id;
    const val = option.dataset.val;
    const column = option.dataset.column;
    const table = option.dataset.table;

    await updateDB(table, column, val, id);

    if (event.target.parentNode.className === 'selectableClient_devis') {
        getClientByIdDevis(id);
    }

    if (event.target.id === 'listProduit') {
        getProduitsById();
    }

    event.target.parentNode.textContent = event.target.value;
    event.target.parentNode.dataset.val = id;
}
