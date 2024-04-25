// import "@nextcloud/dialogs/dist/index.css";
import "../css/mycss.less";

import { configuration, updateDBConfiguration} from "./modules/ajaxRequest.js";
import { globalConfiguration } from "./modules/mainFunction.js";
import "./listener/main_listener";
import { getAutoIncrement, setCurrencyList, setFormatList } from "./modules/list.js";


document.addEventListener('DOMContentLoaded', function() {
    globalConfiguration(false);
    
    /* LISTENER */
    var HelpSection = document.getElementById("HelpSection");
    HelpSection.addEventListener("click", function(){
        var modal = document.getElementById("ConfigurationHelp");
        modal.style.display = "block";
    });

    var openModalButton = document.getElementById('open_configuration_modal');
    if (openModalButton) {
        openModalButton.addEventListener('click', function() {
            var modal = document.getElementById("configuration_modal");
            if (modal) {
                modal.style.display = "block";
            }

            configuration(loadConfigurationDT);
        });
    }

    var shareInput = document.getElementById("emailInput");
    if (shareInput) {
        shareInput.addEventListener("input", function(){
            var existingLoader = document.getElementById("ldLoad");
            if (! existingLoader) {
                var loader = document.createElement("div");
                loader.classList.add("loader");
                loader.id = "ldLoad"; // Add id to the loader div
                shareInput.parentNode.insertBefore(loader, shareInput.nextSibling);
                // existingLoader.remove(); // Remove existing loader if it exists
            }

            var datalist = document.getElementById("search");
            var option = document.createElement("option");
            option.text = shareInput.value;
            datalist.appendChild(option);
        });
    }

    var datalist = document.getElementById("search");
    if (datalist) {
        datalist.addEventListener("click", function(){
        });
    }

    document.body.addEventListener('focusout', function(e) {
        callUpdateDBConfiguration(e);
    });

    document.body.addEventListener('keydown', function(e) {
        if(e.key === "Enter"){
            callUpdateDBConfiguration(e);
        }
    });

    document.body.addEventListener('change', function(e) {

        callUpdateDBConfiguration(e);
    });

    function callUpdateDBConfiguration(e){
        if (e.target.classList.contains('editableConfiguration')
            || e.target.classList.contains('editableConfigurationSelect')
            ) {
            var table = e.target.getAttribute('data-table');
            var column = e.target.getAttribute('data-column');
            var value = e.target.value;
            var id = e.target.getAttribute('data-id');
    
            updateDBConfiguration(table, column, value, id);
        }
    };

});

function loadConfigurationDT(response) {
    $.each(JSON.parse(response), function (arrayID, myresp) {
        document.getElementById("entreprise").value             = (((myresp.entreprise.length === 0) ? "-" : myresp.entreprise));
        document.getElementById("nom").value                    = ((myresp.nom.length === 0) ? "-" : myresp.nom);
        document.getElementById("prenom").value                 = ((myresp.prenom.length === 0) ? "-" : myresp.prenom);
        document.getElementById("adresse").value                = ((myresp.adresse.length === 0) ? "-" : myresp.adresse);
        document.getElementById("legal_one").value              = ((myresp.legal_one.length === 0) ? "-" : myresp.legal_one);
        document.getElementById("legal_two").value              = ((myresp.legal_two.length === 0) ? "-" : myresp.legal_two);
        document.getElementById("telephone").value              = ((myresp.telephone.length === 0) ? "-" : myresp.telephone);
        document.getElementById("mail").value                   = ((myresp.mail.length === 0) ? "-" : myresp.mail);
        document.getElementById("tva_default").value            = ((myresp.tva_default.length === 0) ? "-" : myresp.tva_default);
        document.getElementById("facture_prefixe").value        = ((myresp.facture_prefixe.length === 0) ? "-" : myresp.facture_prefixe);
        // document.getElementById("auto_invoice_number").value    = getAutoIncrement(myresp.auto_invoice_number);
        setCurrencyList(myresp.devise, document.getElementById("currency"));
        setFormatList(myresp.format, document.getElementById("format"));
        document.getElementById("mentions_default").value       = ((myresp.mentions_default.length === 0) ? "-" : myresp.mentions_default.replace(/\&amp;/g, "&"));

        document.getElementById("entreprise")       .setAttribute("data-id", myresp.id);
        document.getElementById("nom")              .setAttribute("data-id", myresp.id);
        document.getElementById("prenom")           .setAttribute("data-id", myresp.id);
        document.getElementById("adresse")          .setAttribute("data-id", myresp.id);
        document.getElementById("legal_one")        .setAttribute("data-id", myresp.id);
        document.getElementById("legal_two")        .setAttribute("data-id", myresp.id);
        document.getElementById("telephone")        .setAttribute("data-id", myresp.id);
        document.getElementById("mail")             .setAttribute("data-id", myresp.id);
        document.getElementById("tva_default")      .setAttribute("data-id", myresp.id);
        document.getElementById("facture_prefixe")  .setAttribute("data-id", myresp.id);
        // document.getElementById("auto_invoice_number")       .setAttribute("data-id", myresp.id);
        document.getElementById("currency")         .setAttribute("data-id", myresp.id);
        document.getElementById("format")           .setAttribute("data-id", myresp.id);
        document.getElementById("mentions_default") .setAttribute("data-id", myresp.id);
    });
}