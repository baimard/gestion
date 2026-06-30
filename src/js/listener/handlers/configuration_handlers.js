import { getFilePickerBuilder } from "@nextcloud/dialogs";
import { configuration, updateCurrentCompany, updateDBConfiguration } from "../../modules/ajaxRequest.js";
import { path } from "../../modules/mainFunction.js";

const chooseFolderLabel = t('gestion', 'Choose work folder');

export function openAboutModal() {
    const modal = document.getElementById("modalConfig");
    if (modal) {
        modal.style.display = "block";
    }
}

export function closeModal(target) {
    const modal = target.parentElement.parentElement;
    modal.style.display = "none";
}

export function openFolderPicker() {
    getFilePickerBuilder(chooseFolderLabel)
        .allowDirectories(true)
        .setMultiSelect(false)
        .addButton({
            label: t('gestion', 'Choose'),
            callback: updateSelectedFolder,
        })
        .build()
        .pick()
        .catch(error => {
            console.error("Erreur lors de l'ouverture du sélecteur :", error);
        });
}

export function updateCurrentCompanySelection(target) {
    updateCurrentCompany(target.value);
}

function updateSelectedFolder(nodes) {
    const values = nodes.map(node => node.path);
    const theFolder = document.getElementById('theFolder');
    const table = theFolder.getAttribute('data-table');
    const column = theFolder.getAttribute('data-column');
    const id = theFolder.getAttribute('data-id');

    updateDBConfiguration(table, column, values[0], id);
    configuration(path);
    document.getElementById('theFolder').value = values[0];
}
