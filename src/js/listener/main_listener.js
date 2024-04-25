import { FilePicker, showError } from "@nextcloud/dialogs";
import { updateDB, configuration, updateEditable, deleteDB, getProduitsById, listProduit, updateCurrentCompany } from "../modules/ajaxRequest.js";
import { path, baseUrl, updateNumerical } from "../modules/mainFunction.js";
import DataTable from 'datatables.net';
import { Client } from '../objects/client.js';
import { Devis } from '../objects/devis.js';
import { Facture } from '../objects/facture.js';
import { Produit } from '../objects/produit.js';

var choose_folder = t('gestion', 'Choose work folder');

$('body').on('click', '#theFolder', function () {
    var f = new FilePicker(choose_folder, false, [], false, 1, true, $("#theFolder").val());
    f.pick().then(
        function (value) {
            updateDB($('#theFolder').data('table'), $('#theFolder').data('column'), value, $('#theFolder').data('id'));
            configuration(path);
        }
    );
});




// $('body').on('change', '.editableSelect', function () { 
//     updateDB($(this).data('table'), $(this).data('column'), $(this).val(), $(this).data('id')); 
// });

$('body').on('click', '.menu', function () { $('#menu-' + this.dataset.menu).toggleClass('open'); });
$('body').on('click', '.modalClose', function () { var modal = $(this)[0].parentElement.parentElement; modal.style.display = "none"; });


$('body').on('dblclick', '.selectableDevis', function () {
    var id = $(this).data('id');
    var table = $(this).data('table');
    var column = $(this).data('column');
    $(this).text("");
    $(this).html('<select id="listDevis">');
    listDevis($('#listDevis'), id, table, column);
});

$('body').on('dblclick', '.selectable', function () {
    var id = $(this).data('id');
    var produitid = $(this).data('val');
    $(this).text("");
    $(this).html('<select id="listProduit">');
    listProduit($('#listProduit'), id, produitid);
});

$('body').on('click', '.deleteItem', function () {
    var id = $(this).data('id');
    var table = $(this).data('table');
    var modifier = $(this).data('modifier');
    deleteDB(table, id);
    var dt = new DataTable('.tabledt');
    if (modifier === "getProduitsById") { getProduitsById(); }
    if (modifier === "client") { Client.loadClientDT(dt); }
    if (modifier === "devis") { Devis.loadDevisDT(dt); }
    if (modifier === "facture") { Facture.loadFactureDT(dt); }
    if (modifier === "produit") { Produit.loadProduitDT(dt); }
});

$('body').on('change', '.listClient,.listDevis', function () {
    var myDiv = $(this).parents("div");
    var id = $(myDiv).data('id');
    var val = this.value;
    var column = $(myDiv).data('column');
    var table = $(myDiv).data('table');
    this.setAttribute('data-current', this.value)
    updateDB(table, column, val, id);
})

$('body').on('change', '.inputDate', function () {
    var id = $(this).data('id');
    var val = this.value;
    var column = $(this).data('column');
    var table = $(this).data('table');
    updateDB(table, column, val, id);
})

$('body').on('change', '#listProduit,#listDevis', function () {
    var id = $(this).find(':selected').data('id')
    var val = $(this).find(':selected').data('val')
    var column = $(this).find(':selected').data('column')
    var table = $(this).find(':selected').data('table')
    var el = $(this).parent();

    updateDB(table, column, val, id);

    if (el.get(0).className === "selectableClient_devis") {
        getClientByIdDevis(id);
    }
    if ($(this).attr('id') === "listProduit") {
        getProduitsById();
    }

    el.text($(this).val());
    el.attr('data-val', id);

});

$('body').on('click', '#devisAdd', function () {
    var devis_id = $('#devisid').data('id');
    var produit_devis = {
        id: devis_id
    };

    $.ajax({
        url: baseUrl + '/insertProduitDevis',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(produit_devis)
    }).done(function (response) {
        getProduitsById();
    }).fail(function (response, code) {
        showError(t('gestion', "Please create a new product"));
    });
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

    document.body.addEventListener('click', function(e) {
        var targetClass = e.target.className;
        var targetId = e.target.id;
        
        if(     targetClass.includes("editableSelect") 
        ||      targetClass.includes("editableConfiguration")
        ||      targetClass.includes("editableConfigurationSelect")){
    // Prevent default behavior
        } else if(targetClass.includes("editableNumber") 
            || targetClass.includes("editableNumeric")
            || targetClass.includes("editable")){
            e.target.setAttribute('contenteditable', 'true');
            e.target.focus();
        } else if(targetClass.includes("loadSelect_listclient")){
            Client.loadClientList_cid(e);
        } else if(targetClass.includes("loadSelect_listdevis")){
            Devis.loadDevisList_dnum(e);
        } else if(targetId === "newClient"){
            Client.newClient(new DataTable('.tabledt'));
        } else if(targetId === "newDevis"){
            Devis.newDevis(new DataTable('.tabledt'));
        } else if(targetId === "newInvoice"){
            Facture.newFacture(new DataTable('.tabledt'));
        } else if(targetId === "newProduit"){
            Produit.newProduct(new DataTable('.tabledt'));
        }
    });

    document.body.addEventListener('keydown', function(e) {
        if(e.key === "Enter"){
            var targetClass = e.target.className;
            if(targetClass.includes("editableNumber") || targetClass.includes("editableNumeric")){
                updateNumerical(e.target);
            } else if(  targetClass.includes("editableSelect") 
            ||  targetClass.includes("editableConfiguration")
            ||  targetClass.includes("editableConfigurationSelect")){
        // Prevent default behavior
            } else if(targetClass.includes("editable")){
                updateEditable(e.target);
            }
        }
    });

    document.body.addEventListener('focusout', function(e) {
        var targetClass = e.target.className;
        if(targetClass.includes("editableNumber") || targetClass.includes("editableNumeric")){
            updateNumerical(e.target);
        } else if(  targetClass.includes("editableSelect") 
                ||  targetClass.includes("editableConfiguration")
                ||  targetClass.includes("editableConfigurationSelect")){
            // Prevent default behavior
        } else if(targetClass.includes("editable")){
            updateEditable(e.target);
        }
    });

    document.body.addEventListener('mouseover', function(e) {
        var targetClass = e.target.className;
        if(targetClass.includes("editable") || targetClass.includes("loadSelect") || targetClass.includes("selectable")){
            applyMouseOverStyles(e.target);
        }
    });

    document.body.addEventListener('change', function(event) {
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
});

function applyMouseOverStyles(element) {
    element.style.border = "1px solid " + getComputedStyle(document.documentElement).getPropertyValue('--color-primary-element-light');
    element.style.borderRadius = "5px";
    element.style.padding = "5px";
    element.style.fontWeight = "bold";
    element.addEventListener('mouseout', function(e) {
        e.target.style.border = null;
        e.target.style.padding = null;
        e.target.style.fontWeight = null;
        e.target.style.borderRadius = null;
    });
}
