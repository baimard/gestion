// import {translate as t, translatePlural as n} from '@nextcloud/l10n'
import { FilePicker, showMessage, showSuccess, showError } from "@nextcloud/dialogs";
import { getDevis } from "./ajaxRequest.mjs";
import { getClients } from "./ajaxRequest.mjs";

export function configureDT() {
    $('.editable').attr('title', t('gestion', 'Editable (Click to change)'));
}

export function configureShow() {
    $('.sendmail').attr('title', t('gestion', 'Your global Nextcloud mail server need to be configured'));
}

/**
 * Support de langue pour datatable
 */
export function langage() {
    return;
}

/**
 * Success message
 */
export function showDone() {
    showSuccess(t('gestion', 'Added'));
}

export function checkSelect(el) {
    $(el).each(function (arrayID, elem) {
        $(elem).find('option').each(function () {
            if (this.value == elem.getAttribute("data-current")) {
                $(this).prop('selected', true)
            }
        })
    })
}

export function LoadDT(DT, response, cls) {
    DT.clear();
    $.each(JSON.parse(response), function (arrayID, myresp) {
        let c = new cls(myresp);
        DT.row.add(c.getDTRow());
    });
    DT.columns.adjust().draw();
    configureDT();
}

export function loadDevisList() {
    getDevis(function (response) {
        $('.listDevis').empty();
        $('.listDevis').append("<option value='0'>" + t('gestion', 'Choose quote') + "</option>");
        $.each(JSON.parse(response), function (arrayID, myresp) {
            $('.listDevis').append("<option value='" + myresp.id + "'>" + myresp.num + ' ' + myresp.prenom + ' ' + myresp.nom + "</option>");
        });
        checkSelect('.listDevis');
    });
}

export function loadClientList() {
    getClients(function (response) {
        $('.listClient').empty();
        $('.listClient').append("<option value='0'>" + t('gestion', 'Choose customer') + "</option>");
        $.each(JSON.parse(response), function (arrayID, myresp) {
            $('.listClient').append("<option value='" + myresp.id + "'>" + myresp.nom + " " + myresp.prenom + "</option>");
        });
        checkSelect('.listClient');
    });
}

/**
 * Depreciated
 * @param lc 
 * @param id 
 * @param table 
 * @param column 
 */
function listClient(lc, id, table, column) {
    $.ajax({
        url: baseUrl + '/getClients',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        $.each(JSON.parse(response), function (arrayID, myresp) {
            lc.append('<option data-table="' + table + '" data-column="' + column + '" data-val="' + myresp.id + '" data-id="' + id + '">' + myresp.prenom + ' ' + myresp.nom + ' ' + '</option>');
        });
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * 
 * @param {*} ID 
 * @param {*} positionRow 
 * @param {*} positionColumn 
 * @param {*} data 
 */
export function insertRow(ID, positionRow = -1, positionColumn = -1, data){
    t = document.getElementById(ID);
    var r = t.insertRow(positionRow);
    insertCell(r, -1, data);
    for (let i = 1; i < 13; i++) {
        insertCell(r, -1, 0);
    }
    return r;
}
/**
 * 
 * @param {*} r 
 * @param {*} positionColumn 
 * @param {*} data 
 */
export function insertCell(r, positionColumn = -1, data){
    var c = r.insertCell(positionColumn);
    c.appendChild(document.createTextNode(data));
}

/**
 * 
 * @param {*} r 
 * @param {*} positionColumn 
 * @param {*} data 
 */
export function modifyCell(r, positionColumn = -1, data){
    
    var cell = r.cells[positionColumn];
    cell.innerHTML = data;
    console.log(r);
    
}