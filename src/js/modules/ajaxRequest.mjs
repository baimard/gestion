import {showMessage,showError} from "@nextcloud/dialogs";
import {generateUrl} from "@nextcloud/router";
import { configureDT, showDone, checkSelect } from "./mainFunction.mjs";
import { Product } from "../objects/product.mjs";
import { Client } from "../objects/client.mjs";
import { Devis } from "../objects/devis.mjs";
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
    }).done(function(response) {
        callback(response);
    }).fail(function(response, code) {
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
    }).done(function(response) {
        callback(response);
    }).fail(function(response, code) {
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
    }).fail(function(response, code) {
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
    }).done(function(response, code) {
        showMessage(t('gestion', 'Modification saved'));
    }).fail(function(response, code) {
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
    }).done(function(response, code) {
        showMessage(t('gestion', 'Modification saved'));
    }).fail(function(response, code) {
        showError(response);
    });
}

function loadClientList(){
    getClients(function(response){
        $('.listClient').append("<option value='0'>"+ t('gestion', 'Choose customer')+"</option>");
        $.each(JSON.parse(response), function(arrayID, myresp) {     
            $('.listClient').append("<option value='"+ myresp.id +"'>"+myresp.nom + " " + myresp.prenom+"</option>");
        });
        checkSelect('.listClient');
    });
}

function LoadDT(DT,response,cls){
    DT.clear();
    $.each(JSON.parse(response), function(arrayID, myresp) {
        let c = new cls(myresp);
        DT.row.add(c.getDTRow());
    });
    DT.columns.adjust().draw();
    configureDT();
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
    }).done(function(response) {
        LoadDT(productDT,response,Product);
    }).fail(function(response, code) {
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
    }).done(function(response) {
        LoadDT(clientDT,response,Client);
    }).fail(function(response, code) {
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
    }).done(function(response) {
        LoadDT(devisDT,response,Devis);
        loadClientList();
    }).fail(function(response, code) {
        showError(response);
    });
}