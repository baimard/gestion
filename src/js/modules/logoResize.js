const MIN_LOGO_WIDTH = 40;
const MAX_LOGO_WIDTH = 600;

function createResizeControl(image) {
    const control = document.createElement('label');
    control.className = 'gestion-logo-resize-control';
    control.dataset.html2canvasIgnore = '';

    const label = document.createElement('span');
    label.textContent = t('gestion', 'Logo width');

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = String(MIN_LOGO_WIDTH);
    slider.max = String(MAX_LOGO_WIDTH);
    slider.step = '10';
    const defaultWidth = image.classList.contains('gestion-document-logo-main') ? 160 : 320;
    slider.value = String(Math.round(image.getBoundingClientRect().width) || defaultWidth);
    slider.setAttribute('aria-label', t('gestion', 'Logo width'));

    const value = document.createElement('output');
    value.value = `${slider.value} px`;

    slider.addEventListener('input', () => {
        image.style.width = `${slider.value}px`;
        value.value = `${slider.value} px`;
    });

    control.append(label, slider, value);
    (image.closest('a') || image).insertAdjacentElement('afterend', control);
}

export function initializeLogoResizeControls() {
    document.querySelectorAll('#PDFcontent .gestion-document-logo').forEach(image => {
        if (!image.nextElementSibling?.classList.contains('gestion-logo-resize-control')) {
            createResizeControl(image);
        }
    });
}
