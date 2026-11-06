/* All destinations are rendered at build time, including missing-page fallbacks. */
document.addEventListener('DOMContentLoaded', () => {
    const picker = document.getElementById('gestion-doc-version');
    if (picker) picker.addEventListener('change', () => window.location.assign(picker.value));
});
