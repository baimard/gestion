import { FilePicker, getFilePickerBuilder, showError } from "@nextcloud/dialogs";
import { updateDB, configuration, updateEditable, duplicateDB, deleteDB, getProduitsById, updateCurrentCompany, updateDBConfiguration, listProduit, drop } from "../modules/ajaxRequest.js";
import { path, baseUrl, updateNumerical } from "../modules/mainFunction.js";
import DataTable from 'datatables.net';
import { Client } from '../objects/client.js';
import { Devis } from '../objects/devis.js';
import { Facture } from '../objects/facture.js';
import { Produit } from '../objects/produit.js';

var choose_folder = t('gestion', 'Choose work folder');

document.body.addEventListener('click', function (event) {
    // Check if the clicked element is the one with id 'theFolder'
    if (event.target && event.target.id === 'theFolder') {
        getFilePickerBuilder(choose_folder)
            .allowDirectories(true)
            .setMultiSelect(false)
            .addButton({
                label: t('gestion', 'Choose'),
                callback: (nodes) => {
                    // Get the values of the picked nodes
                    const values = nodes.map(node => node.path);
                    var theFolder = document.getElementById('theFolder');
                    var table = theFolder.getAttribute('data-table');
                    var column = theFolder.getAttribute('data-column');
                    var id = theFolder.getAttribute('data-id');
                    
                    updateDBConfiguration(table, column, values[0], id);
                    configuration(path);
                    document.getElementById('theFolder').value = values[0];
                },
            })
            .build()
            .pick()

    }

    if (
        event.target.classList.contains("editableSelect") ||
        event.target.classList.contains("editableConfiguration") ||
        event.target.classList.contains("editableConfigurationSelect")
    ) {
        // Empêcher le comportement par défaut
    } else {
        if (
            event.target.classList.contains("editableNumber") ||
            event.target.classList.contains("editableNumeric") ||
            event.target.classList.contains("editable")
        ) {
            event.target.setAttribute('contenteditable', 'true');
            event.target.focus();
        } else if (event.target.classList.contains("loadSelect_listclient")) {
            Client.loadClientList_cid(event);
        } else if (event.target.classList.contains("loadSelect_listdevis")) {
            Devis.loadDevisList_dnum(event);
        } else {
            switch (event.target.id) {
                case "newClient":
                    Client.newClient(new DataTable('.tabledt'));
                    break;
                case "newDevis":
                    Devis.newDevis(new DataTable('.tabledt'));
                    break;
                case "newInvoice":
                    Facture.newFacture(new DataTable('.tabledt'));
                    break;
                case "newProduit":
                    Produit.newProduct(new DataTable('.tabledt'));
                    break;
                default:
                    // Gérer les autres cas si nécessaire
                    break;
            }
        }
    }
    
    if (event.target.classList.contains('menu')) {
        var menuId = event.target.dataset.menu;
        var menu = document.getElementById('menu-' + menuId);
        menu.classList.toggle('open');
    }

    if (event.target.classList.contains('modalClose')) {
        var modal = event.target.parentElement.parentElement;
        modal.style.display = "none";
    }

    if (event.target.classList.contains('duplicateItem')) {
        var id = event.target.dataset.id;
        var table = event.target.dataset.table;
        var modifier = event.target.dataset.modifier;
        duplicateDB(table, id, reloadDataTable, modifier);
    }

    if (event.target.classList.contains('drop_down')) {
        var id = event.target.dataset.id;
        var modifier = event.target.dataset.modifier;
        drop(id, reloadDataTable, modifier, 'down');
    }

    if (event.target.classList.contains('drop_up')) {
        var id = event.target.dataset.id;
        var modifier = event.target.dataset.modifier;
        drop(id, reloadDataTable, modifier, 'up');
    }

    if (event.target.classList.contains('deleteItem')) {
        var id = event.target.dataset.id;
        var table = event.target.dataset.table;
        var modifier = event.target.dataset.modifier;
        deleteDB(table, id, reloadDataTable, modifier);
    }

    if (event.target.id === 'devisAdd') {
        var devis_id = document.getElementById('devisid').dataset.id;
        var produit_devis = {
            id: devis_id
        };

        fetch(baseUrl + '/insertProduitDevis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produit_devis)
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(function() {
            getProduitsById();
        })
        .catch(function() {
            showError(t('gestion', "Please create a new product"));
        });
    }

});


// $('body').on('dblclick', '.selectableDevis', function () {
//     var id = $(this).data('id');
//     var table = $(this).data('table');
//     var column = $(this).data('column');
//     $(this).text("");
//     $(this).html('<select id="listDevis">');
//     listDevis($('#listDevis'), id, table, column);
// });

document.body.addEventListener('dblclick', function(event) {
    if (event.target.classList.contains('selectable')) {
        var id = event.target.dataset.id;
        var produitid = event.target.dataset.val;
        event.target.textContent = "";
        event.target.innerHTML = '<select id="listProduit">';
        listProduit(document.getElementById('listProduit'), id, produitid);
    }
});

document.body.addEventListener('change', function(event) {
    if (event.target.classList.contains('listClient') || event.target.classList.contains('listDevis')) {
        var myDiv = event.target.closest("div");
        var id = myDiv.dataset.id;
        var val = event.target.value;
        var column = myDiv.dataset.column;
        var table = myDiv.dataset.table;
        event.target.setAttribute('data-current', event.target.value);
        updateDB(table, column, val, id);
    }

    if (event.target.classList.contains('inputDate')) {
        var id = event.target.dataset.id;
        var val = event.target.value;
        var column = event.target.dataset.column;
        var table = event.target.dataset.table;
        updateDB(table, column, val, id);
    }

    if (event.target.id === 'listProduit' || event.target.id === 'listDevis') {
        waitforUpdateProduits(event, table, column, val, id)
    }

    if (event.target.classList.contains('editableSelect')) {
        var table = event.target.getAttribute('data-table');
        var column = event.target.getAttribute('data-column');
        var value = event.target.value;
        var id = event.target.getAttribute('data-id');
        
        updateDB(table, column, value, id);
    }

    if(event.target.id === "CurrentCompany-select"){
        var value = event.target.value;
        updateCurrentCompany(value);
    }
});

document.addEventListener('DOMContentLoaded', function() {

    var aboutButton = document.getElementById('about');
    if (aboutButton) {
        aboutButton.addEventListener('click', function() {
            var modal = document.getElementById("modalConfig");
            if (modal) {
                modal.style.display = "block";
            }
        });
    }
});

var lastKeyEventTime = 0;

document.body.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        lastKeyEventTime = Date.now(); // Mettre à jour le temps du dernier événement keydown
        var targetClass = e.target.className;
        if (targetClass.includes("editableNumber") || targetClass.includes("editableNumeric")) {
            updateNumerical(e.target);
        } else if (targetClass.includes("editableSelect") || targetClass.includes("editableConfiguration") || targetClass.includes("editableConfigurationSelect")) {
            // Empêcher le comportement par défaut
        } else if (targetClass.includes("editable")) {
            updateEditable(e.target);
        }
    }
});

