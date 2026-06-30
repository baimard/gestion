import { updateDB } from "../../modules/ajaxRequest.js";

export function updateLinkedListSelection(target) {
    const myDiv = target.closest("div");
    const id = myDiv.dataset.id;
    const val = target.value;
    const column = myDiv.dataset.column;
    const table = myDiv.dataset.table;
    target.setAttribute('data-current', target.value);
    updateDB(table, column, val, id);
}

export function updateDateInput(target) {
    updateDB(target.dataset.table, target.dataset.column, target.value, target.dataset.id);
}

export function updateEditableSelect(target) {
    const table = target.getAttribute('data-table');
    const column = target.getAttribute('data-column');
    const value = target.value;
    const id = target.getAttribute('data-id');

    updateDB(table, column, value, id);
}
