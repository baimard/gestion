import { showError, showSuccess } from '@nextcloud/dialogs';
import { translate as t } from '@nextcloud/l10n';
import { baseUrl } from '../../modules/mainFunction.js';
import { csrfHeaders } from '../../modules/csrf.js';
import { updateEditableSelect } from './select_handlers.js';

const DEFAULT_REASON_CODE = 'VATEX-FR-FRANCHISE';

let activeActionButton = null;
let reasonsRequest = null;

export async function handleVatCategoryChange(target) {
    const previousValue = target.dataset.current ?? '';
    const saved = await updateEditableSelect(target);

    if (!saved) {
        if (previousValue) {
            target.value = previousValue;
        }
        return;
    }

    target.dataset.current = target.value;
    const actionButton = target.closest('tr')?.querySelector('.vat-exemption-reason-action');
    if (!actionButton) {
        return;
    }

    const isExempt = target.value === 'E';
    actionButton.hidden = !isExempt;

    if (!isExempt) {
        actionButton.dataset.reasonCode = '';
        return;
    }

    if (!actionButton.dataset.reasonCode) {
        actionButton.dataset.reasonCode = DEFAULT_REASON_CODE;
    }

    await openVatExemptionReasonModal(actionButton);
}

export async function openVatExemptionReasonModal(actionButton) {
    const modal = document.getElementById('vat_exemption_reason_modal');
    const select = document.getElementById('vat_exemption_reason_select');
    if (!modal || !select) {
        return;
    }

    try {
        const catalog = await loadVatExemptionReasons();
        populateReasonSelect(select, catalog.reasons);
        select.value = actionButton.dataset.reasonCode || catalog.defaultCode;
        const selectedReason = catalog.reasons.find(reason => reason.code === select.value);
        if (selectedReason) {
            actionButton.title = selectedReason.reason;
        }
        activeActionButton = actionButton;
        modal.style.display = 'block';
        select.focus();
    } catch (error) {
        console.error('Unable to load VAT exemption reasons:', error);
        showError(t('gestion', 'Unable to load VAT exemption reasons'));
    }
}

export async function saveVatExemptionReason() {
    const modal = document.getElementById('vat_exemption_reason_modal');
    const select = document.getElementById('vat_exemption_reason_select');
    if (!modal || !select || !activeActionButton) {
        return;
    }

    try {
        const response = await fetch(
            baseUrl + '/produit/' + encodeURIComponent(activeActionButton.dataset.id) + '/vat-exemption',
            {
                method: 'POST',
                headers: csrfHeaders({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    code: select.value,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Unable to save VAT exemption reason');
        }

        const reason = await response.json();
        activeActionButton.dataset.reasonCode = reason.code;
        activeActionButton.title = reason.reason;
        modal.style.display = 'none';
        activeActionButton = null;
        showSuccess(t('gestion', 'Modification saved'));
    } catch (error) {
        console.error('Unable to save VAT exemption reason:', error);
        showError(t('gestion', 'Unable to save VAT exemption reason'));
    }
}

async function loadVatExemptionReasons() {
    if (!reasonsRequest) {
        reasonsRequest = fetch(baseUrl + '/vat-exemption-reasons', {
                method: 'GET',
                headers: csrfHeaders({
                    'Accept': 'application/json',
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to load VAT exemption reasons');
                }
                return response.json();
            })
            .catch(error => {
                reasonsRequest = null;
                throw error;
            });
    }

    return reasonsRequest;
}

function populateReasonSelect(select, reasons) {
    select.replaceChildren();

    reasons.forEach(reason => {
        const option = document.createElement('option');
        option.value = reason.code;
        option.textContent = reason.reason + ' — ' + reason.code;
        select.appendChild(option);
    });
}
