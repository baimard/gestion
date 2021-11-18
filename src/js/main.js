// import $ from 'jquery';

import {generateUrl, linkTo} from "@nextcloud/router";
import {FilePicker,showMessage,showError} from "@nextcloud/dialogs";
import {getCanonicalLocale, translate as t, translatePlural as n} from '@nextcloud/l10n'

import '@nextcloud/dialogs/styles/toast.scss'
import '../css/mycss.less';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';
import 'bootstrap/js/dist/util';

import { getClients, getDevis, newInvoice, updateDB, deleteDB, loadProduitDT} from "./modules/ajaxRequest.mjs";
import { configureDT, showDone, langage } from "./modules/mainFunction.mjs";

var baseUrl = generateUrl('/apps/gestion');
console.log(baseUrl);
const euro = new Intl.NumberFormat('fr-FR', {style: 'currency',currency: 'EUR',minimumFractionDigits: 2});


    $(window).on("load", function() {

    //console.log(getCanonicalLocale());

    $('.tabledt').DataTable({
        autoWidth: false,
        stateSave: true,
        language: {
            "search":           t('gestion', 'Search'),
            "emptyTable":       t('gestion', 'No data available in table'),
            "info":             t('gestion', 'Showing {start} to {end} of {total} entries', {start: '_START_', end: '_END_', total: '_TOTAL_'}),
            "infoEmpty":        t('gestion', 'Showing 0 to 0 of 0 entries'),
            "loadingRecords":   t('gestion', 'Loading records …'),
            "processing":       t('gestion', 'Processing …'),
            "infoFiltered":     t('gestion', '{max} entries filtered', {max: '_MAX_'}),
            "lengthMenu":       t('gestion', 'Show {menu} entries', {menu: '_MENU_'}),
            "zeroRecords":      t('gestion', 'No corresponding entry'),
            "paginate": {   
                "first":        t('gestion', 'First'),
                "last":         t('gestion', 'Last'),
                "next":         t('gestion', 'Next'),
                "previous":     t('gestion', 'Previous'),
            }   

        }
    });

    getStats();
    isconfig();

    if ($('#devisid').length) {
        getClientByIdDevis($('#devisid').data('id'));
        getProduitsById();
    }

    if ($('#client').length) {loadClientDT();}
    if ($('#configuration').length) {configuration(lcdt);}
    if ($('#devis').length) {loadDevisDT();}
    if ($('#facture').length) {loadFactureDT();}
    if ($('#produit').length) {loadProduitDT($('#produit').DataTable());}

    configuration(path);
});

$('body').on('click', '#theFolder', function() {
    var f = new FilePicker(t('gestion', 'Choose work folder'), false, [], false, 1, true, $("#theFolder").val());
    f.pick().then(
        function(value) {
            updateDB($('#theFolder').data('table'), $('#theFolder').data('column'), value, $('#theFolder').data('id'));
            configuration(path);
        }
    );
});

$('body').on('click', '.menu', function() {$('#menu-'+this.dataset.menu).toggleClass('open');});

$('body').on('click', '.modalClose', function(){
    var modal = document.getElementById("modalConfig");
    modal.style.display = "none";
})

$('body').on('click', '.editable', function() {$(this).attr('contenteditable', 'true');});

$('body').on('blur', '.editable', function() {updateEditable($(this));});

$('body').on('keypress', '.editable' ,function(event) {
    if(event.key === "Enter") {
        updateEditable($(this));
    }
});

$('body').on('dblclick', '.selectableDevis', function() {
    var id = $(this).data('id');
    var table = $(this).data('table');
    var column = $(this).data('column');
    $(this).text("");
    $(this).html('<select id="listDevis">');
    listDevis($('#listDevis'), id, table, column);
});

$('body').on('dblclick', '.selectable', function() {
    var id = $(this).data('id');
    var produitid = $(this).data('val');
    $(this).text("");
    $(this).html('<select id="listProduit">');
    listProduit($('#listProduit'), id, produitid);
});

