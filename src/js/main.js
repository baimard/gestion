import '../css/mycss.less';
import 'datatables.net-dt/css/jquery.dataTables.css';

import $ from 'jquery';
import dt from 'datatables.net';

import './event.js';

import {generateUrl} from "@nextcloud/router";
var baseUrl = generateUrl('/apps/gestion');

$(window).on("load", function(){
    loadDT();
    clientInsert();
});

function loadDT(){
    $.ajax({
        url: baseUrl+'/getClients',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
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

function clientInsert(){
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
			console.log(response);
		}).fail(function (response, code) {
			error(response);
		});
    });
}

