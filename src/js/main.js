import '../css/mycss.less';
import 'datatables.net-dt/css/jquery.dataTables.css';

import 'datatables.net';
import $ from 'jquery';
import 'bootstrap/js/dist/util';

import './event.js';

import {generateUrl} from "@nextcloud/router";

var baseUrl = generateUrl('/apps/gestion');

$(window).on("load", function(){
    if($('#client').length){
        loadClientDT();
    }
    if($('#devis').length){
        loadDevisDT();
    }
    if($('#facture').length){
        loadFactureDT();
    }
    if($('#produit').length){
        loadProduitDT();
    }

});

$('body').on('click', '#newDevis', function(){
    newDevis();
    loadDevisDT();
})

function loadProduitDT(){
    $.ajax({
        url: baseUrl+'/getProduits',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        $.each(JSON.parse(response), function(arrayID, myresp) {
           $('#produit').DataTable().row.add([myresp.id,myresp.reference,myresp.description]);
           //$('#client').DataTable().row.add(myresp);
        });
        $('#produit').DataTable().draw(false);
    }).fail(function (response, code) {
        console.log(code);
    });
}

function loadFactureDT(){
    $.ajax({
        url: baseUrl+'/getFactures',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        $.each(JSON.parse(response), function(arrayID, myresp) {
           $('#facture').DataTable().row.add([
                                                myresp.id,
                                                myresp.num,
                                                myresp.date,
                                                myresp.date_paiement,
                                                myresp.type_paiement,
                                                myresp.id_devis,
                                                myresp.prenom+" "+myresp.nom
                                            ]);
        });
        $('#facture').DataTable().draw(false);
    }).fail(function (response, code) {
        console.log(code);
    });
}

function loadDevisDT(){
    $.ajax({
        url: baseUrl+'/getDevis',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        $('#devis').DataTable().clear();
        $.each(JSON.parse(response), function(arrayID, myresp) {
           $('#devis').DataTable().row.add([
                                        myresp.id,
                                        '<div class="editable" data-table="devis" data-column="date" data-id="'+myresp.id+'">'+myresp.date+'</div>',
                                        '<a href="/apps/gestion/devis/'+myresp.id+'/show"><i class="icon-details">            </i></a>'+'<div style="display:inline" class="editable" data-table="devis" data-column="num" data-id="'+myresp.id+'">'+myresp.num+'</div>',
                                        '<div class="selectableClient" data-id="'+myresp.id+'">'+myresp.prenom + " " + myresp.nom +'</div>'
                                    ]);
        });
        $('#devis').DataTable().draw(false);
    }).fail(function (response, code) {
        console.log(code);
    });
}

function loadClientDT(){
    $.ajax({
        url: baseUrl+'/getClients',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        $('#client').dataTable( {
            "autoWidth": true
          } );
        $.each(JSON.parse(response), function(arrayID, myresp) {
            $('#client').DataTable().row.add([myresp.id,
                                            '<div class="editable" data-table="client" data-column="entreprise" data-id="'+myresp.id+'">'+myresp.entreprise+'</div>',
                                            '<div class="editable" data-table="client" data-column="nom" data-id="'+myresp.id+'">'+myresp.nom+'</div>',
                                            '<div class="editable" data-table="client" data-column="prenom" data-id="'+myresp.id+'">'+myresp.prenom+'</div>',
                                            '<div class="editable" data-table="client" data-column="siret" data-id="'+myresp.id+'">'+myresp.siret+'</div>',
                                            '<div class="editable" data-table="client" data-column="telephone" data-id="'+myresp.id+'">'+myresp.telephone+'</div>',
                                            '<div class="editable" data-table="client" data-column="mail" data-id="'+myresp.id+'">'+myresp.mail+'</div>',
                                            '<div class="editable" data-table="client" data-column="adresse" data-id="'+myresp.id+'">'+myresp.adresse+'</div>']);
        });
        $('#client').DataTable().draw(false);
    }).fail(function (response, code) {
        console.log(code);
    });
}

function newDevis(){
    $.ajax({
        url: baseUrl+'/devis/insert',
        type: 'POST',
        contentType: 'application/json'
    }).fail(function (response, code) {
        console.log(code);
    });
}