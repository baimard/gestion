import { getFilePickerBuilder } from "@nextcloud/dialogs";
import { updateCurrentCompany, updateDBConfiguration } from "../../modules/ajaxRequest.js";

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
        await updateDBConfiguration(
            'configuration',
            'path',
            selectedFolder,
            theFolder.getAttribute('data-id') || ''
        );

        theFolder.value = selectedFolder;
    } catch (error) {
        console.error('Unable to save the selected folder:', error);
    }
}