import { showError } from "@nextcloud/dialogs";
import { baseUrl, cur, unescapeHtml } from "../../modules/mainFunction.js";
import { getProduitsById, updateDB } from "../../modules/ajaxRequest.js";
import { csrfHeaders } from "../../modules/csrf.js";
import { Client } from "../../objects/client.js";

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
    const confirm = document.getElementById('product_selector_confirm');

    if (!modal || !list || !search || !confirm) return;

    modal.dataset.productQuoteId = target.dataset.id;
    modal.dataset.currentProductId = target.dataset.val;
    modal.style.display = 'flex';
    list.replaceChildren();
    search.value = '';
    confirm.disabled = true;
    search.focus();

    try {
        const response = await fetch(baseUrl + '/getProduits', {
            method: 'PROPFIND',
            headers: csrfHeaders({ 'Content-Type': 'application/json' }),
        });
        if (!response.ok) throw new Error('Unable to load products');

        const products = JSON.parse(await response.json());
        products.forEach(product => list.appendChild(createProductOption(product, modal.dataset.currentProductId)));
        const selectedOption = list.querySelector('.product-selector-option[aria-selected="true"]');
        confirm.disabled = !selectedOption;
        selectedOption?.scrollIntoView({ block: 'nearest' });
        bindProductSelector(modal, list, search, confirm);
    } catch {
        showError(t('gestion', 'Unable to load products.'));
        modal.style.display = 'none';
    }
}

function createProductOption(product, currentProductId) {
    const referenceText = unescapeHtml(String(product.reference ?? ''));
    const descriptionText = unescapeHtml(String(product.description ?? ''));
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'product-selector-option';
    option.dataset.productId = product.id;
    option.dataset.search = `${referenceText} ${descriptionText}`.toLocaleLowerCase();
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', String(product.id) === String(currentProductId) ? 'true' : 'false');

    const reference = document.createElement('span');
    reference.className = 'product-selector-reference';
    reference.textContent = referenceText;
    const description = document.createElement('span');
    description.className = 'product-selector-description';
    description.textContent = descriptionText;
    const price = document.createElement('span');
    price.className = 'product-selector-price';
    price.textContent = cur.format(product.prix_unitaire);
    option.append(reference, description, price);
    return option;
}

function bindProductSelector(modal, list, search, confirm) {
    if (modal.dataset.selectorBound === 'true') return;
    modal.dataset.selectorBound = 'true';

    search.addEventListener('input', () => {
        const query = search.value.trim().toLocaleLowerCase();
        list.querySelectorAll('.product-selector-option').forEach(option => {
            option.hidden = query !== '' && !option.dataset.search.includes(query);
        });
        const selectedOption = list.querySelector('.product-selector-option[aria-selected="true"]');
        if (selectedOption?.hidden) {
            selectedOption.setAttribute('aria-selected', 'false');
            confirm.disabled = true;
        }
    });

    list.addEventListener('click', event => {
        const option = event.target.closest('.product-selector-option');
        if (!option) return;
        list.querySelectorAll('.product-selector-option').forEach(item => item.setAttribute('aria-selected', 'false'));
        option.setAttribute('aria-selected', 'true');
        confirm.disabled = false;
    });

    list.addEventListener('dblclick', event => selectProductOption(event.target.closest('.product-selector-option'), modal));
    list.addEventListener('keydown', event => {
        if (event.key === 'Enter') selectProductOption(event.target.closest('.product-selector-option'), modal);
    });
    confirm.addEventListener('click', () => {
        selectProductOption(list.querySelector('.product-selector-option[aria-selected="true"]'), modal);
    });
}

async function selectProductOption(option, modal) {
    if (!option || modal.dataset.submitting === 'true') return;

    const confirm = document.getElementById('product_selector_confirm');
    modal.dataset.submitting = 'true';
    if (confirm) confirm.disabled = true;

    try {
        const updated = await updateDB('produit_devis', 'produit_id', option.dataset.productId, modal.dataset.productQuoteId);
        if (!updated) return;
        modal.style.display = 'none';
        await getProduitsById();
    } finally {
        delete modal.dataset.submitting;
        if (confirm && modal.style.display !== 'none') confirm.disabled = false;
    }
}

export async function updateSelectedProduct(event) {
    const option = event.target.options[event.target.selectedIndex];
    const id = option.dataset.id;
    const val = option.dataset.val;
    const column = option.dataset.column;
    const table = option.dataset.table;

    await updateDB(table, column, val, id);

    if (event.target.parentNode.className === 'selectableClient_devis') {
        Client.getClientByIdDevis(id);
    }

    event.target.parentNode.textContent = event.target.value;
    event.target.parentNode.dataset.val = id;
}
