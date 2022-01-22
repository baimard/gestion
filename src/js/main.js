import $ from 'jquery';

import { FilePicker, showMessage, showError } from "@nextcloud/dialogs";
import { getCanonicalLocale, translate as t, translatePlural as n } from '@nextcloud/l10n'

import '@nextcloud/dialogs/styles/toast.scss'
import 'datatables.net-dt/css/jquery.dataTables.css';
import '../css/mycss.less';

import 'datatables.net';
import 'bootstrap/js/dist/util';
import './listener/main_listener';

import { newInvoice, updateDB, deleteDB, loadProduitDT, loadClientDT, loadDevisDT, loadFactureDT, getStats, configuration, getAnnualTurnoverPerMonthNoVat, isconfig, getProduitsById } from "./modules/ajaxRequest.mjs";
import { getAutoIncrement, getCurrencyList } from "./modules/list.mjs";
import { showDone, loadClientList, loadDevisList, path, getCurrency, cur, baseUrl } from "./modules/mainFunction.mjs";

/**
 * Convert a string to HTML entities
 */
 String.prototype.toHtmlEntities = function() {
    return this.replace(/./gm, function(s) {
        return (s.match(/[a-z0-9\s]+/i)) ? s : "&#" + s.charCodeAt(0) + ";";
    });
};

/**
 * Create string from HTML entities
 */
String.fromHtmlEntities = function(string) {
    return (string+"").replace(/&#\d+;/gm,function(s) {
        return String.fromCharCode(s.match(/\d+/gm)[0]);
    })
};

var choose_folder = t('gestion', 'Choose work folder');

/**
 * When you load app
 */
$(window).on("load", function () {
    // console.log(baseRemoteUrl);
    // console.log(getCanonicalLocale());

    $('.tabledt').DataTable({
        autoWidth: false,
        stateSave: true,
        language: {
            "search": t('gestion', 'Search'),
            "emptyTable": t('gestion', 'No data available in table'),
            "info": t('gestion', 'Showing {start} to {end} of {total} entries', { start: '_START_', end: '_END_', total: '_TOTAL_' }),
            "infoEmpty": t('gestion', 'Showing 0 to 0 of 0 entries'),
            "loadingRecords": t('gestion', 'Loading records …'),
            "processing": t('gestion', 'Processing …'),
            "infoFiltered": t('gestion', '{max} entries filtered', { max: '_MAX_' }),
            "lengthMenu": t('gestion', 'Show {menu} entries', { menu: '_MENU_' }),
            "zeroRecords": t('gestion', 'No corresponding entry'),
            "paginate": {
                "first": t('gestion', 'First'),
                "last": t('gestion', 'Last'),
                "next": t('gestion', 'Next'),
                "previous": t('gestion', 'Previous'),
            }
        }
    });

    getStats();
    isconfig();
    configuration(getCurrency);
    configuration(path);

    // if ($('#client').length) {
    //     loadClientDT($('#client').DataTable());
    // }
    if ($('#configuration').length) {
        configuration(lcdt);
    }
    if ($('#devis').length) {
        loadDevisDT($('#devis').DataTable());
    }
    if ($('#devisid').length) {
        getClientByIdDevis($('#devisid').data('id'));
        getProduitsById();
    }
    if ($('#facture').length) {
        loadFactureDT($('#facture').DataTable());
    }
    if ($('#produit').length) {
        loadProduitDT($('#produit').DataTable());
    }
    if ($('#Statistical').length) {
        getAnnualTurnoverPerMonthNoVat(cur);
    }
});

var lcdt = function loadConfigurationDT(response) {
    $.each(JSON.parse(response), function (arrayID, myresp) {
        $('#entreprise').html(((myresp.entreprise.length === 0) ? '-' : myresp.entreprise));
        $('#entreprise').data("id", myresp.id);

        $('#nom').html(((myresp.nom.length === 0) ? '-' : myresp.nom));
        $('#nom').data("id", myresp.id);

        $('#prenom').html(((myresp.prenom.length === 0) ? '-' : myresp.prenom));
        $('#prenom').data("id", myresp.id);

        $('#adresse').html(((myresp.adresse.length === 0) ? '-' : myresp.adresse));
        $('#adresse').data("id", myresp.id);

        $('#siret').html(((myresp.siret.length === 0) ? '-' : myresp.siret));
        $('#siret').data("id", myresp.id);

        $('#siren').html(((myresp.siren.length === 0) ? '-' : myresp.siren));
        $('#siren').data("id", myresp.id);

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

function getClientByIdDevis(id) {
    var myData = { id: id, };
    $.ajax({
        url: baseUrl + '/clientbyiddevis',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function (response, code) {
        $.each(JSON.parse(response), function (arrayID, myresp) {
            $("#nomprenom").html(myresp.prenom + ' ' + myresp.nom);
            $("#nomprenom").attr('data-id', id);
            $("#entreprise").html(myresp.entreprise);
            $("#adresse").html(myresp.adresse);
            $("#mail").html(myresp.mail);
            $("#telephone").html(myresp.telephone);
            $("#siret").html(myresp.siret);
            $("#pdf").attr("data-folder", myresp.num);
            if ($("#factureid").length) {
                $("#pdf").data('name', myresp.entreprise + "_" + $("#factureid").text() + "_v" + $('#factureversion').text());
            } else {
                $("#pdf").data('name', myresp.entreprise + "_" + myresp.num + "_v" + $('#devisversion').text());
            }

        });
    }).fail(function (response, code) {
        showError(response);
    });
}


