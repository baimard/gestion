import { finalizationNotice, lockedNotice } from './documentLockMessages.js';
import { translate as t } from '@nextcloud/l10n';
import { generateUrl } from '@nextcloud/router';
import { showError, showSuccess } from '@nextcloud/dialogs';
import { csrfHeaders } from './csrf.js';
import { getCurrency } from './mainFunction.js';

async function request(path, data) {
    const response = await fetch(generateUrl('/apps/gestion' + path), {
        method: data === undefined ? 'GET' : 'POST',
        headers: csrfHeaders({'Content-Type': 'application/json'}),
        ...(data === undefined ? {} : {body: JSON.stringify(data)}),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || t('gestion', 'The operation could not be completed.'));
    return result;
}

function dialog(title) {
    const node = document.createElement('dialog');
    node.className = 'gestion-workspace-dialog';
    const heading = document.createElement('h2');
    heading.id = 'gestion-dialog-title';
    heading.textContent = title;
    node.setAttribute('aria-labelledby', heading.id);
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = t('gestion', 'Close');
    close.addEventListener('click', () => node.close());
    node.append(heading, close);
    document.body.append(node);
    node.addEventListener('close', () => node.remove(), {once: true});
    node.showModal();
    return node;
}

async function showHistory() {
    const node = dialog(t('gestion', 'Change history'));
    const list = document.createElement('ol');
    list.className = 'gestion-history';
    let cursor = 0;
    const loadOlder = document.createElement('button');
    loadOlder.textContent = t('gestion', 'Load older changes');
    const load = async () => {
    const rows = await request('/history' + (cursor ? '?before=' + cursor : ''));
    for (const row of rows) {
        const item = document.createElement('li');
        const title = document.createElement('strong');
        const detail = document.createElement('p');
        const changes = JSON.parse(row.changes);
        title.textContent = `${row.entity} #${row.entity_id} · ${row.action}`;
        detail.textContent = `${new Date(row.occurred_at).toLocaleString()} · ${row.actor}`;
        item.append(title, detail);
        if (changes.field) {
            const value = document.createElement('p');
            value.textContent = `${changes.field}: ${changes.before ?? '—'} → ${changes.after ?? '—'}`;
            item.append(value);
        }
        list.append(item);
    }
    if (!rows.length && cursor === 0) list.textContent = t('gestion', 'No changes have been recorded yet.');
    cursor = Number(rows.at(-1)?.id || cursor);
    loadOlder.hidden = rows.length < 200;
    };
    loadOlder.addEventListener('click', () => load().catch(error => showError(error.message)));
    await load();
    const note = document.createElement('p');
    note.textContent = t('gestion', 'Changes for the current company. Recording starts with this update.');
    node.append(note, list, loadOlder);
}

async function downloadBackup() {
    const result = await request('/backup', {});
    const url = URL.createObjectURL(new Blob([result.backup], {type: 'application/json'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = result.name.split('/').pop();
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    showSuccess(t('gestion', 'Backup saved in Nextcloud and downloaded.'));
}

async function restoreBackup(input) {
    const file = input.files?.[0];
    if (!file) return;
    input.value = '';
    if (file.size > 20 * 1024 * 1024) throw new Error(t('gestion', 'The backup must be smaller than 20 MB.'));
    const content = await file.text();
    const preview = await request('/restore', {content});
    const node = dialog(t('gestion', 'Restore a backup'));
    const summary = document.createElement('p');
    summary.textContent = t('gestion', 'New companies will be created. Your existing data will not be replaced. Sharing permissions and provider credentials are not restored.');
    const counts = document.createElement('p');
    counts.textContent = `${preview.counts.configuration} ${t('gestion', 'Companies')} · ${preview.counts.client} ${t('gestion', 'Customers')} · ${preview.counts.devis} ${t('gestion', 'Quotes')} · ${preview.counts.facture} ${t('gestion', 'Invoices')}`;
    const names = document.createElement('p');
    names.textContent = preview.companies.join(', ');
    const confirm = document.createElement('button');
    confirm.type = 'button';
    confirm.className = 'primary';
    confirm.textContent = t('gestion', 'Restore into new companies');
    confirm.disabled = preview.counts.configuration === 0;
    confirm.addEventListener('click', async () => {
        confirm.disabled = true;
        try {
            await request('/restore', {content, confirm: true});
            showSuccess(t('gestion', 'Backup restored. Select a restored company from the company menu.'));
            node.close();
            location.reload();
        } catch (error) { showError(error.message); confirm.disabled = false; }
    });
    node.append(summary, counts, names, confirm);
}

async function lockDocument(button) {
    if (button.disabled) return;
    const toolbar = button.closest('[data-document-lock]');
    const table = button.dataset.lockInvoice ? 'facture' : toolbar?.dataset.table;
    const id = Number(button.dataset.lockInvoice || toolbar?.dataset.id);
    if (table !== 'facture' || !Number.isInteger(id) || id < 1) return;
    button.disabled = true;
    const label = button.dataset.documentLabel || document.getElementById('factureid')?.textContent.trim();
    const node = dialog(label ? t('gestion', 'Finalize invoice {number}?', {number: label}) : t('gestion', 'Finalize this document?'));
    let pending = false;
    node.addEventListener('close', () => { if (!pending) button.disabled = false; });
    const notice = document.createElement('p');
    notice.textContent = finalizationNotice(true);
    const confirm = document.createElement('button');
    confirm.className = 'primary';
    confirm.textContent = t('gestion', 'Finalize and lock');
    confirm.addEventListener('click', async () => {
        if (pending) return;
        pending = true;
        confirm.disabled = true;
        try {
            await request('/documents/lock', {table, id});
            node.close();
            location.reload();
        } catch (error) {
            pending = false;
            showError(error.message);
            confirm.disabled = false;
            if (!node.open) button.disabled = false;
        }
    });
    node.append(notice, confirm);
}

function applyLockedState() {
    const toolbar = document.querySelector('[data-document-lock]');
    if (!toolbar) return;
    const locked = toolbar.dataset.locked === '1';
    const status = toolbar.querySelector('.gestion-status');
    if (status) status.textContent = locked ? t('gestion', 'Locked document') : t('gestion', 'Draft');
    const lockButton = toolbar.querySelector('#lock-document');
    if (lockButton) lockButton.hidden = locked;
    if (!locked) return;
    const notice = document.createElement('p');
    notice.className = 'gestion-lock-information gestion-locked-warning';
    notice.setAttribute('role', 'status');
    notice.textContent = lockedNotice(toolbar.dataset.table === 'facture');
    const help = document.createElement('a');
    help.href = 'https://baimard.github.io/gestion/document_lifecycle.html';
    help.target = '_blank';
    help.rel = 'noopener noreferrer';
    help.textContent = t('gestion', 'Read the document locking guide');
    notice.append(document.createTextNode(' '), help);
    toolbar.append(notice);
    document.querySelectorAll('#PDFcontent .editable, #PDFcontent .editableComment, #PDFcontent .editableNumeric, #PDFcontent .editableNumber').forEach(el => {
        el.classList.remove('editable','editableComment','editableNumeric','editableNumber');
        el.removeAttribute('contenteditable');
    });
    const add = document.getElementById('devisAdd');
    if (add) add.hidden = true;
}

document.addEventListener('DOMContentLoaded', () => {
    applyLockedState();
    // Keep action menus outside table clipping, including on the final row.
    let openActions = null;
    const closeActions = () => {
        if (openActions) openActions.removeAttribute('open');
    };
    document.addEventListener('toggle', event => {
        const details = event.target;
        if (!details.matches?.('.document-actions')) return;
        const menu = details.querySelector('.document-actions-menu');
        if (!menu) return;
        if (!details.open) {
            if (typeof menu.hidePopover === 'function' && menu.matches(':popover-open')) menu.hidePopover();
            if (openActions === details) openActions = null;
            return;
        }
        if (openActions && openActions !== details) closeActions();
        openActions = details;
        menu.classList.add('document-actions-menu-floating');
        menu.style.maxHeight = `${Math.max(44, innerHeight - 16)}px`;
        if (typeof menu.showPopover === 'function') {
            menu.popover = 'manual';
            if (!menu.matches(':popover-open')) menu.showPopover();
        }
        const trigger = details.querySelector('summary').getBoundingClientRect();
        const size = menu.getBoundingClientRect();
        menu.style.left = `${Math.max(8, Math.min(trigger.right - size.width, innerWidth - size.width - 8))}px`;
        menu.style.top = `${Math.max(8, trigger.bottom + size.height + 4 <= innerHeight - 8 ? trigger.bottom + 4 : trigger.top - size.height - 4)}px`;
    }, true);
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && openActions) {
            openActions.querySelector('summary').focus();
            closeActions();
        }
    });
    window.addEventListener('resize', closeActions);
    document.addEventListener('scroll', event => {
        if (openActions && !openActions.querySelector('.document-actions-menu').contains(event.target)) closeActions();
    }, true);
    document.querySelectorAll('#app-navigation a[href]').forEach(link => {
        if (new URL(link.href).pathname === location.pathname) link.setAttribute('aria-current','page');
    });
    const action = async (button, operation) => {
        button.disabled = true;
        try { await operation(); } catch (error) { showError(error.message); }
        finally { button.disabled = false; }
    };
    document.querySelector('[data-backup]')?.addEventListener('click', event => action(event.currentTarget, downloadBackup));
    document.querySelector('[data-restore-file]')?.addEventListener('change', event => restoreBackup(event.target).catch(error => showError(error.message)));
    document.querySelectorAll('[data-open-history]').forEach(button => button.addEventListener('click', () => showHistory().catch(error => showError(error.message))));
    document.getElementById('lock-document')?.addEventListener('click', event => lockDocument(event.currentTarget));
    document.addEventListener('click', event => {
        const button = event.target.closest('[data-lock-invoice]');
        if (button) lockDocument(button).catch(error => { button.disabled = false; showError(error.message); });
    });
    const precisionForm = document.getElementById('gestion-precision');
    if (precisionForm) {
        fetch(generateUrl('/apps/gestion/getConfiguration'), {method:'PROPFIND',headers:csrfHeaders()}).then(r => r.json()).then(result => {
            const config = JSON.parse(result)[0];
            for (const name of ['price_decimals', 'quantity_decimals']) precisionForm.elements[name].value = config[name] ?? 2;
        }).catch(error => showError(error.message));
        precisionForm.addEventListener('submit', async event => {
            event.preventDefault();
            const button = precisionForm.querySelector('button');
            await action(button, async () => {
                for (const name of ['price_decimals','quantity_decimals']) await request('/updateConfiguration', {column:name,data:precisionForm.elements[name].value});
                showSuccess(t('gestion', 'Number formatting saved.'));
                getCurrency([{price_decimals:precisionForm.elements.price_decimals.value,quantity_decimals:precisionForm.elements.quantity_decimals.value}]);
            });
        });
    }
});
