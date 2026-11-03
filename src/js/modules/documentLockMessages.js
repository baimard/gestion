import { translate as t } from '@nextcloud/l10n';

export function finalizationNotice(isInvoice = false) {
    const message = t('gestion', 'This action is permanent. The document and its linked customer, products and company details will be protected against changes. Duplicate the quote or product for future changes.');
    return isInvoice ? message + ' ' + t('gestion', 'Finalizing an invoice also locks its linked quote. The payment status remains editable.') : message;
}

export function sendingNotice() {
    return t('gestion', 'Sending finalizes and permanently locks the document before the delivery attempt. Its linked data is protected, and an invoice also locks its quote. If delivery fails, the document remains locked and you can retry sending it. Canceling this dialog does not lock or send anything.');
}

export function lockedNotice(isInvoice = false) {
    const message = t('gestion', 'This document is locked and cannot be edited or deleted. Its linked customer, products and company details are protected. Duplicate the quote or product for future changes; create a new company configuration to change the issuer details.');
    return isInvoice ? message + ' ' + t('gestion', 'The linked quote is also locked. The payment status remains editable.') : message;
}

export function lockedAfterSendNotice() {
    return t('gestion', 'The document is now permanently locked. If delivery failed, you can retry sending the same document. Reload the page to see its updated status.');
}
