/**
 * Return the Nextcloud CSRF token exposed to frontend scripts.
 *
 * Nextcloud versions have exposed the token as either OC.requestToken or
 * oc_requesttoken. Supporting both keeps the app compatible with older and
 * newer supported instances.
 */
export function getRequestToken() {
    return globalThis.OC?.requestToken || globalThis.oc_requesttoken;
}

/**
 * Build headers with the CSRF token required by Nextcloud controllers.
 *
 * @param {Object} headers Additional request headers.
 */
export function csrfHeaders(headers = {}) {
    const requestToken = getRequestToken();

    return {
        ...headers,
        requesttoken: requestToken,
        'X-Request-Token': requestToken,
    };
}

/**
 * Add the Nextcloud CSRF token to an XMLHttpRequest.
 *
 * @param {XMLHttpRequest} request
 */
export function setCsrfRequestHeader(request) {
    const requestToken = getRequestToken();

    request.setRequestHeader('requesttoken', requestToken);
    request.setRequestHeader('X-Request-Token', requestToken);
}
