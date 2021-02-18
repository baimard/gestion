var baseUrl = OC.generateUrl('/apps/gestion');

$(document).ready( function () {
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
} );

