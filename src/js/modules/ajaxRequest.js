import { showMessage, showSuccess, showError } from "@nextcloud/dialogs";
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import { baseUrl, cur, getGlobal, insertCell, insertRow, modifyCell } from "./mainFunction.js";
import { csrfHeaders, setCsrfRequestHeader } from "./csrf.js";

/**
 * Update data
 * @param table 
 * @param column 
 * @param data 
 * @param id 
 */
export async function updateDB(table, column, data, id) {
    const myData = {
        table: table,
        column: column,
        data: data,
        id: id,
    };
    try {
        const response = await fetch(baseUrl + '/update', {
            method: 'POST',
            headers: csrfHeaders({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(myData)
        });

        if (response.ok) {
            showSuccess(t('gestion', 'Modification saved'));
        } else {
            showError(t('gestion', 'There is an error with the format, please check the documentation'));
        }
    } catch (error) {
        showError(t('gestion', 'There is an error with the format, please check the documentation'));
    }
}


/**
 * Update the current company configuration.
 * The server resolves the company from the active session and does not trust
 * the company identifier supplied by the browser.
 *
 * @param table
 * @param column
 * @param data
 * @param id Kept for backward compatibility with existing callers.
 * @return {Promise<Response>}
 */
export async function updateDBConfiguration(table, column, data, id = '') {
    const myData = {
        table: table,
        column: column,
        data: data,
        id: id,
    };

    try {
        const response = await fetch(baseUrl + '/updateConfiguration', {
            method: 'POST',
            headers: csrfHeaders({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(myData)
        });

        if (!response.ok) {
            throw new Error('Configuration update failed');
        }

        showSuccess(t('gestion', 'Modification saved'));
        return response;
    } catch (error) {
        showError(t('gestion', 'There is an error with the format, please check the documentation'));
        throw error;
    }
}

/**
 * Create a new company
 */
export function createCompany() {
    fetch(baseUrl + '/createCompany', {
        method: 'PUT',
        headers: csrfHeaders({
            'Content-Type': 'application/json'
        })
    })
    .then(response => {
        if (response.ok) {
            showSuccess(t('gestion', 'New company created'));
            location.reload();
        } else {
            showError(t('gestion', 'There is an error.'));
        }
    })
    .catch(error => {
        showError(t('gestion', 'There is an error.'));
    });
}

/**
 * Delete a company
 */
export function deleteCompany() {
    if (window.confirm(t('gestion', 'Are you sure you want to delete? (All data will be lost)'))) {
        fetch(baseUrl + '/deleteCompany', {
            method: 'DELETE',
            headers: csrfHeaders({
                'Content-Type': 'application/json'
            })
        })
        .then(response => {
            if (response.ok) {
                // Request successful
                showSuccess(t('gestion', 'Company deleted'));
                location.reload();
            } else {
                showError(t('gestion', 'There is an error.'));
            }
        })
        .catch(error => {
            showError(t('gestion', 'There is an error.'));
        });
    }
}

/**
 * Update session var
 * @param table 
 * @param column 
 */
export function updateCurrentCompany(companyID) {
    var myData = {
        companyID: companyID
    };
    
    fetch(baseUrl + '/updateSession', {
        method: 'POST',
        headers: csrfHeaders({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(myData)
    })
    .then(response => {
        if (response.ok) {
            // Request successful
            showSuccess(t('gestion', 'Modification saved'));
            window.location.reload();
        } else {
            // Request failed
            showError(t('gestion', 'There is an error with the format, please check the documentation'));
        }
    })
    .catch(error => {
        // Connection error
        showError(t('gestion', 'There is an error with the format, please check the documentation'));
    });
}


/**
 * Duplicate data
 * @param table
 * @param id 
 */
export function duplicateDB(table, id, callback=null, modifier=null) {
    var myData = {
        table: table,
        id: id,
    };
    if (window.confirm(t('gestion', 'Are you sure you want to duplicate?'))) {
        fetch(baseUrl + '/duplicate', {
            method: 'PUT',
            headers: csrfHeaders({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(myData)
        })
        .then(response => {
            if (response.ok) {
                showSuccess(t('gestion', 'Duplicated'));
                callback(modifier);
            } else {
                showError(response);
            }
        })
        .catch(error => {
            showError(error);
        });
    }
}