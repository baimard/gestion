var baseUrl = OC.generateUrl('/apps/gestion');
$(document).ready( function () {
    $('#clientinsert').submit(function(e){
        e.preventDefault();

        var errorHandler = function(code) {
			console.log(code);
		}

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
});