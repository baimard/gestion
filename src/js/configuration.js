import '@nextcloud/dialogs/styles/toast.scss'
import '../css/mycss.less';

import { configuration} from "./modules/ajaxRequest.mjs";
import { globalConfiguration } from "./modules/mainFunction.mjs";
import './listener/main_listener';
import { getAutoIncrement, getCurrencyList } from './modules/list.mjs';


window.addEventListener('DOMContentLoaded', function () {
    globalConfiguration();


    configuration(loadConfigurationDT);

    /* LISTENER */

    var HelpSection = document.getElementById('HelpSection');
    HelpSection.addEventListener('click', function(){
        var modal = document.getElementById("ConfigurationHelp");
        modal.style.display = "block";
    });

});


function loadConfigurationDT(response) {
    $.each(JSON.parse(response), function (arrayID, myresp) {
        $('#entreprise').html(((myresp.entreprise.length === 0) ? '-' : myresp.entreprise));
        $('#entreprise').data("id", myresp.id);

        $('#nom').html(((myresp.nom.length === 0) ? '-' : myresp.nom));
        $('#nom').data("id", myresp.id);

        $('#prenom').html(((myresp.prenom.length === 0) ? '-' : myresp.prenom));
        $('#prenom').data("id", myresp.id);

        $('#adresse').html(((myresp.adresse.length === 0) ? '-' : myresp.adresse));
        $('#adresse').data("id", myresp.id);

        $('#legal_one').html(((myresp.legal_one.length === 0) ? '-' : myresp.legal_one));
        $('#legal_one').data("id", myresp.id);

        $('#legal_two').html(((myresp.legal_two.length === 0) ? '-' : myresp.legal_two));
        $('#legal_two').data("id", myresp.id);

        $('#telephone').html(((myresp.telephone.length === 0) ? '-' : myresp.telephone));
        $('#telephone').data("id", myresp.id);

        $('#mail').html(((myresp.mail.length === 0) ? '-' : myresp.mail));
        $('#mail').data("id", myresp.id);

        $('#tva_default').html(((myresp.tva_default.length === 0) ? '-' : myresp.tva_default + " %"));
        $('#tva_default').data("id", myresp.id);

        $('#auto_invoice_number').html(getAutoIncrement(myresp.auto_invoice_number));
        $('#auto_invoice_number').data("id", myresp.id);

        $('#currency').html(getCurrencyList(myresp.devise));
        $('#currency').data("id", myresp.id);

        $('#mentions_default').html(((myresp.mentions_default.length === 0) ? '-' : myresp.mentions_default.replace(/\&amp;/g, '&')));
        $('#mentions_default').data("id", myresp.id);
    });
}