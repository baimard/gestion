import $ from 'jquery';
import {generateUrl} from "@nextcloud/router";
import {FilePicker,showMessage,showError} from "@nextcloud/dialogs";
import {translate as t, translatePlural as n} from '@nextcloud/l10n'
import '@nextcloud/dialogs/styles/toast.scss'
import '../css/mycss.less';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';
import 'bootstrap/js/dist/util';
import { getClients, getDevis, updateDB, deleteDB} from "./modules/ajaxRequest.mjs";
import { configureDT, langage } from "./modules/mainFunction.mjs";

var baseUrl = generateUrl('/apps/gestion');
const euro = new Intl.NumberFormat('fr-FR', {style: 'currency',currency: 'EUR',minimumFractionDigits: 2});

$(window).on("load", function() {

    $('.tabledt').DataTable({
        "autoWidth": true,
        language: {
            "search":           t('gestion', 'Search'),
            "emptyTable":       t('gestion', 'No data available in table'),
            "info":             t('gestion', 'Showing _START_ to _END_ of _TOTAL_ entries'),
            "infoEmpty":        t('gestion', 'Showing 0 to 0 of 0 entries'),
            "infoFiltered":     t('gestion', '_MAX_ entries filtered'),
            "lengthMenu":       t('gestion', 'Show _MENU_ entries'),
            "loadingRecords":   t('gestion', 'Loading records'),
            "processing":       t('gestion', 'Processing'),
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
    if ($('#produit').length) {loadProduitDT();}

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

// $('body').on('dblclick', '.selectableClient, .selectableClient_devis', function() {
//     var id = $(this).data('id');
//     var table = $(this).data('table');
//     var column = $(this).data('column');
//     $(this).text("");
//     $(this).html('<select class="listClient">');
//     listClient($('#listClient'), id, table, column);
// });

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
    console.log(produitid);
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
    if (modifier === "produit") {loadProduitDT();}
});

$('body').on('change', '.listClient,.listDevis', function(){
    var myDiv = $(this).parents( "div" );
    var id = $(myDiv).data('id');
    var val = this.value;
    var column = $(myDiv).data('column');
    var table = $(myDiv).data('table');
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
        showError(response);
    });
});

$('body').on('click', '#newClient', function() {
    newClient();
    loadClientDT();
})

$('body').on('click', '#newDevis', function() {
    newDevis();
    loadDevisDT();
})

$('body').on('click', '#newFacture', function() {
    newFacture();
    loadFactureDT();
})

$('body').on('click', '#newProduit', function() {
    newProduit();
    loadProduitDT();
})

function updateEditable(myCase){
    updateDB(myCase.data('table'), myCase.data('column'), myCase.text(), myCase.data('id'));
    if (myCase.data('modifier') === "getProduitsById") {
        getProduitsById();
    }
    myCase.attr('contenteditable', 'false');
    myCase.removeAttr('contenteditable');
}

function loadProduitDT() {
    if (!$.fn.DataTable.isDataTable('#produit')) {
        $('#produit').dataTable({
            "autoWidth": true,
            "columns": [{ "width": "20%" },{ "width": "50%" },{ "width": "20%" },{ "width": "10%" },]
        });
    }

    $.ajax({
        url: baseUrl + '/getProduits',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        $('#produit').DataTable().clear();
        $.each(JSON.parse(response), function(arrayID, myresp) {
            $('#produit').DataTable().row.add([
                '<div class="editable" data-table="produit" data-column="reference" data-id="' + myresp.id + '">' + myresp.reference + '</div>',
                '<div class="editable" data-table="produit" data-column="description" data-id="' + myresp.id + '">' + myresp.description + '</div>',
                '<div class="editable" data-table="produit" data-column="prix_unitaire" data-id="' + myresp.id + '">' + myresp.prix_unitaire + '</div>',
                '<div data-modifier="produit" data-id=' + myresp.id + ' data-table="produit" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>'
                
            ]);
        });
        $('#produit').DataTable().draw(false);
        configureDT();
    }).fail(function(response, code) {
        showError(response);
    });
}

function loadFactureDT() {
    if (!$.fn.DataTable.isDataTable('#facture')) {
        $('#facture').dataTable({
            "autoWidth": true,
            "columns": [{ "width": "16%" },{ "width": "16%" },{ "width": "17%" },{ "width": "18%" },{ "width": "23%" },{ "width": "10%" }]
        });
    }

    $.ajax({
        url: baseUrl + '/getFactures',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        $('#facture').DataTable().clear();
        $.each(JSON.parse(response), function(arrayID, myresp) {
            var dtpaiement = ""
            if (myresp.date_paiement == null) {
                dtpaiement = "Attente client"
            } else {
                dtpaiement = myresp.date_paiement
            }

            $('#facture').DataTable().row.add([
                '<div class="editable" data-table="facture" data-column="num" data-id="' + myresp.id + '">' + myresp.num + '</div>',
                '<div class="editable" data-table="facture" data-column="date" data-id="' + myresp.id + '">' + myresp.date + '</div>',
                '<div class="editable" data-table="facture" data-column="date_paiement" data-id="' + myresp.id + '">' + dtpaiement + '</div>',
                '<div class="editable" data-table="facture" data-column="type_paiement" data-id="' + myresp.id + '">' + myresp.type_paiement + '</div>',
                '<div data-table="facture" data-column="id_devis" data-id="' + myresp.id + '"><select class="listDevis" data-current="'+ myresp.id_devis +'"></select></div>',
                '<div style="display:inline-block;margin-right:0px;width:80%;"><a href="/apps/gestion/facture/' + myresp.id + '/show"><button>'+ t('gestion', 'Open')+'</button></a></div><div data-modifier="facture" data-id=' + myresp.id + ' data-table="facture" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>',
            ]);
        });
        loadDevisList();
        $('#facture').DataTable().draw(false);
        configureDT();
    }).fail(function(response, code) {
        showError(response);
    });
}

function loadDevisDT() {
    if (!$.fn.DataTable.isDataTable('#devis')) {
        $('#devis').dataTable({
            "autoWidth": true,
            "columns": [{ "width": "30%" }, { "width": "30%" },{ "width": "30%" },{ "width": "10%" }]
        });
    }

    $.ajax({
        url: baseUrl + '/getDevis',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        $('#devis').DataTable().clear();
        $.each(JSON.parse(response), function(arrayID, myresp) {
            $('#devis').DataTable().row.add([
                '<div class="editable" data-table="devis" data-column="date" data-id="' + myresp.id + '">' + myresp.date + '</div>',
                '<div class="editable" data-table="devis" data-column="num" data-id="' + myresp.id + '" style="display:inline">' + myresp.num + '</div>',
                '<div data-table="devis" data-column="id_client" data-id="' + myresp.id + '"><select class="listClient" data-current="'+ myresp.cid +'"></select></div>',
                '<div style="display:inline-block;margin-right:0px;width:80%;"><a href="/apps/gestion/devis/' + myresp.id + '/show"><button>'+ t('gestion', 'Open')+'</button></a></div><div data-modifier="devis" data-id=' + myresp.id + ' data-table="devis" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>'
            ]);
        });
        loadClientList();
        $('#devis').DataTable().draw();
        configureDT();
    }).fail(function(response, code) {
        showError(response);
    });
}

var lcdt = function loadConfigurationDT(response) {

    if (!$.fn.DataTable.isDataTable('#configuration')) {
        $('#configuration').dataTable({
            "autoWidth": true,
            "columns": [{ "width": "10%" }, { "width": "10%" },{ "width": "10%" },{ "width": "10%" },{ "width": "10%" },{ "width": "14%" },{ "width": "18%" }, { "width": "18%" }]
        });
    }

    $('#configuration').DataTable().clear();
    $.each(JSON.parse(response), function(arrayID, myresp) {
        $('#configuration').DataTable().row.add(['<div class="editable" data-table="configuration" data-column="entreprise" data-id="' + myresp.id + '">' + myresp.entreprise + '</div>',
            '<div class="editable" data-table="configuration" data-column="nom" data-id="' + myresp.id + '">' + myresp.nom + '</div>',
            '<div class="editable" data-table="configuration" data-column="prenom" data-id="' + myresp.id + '">' + myresp.prenom + '</div>',
            '<div class="editable" data-table="configuration" data-column="siret" data-id="' + myresp.id + '">' + myresp.siret + '</div>',
            '<div class="editable" data-table="configuration" data-column="siren" data-id="' + myresp.id + '">' + myresp.siren + '</div>',
            '<div class="editable" data-table="configuration" data-column="telephone" data-id="' + myresp.id + '">' + myresp.telephone + '</div>',
            '<div class="editable" data-table="configuration" data-column="mail" data-id="' + myresp.id + '">' + myresp.mail + '</div>',
            '<div class="editable" data-table="configuration" data-column="adresse" data-id="' + myresp.id + '">' + myresp.adresse + '</div>'
        ]);
    });

    $('#configuration').DataTable().draw();
    configureDT();
}

function loadClientDT() {
    $.ajax({
        url: baseUrl + '/getClients',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        // if (!$.fn.DataTable.isDataTable('#client')) {
        //     $('#client').dataTable({
        //         "autoWidth": true,
        //         "columns": [{ "width": "14%" },{ "width": "10%" },{ "width": "10%" },{ "width": "10%" },{ "width": "14%" },{ "width": "18%" },{ "width": "18%" },{ "width": "6%" }]
        //     });
        // }

        $('#client').DataTable().clear();
        $.each(JSON.parse(response), function(arrayID, myresp) {
            $('#client').DataTable().row.add([
                '<div class="editable" data-table="client" data-column="entreprise" data-id="' + myresp.id + '">' + myresp.entreprise + '</div>',
                '<div class="editable" data-table="client" data-column="nom" data-id="' + myresp.id + '">' + myresp.nom + '</div>',
                '<div class="editable" data-table="client" data-column="prenom" data-id="' + myresp.id + '">' + myresp.prenom + '</div>',
                '<div class="editable" data-table="client" data-column="siret" data-id="' + myresp.id + '">' + myresp.siret + '</div>',
                '<div class="editable" data-table="client" data-column="telephone" data-id="' + myresp.id + '">' + myresp.telephone + '</div>',
                '<div class="editable" data-table="client" data-column="mail" data-id="' + myresp.id + '">' + myresp.mail + '</div>',
                '<div class="editable" data-table="client" data-column="adresse" data-id="' + myresp.id + '">' + myresp.adresse + '</div>',
                '<center><div data-modifier="client" data-id=' + myresp.id + ' data-table="client" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div></center>'
            ]);
        });
        $('#client').DataTable().draw();
        configureDT();
    }).fail(function(response, code) {
        showError(response);
    });
}

function loadClientList(){
    getClients(function(response){
        $('.listClient').append("<option value='nothing'>"+ t('gestion', 'Choose customer')+"</option>");
        $.each(JSON.parse(response), function(arrayID, myresp) {     
            $('.listClient').append("<option value='"+ myresp.id +"'>"+myresp.nom + " " + myresp.prenom+"</option>");
        });
        checkSelect('.listClient');
    });
}

function loadDevisList(){
    getDevis(function(response){
        $('.listDevis').append("<option value='nothing'>"+ t('gestion', 'Choose quote')+"</option>");
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
            $("#nomprenom").text(myresp.prenom + ' ' + myresp.nom);
            $("#nomprenom").attr('data-id', id);
            $("#entreprise").text(myresp.entreprise);
            $("#adresse").text(myresp.adresse);
            $("#mail").text(myresp.mail);
            $("#telephone").text(myresp.telephone);
            $("#siret").text(myresp.siret);
            $("#pdf").attr("data-folder", myresp.num);
            if ($("#factureid").length) {
                $("#pdf").attr("data-name", myresp.entreprise + "_" + $("#factureid").text() + "_v" + 1);
            } else {
                $("#pdf").attr("data-name", myresp.entreprise + "_" + myresp.num + "_v" + 1);
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

// function listDevis(lp, id, table, column) {
//     $.ajax({
//         url: baseUrl + '/getDevis',
//         type: 'PROPFIND',
//         contentType: 'application/json'
//     }).done(function(response) {
//         $.each(JSON.parse(response), function(arrayID, myresp) {
//             lp.append('<option data-table="' + table + '" data-column="' + column + '" data-val="' + myresp.id + '" data-id="' + id + '">' + myresp.num + ' ' + myresp.prenom + ' ' + myresp.nom + '</option>');
//         });
//     }).fail(function(response, code) {
//         showError(response);
//     });
// }

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
        // Paramètre global BDD Taux TVA
        //$('#totaldevis tbody').append('<tr><td>'+euro.format(total)+'</td><td>0 %</td><td>'+euro.format(Math.round((total*0.2*100))/100)+'</td><td>'+euro.format(Math.round((total*1.2*100))/100)+'</td></tr>');
        $('#totaldevis tbody').append('<tr><td>' + euro.format(total) + '</td><td>0 %</td><td>0</td><td>0</td></tr>');
    }).fail(function(response, code) {
        showError(response);
    });
}

function showDone() {
    showMessage(t('gestion', 'Added'));
}


function newFacture() {
    $.ajax({
        url: baseUrl + '/facture/insert',
        type: 'POST',
        async: false,
        contentType: 'application/json'
    }).fail(function(response, code) {
        showError(response);
    }).done(showDone());
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

function isconfig() {
    $.ajax({
        url: baseUrl + '/isconfig',
        type: 'GET',
        contentType: 'application/json'
    }).done(function(response) {
        console.log(response)
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
