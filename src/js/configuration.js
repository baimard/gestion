// import "@nextcloud/dialogs/dist/index.css";
import "../css/mycss.less";

import { addShareUser, configuration, createCompany, deleteCompany, delShareUser, updateDBConfiguration} from "./modules/ajaxRequest.js";
import { globalConfiguration, parseConfigurationResponse } from "./modules/mainFunction.js";
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
        if (
            e.target.classList.contains('editableConfiguration')
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


/**
 * Retourne "-" si la valeur est null, undefined ou vide
 */
function safeValue(value) {
    return value === null || value === undefined || value === ""
        ? "-"
        : value;
}


function loadConfigurationDT(response) {

    // Parse the JSON response and ensure the table only receives an array.
    const data = parseConfigurationResponse(response);

    // Iterate over each item in the parsed JSON array
    data.forEach(function (myresp) {

        console.log("CONFIG OBJ:", myresp);

        // Champs texte sécurisés
        document.getElementById("entreprise").value = safeValue(myresp.entreprise);
        document.getElementById("nom").value = safeValue(myresp.nom);
        document.getElementById("prenom").value = safeValue(myresp.prenom);
        document.getElementById("adresse").value = safeValue(myresp.adresse);
        document.getElementById("legal_one").value = safeValue(myresp.legal_one);
        document.getElementById("legal_two").value = safeValue(myresp.legal_two);
        document.getElementById("telephone").value = safeValue(myresp.telephone);
        document.getElementById("mail").value = safeValue(myresp.mail);
        document.getElementById("tva_default").value = safeValue(myresp.tva_default);
        document.getElementById("facture_prefixe").value = safeValue(myresp.facture_prefixe);
        document.getElementById("city_name").value = safeValue(myresp.city_name);
        document.getElementById("zip_code").value = safeValue(myresp.zip_code);
        document.getElementById("vat_number").value = safeValue(myresp.vat_number);
        document.getElementById("iban").value = safeValue(myresp.iban);

        setCurrencyList(myresp.devise, document.getElementById("currency"));
        setFormatList(myresp.format, document.getElementById("format"));

        document.getElementById("mentions_default").innerHTML =
            safeValue(myresp.mentions_default).replace(/\&amp;/g, "&");

        const fields = [
            "entreprise",
            "nom",
            "prenom",
            "adresse",
            "legal_one",
            "legal_two",
            "telephone",
            "mail",
            "tva_default",
            "facture_prefixe",
            "currency",
            "format",
            "mentions_default",
            "zip_code",
            "vat_number",
            "city_name",
            "iban"
        ];

        fields.forEach(function (field) {
            document
                .getElementById(field)
                .setAttribute("data-id", myresp.id);
        });
    });
}