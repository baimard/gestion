import { getFilePickerBuilder, showError, showSuccess } from "@nextcloud/dialogs";
import { updateCurrentCompany } from "../../modules/ajaxRequest.js";
import { baseUrl } from "../../modules/mainFunction.js";
import { csrfHeaders } from "../../modules/csrf.js";

const chooseFolderLabel = t('gestion', 'Choose work folder');
let aboutTrigger = null;

export function openAboutModal() {
    const modal = document.getElementById("modalConfig");
    if (modal) {
        aboutTrigger = document.activeElement;
        modal.style.display = "block";
        modal.scrollTop = 0;
        modal.querySelector('.modalClose')?.focus();
    }
}

export async function closeModal(target) {
    const modal = target.closest('.modal');
    if (!modal || modal.dataset.acknowledging === '1') return;
    if (modal.id === 'modalConfig' && modal.dataset.announcementVersion) {
        modal.dataset.acknowledging = '1';
        target.setAttribute('aria-disabled', 'true');
        try {
            const response = await fetch(baseUrl + '/announcements/acknowledge', {
                method: 'POST',
                headers: csrfHeaders({'Content-Type': 'application/json'}),
                body: JSON.stringify({version: modal.dataset.announcementVersion}),
            });
            if (!response.ok) throw new Error();
            delete modal.dataset.announcementVersion;
        } catch {
            showError(t('gestion', 'The operation could not be completed.'));
            return;
        } finally {
            delete modal.dataset.acknowledging;
            target.removeAttribute('aria-disabled');
        }
    }
    modal.style.display = "none";
    if (modal.id === 'modalConfig') aboutTrigger?.focus();
}

export function initializeReleaseAnnouncement() {
    const modal = document.getElementById('modalConfig');
    if (!modal) return;
    modal.addEventListener('keydown', event => {
        const close = modal.querySelector('.modalClose');
        if (event.key === 'Escape' || (event.target === close && ['Enter', ' '].includes(event.key))) {
            event.preventDefault();
            event.stopPropagation();
            closeModal(close);
        } else if (event.key === 'Tab') {
            const controls = [...modal.querySelectorAll('a[href], button, [tabindex="0"]')].filter(el => el.getClientRects().length && !el.disabled);
            const first = controls[0], last = controls.at(-1);
            if (event.shiftKey && event.target === first) { event.preventDefault(); last?.focus(); }
            else if (!event.shiftKey && event.target === last) { event.preventDefault(); first?.focus(); }
        }
    });
    if (modal.dataset.announcementVersion) openAboutModal();
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
