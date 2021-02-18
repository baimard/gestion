var baseUrl = OC.generateUrl('/apps/gestion');

$(document).ready( function () {
    $('.menu').click(function(){
        //console.log(this.dataset.menu);
        $('#menu-'+this.dataset.menu).toggleClass('open');
    });
} );

