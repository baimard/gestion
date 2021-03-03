import '../css/mycss.less';
import 'datatables.net-dt/css/jquery.dataTables.css';

import {generateUrl} from "@nextcloud/router";
var baseUrl = generateUrl('/apps/gestion');


import $ from 'jquery';
import dt from 'datatables.net';


$(window).on("load", function(){

    $.ajax({
        url: baseUrl+'/getClients',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        $.each(JSON.parse(response), function(arrayID, myresp) {
           $('#client').DataTable().row.add([myresp.id,
                                            myresp.entreprise,
                                            myresp.nom,
                                            myresp.prenom,
                                            myresp.siret,
                                            myresp.telephone,
                                            myresp.mail,
                                            myresp.adresse]);
           //$('#client').DataTable().row.add(myresp);
        });
        $('#client').DataTable().draw(false);
    }).fail(function (response, code) {
        console.log(code);
    });
    //console.log("webpackok");
  });