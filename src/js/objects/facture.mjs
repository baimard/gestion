import {generateUrl, getRootUrl} from "@nextcloud/router";

export class Facture {

    /**
     * Facture object
     * @param myresp instantiate Facture object
     */
    constructor(myresp) {
     
      this.id = myresp.id;
      this.date = ((myresp.date == null || myresp.date.length === 0) ? '-' : myresp.date);
      this.num = ((myresp.num == null || myresp.num.length === 0) ? '-' : myresp.num);
      this.version = ((myresp.version == null || myresp.version.length === 0) ? '-' : myresp.version);
      this.date_paiement = ((myresp.date_paiement == null || myresp.date_paiement.length === 0) ? '-' : myresp.date_paiement);
      this.type_paiement = ((myresp.type_paiement == null || myresp.type_paiement.length === 0) ? '-' : myresp.type_paiement);
      this.status_paiement = ((myresp.status_paiement == null || myresp.status_paiement.length === 0) ? '-' : myresp.status_paiement);
      this.id_devis = ((myresp.id_devis == null || myresp.id_devis.length === 0) ? '-' : myresp.id_devis);
      this.baseUrl = getRootUrl()+generateUrl('/apps/gestion');
    }

    /**
     * Get datatable row for a devis
     */
    getDTRow() {
        let myrow = [
          '<div class="editable" data-table="facture" data-column="num" data-id="' + this.id + '">' + this.num + '</div>',
          '<div class="editable" data-table="facture" data-column="date" data-id="' + this.id + '">' + this.date + '</div>',
          '<input style="margin:0;padding:0;" class="inputDate" type="date" value='+ this.date_paiement +' data-table="facture" data-column="date_paiement" data-id="' + this.id + '"/>',
          '<div class="editable" data-table="facture" data-column="type_paiement" data-id="' + this.id + '">' + this.type_paiement + '</div>',
          '<div data-table="facture" data-column="id_devis" data-id="' + this.id + '"><select class="listDevis" data-current="'+ this.id_devis +'"></select></div>',
          '<div class="editable" data-table="facture" data-column="version" data-id="' + this.id + '" style="display:inline">' + this.version + '</div>',
          '<div class="editable" data-table="facture" data-column="status_paiement" data-id="' + this.id + '" style="display:inline">' + this.status_paiement + '</div>',
          '<div style="display:inline-block;margin-right:0px;width:80%;"><a href="'+this.baseUrl+'/facture/' + this.id + '/show"><button>'+ t('gestion', 'Open')+'</button></a></div><div data-modifier="facture" data-id=' + this.id + ' data-table="facture" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>',
        ];
      return myrow;
    }
}
