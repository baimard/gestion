import { showMessage, showSuccess, showError } from "@nextcloud/dialogs";
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import { baseUrl, cur, getGlobal, insertCell, insertRow, modifyCell } from "./mainFunction.mjs";

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
 * 
 */
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


/**
 * 
 * @param {*} f1 
 */
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

/**
 * 
 */
export function isconfig() {
    $.ajax({
        url: baseUrl + '/isconfig',
        type: 'GET',
        contentType: 'application/json'
    }).done(function (response) {
        if (!response) {
            var modal = document.getElementById("modalConfig");
            modal.style.display = "block";
        }
    })
}

/**
 * 
 * @param {*} cur 
 */
export function getAnnualTurnoverPerMonthNoVat(cur) {
    $.ajax({
        url: baseUrl + '/getAnnualTurnoverPerMonthNoVat',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        var res = JSON.parse(response);
        var curY = "";
        var curRow;
        var total=0;
        res.forEach(function(item){
            if(curY !== item.y){
                
                if(curY !== ""){
                    insertCell(curRow, -1, cur.format(total));
                    total=0;
                }

                curY = item.y;
                curRow = insertRow("Statistical", -1, 0, item.y);
                modifyCell(curRow, (item.m), cur.format(Math.round(item.total)));
                total+= Math.round(item.total);
            }else{
                modifyCell(curRow, (item.m), cur.format(Math.round(item.total)));
                total+= Math.round(item.total);
            }
        });
        // At the end
        insertCell(curRow, -1, cur.format(total));
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * 
 * @param {*} myCase 
 */
export function updateEditable(myCase) {
    updateDB(myCase.data('table'), myCase.data('column'), myCase.text(), myCase.data('id'));
    if (myCase.data('modifier') === "getProduitsById") {
        getProduitsById();
    }
    myCase.attr('contenteditable', 'false');
    myCase.removeAttr('contenteditable');
}

/**
 * 
 * @param {*} lp 
 * @param {*} id 
 * @param {*} produitid 
 */
export function listProduit(lp, id, produitid) {
    $.ajax({
        url: baseUrl + '/getProduits',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        lp.append('<option data-table="produit_devis" data-column="produit_id" data-val="' + produitid + '" data-id="' + id + '">'+t('gestion','Cancel')+'</option>');
        $.each(JSON.parse(response), function (arrayID, myresp) {
            var selected = "";
            if (produitid == myresp.id) {
                selected = "selected";
            }
            lp.append('<option ' + selected + ' data-table="produit_devis" data-column="produit_id" data-val="' + myresp.id + '" data-id="' + id + '">' + myresp.reference + ' ' + myresp.description + ' ' + cur.format(myresp.prix_unitaire) + '</option>');
        });
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * Get a product in database using id
 */
 export function getProduitsById() {
    var devis_id = $('#devisid').data('id');
    var myData = { numdevis: devis_id, };

    $.ajax({
        url: baseUrl + '/getProduitsById',
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function (response, code) {
        $('#produits tbody').empty();
        var total = 0;
        var deleteDisable = "";
        if ($('#produits').data("type") === "facture") {
            deleteDisable = "d-none";
        }

        $.each(JSON.parse(response), function (arrayID, myresp) {
            $('#produits tbody').append('<tr><td><div data-html2canvas-ignore data-modifier="getProduitsById" data-id="' + myresp.pdid + '" data-table="produit_devis" class="' + deleteDisable + ' deleteItem icon-delete"></div><div style="display:inline;" data-val="' + myresp.pid + '" data-id="' + myresp.pdid + '" class="selectable">' + myresp.reference + '</div></td>' +
                '<td>' + myresp.description + '</td>' +
                '<td><div class="editable getProduitsById" style="display:inline;" data-modifier="getProduitsById" data-table="produit_devis" data-column="quantite" data-id=' + myresp.pdid + '>' + myresp.quantite + '</div> </td>' +
                '<td>' + cur.format(myresp.prix_unitaire) + '</td>' +
                '<td>' + cur.format((myresp.quantite * myresp.prix_unitaire)) + '</td></tr>');
            total += (myresp.quantite * myresp.prix_unitaire);
        });

        $("#totaldevis tbody").empty();
        getGlobal(total);
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * Save pdf in nextcloud
 * @param {*} myData 
 */
export function saveNextcloud (myData) {
    $.ajax({
      url: baseUrl + '/savePDF',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(myData)
    }).done(function (response) {
      showMessage(t('gestion', 'Save in') + " " + $("#theFolder").val() + "/" + $("#pdf").data("folder"));
    }).fail(function (response, code) {
      showMessage(t('gestion', 'There is an error'));
      error(response);
    });
  }