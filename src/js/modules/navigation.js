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

    if (!app || !navigation || app.querySelector('.gestion-navigation-toggle')) {
        return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gestion-navigation-toggle';
    button.setAttribute('aria-controls', 'app-navigation');
    setNavigationState(app, button, true);

    button.addEventListener('click', () => {
        setNavigationState(app, button, app.classList.contains(NAVIGATION_CLOSED_CLASS));
    });

    app.prepend(button);
}
