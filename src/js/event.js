import $ from 'jquery';

import 'bootstrap/js/dist/toast';

import {generateUrl} from "@nextcloud/router";

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/toast';


var baseUrl = generateUrl('/apps/gestion');


$(window).on("load", function(){
    $("#liveToast").toast({animation: true, delay: 4000});
    getProduitsById();
});

$('body').on('click', '.menu', function(){
    $('#menu-'+this.dataset.menu).toggleClass('open');
});

$('body').on('click', '.editable', function(){
    $(this).attr('contenteditable', 'true');
});

$('body').on('blur', '.editable', function(){
    updateDB($(this).data('table'), $(this).data('column'), $(this).text(), $(this).data('id'));
    if($(this).data('modifier') === "getProduitsById"){
        getProduitsById();
    }
    $(this).attr('contenteditable', 'false');
    $(this).removeAttr('contenteditable');
});

$('body').on('dblclick', '.selectableClient, .selectableClient_devis', function(){
    var id = $(this).data('id');
    $(this).text("");
    $(this).html('<select id="listClient">');
    listClient($('#listClient'), id);
});

$('body').on('click', '.deleteItem', function(){
    var id = $(this).data('id');
    var table = $(this).data('table');
    var modifier = $(this).data('modifier');

    deleteDB(table, id);

    if( modifier === "getProduitsById"){
        getProduitsById();
    }
});

$('body').on('submit', '#clientinsert', function(e){
    e.preventDefault();
    var client = {
        nom: $('#nom').val(),
        prenom: $('#prenom').val(),
        siret: $('#siret').val(),
        entreprise: $('#entreprise').val(),
        telephone: $('#telephone').val(),
        mail: $('#mail').val(),
        adresse: $('#adresse').val()
    };
    
    $.ajax({
        url: baseUrl + '/client/insert',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(client)
    }).done(function (response) {
    }).fail(function (response, code) {
        error(response);
    });
});

$('body').on('click', '#listClient,#listProduit', function(){

    //Récupère les variables
    var id=$(this).find(':selected').data('id')
    var val=$(this).find(':selected').data('val')
    var column=$(this).find(':selected').data('column')
    var table=$(this).find(':selected').data('table')
    var el = $(this).parent();

    //Mise à jour de la table
    updateDB(table, column, val, id);

    //Modification spéciphique pour une catégorie
    if( el.get( 0 ).className === "selectableClient_devis"){
        updateClient(val);
    }if($(this).attr('id')==="listProduit"){
        getProduitsById();
    }

    el.text($(this).val());

});

$('body').on('click', '#devisAdd', function(){
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
        error(response);
    });
});

$('body').on('dblclick', '.selectable', function(){
    var id = $(this).data('id');
    $(this).text("");
    $(this).html('<select id="listProduit">');
    listProduit($('#listProduit'), id);
});


function listProduit(lp, id){
    $.ajax({
        url: baseUrl+'/getProduits',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        $.each(JSON.parse(response), function(arrayID, myresp) {
            lp.append('<option data-table="produit_devis" data-column="produit_id" data-val="'+myresp.id+'" data-id="'+ id +'">'+myresp.reference + ' ' + myresp.description + ' ' + myresp.prix_unitaire + ' &euro;' + '</option>');
        });
    }).fail(function (response, code) {
    });
}

function updateClient(id){
    var myData = {id: id,};
    $.ajax({
        url: baseUrl+'/client',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function (response, code) {
        $.each(JSON.parse(response), function(arrayID, myresp) {
            $("#entreprise").text(myresp.entreprise);
            $("#adresse").text(myresp.adresse);
            $("#mail").text(myresp.mail);
            $("#telephone").text(myresp.telephone);
            $("#siret").text(myresp.siret);
        });
    }).fail(function (response, code) {
        console.log(code);
    });
}


function listClient(lc, id){
    $.ajax({
        url: baseUrl+'/getClients',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        $.each(JSON.parse(response), function(arrayID, myresp) {
            lc.append('<option data-table="devis" data-column="id_client" data-val="'+myresp.id+'" data-id="'+ id +'">'+myresp.prenom + ' ' + myresp.nom + ' ' + '</option>');
        });
    }).fail(function (response, code) {
        console.log(code);
    });
}

function updateDB(table, column, data, id){
    var myData = {
        table: table,
        column: column,
        data: data,
        id: id,
    };

    $.ajax({
        url: baseUrl+'/update',
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function (response, code) {
        $("#liveToast").toast('show');
    }).fail(function (response, code) {
        console.log(code);
    });
}

function deleteDB(table, id){
    var myData = {
        table: table,
        id: id,
    };

    $.ajax({
        url: baseUrl+'/delete',
        type: 'DELETE',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function (response, code) {
        //$("#liveToast").toast('show');
    }).fail(function (response, code) {
        console.log(code);
    });
}

function getProduitsById(){
    var devis_id = $('#devisid').data('id');
    var myData = {numdevis: devis_id,};

    $.ajax({
        url: baseUrl+'/getProduitsById',
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function (response, code) {
        $('#produits tbody').empty();
        var total=0;
        $.each(JSON.parse(response), function(arrayID, myresp) {
            $('#produits tbody').append('<tr><td class="selectable"><div data-html2canvas-ignore data-modifier="getProduitsById" data-id=' + myresp.pdid + ' data-table="produit_devis" style="display:inline-block;margin-right:25px;" class="deleteItem icon-delete-white"></div>' + myresp.reference + '</td>'+
                                        '<td>'+myresp.description+'</td>'+
                                        '<td><div class="editable getProduitsById" style="display:inline;" data-modifier="getProduitsById" data-table="produit_devis" data-column="quantite" data-id='+myresp.pdid+'>'+myresp.quantite+'</div> </td>'+
                                        '<td>'+myresp.prix_unitaire+' &euro;</td>'+
                                        '<td>'+(myresp.quantite*myresp.prix_unitaire)+' &euro;</td></tr>');
            total+=(myresp.quantite*myresp.prix_unitaire);
        });

        $("#totaldevis tbody").empty();
        $('#totaldevis tbody').append('<tr><td>'+total+'</td><td>20 %</td><td>'+Math.round((total*0.2*100))/100+'</td><td>'+Math.round((total*1.2*100))/100+'</td></tr>');
    }).fail(function (response, code) {
        console.log(code);
    });
}