import $ from 'jquery';

import { generateUrl, getRootUrl } from "@nextcloud/router";
import { FilePicker, showMessage, showError } from "@nextcloud/dialogs";
import { getCanonicalLocale, translate as t, translatePlural as n } from '@nextcloud/l10n'

import '@nextcloud/dialogs/styles/toast.scss'

import '../css/mycss.less';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';
import 'bootstrap/js/dist/util';

import { newInvoice, updateDB, deleteDB, loadProduitDT, loadClientDT, loadDevisDT, loadFactureDT, getStats } from "./modules/ajaxRequest.mjs";
import { getCurrencyList } from "./modules/currency.mjs";
import { showDone, loadClientList, loadDevisList } from "./modules/mainFunction.mjs";

var baseUrl = getRootUrl() + generateUrl('/apps/gestion');
var cur = null;

$(window).on("load", function () {
    // console.log(baseRemoteUrl);
    // console.log(getCanonicalLocale());

    $('.tabledt').DataTable({
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
    });

    getStats();
    isconfig();
    configuration(getCurrency);
    configuration(path);

    if ($('#client').length) {
        loadClientDT($('#client').DataTable());
    }
    if ($('#configuration').length) {
        configuration(lcdt);
    }
    if ($('#devis').length) {
        loadDevisDT($('#devis').DataTable());
    }
    if ($('#devisid').length) {
        getClientByIdDevis($('#devisid').data('id'));
        getProduitsById();
    }
    if ($('#facture').length) {
        loadFactureDT($('#facture').DataTable());
    }
    if ($('#produit').length) {
        loadProduitDT($('#produit').DataTable());
    }
});

$('body').on('page.dt search.dt', function () {
    if ($('#devis').length) { console.log("loadclientlist"); loadClientList(); }
    if ($('#facture').length) { console.log("loadclientlist"); loadDevisList(); }
});

$('body').on('click', '#theFolder', function () {
    var f = new FilePicker(t('gestion', 'Choose work folder'), false, [], false, 1, true, $("#theFolder").val());
    f.pick().then(
        function (value) {
            updateDB($('#theFolder').data('table'), $('#theFolder').data('column'), value, $('#theFolder').data('id'));
            configuration(path);
        }
    );
});

$('body').on('change', '.editableSelect', function () { updateDB($(this).data('table'), $(this).data('column'), $(this).val(), $(this).data('id')); });
$('body').on('click', '.menu', function () { $('#menu-' + this.dataset.menu).toggleClass('open'); });
$('body').on('click', '.modalClose', function () { var modal = $(this)[0].parentElement.parentElement; modal.style.display = "none"; })
$('body').on('click', '.editable', function () { $(this).attr('contenteditable', 'true'); });
$('body').on('blur', '.editable', function () { updateEditable($(this)); });
$('body').on('keypress', '.editable', function (event) { if (event.key === "Enter") { updateEditable($(this)); } });

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
    if (modifier === "getProduitsById") { getProduitsById(); }
    if (modifier === "client") { loadClientDT($('#client').DataTable()); }
    if (modifier === "devis") { loadDevisDT($('#devis').DataTable()); }
    if (modifier === "facture") { loadFactureDT($('#facture').DataTable()); }
    if (modifier === "produit") { loadProduitDT($('#produit').DataTable()); }
});

$('body').on('change', '.listClient,.listDevis', function () {
    var myDiv = $(this).parents("div");
    var id = $(myDiv).data('id');
    var val = this.value;
    var column = $(myDiv).data('column');
    var table = $(myDiv).data('table');
    this.setAttribute('data-current', this.value) // Bug #
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
    newClient();
    loadClientDT($('#client').DataTable());
});

$('body').on('click', '#newDevis', function () {
    newDevis();
    loadDevisDT($('#devis').DataTable());
});

$('body').on('click', '#newInvoice', function () {
    newInvoice();
    loadFactureDT($('#facture').DataTable());
});

$('body').on('click', '#newProduit', function () {
    newProduit();
    loadProduitDT($('#produit').DataTable());
});

$('body').on('click', '#about', function () {
    var modal = document.getElementById("modalConfig");
    modal.style.display = "block";
});

function updateEditable(myCase) {
    updateDB(myCase.data('table'), myCase.data('column'), myCase.text(), myCase.data('id'));
    if (myCase.data('modifier') === "getProduitsById") {
        getProduitsById();
    }
    myCase.attr('contenteditable', 'false');
    myCase.removeAttr('contenteditable');
}

