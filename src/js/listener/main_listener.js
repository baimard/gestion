import { Client } from '../objects/client.js';
import { Devis } from '../objects/devis.js';
import {
    applyMouseOverStyles,
    enableInlineEdit,
    isInlineEditable,
    saveEditableElement,
    shouldSkipInlineEdit,
} from './handlers/editable_handlers.js';
import {
    closeModal,
    openAboutModal,
    openFolderPicker,
    updateCurrentCompanySelection,
} from './handlers/configuration_handlers.js';
import {
    deleteItem,
    dropItem,
    duplicateItem,
    handleNewItemClick,
} from './handlers/table_handlers.js';
import {
    addProductToDevis,
    showProductSelect,
    updateSelectedProduct,
} from './handlers/product_handlers.js';
import {
    updateDateInput,
    updateEditableSelect,
    updateLinkedListSelection,
} from './handlers/select_handlers.js';
import {
    handleVatCategoryChange,
    openVatExemptionReasonModal,
    saveVatExemptionReason,
} from './handlers/vat_exemption_handlers.js';
import { createInvoiceFromQuote } from './handlers/invoice_handlers.js';

let lastKeyEventTime = 0;

const HOVERABLE_CLASSES = ["editable", "loadSelect", "selectable"];

function registerMainListeners() {
    document.body.addEventListener('click', handleBodyClick);
    document.body.addEventListener('change', handleBodyChange);
    document.body.addEventListener('keydown', handleBodyKeydown);
    document.body.addEventListener('focusout', handleBodyFocusout);
    document.body.addEventListener('mouseover', handleBodyMouseover);
}

function handleBodyClick(event) {
    const target = event.target;
    const actionMenu = target.closest?.('.document-actions');
    const actionMenuSummary = target.closest?.('.document-actions > summary');
    const duplicateAction = target.closest?.('.duplicateItem');
    const deleteAction = target.closest?.('.deleteItem');
    const productReference = target.closest?.('.product-reference-selector');
    const createInvoiceAction = target.closest?.('.createInvoiceFromQuote');

    if (createInvoiceAction) {
        actionMenu?.removeAttribute('open');
        createInvoiceFromQuote(createInvoiceAction);
        return;
    }

    if (productReference) {
        showProductSelect(productReference);
        return;
    }

    if (actionMenuSummary) {
        document.querySelectorAll('.document-actions[open]').forEach(menu => {
            if (menu !== actionMenu) {
                menu.removeAttribute('open');
            }
        });
    } else if (!actionMenu) {
        document.querySelectorAll('.document-actions[open]').forEach(menu => menu.removeAttribute('open'));
    }
    const vatExemptionAction = target.closest?.('.vat-exemption-reason-action');

    if (vatExemptionAction) {
        openVatExemptionReasonModal(vatExemptionAction);
        return;
    }

    if (target && target.id === 'save_vat_exemption_reason') {
        saveVatExemptionReason();
        return;
    }

    if (target && target.id === 'about') {
        openAboutModal();
    }

    if (target && target.id === 'theFolder') {
        openFolderPicker();
    }

    handleEditableOrCreationClick(event);

    if (target.classList.contains('menu')) {
        const menu = document.getElementById('menu-' + target.dataset.menu);
        menu.classList.toggle('open');
    }

    if (target.classList.contains('modalClose')) {
        closeModal(target);
    }

    if (duplicateAction) {
        actionMenu?.removeAttribute('open');
        duplicateItem(duplicateAction);
    }

    if (target.classList.contains('drop_down')) {
        dropItem(target, 'down');
    }

    if (target.classList.contains('drop_up')) {
        dropItem(target, 'up');
    }

    if (deleteAction) {
        actionMenu?.removeAttribute('open');
        deleteItem(deleteAction);
    }

    if (target.id === 'devisAdd') {
        addProductToDevis();
    }
}

function handleEditableOrCreationClick(event) {
    const target = event.target;

    if (shouldSkipInlineEdit(target)) {
        return;
    }

    if (isInlineEditable(target)) {
        enableInlineEdit(target);
        return;
    }

    if (target.classList.contains("loadSelect_listclient")) {
        Client.loadClientList_cid(event);
        return;
    }

    if (target.classList.contains("loadSelect_listdevis")) {
        Devis.loadDevisList_dnum(event);
        return;
    }

    handleNewItemClick(target);
}

async function handleBodyChange(event) {
    const target = event.target;

    if (target.classList.contains('listClient') || target.classList.contains('listDevis')) {
        updateLinkedListSelection(target);
    }

    if (target.classList.contains('inputDate')) {
        updateDateInput(target);
    }

    if (target.id === 'listDevis') {
        updateSelectedProduct(event);
    }

    if (target.classList.contains('vat-category-select')) {
        await handleVatCategoryChange(target);
    } else if (target.classList.contains('editableSelect')) {
        await updateEditableSelect(target);
    }

    if (target.id === "CurrentCompany-select") {
        updateCurrentCompanySelection(target);
    }
}

function handleBodyKeydown(event) {
    if (event.key === 'Escape') {
        const openActionMenu = event.target.closest?.('.document-actions[open]');

        if (openActionMenu) {
            openActionMenu.removeAttribute('open');
            openActionMenu.querySelector('summary')?.focus();
            return;
        }
    }

    if (event.key !== "Enter") {
        return;
    }

    lastKeyEventTime = Date.now();
    saveEditableElement(event.target, true);
}

function handleBodyFocusout(event) {
    if (Date.now() - lastKeyEventTime < 100) {
        event.preventDefault();
        return;
    }

    saveEditableElement(event.target);
}

function handleBodyMouseover(event) {
    if (HOVERABLE_CLASSES.some(className => event.target.classList.contains(className))) {
        applyMouseOverStyles(event.target);
    }
}

document.addEventListener('DOMContentLoaded', registerMainListeners);
