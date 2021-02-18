var baseUrl = OC.generateUrl('/apps/gestion');

$(document).ready( function () {
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
} );