var lcdt = function loadConfigurationDT(response) {
    $.each(JSON.parse(response), function (arrayID, myresp) {
        $('#entreprise').html(((myresp.entreprise.length === 0) ? '-' : myresp.entreprise));
        $('#entreprise').data("id", myresp.id);

        $('#nom').html(((myresp.nom.length === 0) ? '-' : myresp.nom));
        $('#nom').data("id", myresp.id);

        $('#prenom').html(((myresp.prenom.length === 0) ? '-' : myresp.prenom));
        $('#prenom').data("id", myresp.id);

        $('#adresse').html(((myresp.adresse.length === 0) ? '-' : myresp.adresse));
        $('#adresse').data("id", myresp.id);

        $('#siret').html(((myresp.siret.length === 0) ? '-' : myresp.siret));
        $('#siret').data("id", myresp.id);

        $('#siren').html(((myresp.siren.length === 0) ? '-' : myresp.siren));
        $('#siren').data("id", myresp.id);

        $('#telephone').html(((myresp.telephone.length === 0) ? '-' : myresp.telephone));
        $('#telephone').data("id", myresp.id);

        $('#mail').html(((myresp.mail.length === 0) ? '-' : myresp.mail));
        $('#mail').data("id", myresp.id);

        $('#tva_default').html(((myresp.tva_default.length === 0) ? '-' : myresp.tva_default + " %"));
        $('#tva_default').data("id", myresp.id);

        $('#currency').append(getCurrencyList(myresp.devise));
        $('#currency').data("id", myresp.id);

        $('#mentions_default').html(((myresp.mentions_default.length === 0) ? '-' : myresp.mentions_default.replace(/\&amp;/g, '&')));
        $('#mentions_default').data("id", myresp.id);
    });
}

function getClientByIdDevis(id) {
    var myData = { id: id, };
    $.ajax({
        url: baseUrl + '/clientbyiddevis',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function (response, code) {
        $.each(JSON.parse(response), function (arrayID, myresp) {
            $("#nomprenom").html(myresp.prenom + ' ' + myresp.nom);
            $("#nomprenom").attr('data-id', id);
            $("#entreprise").html(myresp.entreprise);
            $("#adresse").html(myresp.adresse);
            $("#mail").html(myresp.mail);
            $("#telephone").html(myresp.telephone);
            $("#siret").html(myresp.siret);
            $("#pdf").attr("data-folder", myresp.num);
            if ($("#factureid").length) {
                $("#pdf").data('name', myresp.entreprise + "_" + $("#factureid").text() + "_v" + $('#factureversion').text());
            } else {
                $("#pdf").data('name', myresp.entreprise + "_" + myresp.num + "_v" + $('#devisversion').text());
            }

        });
    }).fail(function (response, code) {
        showError(response);
    });
}


function listProduit(lp, id, produitid) {
    $.ajax({
        url: baseUrl + '/getProduits',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        lp.append('<option data-table="produit_devis" data-column="produit_id" data-val="' + produitid + '" data-id="' + id + '">Annuler</option>');
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

function getProduitsById() {
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




function newDevis() {
    $.ajax({
        url: baseUrl + '/devis/insert',
        type: 'POST',
        async: false,
        contentType: 'application/json'
    }).fail(function (response, code) {
        showError(response);
    }).done(showDone());
}

function newClient() {
    $.ajax({
        url: baseUrl + '/client/insert',
        type: 'POST',
        async: false,
        contentType: 'application/json',
    }).fail(function (response, code) {
        showError(response);
    }).done(showDone());
}

function newProduit() {
    $.ajax({
        url: baseUrl + '/produit/insert',
        type: 'POST',
        async: false,
        contentType: 'application/json',
    }).fail(function (response, code) {
        showError(response);
    }).done(showDone());
}

function configuration(f1) {
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

var getCurrency = function (response) {
    var myresp = JSON.parse(response)[0];
    cur = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: myresp.devise, minimumFractionDigits: 2 });
}


function getGlobal(total) {
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

function isconfig() {
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

var path = function (res) {
    var myres = JSON.parse(res)[0];
    $("#theFolder").val(myres.path);
    $("#theFolder").attr('data-id', myres.id);
};

