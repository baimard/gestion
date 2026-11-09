/* All destinations are rendered at build time, including missing-page fallbacks. */
document.addEventListener('DOMContentLoaded', () => {
    const picker = document.getElementById('gestion-doc-version');
    if (picker) {
        picker.addEventListener('change', () => {
            const selectedDestination = picker.value;

            let parsedDestination;
            try {
                parsedDestination = new URL(selectedDestination, window.location.origin);
            } catch {
                return;
            }

            const isHttp = parsedDestination.protocol === 'http:' || parsedDestination.protocol === 'https:';
            const isSameOrigin = parsedDestination.origin === window.location.origin;
            if (isHttp && isSameOrigin) {
                window.location.assign(parsedDestination.href);
            }
        });
    }
});
