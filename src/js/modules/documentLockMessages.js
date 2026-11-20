import { translate as t } from '@nextcloud/l10n';

export function finalizationNotice() {
    return t('gestion', 'Finalizing permanently locks this invoice and its linked quote. Document contents and linked customer, product and company details are protected. You can still update the tracking statuses from the lists and download the PDFs.');
}

export function sendingNotice(isInvoice = true) {
    return isInvoice
        ? t('gestion', 'Sending finalizes and permanently locks the invoice and its linked quote before the delivery attempt. If delivery fails, they remain locked and you can retry sending. Canceling does not lock or send anything.')
        : t('gestion', 'Sending a quote does not lock it. It remains editable unless a linked invoice is finalized. Canceling does not send anything.');
}

export function lockedNotice(isInvoice = false) {
    return isInvoice
        ? t('gestion', 'This invoice and its linked quote are locked. You can still update the payment status from the invoices list and download the PDF.')
        : t('gestion', 'This quote is locked because a linked invoice has been finalized. You can still update its status from the quotes list and download the PDF.');
}

export function lockedAfterSendNotice() {
    return t('gestion', 'The document is locked. If delivery failed, you can retry sending it. Reload the page to see its status.');
}
