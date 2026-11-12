/* Native details and links also work without JavaScript. */
document.addEventListener('DOMContentLoaded', () => {
    const picker = document.querySelector('.gestion-doc-versions');
    if (!picker) return;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && picker.open) {
            picker.open = false;
            picker.querySelector('summary').focus();
        }
    });
    document.addEventListener('click', (event) => {
        if (!picker.contains(event.target)) picker.open = false;
    });
});
