const NAVIGATION_CLOSED_CLASS = 'gestion-navigation-closed';
const MOBILE_NAVIGATION_QUERY = '(max-width: 1023px)';

function setButtonState(button, isOpen) {
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
    const mobileQuery = window.matchMedia(MOBILE_NAVIGATION_QUERY);
    const content = document.getElementById('app-content');
    const closeButton = navigation.querySelector('.gestion-navigation-close');
    const backdrop = document.createElement('button');
    backdrop.type = 'button';
    backdrop.className = 'gestion-navigation-backdrop';
    backdrop.setAttribute('aria-label', t('gestion', 'Close navigation'));
    backdrop.tabIndex = -1;
    backdrop.hidden = true;
    app.append(backdrop);

    function setMobileOpen(isOpen, restoreFocus = false) {
        app.classList.toggle('gestion-mobile-navigation-open', isOpen);
        backdrop.hidden = !isOpen;
        if (content) content.inert = isOpen;
        setButtonState(button, isOpen);
        if (isOpen) closeButton?.focus();
        else if (restoreFocus) button.focus();
    }

    if (mobileQuery.matches) setMobileOpen(false);
    else setButtonState(button, true);

    button.addEventListener('click', () => {
        if (mobileQuery.matches) {
            setMobileOpen(!app.classList.contains('gestion-mobile-navigation-open'));
            return;
        }

        const isOpen = app.classList.contains(NAVIGATION_CLOSED_CLASS);
        app.classList.toggle(NAVIGATION_CLOSED_CLASS, !isOpen);
        setButtonState(button, isOpen);
    });

    closeButton?.addEventListener('click', () => setMobileOpen(false, true));
    backdrop.addEventListener('click', () => setMobileOpen(false, true));
    navigation.addEventListener('click', event => {
        if (mobileQuery.matches && event.target.closest('a[href], #theFolder')) {
            setMobileOpen(false);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && app.classList.contains('gestion-mobile-navigation-open')) {
            event.preventDefault();
            setMobileOpen(false, true);
        }
    });
    mobileQuery.addEventListener('change', event => {
        app.classList.remove(NAVIGATION_CLOSED_CLASS, 'gestion-mobile-navigation-open');
        setMobileOpen(false);
        setButtonState(button, !event.matches);
    });
}
