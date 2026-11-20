import { csrfHeaders } from './csrf.js';

export function readLogo(file) {
    if (file.size > 5 * 1024 * 1024) {
        throw new Error(t('gestion', 'Choose a logo file no larger than 5 MiB.'));
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',', 2)[1]);
        reader.onerror = () => reject(new Error(t('gestion', 'Unable to read the logo file.')));
        reader.readAsDataURL(file);
    });
}

export function initializeCompanyLogoUpload() {
    const form = document.querySelector('[data-company-logo]');
    if (!form) return;

    const submit = form.querySelector('button[type="submit"]');
    const status = form.querySelector('[role="status"]');
    form.addEventListener('submit', async event => {
        event.preventDefault();
        const { position, logo_file: file } = Object.fromEntries(new FormData(form));
        submit.disabled = true;
        status.textContent = t('gestion', 'Saving…');
        try {
            const response = await fetch(OC.generateUrl('/apps/gestion/company-logo'), {
                method: 'POST',
                headers: csrfHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ company: Number(form.dataset.company), position, image: await readLogo(file) }),
            });
            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || t('gestion', 'Unable to save the company logo.'));
            }
            form.reset();
            status.textContent = t('gestion', 'Company logo saved.');
        } catch (error) {
            status.textContent = error.message;
        } finally {
            submit.disabled = false;
        }
    });
}
