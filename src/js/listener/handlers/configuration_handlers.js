import { getFilePickerBuilder, showError, showSuccess } from "@nextcloud/dialogs";
import { updateCurrentCompany } from "../../modules/ajaxRequest.js";
import { baseUrl } from "../../modules/mainFunction.js";
import { csrfHeaders } from "../../modules/csrf.js";

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

async function updateSelectedFolder(nodes) {
    const selectedFolder = nodes[0]?.path;
    const theFolder = document.getElementById('theFolder');

    if (!selectedFolder || !theFolder) {
        return;
    }

    try {
        const response = await fetch(baseUrl + '/updateConfiguration', {
            method: 'POST',
            headers: csrfHeaders({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                column: 'path',
                data: selectedFolder
            })
        });

        if (!response.ok) {
            throw new Error('Configuration update failed');
        }

        theFolder.value = selectedFolder;
        showSuccess(t('gestion', 'Modification saved'));
    } catch (error) {
        console.error('Unable to save the selected folder:', error);
        showError(t('gestion', 'There is an error with the format, please check the documentation'));
    }
}