document.body.addEventListener('focusout', function(e) {
    // Vérifier si keydown a été utilisé récemment (dans les 100 ms)
    if (Date.now() - lastKeyEventTime < 100) {
        e.preventDefault(); // Empêcher l'exécution de focusout
        return;
    }

    var targetClass = e.target.className;
    if (targetClass.includes("editableNumber") || targetClass.includes("editableNumeric")) {
        updateNumerical(e.target);
    } else if (targetClass.includes("editableSelect") || targetClass.includes("editableConfiguration") || targetClass.includes("editableConfigurationSelect")) {
        // Empêcher le comportement par défaut
    } else if (targetClass.includes("editable")) {
        updateEditable(e.target);
    }
});


document.body.addEventListener('mouseover', function(event) {
    if(event.target.classList.contains("editable") || event.target.classList.contains("loadSelect") || event.target.classList.contains("selectable")){
        applyMouseOverStyles(event.target);
    }
});

function applyMouseOverStyles(element) {
    element.style.fontWeight = "bold";
    element.addEventListener('mouseout', function(e) {
        e.target.style.border = null;
        e.target.style.padding = null;
        e.target.style.fontWeight = null;
        e.target.style.borderRadius = null;
    });
}

function reloadDataTable(modifier) {
    var dt = new DataTable('.tabledt');
    if (modifier === "getProduitsById") { getProduitsById(); }
    if (modifier === "client") { Client.loadClientDT(dt); }
    if (modifier === "devis") { Devis.loadDevisDT(dt); }
    if (modifier === "facture") { Facture.loadFactureDT(dt); }
    if (modifier === "produit") { Produit.loadProduitDT(dt); }
}

async function waitforUpdateProduits(event, table, column, val, id){

    var id = event.target.options[event.target.selectedIndex].dataset.id;
    var val = event.target.options[event.target.selectedIndex].dataset.val;
    var column = event.target.options[event.target.selectedIndex].dataset.column;
    var table = event.target.options[event.target.selectedIndex].dataset.table;

    await updateDB(table, column, val, id);

    if (event.target.parentNode.className === 'selectableClient_devis') {
        getClientByIdDevis(id);
    }

    if (event.target.id === 'listProduit') {
        getProduitsById();
    }

    event.target.parentNode.textContent = event.target.value;
    event.target.parentNode.dataset.val = id;
}