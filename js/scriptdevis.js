var baseUrl = OC.generateUrl('/apps/gestion');

$(document).ready( function () {
    $.ajax({
        url: baseUrl+'/getDevis',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        $.each(JSON.parse(response), function(arrayID, myresp) {
           $('#devis').DataTable().row.add([myresp.id,myresp.date,'<a href="/apps/gestion/devis/'+myresp.id+'/show">'+myresp.num+'</a>',myresp.id_client]);
        });
        $('#devis').DataTable().draw(false);
    }).fail(function (response, code) {
        console.log(code);
    });
} );