import $ from 'jquery';
import {generateUrl, linkTo} from "@nextcloud/router";
import {FilePicker,showMessage,showError} from "@nextcloud/dialogs";
import {getCanonicalLocale, translate as t, translatePlural as n} from '@nextcloud/l10n'
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

    console.log(getCanonicalLocale());

    $('.tabledt').DataTable({
        "autoWidth": true,
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
        getGlobalDiscountsById();
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

$('body').on('click', '.editable', function() {makeEditable($(this));});

$('body').on('click', '.editableChild', function() {makeEditable($(this.querySelector('.editable')));});

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
    if (modifier === "getGlobalDiscountsById") {getGlobalDiscountsById();}
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
        showError(response);
    });
});

$('body').on('click', '#devisAddGlobalDiscount', function() {

    var devis_id = $('#devisid').data('id');
    var discount_devis = {
        id: devis_id,
        produit_devis_id: -1
    };

    $.ajax({
        url: baseUrl + '/insertDiscountDevis',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(discount_devis)
    }).done(function(response) {
        getGlobalDiscountsById();
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

function makeEditable(element) {
	element.attr('contenteditable', 'true');
	element.focus();
}

function updateEditable(myCase){
    updateDB(myCase.data('table'), myCase.data('column'), myCase.text(), myCase.data('id'));
    if (myCase.data('modifier') === "getProduitsById") {
        getProduitsById();
    }
    if (myCase.data('modifier') === "getGlobalDiscountsById") {
        getGlobalDiscountsById()
    }
    myCase.attr('contenteditable', 'false');
    myCase.removeAttr('contenteditable');
}

function loadProduitDT() {
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
    $.ajax({
        url: baseUrl + '/getDevis',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function(response) {
        $('#devis').DataTable().clear();
        $.each(JSON.parse(response), function(arrayID, myresp) {
            $('#devis').DataTable().row.add([
                '<input style="margin:0;padding:0;" class="inputDate" type="date" value='+myresp.date+' data-table="devis" data-column="date" data-id="' + myresp.id + '"/>',
                '<div class="editable" data-table="devis" data-column="num" data-id="' + myresp.id + '" style="display:inline">' + myresp.num + '</div>',
                '<div data-table="devis" data-column="id_client" data-id="' + myresp.id + '"><select class="listClient" data-current="'+ myresp.cid +'"></select></div>',
                '<div style="display:inline-block;margin-right:0px;width:80%;"><a href="'+baseUrl+"/devis/"+myresp.id+'/show"><button>'+ t('gestion', 'Open')+'</button></a></div><div data-modifier="devis" data-id=' + myresp.id + ' data-table="devis" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>'
            ]);
        });
        loadClientList();
        $('#devis').DataTable().draw();
        $('#devis').DataTable().columns.adjust();
        configureDT();
    }).fail(function(response, code) {
        showError(response);
    });
}

var lcdt = function loadConfigurationDT(response) {
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
            $("#nomprenom").html(myresp.prenom + ' ' + myresp.nom);
            $("#nomprenom").attr('data-id', id);
            $("#entreprise").html(myresp.entreprise);
            $("#adresse").html(myresp.adresse);
            $("#mail").html(myresp.mail);
            $("#telephone").html(myresp.telephone);
            $("#siret").html(myresp.siret);
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

function updateFinalValue(){
	var rawTotal = parseFloat($("#rawTotalValue").data("value"));
	var discountAmount = rawTotal * parseFloat($("#discountRate").data("value"));
	var vatAmount = (rawTotal + discountAmount) * parseFloat($("#vatRate").data("value"));
	
	$("#totalVat").data("value", vatAmount);
	
	var total = rawTotal + discountAmount + vatAmount;
	$("#finalTotalValue").data("value", total);
	$("#finalTotalValue").text(euro.format(total));
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

        $("#rawTotalValue").text(euro.format(total));
        $("#rawTotalValue").data("value", total);
        
        updateFinalValue();
    }).fail(function(response, code) {
        showError(response);
    });
}

function getGlobalDiscountsById(){
    var devis_id = $('#devisid').data('id');
    var myData = { numdevis: devis_id, };

    $.ajax({
        url: baseUrl + '/getGlobalDiscountsById',
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function(response, code) {
        $('#discounts tbody').empty();
        var total = 0;
        var discountNb = 0;
        var deleteDisable = "";
        if($('#discounts').data("type")==="facture"){
            deleteDisable="d-none";
        }

        $.each(JSON.parse(response), function(arrayID, myresp) {
            $('#discounts tbody').append('<tr>'+
//                '<td class="editableChild"><div class="editable getGlobalDiscountsById" style="display:inline;" data-modifier="getGlobalDiscountsById" data-table="discount_devis" data-column="priority" data-id=' + myresp.did + '>' + myresp.priority + '</div> </td>' +
                '<td class="editableChild"><div data-html2canvas-ignore data-modifier="getGlobalDiscountsById" data-id="' + myresp.did + '" data-table="discount_devis" class="'+ deleteDisable +' deleteItem icon-delete"></div><div class="editable getGlobalDiscountsById" style="display:inline;" data-modifier="getGlobalDiscountsById" data-table="discount_devis" data-column="description" data-id=' + myresp.did + '>' + myresp.description + '</div>' +
                '<td class="editableChild"><div class="editable getGlobalDiscountsById" style="display:inline;" data-modifier="getGlobalDiscountsById" data-table="discount_devis" data-column="value" data-id=' + myresp.did + '>' + myresp.value + '</div>% </td>');
//                '<td class="editableChild"><div class="editable getGlobalDiscountsById" style="display:inline;" data-modifier="getGlobalDiscountsById" data-table="discount_devis" data-column="type" data-id=' + myresp.did + '>' + myresp.type + '</div> </td>');
            
            total = myresp.value/100.0 + total + total * myresp.value/100.0;
            discountNb += 1;
        });

        $("#discountRate").text((total*100).toFixed(2) + "%");
        $("#discountRate").data("value", total);
    
        updateFinalValue();
        
        if(discountNb<=0){
			$(".discountRelated").each( function() {
				$(this).css("display", "none");
			});
        } else {
			$(".discountRelated").each( function() {
				$(this).css("display", "");
			});
		}
    
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
