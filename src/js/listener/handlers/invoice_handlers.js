import { showError, showSuccess } from '@nextcloud/dialogs';
import { generateUrl } from '@nextcloud/router';
import { baseUrl } from '../../modules/mainFunction.js';
import { csrfHeaders } from '../../modules/csrf.js';

export async function createInvoiceFromQuote(target) {
    const devisId = Number(target.dataset.devisId);
    if (!devisId || target.disabled) return;

    target.disabled = true;
    try {
        const response = await fetch(baseUrl + '/facture/insert', {
            method: 'POST',
            headers: csrfHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ devisId }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.id) {
            throw new Error(result.message || t('gestion', 'Unable to create the invoice.'));
        }

        showSuccess(t('gestion', 'Invoice created from the quote.'));
        window.location.assign(generateUrl(`/apps/gestion/facture/${result.id}/show`));
    } catch (error) {
        showError(error.message);
        target.disabled = false;
    }
}

export async function openInvoiceQuoteSelector() {
    const modal = document.getElementById('invoice_quote_selector_modal');
    const list = document.getElementById('invoice_quote_selector_list');
    const search = document.getElementById('invoice_quote_selector_search');
    if (!modal || !list || !search) return;

    modal.style.display = 'flex';
    list.replaceChildren();
    search.value = '';
    search.focus();

    try {
        const response = await fetch(baseUrl + '/getDevis', {
            method: 'PROPFIND',
            headers: csrfHeaders({ 'Content-Type': 'application/json' }),
        });
        if (!response.ok) throw new Error('Unable to load quotes');

        const quotes = JSON.parse(await response.json());
        quotes.forEach(quote => {
            const option = document.createElement('button');
            option.type = 'button';
            option.className = 'product-selector-option createInvoiceFromQuote';
            option.dataset.devisId = quote.id;
            option.dataset.search = `${quote.num} ${quote.entreprise} ${quote.prenom} ${quote.nom}`.toLocaleLowerCase();
            option.innerHTML = `<strong></strong><span></span><span></span>`;
            option.children[0].textContent = quote.num;
            option.children[1].textContent = quote.entreprise || '';
            option.children[2].textContent = `${quote.prenom || ''} ${quote.nom || ''}`.trim();
            list.appendChild(option);
        });
        bindQuoteSelector(list, search);
    } catch {
        showError(t('gestion', 'Unable to load quotes.'));
        modal.style.display = 'none';
    }
}

function bindQuoteSelector(list, search) {
    if (list.dataset.bound === 'true') return;
    list.dataset.bound = 'true';

    search.addEventListener('input', () => {
        const query = search.value.trim().toLocaleLowerCase();
        list.querySelectorAll('.product-selector-option').forEach(option => {
            option.hidden = query !== '' && !option.dataset.search.includes(query);
        });
    });
}
