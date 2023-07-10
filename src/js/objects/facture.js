import { showError } from "@nextcloud/dialogs";
import { generateUrl } from "@nextcloud/router";
import { baseUrl, LoadDT, showDone } from "../modules/mainFunction.js";

export class Facture {

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
    this.type_paiement = ((myresp.type_paiement == null || myresp.type_paiement.length === 0) ? '-' : myresp.type_paiement);
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
    let myrow = [
      '<div>' + this.user_id + '</div>',
      '<div class="factureNum" data-table="facture" data-column="num" data-id="' + this.id + '">' + this.num + '</div>',
      '<div class="editable" data-table="facture" data-column="date" data-id="' + this.id + '">' + this.date + '</div>',
      '<input style="margin:0;padding:0;" class="inputDate" type="date" value=' + this.date_paiement + ' data-table="facture" data-column="date_paiement" data-id="' + this.id + '"/>',
      '<div class="editable" data-table="facture" data-column="type_paiement" data-id="' + this.id + '">' + this.type_paiement + '</div>',
      '<div class="loadSelect_listdevis" data-table="facture" data-column="id_devis" data-id="' + this.id + '" data-current="' + this.id_devis + '">' + this.dnum + " " + this.prenom + " " + this.nom + '</div>',
      '<div class="editable" data-table="facture" data-column="version" data-id="' + this.id + '" style="display:inline">' + this.version + '</div>',
      '<div class="editable" data-table="facture" data-column="status_paiement" data-id="' + this.id + '" style="display:inline">' + this.status_paiement + '</div>',
      '<div style="display:inline-block;margin-right:0px;width:80%;"><a href="' + this.baseUrl +'"><button>' + t('gestion', 'Open') + '</button></a></div><div data-modifier="facture" data-id=' + this.id + ' data-table="facture" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>',
    ];
    return myrow;
  }

  static loadFactureDT(factureDT) {
    var oReq = new XMLHttpRequest();
    oReq.open('PROPFIND', baseUrl + '/getFactures', true);
    oReq.setRequestHeader("Content-Type", "application/json");
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


  /**
   * 
   * @param {*} dt 
   */
   static newFacture(dt) {
    var oReq = new XMLHttpRequest();
    oReq.open('POST', baseUrl + '/facture/insert', true);
    oReq.onload = function(e){
      if (this.status == 200) {
        showDone()
        Facture.loadFactureDT(dt);
      }else{
        showError(this.response);
      }
    };
    oReq.send();
  }

}
