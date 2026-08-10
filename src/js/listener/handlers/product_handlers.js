import { showError } from "@nextcloud/dialogs";
import { baseUrl, cur } from "../../modules/mainFunction.js";
import { getProduitsById, updateDB } from "../../modules/ajaxRequest.js";
import { csrfHeaders } from "../../modules/csrf.js";

export function addProductToDevis() {
    const devisId = document.getElementById('devisid').dataset.id;
    const produitDevis = { id: devisId };

    fetch(baseUrl + '/insertProduitDevis', {
        method: 'POST',
        headers: csrfHeaders({
            'Content-Type': 'application/json'
        }),
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

export async function showProductSelect(target) {
    const modal = document.getElementById('product_selector_modal');
    const list = document.getElementById('product_selector_list');
    const search = document.getElementById('product_selector_search');

    if (!modal || !list || !search) return;

    modal.dataset.productQuoteId = target.dataset.id;
    modal.dataset.currentProductId = target.dataset.val;
    modal.style.display = 'flex';
    list.replaceChildren();
    search.value = '';
    search.focus();

    try {
        const response = await fetch(baseUrl + '/getProduits', {
            method: 'PROPFIND',
            headers: csrfHeaders({ 'Content-Type': 'application/json' }),
        });
        if (!response.ok) throw new Error('Unable to load products');

        const products = JSON.parse(await response.json());
        products.forEach(product => list.appendChild(createProductOption(product, modal.dataset.currentProductId)));
        bindProductSelector(modal, list, search);
    } catch (error) {
        showError(t('gestion', 'Unable to load products.'));
        modal.style.display = 'none';
    }
}

function createProductOption(product, currentProductId) {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'product-selector-option';
    option.dataset.productId = product.id;
    option.dataset.search = `${product.reference} ${product.description}`.toLocaleLowerCase();
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', String(product.id) === String(currentProductId) ? 'true' : 'false');

    const reference = document.createElement('strong');
    reference.textContent = product.reference;
    const description = document.createElement('span');
    description.textContent = product.description;
    const price = document.createElement('span');
    price.className = 'product-selector-price';
    price.textContent = cur.format(product.prix_unitaire);
    option.append(reference, description, price);
    return option;
}

function bindProductSelector(modal, list, search) {
    if (modal.dataset.selectorBound === 'true') return;
    modal.dataset.selectorBound = 'true';

    search.addEventListener('input', () => {
        const query = search.value.trim().toLocaleLowerCase();
        list.querySelectorAll('.product-selector-option').forEach(option => {
            option.hidden = query !== '' && !option.dataset.search.includes(query);
        });
    });

    list.addEventListener('click', event => {
        const option = event.target.closest('.product-selector-option');
        if (!option) return;
        list.querySelectorAll('.product-selector-option').forEach(item => item.setAttribute('aria-selected', 'false'));
        option.setAttribute('aria-selected', 'true');
    });

    list.addEventListener('dblclick', event => selectProductOption(event.target.closest('.product-selector-option'), modal));
    list.addEventListener('keydown', event => {
        if (event.key === 'Enter') selectProductOption(event.target.closest('.product-selector-option'), modal);
    });
}

async function selectProductOption(option, modal) {
    if (!option) return;
    const updated = await updateDB('produit_devis', 'produit_id', option.dataset.productId, modal.dataset.productQuoteId);
    if (!updated) return;
    modal.style.display = 'none';
    await getProduitsById();
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

    event.target.parentNode.textContent = event.target.value;
    event.target.parentNode.dataset.val = id;
}