$('body').on('click', '.deleteItem', function() {
    var id = $(this).data('id');
    var table = $(this).data('table');
    var modifier = $(this).data('modifier');
    deleteDB(table, id);
    if (modifier === "getProduitsById") {getProduitsById();}
    if (modifier === "client") {loadClientDT();}
    if (modifier === "devis") {loadDevisDT();}
    if (modifier === "facture") {loadFactureDT();}
    if (modifier === "produit") {loadProduitDT($('#produit').DataTable());}
});

$('body').on('change', '.listClient,.listDevis', function(){
    var myDiv = $(this).parents( "div" );
    var id = $(myDiv).data('id');
    var val = this.value;
    var column = $(myDiv).data('column');
    var table = $(myDiv).data('table');
    updateDB(table, column, val, id);
})

$('body').on('change', '.inputDate', function(){
    var id = $(this).data('id');
    var val = this.value;
    var column = $(this).data('column');
    var table = $(this).data('table');
    updateDB(table, column, val, id);
})

$('body').on('change', '#listProduit,#listDevis', function() {

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

$('body').on('click', '#devisAdd', function() {

    var devis_id = $('#devisid').data('id');
    var produit_devis = {
        id: devis_id
    };

    $.ajax({
        url: baseUrl + '/insertProduitDevis',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(produit_devis)
    }).done(function(response) {
        getProduitsById();
    }).fail(function(response, code) {
        showError(t('gestion', "Please create a new product"));
    });
});

$('body').on('click', '#newClient', function() {
    newClient();
    loadClientDT();
});

$('body').on('click', '#newDevis', function() {
    newDevis();
    loadDevisDT();
});

$('body').on('click', '#newInvoice', function() {
    newInvoice();
    loadFactureDT();
});

$('body').on('click', '#newProduit', function() {
    newProduit();
    loadProduitDT($('#produit').DataTable());
});

$('body').on('click', '#about', function() {
    var modal = document.getElementById("modalConfig");
    modal.style.display = "block";
});

function updateEditable(myCase){
    updateDB(myCase.data('table'), myCase.data('column'), myCase.text(), myCase.data('id'));
    if (myCase.data('modifier') === "getProduitsById") {
        getProduitsById();
    }
    myCase.attr('contenteditable', 'false');
    myCase.removeAttr('contenteditable');
}

function loadFactureDT() {
    $.ajax({
        url: baseUrl + '/getFactures',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        $('#facture').DataTable().clear();
        $.each(JSON.parse(response), function(arrayID, myresp) {

            $('#facture').DataTable().row.add([
                '<div class="editable" data-table="facture" data-column="num" data-id="' + myresp.id + '">' + ((myresp.num.length === 0) ? '-' : myresp.num) + '</div>',
                '<div class="editable" data-table="facture" data-column="date" data-id="' + myresp.id + '">' + ((myresp.date.length === 0) ? '-' : myresp.date) + '</div>',
                '<input style="margin:0;padding:0;" class="inputDate" type="date" value='+myresp.date_paiement+' data-table="facture" data-column="date_paiement" data-id="' + myresp.id + '"/>',
                '<div class="editable" data-table="facture" data-column="type_paiement" data-id="' + myresp.id + '">' + ((myresp.type_paiement.length === 0) ? '-' : myresp.type_paiement) + '</div>',
                '<div data-table="facture" data-column="id_devis" data-id="' + myresp.id + '"><select class="listDevis" data-current="'+ myresp.id_devis +'"></select></div>',
                '<div class="editable" data-table="facture" data-column="version" data-id="' + myresp.id + '" style="display:inline">' + ((myresp.version.length === 0) ? '-' : myresp.version) + '</div>',
                '<div class="editable" data-table="facture" data-column="status_paiement" data-id="' + myresp.id + '" style="display:inline">' + ((myresp.status_paiement.length === 0) ? '-' : myresp.status_paiement) + '</div>',
                '<div style="display:inline-block;margin-right:0px;width:80%;"><a href="/apps/gestion/facture/' + myresp.id + '/show"><button>'+ t('gestion', 'Open')+'</button></a></div><div data-modifier="facture" data-id=' + myresp.id + ' data-table="facture" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>',
            ]);
        });
        loadDevisList();
        $('#facture').DataTable().columns.adjust().draw();
        configureDT();
    }).fail(function(response, code) {
        showError(response);
    });
}

function loadDevisDT() {
    $.ajax({
        url: baseUrl + '/getDevis',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        $('#devis').DataTable().clear();
        $.each(JSON.parse(response), function(arrayID, myresp) {
            $('#devis').DataTable().row.add([
                '<input style="margin:0;padding:0;" class="inputDate" type="date" value='+myresp.date+' data-table="devis" data-column="date" data-id="' + myresp.id + '"/>',
                '<div class="editable" data-table="devis" data-column="num" data-id="' + myresp.id + '" style="display:inline">' + ((myresp.num.length === 0) ? '-' : myresp.num) + '</div>',
                '<div data-table="devis" data-column="id_client" data-id="' + myresp.id + '"><select class="listClient" data-current="'+ myresp.cid +'"></select></div>',
                '<div class="editable" data-table="devis" data-column="version" data-id="' + myresp.id + '" style="display:inline">' + ((myresp.version.length === 0) ? '-' : myresp.version) + '</div>',
                '<div class="editable" data-table="devis" data-column="mentions" data-id="' + myresp.id + '" style="display:inline">' + ((myresp.mentions.length === 0) ? '-' : myresp.mentions) + '</div>',
                '<div style="display:inline-block;margin-right:0px;width:80%;"><a href="'+baseUrl+"/devis/"+myresp.id+'/show"><button>'+ t('gestion', 'Open')+'</button></a></div><div data-modifier="devis" data-id=' + myresp.id + ' data-table="devis" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>'
            ]);
        });
        loadClientList();
        $('#devis').DataTable().columns.adjust().draw();
        configureDT();
    }).fail(function(response, code) {
        showError(response);
    });
}

var lcdt = function loadConfigurationDT(response) {
    $('#configuration').DataTable().clear();
    $.each(JSON.parse(response), function(arrayID, myresp) {
        $('#configuration').DataTable().row.add(['<div class="editable" data-table="configuration" data-column="entreprise" data-id="' + myresp.id + '">' + ((myresp.entreprise.length === 0) ? '-' : myresp.entreprise) + '</div>',
            '<div class="editable" data-table="configuration" data-column="nom" data-id="' + myresp.id + '">' + ((myresp.nom.length === 0) ? '-' : myresp.nom) + '</div>',
            '<div class="editable" data-table="configuration" data-column="prenom" data-id="' + myresp.id + '">' + ((myresp.prenom.length === 0) ? '-' : myresp.prenom) + '</div>',
            '<div class="editable" data-table="configuration" data-column="siret" data-id="' + myresp.id + '">' + ((myresp.siret.length === 0) ? '-' : myresp.siret) + '</div>',
            '<div class="editable" data-table="configuration" data-column="siren" data-id="' + myresp.id + '">' + ((myresp.siren.length === 0) ? '-' : myresp.siren) + '</div>',
            '<div class="editable" data-table="configuration" data-column="telephone" data-id="' + myresp.id + '">' + ((myresp.telephone.length === 0) ? '-' : myresp.telephone) + '</div>',
            '<div class="editable" data-table="configuration" data-column="mail" data-id="' + myresp.id + '">' + ((myresp.mail.length === 0) ? '-' : myresp.mail) + '</div>',
            '<div class="editable" data-table="configuration" data-column="adresse" data-id="' + myresp.id + '">' + ((myresp.adresse.length === 0) ? '-' : myresp.adresse) + '</div>',
            '<div class="editable" data-table="configuration" data-column="tva_default" data-id="' + myresp.id + '">' + ((myresp.tva_default.length === 0) ? '-' : myresp.tva_default) + '%</div>'
        ]);

        $('#mentions_default').html(((myresp.mentions_default.length === 0) ? '-' : myresp.mentions_default));
        $('#mentions_default').data("id", myresp.id);
    });
    $('#configuration').DataTable().destroy()
    $('#configuration').DataTable({paging: false, searching: false, info: false}).columns.adjust().draw();
    
    configureDT();
}

function loadClientDT() {
    $.ajax({
        url: baseUrl + '/getClients',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        $('#client').DataTable().clear();
        $.each(JSON.parse(response), function(arrayID, myresp) {
            $('#client').DataTable().row.add([
                '<div class="editable" data-table="client" data-column="entreprise" data-id="' + myresp.id + '">' + ((myresp.entreprise.length === 0) ? '-' : myresp.entreprise) + '</div>',
                '<div class="editable" data-table="client" data-column="nom" data-id="' + myresp.id + '">' + ((myresp.nom.length === 0) ? '-' : myresp.nom) + '</div>',
                '<div class="editable" data-table="client" data-column="prenom" data-id="' + myresp.id + '">' + ((myresp.prenom.length === 0) ? '-' : myresp.prenom) + '</div>',
                '<div class="editable" data-table="client" data-column="siret" data-id="' + myresp.id + '">' + ((myresp.siret.length === 0) ? '-' : myresp.siret) + '</div>',
                '<div class="editable" data-table="client" data-column="telephone" data-id="' + myresp.id + '">' + ((myresp.telephone.length === 0) ? '-' : myresp.telephone) + '</div>',
                '<div class="editable" data-table="client" data-column="mail" data-id="' + myresp.id + '">' + ((myresp.mail.length === 0) ? '-' : myresp.mail) + '</div>',
                '<div class="editable" data-table="client" data-column="adresse" data-id="' + myresp.id + '">' + ((myresp.adresse.length === 0) ? '-' : myresp.adresse) + '</div>',
                '<center><div data-modifier="client" data-id=' + myresp.id + ' data-table="client" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div></center>'
            ]);
        });
        $('#client').DataTable().columns.adjust().draw();
        configureDT();
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

function loadDevisList(){
    getDevis(function(response){
        $('.listDevis').append("<option value='0'>"+ t('gestion', 'Choose quote')+"</option>");
        $.each(JSON.parse(response), function(arrayID, myresp) {     
            $('.listDevis').append("<option value='"+ myresp.id +"'>"+ myresp.num + ' ' + myresp.prenom + ' ' + myresp.nom +"</option>");
        });
        checkSelect('.listDevis');
    });
}

function checkSelect(el){
    $(el).each(function(arrayID, elem){
        $(elem).find('option').each(function(){ 
            if(this.value==$(elem).data('current')){
                $(this).prop('selected', true)
            }
        })
    })
}

function getClientByIdDevis(id) {
    var myData = { id: id, };
    $.ajax({
        url: baseUrl + '/clientbyiddevis',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function(response, code) {
        $.each(JSON.parse(response), function(arrayID, myresp) {
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
    }).fail(function(response, code) {
        showError(response);
    });
}


function listClient(lc, id, table, column) {
    $.ajax({
        url: baseUrl + '/getClients',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        $.each(JSON.parse(response), function(arrayID, myresp) {
            lc.append('<option data-table="' + table + '" data-column="' + column + '" data-val="' + myresp.id + '" data-id="' + id + '">' + myresp.prenom + ' ' + myresp.nom + ' ' + '</option>');
        });
    }).fail(function(response, code) {
        showError(response);
    });
}

function listProduit(lp, id, produitid) {
    $.ajax({
        url: baseUrl + '/getProduits',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        lp.append('<option data-table="produit_devis" data-column="produit_id" data-val="' + produitid + '" data-id="' + id + '">Annuler</option>');
        $.each(JSON.parse(response), function(arrayID, myresp) {
            var selected = "";
            if(produitid == myresp.id){
                selected = "selected";
            }
            lp.append('<option '+selected+' data-table="produit_devis" data-column="produit_id" data-val="' + myresp.id + '" data-id="' + id + '">' + myresp.reference + ' ' + myresp.description + ' ' + myresp.prix_unitaire + ' &euro;' + '</option>');
        });
    }).fail(function(response, code) {
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
    }).done(function(response, code) {
        $('#produits tbody').empty();
        var total = 0;
        var deleteDisable = "";
        if($('#produits').data("type")==="facture"){
            deleteDisable="d-none";
        }

        $.each(JSON.parse(response), function(arrayID, myresp) {
            $('#produits tbody').append('<tr><td><div data-html2canvas-ignore data-modifier="getProduitsById" data-id="' + myresp.pdid + '" data-table="produit_devis" class="'+ deleteDisable +' deleteItem icon-delete"></div><div style="display:inline;" data-val="'+ myresp.pid +'" data-id="' + myresp.pdid + '" class="selectable">' + myresp.reference + '</div></td>' +
                '<td>' + myresp.description + '</td>' +
                '<td><div class="editable getProduitsById" style="display:inline;" data-modifier="getProduitsById" data-table="produit_devis" data-column="quantite" data-id=' + myresp.pdid + '>' + myresp.quantite + '</div> </td>' +
                '<td>' + euro.format(myresp.prix_unitaire) + '</td>' +
                '<td>' + euro.format((myresp.quantite * myresp.prix_unitaire)) + '</td></tr>');
            total += (myresp.quantite * myresp.prix_unitaire);
        });

        $("#totaldevis tbody").empty();
        //Dernier ligne de calcul
        getGlobal(total);
    }).fail(function(response, code) {
        showError(response);
    });
}




function newDevis() {
    $.ajax({
        url: baseUrl + '/devis/insert',
        type: 'POST',
        async: false,
        contentType: 'application/json'
    }).fail(function(response, code) {
        showError(response);
    }).done(showDone());
}

function newClient() {
    $.ajax({
        url: baseUrl + '/client/insert',
        type: 'POST',
        async: false,
        contentType: 'application/json',
    }).fail(function(response, code) {
        showError(response);
    }).done(showDone());
}

function newProduit() {
    $.ajax({
        url: baseUrl + '/produit/insert',
        type: 'POST',
        async: false,
        contentType: 'application/json',
    }).fail(function(response, code) {
        showError(response);
    }).done(showDone());
}

function configuration(f1) {
    $.ajax({
        url: baseUrl + '/getConfiguration',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        f1(response);
    }).fail(function(response, code) {
        showError(response);
    });
}

function getGlobal(total){
    $.ajax({
        url: baseUrl + '/getConfiguration',
        type: 'PROPFIND',
        contentType: 'application/json',
    }).done(function(response) {
        var myresp = JSON.parse(response)[0];
        var tva = parseFloat(myresp.tva_default);
        $('#totaldevis tbody').append('<tr><td>' + euro.format(total) + '</td><td id="tva">'+tva+' %</td><td id="totaltva">'+euro.format(Math.round((total*tva))/100)+'</td><td>' + euro.format(Math.round((total*(tva+100)))/100) + '</td></tr>');
        $('#mentions_default').html(myresp.mentions_default);
    })
}

function isconfig() {
    $.ajax({
        url: baseUrl + '/isconfig',
        type: 'GET',
        contentType: 'application/json'
    }).done(function(response) {
        if(!response){
            var modal = document.getElementById("modalConfig");
            modal.style.display = "block";
        }
    })
}

var path = function(res) {
    var myres = JSON.parse(res)[0];
    $("#theFolder").val(myres.path);
    $("#theFolder").attr('data-id', myres.id);
};

function getStats() {
    $.ajax({
        url: baseUrl + '/getStats',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        var res = JSON.parse(response);
        $("#statsclient").text(res.client);
        $("#statsdevis").text(res.devis);
        $("#statsfacture").text(res.facture);
        $("#statsproduit").text(res.produit);
    }).fail(function(response, code) {
        showError(response);
    });
}