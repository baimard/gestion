import { showSuccess } from "@nextcloud/dialogs";
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import { configuration, getStats, isconfig } from "./ajaxRequest.mjs";

import { generateUrl } from "@nextcloud/router";
import { Devis } from "../objects/devis.mjs";
import { Client } from "../objects/client.mjs";

export var baseUrl = generateUrl('/apps/gestion');
export var cur = null;

/**
 * 
 */
 export var optionDatatable = {
    autoWidth: false,
    stateSave: true,
    language: {
        "search": t('gestion', 'Search'),
        "emptyTable": t('gestion', 'No data available in table'),
        "info": t('gestion', 'Showing {start} to {end} of {total} entries', { start: '_START_', end: '_END_', total: '_TOTAL_' }),
        "infoEmpty": t('gestion', 'Showing 0 to 0 of 0 entries'),
        "loadingRecords": t('gestion', 'Loading records …'),
        "processing": t('gestion', 'Processing …'),
        "infoFiltered": t('gestion', '{max} entries filtered', { max: '_MAX_' }),
        "lengthMenu": t('gestion', 'Show {menu} entries', { menu: '_MENU_' }),
        "zeroRecords": t('gestion', 'No corresponding entry'),
        "paginate": {
            "first": t('gestion', 'First'),
            "last": t('gestion', 'Last'),
            "next": t('gestion', 'Next'),
            "previous": t('gestion', 'Previous'),
        }
    }
}

export function globalConfiguration(){
    getStats();
    isconfig();
    configuration(getCurrency);
    configuration(path);
}

/**
 * 
 */
export function configureDT() {
    $('.editable').attr('title', t('gestion', 'Editable (Click to change)'));
}

/**
 * 
 */
export function configureShow() {
    $('.sendmail').attr('title', t('gestion', 'Your global Nextcloud mail server need to be configured'));
}

/**
 * Success message
 */
export function showDone() {
    showSuccess(t('gestion', 'Added!'));
}

/**
 * 
 * @param {*} el 
 */
export function checkSelect(el) {
    $(el).each(function (arrayID, elem) {
        $(elem).find('option').each(function () {
            if (this.value == elem.getAttribute("data-current")) {
                $(this).prop('selected', true)
            }
        })
    })
}

/**
 * 
 * @param {*} DT 
 * @param {*} response 
 * @param {*} cls 
 */
export function LoadDT(DT, response, cls) {
    DT.clear();
    $.each(JSON.parse(response), function (arrayID, myresp) {
        let c = new cls(myresp);
        DT.row.add(c.getDTRow());
    });
    DT.columns.adjust(optionDatatable).draw(true);
    configureDT();
}

/**
 * 
 */
export function loadDevisList() {
    Devis.getDevis(function (response) {
        $('.listDevis').empty();
        $('.listDevis').append("<option value='0'>" + t('gestion', 'Choose quote') + "</option>");
        $.each(JSON.parse(response), function (arrayID, myresp) {
            $('.listDevis').append("<option value='" + myresp.id + "'>" + myresp.num + ' ' + myresp.prenom + ' ' + myresp.nom + "</option>");
        });
        checkSelect('.listDevis');
        configuration(checkAutoIncrement);
    });
}

/**
 * 
 */
export function loadClientList() {
    Client.getClients(function (response) {
        $('.listClient').empty();
        $('.listClient').append("<option value='0'>" + t('gestion', 'Choose customer') + "</option>");
        $.each(JSON.parse(response), function (arrayID, myresp) {
            $('.listClient').append("<option value='" + myresp.id + "'>" + myresp.nom + " " + myresp.prenom + "</option>");
        });
        checkSelect('.listClient');
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
 * @param {*} row
 * @param {*} positionColumn 
 * @param {*} data 
 */
export function insertCell(row, positionColumn = -1, data){
    var c = row.insertCell(positionColumn);
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
}

/**
 * 
 * @param {*} res 
 */
 export function path(res) {
    var myres = JSON.parse(res)[0];
    $("#theFolder").val(myres.path);
    $("#theFolder").attr('data-id', myres.id);
};


/**
 * 
 * @param {*} response 
 */
 export function getCurrency(response) {
    var myresp = JSON.parse(response)[0];
    cur = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: myresp.devise, minimumFractionDigits: 2 });
}

/**
 * 
 * @param {*} total 
 */
export function getGlobal(total) {
    $.ajax({
        url: baseUrl + '/getConfiguration',
        type: 'PROPFIND',
        contentType: 'application/json',
    }).done(function (response) {
        var myresp = JSON.parse(response)[0];
        var tva = parseFloat(myresp.tva_default);
        $('#totaldevis tbody').append('<tr><td>' + cur.format(total) + '</td><td id="tva">' + tva + ' %</td><td id="totaltva">' + cur.format(Math.round((total * tva)) / 100) + '</td><td>' + cur.format(Math.round((total * (tva + 100))) / 100) + '</td></tr>');
        $('#mentions_default').html(myresp.mentions_default);
    })
}

/**
 * 
 * @param {*} response 
 */
export function checkAutoIncrement(response){
    var myresp = JSON.parse(response)[0];
    if(myresp.auto_invoice_number==1){
        $('.deleteItem').remove();
        $(".factureNum").removeClass("editable");
    }
}