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

        showSuccess(result.created
            ? t('gestion', 'Invoice created from the quote.')
            : t('gestion', 'This quote already has an invoice.'));
        window.location.assign(generateUrl(`/apps/gestion/facture/${result.id}/show`));
    } catch (error) {
        showError(error.message);
        target.disabled = false;
    }
}
