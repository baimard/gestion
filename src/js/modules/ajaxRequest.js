import { showMessage, showSuccess, showError } from "@nextcloud/dialogs";
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import { baseUrl, cur, getGlobal, insertCell, insertRow, modifyCell } from "./mainFunction.js";

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

    fetch(baseUrl + '/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'requesttoken': OC.requestToken
        },
        body: JSON.stringify(myData)
    })
    .then(response => {
        if (response.ok) {
            showSuccess(t('gestion', 'Modification saved'));
        } else {
            showError(t('gestion', 'There is an error with the format, please check the documentation'));
        }
    })
    .catch(error => {
        showError(t('gestion', 'There is an error with the format, please check the documentation'));
    });
}

/**
 * Update data
 * @param table 
 * @param column 
 * @param data 
 * @param id 
 */
export function updateDBConfiguration(table, column, data, id) {
    var myData = {
        table: table,
        column: column,
        data: data,
        id: id,
    };

    fetch(baseUrl + '/updateConfiguration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'requesttoken': OC.requestToken
        },
        body: JSON.stringify(myData)
    })
    .then(response => {
        if (response.ok) {
            showSuccess(t('gestion', 'Modification saved'));
        } else {
            showError(t('gestion', 'There is an error with the format, please check the documentation'));
        }
    })
    .catch(error => {
        showError(t('gestion', 'There is an error with the format, please check the documentation'));
    });
}

/**
 * Create a new company
 */
export function createCompany() {
    fetch(baseUrl + '/createCompany', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'requesttoken': OC.requestToken
        }
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
            headers: {
                'Content-Type': 'application/json',
                'requesttoken': OC.requestToken
            }
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
            console.log(error);
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
        headers: {
            'Content-Type': 'application/json',
            'requesttoken': OC.requestToken
        },
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
 * Delete data
 * @param table
 * @param id 
 */
export function deleteDB(table, id, callback=null, modifier=null) {
    var myData = {
        table: table,
        id: id,
    };

    if (window.confirm(t('gestion', 'Are you sure you want to delete?'))) {
        fetch(baseUrl + '/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'requesttoken': OC.requestToken
            },
            body: JSON.stringify(myData)
        })
        .then(response => {
            if (response.ok) {
                showSuccess(t('gestion', 'Modification saved'));
                callback(modifier);
            } else {
                showError(response);
            }
        })
        .catch(error => {
            showError(error);
        });
    } else {
        showMessage(t('gestion', 'Nothing changed'));
    }
}

/**
 * 
 */
export function getStats() {
    fetch(baseUrl + '/getStats', {
        method: 'PROPFIND',
        headers: {
            'Content-Type': 'application/json',
            'requesttoken': OC.requestToken
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error: ' + response.status);
        }
    })
    .then(data => {
        console.log(data);
        document.getElementById("statsclient").textContent = data.client;
        document.getElementById("statsdevis").textContent = data.devis;
        document.getElementById("statsfacture").textContent = data.facture;
        document.getElementById("statsproduit").textContent = data.produit;
    })
    .catch(error => {
        showError(error);
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
    console.log("isconfig");
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
    fetch(baseUrl + '/getAnnualTurnoverPerMonthNoVat', {
        method: 'PROPFIND',
        headers: {
            'Content-Type': 'application/json',
            'requesttoken': OC.requestToken
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error: ' + response.status);
        }
    })
    .then(data => {
        var res = JSON.parse(data);
        var curY = "";
        var curRow;
        var total = 0;
        res.forEach(function(item) {
            if (curY !== item.y) {
                if (curY !== "") {
                    insertCell(curRow, -1, cur.format(total));
                    total = 0;
                }
                curY = item.y;
                curRow = insertRow("Statistical", -1, 0, item.y);
                modifyCell(curRow, (item.m), cur.format(Math.round(item.total)));
                total += Math.round(item.total);
            } else {
                modifyCell(curRow, (item.m), cur.format(Math.round(item.total)));
                total += Math.round(item.total);
            }
        });
        // At the end
        insertCell(curRow, -1, cur.format(total));
    })
    .catch(error => {
        showError(error);
    });
}

/**
 * 
 * @param {*} myCase 
 */
export function updateEditable(myCase) {
    updateDB(myCase.dataset.table, myCase.dataset.column, myCase.innerText, myCase.dataset.id);
    if (myCase.dataset.modifier === "getProduitsById") {getProduitsById();}
    myCase.removeAttribute('contenteditable');
}

/**
 * 
 * @param {*} myCase 
 */
export function updateEditableConfiguration(myCase) {
    updateDBConfiguration(myCase.dataset.table, myCase.dataset.column, myCase.innerText, myCase.dataset.id);
    if (myCase.dataset.modifier === "getProduitsById") {getProduitsById();}
    myCase.removeAttribute('contenteditable');
}


/**
 * 
 * @param {*} lp 
 * @param {*} id 
 * @param {*} produitid 
 */
export function listProduit(lp, id, produitid) {
    fetch(baseUrl + '/getProduits', {
        method: 'PROPFIND',
        headers: {
            'Content-Type': 'application/json',
            'requesttoken': OC.requestToken
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error: ' + response.status);
        }
    })
    .then(data => {
        var res = JSON.parse(data);
        lp.appendChild(listeproduit_add_option('produit_devis', 'produit_id', produitid, id, t('gestion', 'Cancel')));
        res.forEach(function(myresp) {
            var _selected = false;
            if (produitid == myresp.id) {
                _selected = true;
            }

            var text_display = myresp.reference + ' ' + myresp.description + ' ' + cur.format(myresp.prix_unitaire);
            lp.appendChild(listeproduit_add_option('produit_devis', 'produit_id', myresp.id, id,text_display,_selected));
        });
    })
    .catch(error => {
        showError(error);
    });
}

function listeproduit_add_option(table, column, val, id, textContent, _selected=false){
    var option = document.createElement('option');
    option.dataset.table = table;
    option.dataset.column = column;
    option.dataset.val = val;
    option.dataset.id = id;
    option.textContent = textContent;
    option.selected = _selected;
    return option;
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
                '<td><div class="editable" data-table="produit_devis" data-column="comment" data-id="' + myresp.pdid + '">' + ((myresp.comment.length === 0) ? '-' : myresp.comment) + '</div></td>' +
                '<td><div class="editableNumber getProduitsById" style="display:inline;" data-modifier="getProduitsById" data-table="produit_devis" data-column="quantite" data-id=' + myresp.pdid + '>' + myresp.quantite + '</div> </td>' +
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
export function saveNextcloud(myData) {
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
  };

  export function getMailServerFrom(input) {
    var oReq = new XMLHttpRequest();
    oReq.open('PROPFIND', baseUrl + '/getServerFromMail', true);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.setRequestHeader("requesttoken", oc_requesttoken);
    oReq.onload = function(e){
        if (this.status == 200) {
            input.value = JSON.parse(this.response)['mail'];
        }else{
            showError(this.response);
        }
    };
    oReq.send();
    }

    export function backup(){
        var oReq = new XMLHttpRequest();
        oReq.open('GET', baseUrl + '/backup', true);
        oReq.setRequestHeader("Content-Type", "application/json");
        oReq.setRequestHeader("requesttoken", oc_requesttoken);
        oReq.onload = function(e){
            if (this.status == 200) {
                showSuccess(t('gestion', 'Save in')+' '+JSON.parse(this.response)['name']+'\n'+t('gestion','(do not forget to show hidden folders)'));
            }else{
                showError(this.response);
            }
        };
        oReq.send();
    }
