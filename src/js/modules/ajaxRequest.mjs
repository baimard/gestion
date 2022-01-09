import { showMessage, showSuccess, showError } from "@nextcloud/dialogs";
import { generateUrl } from "@nextcloud/router";

import { getCurrency, insertCell, insertRow, modifyCell, showDone } from "./mainFunction.mjs";
import { Product } from "../objects/product.mjs";
import { Client } from "../objects/client.mjs";
import { Devis } from "../objects/devis.mjs";
import { loadClientList } from "./mainFunction.mjs";
import { LoadDT } from "./mainFunction.mjs";
import { Facture } from "../objects/facture.mjs";
import { loadDevisList } from "./mainFunction.mjs";
var baseUrl = generateUrl('/apps/gestion');

/**
 * Get customers
 * @param baseUrl 
 * @param callback 
 */
export function getClients(callback) {
    $.ajax({
        url: baseUrl + '/getClients',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        callback(response);
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * Get quote
 * @param callback 
 */
export function getDevis(callback) {
    $.ajax({
        url: baseUrl + '/getDevis',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        callback(response);
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * New invoice
 */
export function newInvoice() {
    $.ajax({
        url: baseUrl + '/facture/insert',
        type: 'POST',
        async: false,
        contentType: 'application/json'
    }).fail(function (response, code) {
        showError(response);
    }).done(
        showDone()
    );
}

/**
 * Update data
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
    }).done(function (response, code) {
        showSuccess(t('gestion', 'Modification saved'));
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * Delete data
 * @param table 
 * @param id 
 */
export function deleteDB(table, id) {
    var myData = {
        table: table,
        id: id,
    };

    $.ajax({
        url: baseUrl + '/delete',
        type: 'DELETE',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function (response, code) {
        showMessage(t('gestion', 'Modification saved'));
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * Load product ajax
 * @param productDT product datatable
 */
export function loadProduitDT(productDT) {
    $.ajax({
        url: baseUrl + '/getProduits',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        LoadDT(productDT, response, Product);
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * Load client ajax
 * @param clientDT client datatable
 */
export function loadClientDT(clientDT) {
    $.ajax({
        url: baseUrl + '/getClients',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        LoadDT(clientDT, response, Client);
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * Load devis ajax
 * @param devisDT devis datatable
 */
export function loadDevisDT(devisDT) {
    $.ajax({
        url: baseUrl + '/getDevis',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        LoadDT(devisDT, response, Devis);
        loadClientList();
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * Load facture ajax
 * @param factureDT 
 */
export function loadFactureDT(factureDT) {
    $.ajax({
        url: baseUrl + '/getFactures',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        LoadDT(factureDT, response, Facture);
        loadDevisList();
        configuration(checkAutoIncrement);
    }).fail(function (response, code) {
        showError(response);
    });
}


export function getStats() {
    $.ajax({
        url: baseUrl + '/getStats',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        var res = JSON.parse(response);
        $("#statsclient").text(res.client);
        $("#statsdevis").text(res.devis);
        $("#statsfacture").text(res.facture);
        $("#statsproduit").text(res.produit);
    }).fail(function (response, code) {
        showError(response);
    });
}

export function configuration(f1) {
    $.ajax({
        url: baseUrl + '/getConfiguration',
        type: 'PROPFIND',
        contentType: 'application/json',
        async: false,
    }).done(function (response) {
        f1(response);
    }).fail(function (response, code) {
        showError(response);
    });
}

var checkAutoIncrement = function (response){
    var myresp = JSON.parse(response)[0];
    if(myresp.auto_invoice_number==1){
        $('.deleteItem').remove();
        $(".factureNum").removeClass("editable");
    }
}

export function getAnnualTurnoverPerMonthNoVat(cur) {
    $.ajax({
        url: baseUrl + '/getAnnualTurnoverPerMonthNoVat',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        var res = JSON.parse(response);
        var curY = "";
        var curRow;
        res.forEach(function(item){
            if(curY !== item.y){
                curY = item.y;
                curRow = insertRow("Statistical", -1, 0, item.y);
                modifyCell(curRow, item.m, cur.format(Math.round(item.total)));
            }else{
                modifyCell(curRow, item.m, cur.format(Math.round(item.total)));
            }
            console.log(curRow.cells.lenght);
        });
    }).fail(function (response, code) {
        showError(response);
    });
}