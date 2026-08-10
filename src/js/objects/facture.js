import { showError } from "@nextcloud/dialogs";
import { translate as t } from '@nextcloud/l10n';
import { generateUrl } from "@nextcloud/router";
import { baseUrl, LoadDT } from "../modules/mainFunction.js";
import { setCsrfRequestHeader } from "../modules/csrf.js";

export class Facture {

  static PAYMENT_MEANS = [
    ['10', t('gestion', 'Cash')],
    ['20', t('gestion', 'Cheque')],
    ['30', t('gestion', 'Credit transfer')],
    ['48', t('gestion', 'Payment card')],
    ['58', t('gestion', 'SEPA credit transfer')],
  ];

  static normalizePaymentMeans(value) {
    const paymentMeans = String(value ?? '').trim();
    if (Facture.PAYMENT_MEANS.some(([code]) => code === paymentMeans)) {
      return paymentMeans;
    }

    const legacyPaymentMeans = {
      cash: '10',
      cheque: '20',
      check: '20',
      bank: '30',
      'credit transfer': '30',
      card: '48',
      'payment card': '48',
      'sepa credit transfer': '58',
    };

    return legacyPaymentMeans[paymentMeans.toLowerCase()] ?? '';
  }

  /**
   * Facture object
   * @param myresp instantiate Facture object
   */
  constructor(myresp) {
    this.id = myresp.id;
    this.user_id = myresp.user_id;
    this.date = ((myresp.date == null || myresp.date.length === 0) ? '-' : myresp.date);
    this.num = ((myresp.num == null || myresp.num.length === 0) ? '-' : myresp.num);
    this.version = ((myresp.version == null || myresp.version.length === 0) ? '-' : myresp.version);
    this.date_paiement = ((myresp.date_paiement == null || myresp.date_paiement.length === 0) ? '-' : myresp.date_paiement);
    this.type_paiement = Facture.normalizePaymentMeans(myresp.type_paiement);
    this.dnum = ((myresp.dnum == null || myresp.dnum.length === 0) ? '-' : myresp.dnum);
    this.nom = ((myresp.nom == null || myresp.nom.length === 0) ? '-' : myresp.nom);
    this.prenom = ((myresp.prenom == null || myresp.prenom.length === 0) ? '-' : myresp.prenom);
    this.status_paiement = ((myresp.status_paiement == null || myresp.status_paiement.length === 0) ? '-' : myresp.status_paiement);
    this.id_devis = ((myresp.id_devis == null || myresp.id_devis.length === 0) ? '-' : myresp.id_devis);
    this.baseUrl = generateUrl(`/apps/gestion/facture/${this.id}/show`);
  }

  /**
   * Get datatable row for a devis
   */
  getDTRow() {
    const paymentMeansOptions = `<option value=""${this.type_paiement === '' ? ' selected' : ''} disabled>${t('gestion', 'Select a means of payment')}</option>` + Facture.PAYMENT_MEANS.map(([code, label]) =>
      `<option value="${code}"${this.type_paiement === code ? ' selected' : ''}>${label}</option>`
    ).join('');
    let myrow = [
      `<div>${this.user_id}</div>`,
      `<div>${this.num}</div>`,
      `<div>${this.date}</div>`,
      `<input style="margin:0;padding:0;" class="inputDate" type="date" value=${this.date_paiement} data-table="facture" data-column="date_paiement" data-id="${this.id}"/>`,
      `<select class="editableSelect" data-table="facture" data-column="type_paiement" data-id="${this.id}" aria-label="${t('gestion', 'Means of payment')}">${paymentMeansOptions}</select>`,
      `<div>${this.dnum} ${this.prenom} ${this.nom}</div>`,
      `<div>${this.version}</div>`,
      `<div class="editable" data-table="facture" data-column="status_paiement" data-id="${this.id}" style="display:inline">${this.status_paiement}</div>`,
      `<details class="document-actions">
        <summary title="${t('gestion', 'Actions')}" aria-label="${t('gestion', 'Actions')}" class="material-symbols">more_horiz</summary>
        <div class="document-actions-menu">
          <a href="${this.baseUrl}" class="document-action"><span class="material-symbols">open_in_new</span><span>${t('gestion', 'Open')}</span></a>
          <button type="button" data-url="${this.baseUrl}" class="document-action downloadDocumentPdf"><span class="material-symbols">download</span><span>${t('gestion', 'Download PDF')}</span></button>
          <button type="button" data-url="${this.baseUrl}" class="document-action sendDocumentMail"><span class="material-symbols">mail</span><span>${t('gestion', 'Send by email')}</span></button>
          <button type="button" data-url="${this.baseUrl}" class="document-action downloadFacturX"><span class="material-symbols">receipt_long</span><span>${t('gestion', 'Factur-X PDF + XML')}</span></button>
          <button type="button" data-url="${this.baseUrl}" class="document-action downloadFacturXml"><span class="material-symbols">data_object</span><span>${t('gestion', 'Factur-X XML')}</span></button>
          <button type="button" data-modifier="facture" data-id="${this.id}" data-table="facture" class="document-action deleteItem"><span class="material-symbols">delete</span><span>${t('gestion', 'Delete')}</span></button>
        </div>
      </details>`
    ];
    return myrow;
  }

  static loadFactureDT(factureDT) {
    var oReq = new XMLHttpRequest();
    oReq.open('PROPFIND', baseUrl + '/getFactures', true);
    oReq.setRequestHeader("Content-Type", "application/json");
    setCsrfRequestHeader(oReq);
    oReq.onload = function(e){
      if (this.status == 200) {
        LoadDT(factureDT, JSON.parse(this.response), Facture);
        // Devis.loadDevisList();
        // configuration(checkAutoIncrement);
      }else{
        showError(this.response);
      }
    };
    oReq.send();
  }

}
