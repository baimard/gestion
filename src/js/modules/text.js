/** Decode legacy entity storage without interpreting the value as document markup. */
export function plainText(value) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = String(value ?? '');
    return textarea.value.replace(/<br\b[^>]*>/gi, '\n');
}

/** Use only at an HTML/attribute boundary. Keep plain values for calculations and APIs. */
export function escapeHtml(value) {
    return plainText(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[character]);
}
