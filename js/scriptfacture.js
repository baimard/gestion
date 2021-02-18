var baseUrl = OC.generateUrl('/apps/gestion');

$(document).ready( function () {
    $.ajax({
        url: baseUrl+'/getFactures',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        $.each(JSON.parse(response), function(arrayID, myresp) {
           $('#facture').DataTable().row.add([myresp.id,myresp.num,myresp.date,myresp.date_paiement,myresp.type_paiement,myresp.id_devis,myresp.prenom+" "+myresp.nom]);
           //$('#client').DataTable().row.add(myresp);
        });
        $('#facture').DataTable().draw(false);
    }).fail(function (response, code) {
        console.log(code);
    });
} );