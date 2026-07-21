import { showSuccess } from "@nextcloud/dialogs";
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import { configuration, getStats, isconfig, updateEditable } from "./ajaxRequest.js";
import { generateUrl } from "@nextcloud/router";
import { csrfHeaders } from "./csrf.js";
export var baseUrl = generateUrl('/apps/gestion');
export var cur = null;
export const defaultCurrencyCode = 'EUR';
export const defaultCurrencyLocale = 'en-EN';

/**
 * Parse configuration responses that can be returned either as an array,
 * a JSON-encoded array, or a JSON-encoded string containing the array.
 *
 * @param {*} response
 * @return {Array}
 */
export function parseConfigurationResponse(response) {
    try {
        let data = response;

        if (typeof data === 'string') {
            data = JSON.parse(data);
        }

        if (typeof data === 'string') {
            data = JSON.parse(data);
        }

        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

/**
 * Return a valid ISO 4217 currency code for Intl.NumberFormat.
 *
 * @param {*} currencyCode
 * @return {string}
 */
function normalizeCurrencyCode(currencyCode) {
    if (typeof currencyCode !== 'string' || currencyCode.trim() === '') {
        return defaultCurrencyCode;
    }

    return currencyCode.trim().toUpperCase();
}

/**
 * 
 */
 export var optionDatatable = {
    autoWidth: false,
    stateSave: true,
    lengthMenu: [[100, 300, 500, -1], [100, 300, 500, "All"]],
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
}

/**
 * 
 * @param {*} checkConfig 
 */
export function globalConfiguration(checkConfig=true){
    getStats();
    
    if(checkConfig){
        isconfig();
    }

    configuration(getCurrency);
    configuration(path);
}

/**
 * 
 */
export function configureDT() {
    document.querySelectorAll('.editable').forEach(element => {
        element.setAttribute('title', t('gestion', 'Editable (Click to change)'));
    });
}

/**
 * 
 */
export function configureShow() {
    document.querySelectorAll('.sendmail').forEach(element => {
        element.setAttribute('title', t('gestion', 'Your global Nextcloud mail server need to be configured'));
    });
}

/**
 * Success message
 */
export function showDone() {
    showSuccess(t('gestion', 'Added!'));
}

/**
 * 
 * @param {*} el 
 */
export function checkSelect(el) {
    const elements = el instanceof Element ? [el] : Array.from(el);
    elements.forEach(elem => {
        elem.querySelectorAll('option').forEach(option => {
            if (option.value == elem.getAttribute("data-current")) {
                option.selected = true;
            }
        });
    });
}


export function checkSelectPurJs(el) {
    Array.from(el.options).forEach(element => {
        if (element.value == el.getAttribute("data-current")) {
            element.setAttribute('selected', true);
        }
    });
}

/**
 * 
 * @param {*} DT 
 * @param {*} response 
 * @param {*} cls 
 */
export function LoadDT(DT, response, cls) {
    DT.clear();
    JSON.parse(response).forEach(myresp => {
        let c = new cls(myresp);
        DT.row.add(c.getDTRow());
    });
    DT.columns.adjust(optionDatatable).draw(true);
    configureDT();
}

/**
 * 
 * @param {*} ID 
 * @param {*} positionRow 
 * @param {*} positionColumn 
 * @param {*} data 
 */
export function insertRow(ID, positionRow = -1, positionColumn = -1, data){
    var t1 = document.getElementById(ID);
    var r = t1.insertRow(positionRow);
    insertCell(r, -1, data, "statHead");

    //Ajout de toutes les colonnes
    for (let i = 1; i < 13; i++) {
        insertCell(r, -1, cur.format(0));
    }
    return r;
}
/**
 * 
 * @param {*} row
 * @param {*} positionColumn 
 * @param {*} data 
 */
export function insertCell(row, positionColumn = -1, data, className="statData"){
    var c = row.insertCell(positionColumn);
    c.appendChild(document.createTextNode(data));
    c.setAttribute("class", className);
}

/**
 * 
 * @param {*} r 
 * @param {*} positionColumn 
 * @param {*} data 
 */
export function modifyCell(r, positionColumn = -1, data){
    var cell = r.cells[positionColumn];
    cell.innerHTML = data;
}

/**
 * 
 * @param {*} res 
 */
 export function path(res) {
    var myres = JSON.parse(res)[0];
    const folder = document.getElementById("theFolder");
    folder.value = myres.path;
    folder.setAttribute('data-id', myres.id);
};


/**
 * 
 * @param {*} response 
 */
export function getCurrency(response) {
    const myresp = parseConfigurationResponse(response)[0] || {};
    const locale = myresp.format || defaultCurrencyLocale;
    const currency = normalizeCurrencyCode(myresp.devise);

    try {
        cur = new Intl.NumberFormat(locale, { style: 'currency', currency: currency, minimumFractionDigits: 2 });
    } catch (error) {
        cur = new Intl.NumberFormat(defaultCurrencyLocale, { style: 'currency', currency: defaultCurrencyCode, minimumFractionDigits: 2 });
    }
}

/**
 * 
 * @param {*} total 
 */
export function getGlobal() {
const url = baseUrl + '/getConfiguration';
const options = {
    method: 'PROPFIND',
    headers: csrfHeaders({
        'Content-Type': 'application/json'
    })
};


fetch(url, options)
    .then(response => response.json())
    .then(data => {
        const myresp = JSON.parse(data)[0];

        let mentionsDefault = myresp.mentions_default;
        mentionsDefault = mentionsDefault.replace(/\n/g, '<br/>');
        document.getElementById('mentions_default').innerHTML = unescapeHtml(mentionsDefault);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

/**
 * //@
 * @param {*} response 
 * 
 */
export function checkAutoIncrement(response){
    var myresp = JSON.parse(response)[0];
    if(myresp.auto_invoice_number==1){
        document.querySelectorAll('.deleteItem').forEach(element => element.remove());
        document.querySelectorAll(".factureNum").forEach(element => {
            element.classList.remove("editable");
        });
    }
}

/**
 * Format number if it's monetary
 * @param {*} el 
 * @param {*} format_number 
 */
export function updateNumerical(el, format_number=true){
    el.innerText=el.innerText.replace(',', '.').replace(/[^0-9.-]+/g,"")
    updateEditable(el);
    if (
        el.dataset.column === "quantite") {
        return;
    }
    if(format_number){
        el.innerText=cur.format(el.innerText)
    }else{
        el.innerText=el.innerText
    }
}

/**
 * 
 */
export function removeOptions(selectElement) {
    
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }

 /**
  * 
  */
 export function unescapeHtml(escapedHtml) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = escapedHtml;
    return textArea.value;
}