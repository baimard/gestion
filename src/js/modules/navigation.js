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
    setButtonState(button, !mobileQuery.matches);

    button.addEventListener('click', () => {
        if (mobileQuery.matches) {
            const nativeToggle = document.getElementById('app-navigation-toggle');
            const isOpen = document.body.classList.contains('snapjs-left');

            nativeToggle?.dispatchEvent(new KeyboardEvent('keypress', {
                bubbles: true,
                key: 'Enter',
            }));
            setButtonState(button, !isOpen);
            return;
        }

        const isOpen = app.classList.contains(NAVIGATION_CLOSED_CLASS);
        app.classList.toggle(NAVIGATION_CLOSED_CLASS, !isOpen);
        setButtonState(button, isOpen);
    });

    mobileQuery.addEventListener('change', event => {
        app.classList.remove(NAVIGATION_CLOSED_CLASS);
        setButtonState(button, event.matches
            ? document.body.classList.contains('snapjs-left')
            : true);
    });
}
