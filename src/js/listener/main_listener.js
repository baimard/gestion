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

let lastKeyEventTime = 0;

const HOVERABLE_CLASSES = ["editable", "loadSelect", "selectable"];

function registerMainListeners() {
    document.body.addEventListener('click', handleBodyClick);
    document.body.addEventListener('dblclick', handleBodyDoubleClick);
    document.body.addEventListener('change', handleBodyChange);
    document.body.addEventListener('keydown', handleBodyKeydown);
    document.body.addEventListener('focusout', handleBodyFocusout);
    document.body.addEventListener('mouseover', handleBodyMouseover);
}

function handleBodyClick(event) {
    const target = event.target;

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

    if (target.classList.contains('duplicateItem')) {
        duplicateItem(target);
    }

    if (target.classList.contains('drop_down')) {
        dropItem(target, 'down');
    }

    if (target.classList.contains('drop_up')) {
        dropItem(target, 'up');
    }

    if (target.classList.contains('deleteItem')) {
        deleteItem(target);
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

function handleBodyDoubleClick(event) {
    if (event.target.classList.contains('selectable')) {
        showProductSelect(event.target);
    }
}

function handleBodyChange(event) {
    const target = event.target;

    if (target.classList.contains('listClient') || target.classList.contains('listDevis')) {
        updateLinkedListSelection(target);
    }

    if (target.classList.contains('inputDate')) {
        updateDateInput(target);
    }

    if (target.id === 'listProduit' || target.id === 'listDevis') {
        updateSelectedProduct(event);
    }

    if (target.classList.contains('editableSelect')) {
        updateEditableSelect(target);
    }

    if (target.id === "CurrentCompany-select") {
        updateCurrentCompanySelection(target);
    }
}

function handleBodyKeydown(event) {
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
