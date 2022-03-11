import { FilePicker, showError } from "@nextcloud/dialogs";
import { updateDB, configuration, updateEditable, deleteDB, getProduitsById, listProduit } from "../modules/ajaxRequest.mjs";
import { path, baseUrl, updateNumerical } from "../modules/mainFunction.mjs";
import DataTable from 'datatables.net';
import { Client } from '../objects/client.mjs';
import { Devis } from '../objects/devis.mjs';
import { Facture } from '../objects/facture.mjs';
import { Produit } from '../objects/produit.mjs';

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

$('body').on('change', '.editableSelect', function () { updateDB($(this).data('table'), $(this).data('column'), $(this).val(), $(this).data('id')); });
$('body').on('click', '.menu', function () { $('#menu-' + this.dataset.menu).toggleClass('open'); });
$('body').on('click', '.modalClose', function () { var modal = $(this)[0].parentElement.parentElement; modal.style.display = "none"; });

document.body.addEventListener('click', e => {
    if(e.target.className.includes("editableNumber")){
        e.target.setAttribute('contenteditable', 'true');
        e.target.focus();
    }else if (e.target.className.includes("editableNumeric")){
        e.target.setAttribute('contenteditable', 'true');
        e.target.focus();
    }else if(e.target.className.includes("editable")){
        e.target.setAttribute('contenteditable', 'true');
        e.target.focus();
    }
});

document.body.addEventListener('keydown', e => {
    if(e.key==="Enter"){
        if(e.target.className.includes("editableNumber")){
            updateNumerical(e.target, false);
        }else if (e.target.className.includes("editableNumeric")){
            updateNumerical(e.target);
        }else if(e.target.className.includes("editable")){
            updateEditable(e.target);
        }
    }
});

document.body.addEventListener('focusout', e => {
    if(e.target.className.includes("editableNumber")){
        updateNumerical(e.target, false);
    }else if (e.target.className.includes("editableNumeric")){
        updateNumerical(e.target);
    }else if(e.target.className.includes("editable")){
        updateEditable(e.target);
    }
});

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

$('body').on('click', '#newClient', function () {
    Client.newClient(new DataTable('.tabledt'));
});

$('body').on('click', '#newDevis', function () {
    Devis.newDevis(new DataTable('.tabledt'));
});

$('body').on('click', '#newInvoice', function () {
    Facture.newFacture(new DataTable('.tabledt'));
});

$('body').on('click', '#newProduit', function () {
    Produit.newProduct(new DataTable('.tabledt'));
});

$('body').on('click', '#about', function () {
    var modal = document.getElementById("modalConfig");
    modal.style.display = "block";
});