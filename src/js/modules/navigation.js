const NAVIGATION_CLOSED_CLASS = 'gestion-navigation-closed';

function setNavigationState(app, button, isOpen) {
    app.classList.toggle(NAVIGATION_CLOSED_CLASS, !isOpen);
    button.setAttribute('aria-expanded', String(isOpen));

    const label = t('gestion', isOpen ? 'Close navigation' : 'Open navigation');
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
}

export function initializeNavigationToggle() {
    const app = document.getElementById('app');
    const navigation = document.getElementById('app-navigation');

    if (!app || !navigation) {
        return;
    }

    const button = app.querySelector('.gestion-navigation-toggle');
    if (!button || button.dataset.navigationToggleInitialized === 'true') {
        return;
    }

    button.dataset.navigationToggleInitialized = 'true';
    setNavigationState(app, button, true);

    button.addEventListener('click', () => {
        setNavigationState(app, button, app.classList.contains(NAVIGATION_CLOSED_CLASS));
    });
}
