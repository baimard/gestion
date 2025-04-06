// import "@nextcloud/dialogs/dist/index.css";
import "../css/mycss.less";

import { addShareUser, configuration, createCompany, deleteCompany, delShareUser, updateDBConfiguration} from "./modules/ajaxRequest.js";
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

    var submitEmail = document.getElementById("submitEmail");
    if (submitEmail) {
        submitEmail.addEventListener('click', function() {
            addShareUser(document.getElementById("emailInput").value);
        });
    }

    var deleteShareUsers = document.querySelectorAll(".deleteShareUser");

    if (deleteShareUsers.length > 0) {
        deleteShareUsers.forEach(function(deleteShareUser) {
            deleteShareUser.addEventListener('click', function() {
                delShareUser(this.getAttribute('data-uid'));
            });
        });
    }

    var newCompany = document.getElementById("newCompany");
    if (newCompany) {
        newCompany.addEventListener("click", function() {
            createCompany();
        });
    }

    var newCompany = document.getElementById("deleteCompany");
    if (newCompany) {
        newCompany.addEventListener("click", function() {
            deleteCompany();
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
    // Parse the JSON response
    const data = JSON.parse(response);

    // Iterate over each item in the parsed JSON array
    data.forEach(function (myresp) {
        // Set the value of each form field, using "-" if the value is an empty string
        document.getElementById("entreprise").value = myresp.entreprise.length === 0 ? "-" : myresp.entreprise;
        document.getElementById("nom").value = myresp.nom.length === 0 ? "-" : myresp.nom;
        document.getElementById("prenom").value = myresp.prenom.length === 0 ? "-" : myresp.prenom;
        document.getElementById("adresse").value = myresp.adresse.length === 0 ? "-" : myresp.adresse;
        document.getElementById("legal_one").value = myresp.legal_one.length === 0 ? "-" : myresp.legal_one;
        document.getElementById("legal_two").value = myresp.legal_two.length === 0 ? "-" : myresp.legal_two;
        document.getElementById("telephone").value = myresp.telephone.length === 0 ? "-" : myresp.telephone;
        document.getElementById("mail").value = myresp.mail.length === 0 ? "-" : myresp.mail;
        document.getElementById("tva_default").value = myresp.tva_default.length === 0 ? "-" : myresp.tva_default;
        document.getElementById("facture_prefixe").value = myresp.facture_prefixe.length === 0 ? "-" : myresp.facture_prefixe;

        // Call external functions with the appropriate parameters
        setCurrencyList(myresp.devise, document.getElementById("currency"));
        setFormatList(myresp.format, document.getElementById("format"));

        document.getElementById("mentions_default").innerHTML = myresp.mentions_default.length === 0 ? "-" : myresp.mentions_default.replace(/\&amp;/g, "&");
        
        // Set the data-id attribute for each form field
        const fields = [
            "entreprise", "nom", "prenom", "adresse", "legal_one", "legal_two",
            "telephone", "mail", "tva_default", "facture_prefixe", "currency",
            "format", "mentions_default"
        ];

        fields.forEach(function (field) {
            document.getElementById(field).setAttribute("data-id", myresp.id);
        });
    });
}
