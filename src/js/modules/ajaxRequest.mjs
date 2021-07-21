import {showMessage,showError} from "@nextcloud/dialogs";
import {generateUrl} from "@nextcloud/router";
var baseUrl = generateUrl('/apps/gestion');

/**
 * 
 * @param baseUrl 
 * @param callback 
 */
export function getClients(callback) {
    $.ajax({
        url: baseUrl + '/getClients',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        callback(response);
    }).fail(function(response, code) {
        showError(response);
    });
}

/**
 * 
 * @param table 
 * @param column 
 * @param data 
 * @param id 
 */
export function updateDB(table, column, data, id) {
    var myData = {
        table: table,
        column: column,
        data: data,
        id: id,
    };

    $.ajax({
        url: baseUrl + '/update',
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function(response, code) {
        showMessage("Les modifications ont été enregistrées");
    }).fail(function(response, code) {
        showError(response);
    });
}