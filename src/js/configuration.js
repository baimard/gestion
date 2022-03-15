import '@nextcloud/dialogs/styles/toast.scss'
import '../css/mycss.less';

import { configuration} from "./modules/ajaxRequest.mjs";
import { globalConfiguration } from "./modules/mainFunction.mjs";
import './listener/main_listener';
import { getAutoIncrement, getCurrencyList, getFormatList } from './modules/list.mjs';


window.addEventListener('DOMContentLoaded', function () {
    globalConfiguration(false);


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
        // console.table(myresp)
        document.getElementById('entreprise').innerHTML             = (((myresp.entreprise.length === 0) ? '-' : myresp.entreprise));
        document.getElementById('nom').innerHTML                    = ((myresp.nom.length === 0) ? '-' : myresp.nom)
        document.getElementById('prenom').innerHTML                 = ((myresp.prenom.length === 0) ? '-' : myresp.prenom)
        document.getElementById('adresse').innerHTML                = ((myresp.adresse.length === 0) ? '-' : myresp.adresse)
        document.getElementById('legal_one').innerHTML              = ((myresp.legal_one.length === 0) ? '-' : myresp.legal_one)
        document.getElementById('legal_two').innerHTML              = ((myresp.legal_two.length === 0) ? '-' : myresp.legal_two)
        document.getElementById('telephone').innerHTML              = ((myresp.telephone.length === 0) ? '-' : myresp.telephone)
        document.getElementById('mail').innerHTML                   = ((myresp.mail.length === 0) ? '-' : myresp.mail)
        document.getElementById('tva_default').innerHTML            = ((myresp.tva_default.length === 0) ? '-' : myresp.tva_default)
        document.getElementById('auto_invoice_number').innerHTML    = getAutoIncrement(myresp.auto_invoice_number)
        document.getElementById('currency').innerHTML               = getCurrencyList(myresp.devise)
        document.getElementById('format').innerHTML                 = getFormatList(myresp.format)
        document.getElementById('mentions_default').innerHTML       = ((myresp.mentions_default.length === 0) ? '-' : myresp.mentions_default.replace(/\&amp;/g, '&'))
        
        // $('#nom')               .html(((myresp.nom.length === 0) ? '-' : myresp.nom));
        // $('#prenom')            .html(((myresp.prenom.length === 0) ? '-' : myresp.prenom));
        // $('#adresse')           .html(((myresp.adresse.length === 0) ? '-' : myresp.adresse));
        // $('#legal_one')         .html(((myresp.legal_one.length === 0) ? '-' : myresp.legal_one));
        // $('#legal_two')         .html(((myresp.legal_two.length === 0) ? '-' : myresp.legal_two));
        // $('#telephone')         .html(((myresp.telephone.length === 0) ? '-' : myresp.telephone));
        // $('#mail')              .html(((myresp.mail.length === 0) ? '-' : myresp.mail));
        // $('#tva_default')       .html(((myresp.tva_default.length === 0) ? '-' : myresp.tva_default));
        // $('#auto_invoice_number').html(getAutoIncrement(myresp.auto_invoice_number));
        // $('#currency')          .html(getCurrencyList(myresp.devise));
        // $('#format')            .html(getFormatList(myresp.format));
        // $('#mentions_default')  .html(((myresp.mentions_default.length === 0) ? '-' : myresp.mentions_default.replace(/\&amp;/g, '&')));

        document.getElementById('entreprise')       .setAttribute("data-id", myresp.id);
        document.getElementById('nom')       .setAttribute("data-id", myresp.id);
        document.getElementById('prenom')       .setAttribute("data-id", myresp.id);
        document.getElementById('adresse')       .setAttribute("data-id", myresp.id);
        document.getElementById('legal_one')       .setAttribute("data-id", myresp.id);
        document.getElementById('legal_two')       .setAttribute("data-id", myresp.id);
        document.getElementById('telephone')       .setAttribute("data-id", myresp.id);
        document.getElementById('mail')       .setAttribute("data-id", myresp.id);
        document.getElementById('tva_default')       .setAttribute("data-id", myresp.id);
        document.getElementById('auto_invoice_number')       .setAttribute("data-id", myresp.id);
        document.getElementById('currency')       .setAttribute("data-id", myresp.id);
        document.getElementById('format')       .setAttribute("data-id", myresp.id);
        document.getElementById('mentions_default')       .setAttribute("data-id", myresp.id);

        // $('#entreprise')            .setAttribute("data-id", myresp.id);
        // $('#nom')                   .setAttribute("data-id", myresp.id);
        // $('#prenom')                .setAttribute("data-id", myresp.id);((myresp.nom.length === 0) ? '-' : myresp.nom)
        // $('#adresse')               .setAttribute("data-id", myresp.id);
        // $('#legal_one')             .setAttribute("data-id", myresp.id);
        // $('#legal_two')             .setAttribute("data-id", myresp.id);
        // $('#telephone')             .setAttribute("data-id", myresp.id);
        // $('#mail')                  .setAttribute("data-id", myresp.id);
        // $('#tva_default')           .setAttribute("data-id", myresp.id);
        // $('#auto_invoice_number')   .setAttribute("data-id", myresp.id);
        // $('#currency')              .setAttribute("data-id", myresp.id);
        // $('#format')                .setAttribute("data-id", myresp.id);
        // $('#mentions_default')      .setAttribute("data-id", myresp.id);((myresp.nom.length === 0) ? '-' : myresp.nom)

    });
}