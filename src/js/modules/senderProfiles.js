import { csrfHeaders } from './csrf.js';
import { readLogo } from './logoUpload.js';

async function save(form, path, payload) {
    const status = form.querySelector('[data-profile-status]');
    const controls = [...form.querySelectorAll('button, select')];
    controls.forEach(control => { control.disabled = true; });
    status.textContent = t('gestion', 'Saving…');
    try {
        const response = await fetch(OC.generateUrl('/apps/gestion' + path), {
            method: 'POST',
            headers: csrfHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(await payload()),
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || t('gestion', 'Unable to save the sender profile.'));
        }
        window.location.reload();
    } catch (error) {
        status.textContent = error.message;
        controls.forEach(control => { control.disabled = false; });
    }
}

export function initializeSenderProfiles() {
    for (const form of document.querySelectorAll('[data-sender-profile]')) {
        const { company, id } = form.dataset;
        const logoFile = form.elements.namedItem('logo_file');
        const removeLogo = form.elements.namedItem('remove_logo');
        if (removeLogo) {
            removeLogo.addEventListener('change', () => {
                if (removeLogo.checked) logoFile.value = '';
            });
            logoFile.addEventListener('change', () => {
                if (logoFile.files.length) removeLogo.checked = false;
            });
        }
        form.addEventListener('submit', event => {
            event.preventDefault();
            const { label, contact, address, email, phone, logo_file: file, remove_logo: remove, hide_company_logos: hideCompanyLogos } = Object.fromEntries(new FormData(form));
            save(form, '/sender-profiles', async () => {
                const profile = { label, contact, address, email, phone, hide_company_logos: Boolean(hideCompanyLogos) };
                if (file.size) profile.logo = await readLogo(file);
                else if (remove) profile.logo = '';
                return { company: Number(company), id, profile };
            });
        });
        form.querySelector('[data-delete-profile]')?.addEventListener('click', () => {
            if (window.confirm(t('gestion', 'Delete this sender profile?'))) {
                save(form, '/sender-profiles', () => ({ company: Number(company), id, profile: null }));
            }
        });
    }

    const form = document.querySelector('[data-sender-choice]');
    form?.addEventListener('submit', event => {
        event.preventDefault();
        const id = new FormData(form).get('profile');
        const { company, quote } = form.dataset;
        save(form, '/devis/' + encodeURIComponent(quote) + '/sender-profile', () => ({ company: Number(company), id }));
    });
}
