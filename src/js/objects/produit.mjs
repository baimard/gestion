import { showError } from "@nextcloud/dialogs";
import { baseUrl, cur, LoadDT, showDone } from "../modules/mainFunction.mjs";

export class Produit {

  /**
   * 
   * @param myresp instantiate product object
   */
  constructor(myresp) {
    this.id = myresp.id;
    this.reference = ((myresp.reference.length === 0) ? '-' : myresp.reference);
    this.description = ((myresp.description.length === 0) ? '-' : myresp.description);
    this.prix_unitaire = ((myresp.prix_unitaire.length === 0) ? '-' : myresp.prix_unitaire);
  }

  /**
   * Get datatable row for a product
   */
  getDTRow() {
    let myrow = [
      '<div class="editable" data-table="produit" data-column="reference" data-id="' + this.id + '">' + this.reference + '</div>',
      '<div class="editable" data-table="produit" data-column="description" data-id="' + this.id + '">' + this.description + '</div>',
      '<div class="editableNumeric" data-table="produit" data-column="prix_unitaire" data-id="' + this.id + '">' + cur.format(this.prix_unitaire) + '</div>',
      '<div data-modifier="produit" data-id=' + this.id + ' data-table="produit" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>'
    ];
    return myrow;
  }

  /**
   * 
   * @param {*} productDT 
   */
  static loadProduitDT(productDT) {
    var oReq = new XMLHttpRequest();
    oReq.open('PROPFIND', baseUrl + '/getProduits', true);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.onload = function(e){
      if (this.status == 200) {
        LoadDT(productDT, JSON.parse(this.response), Produit);
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
   static newProduct(dt) {
    var oReq = new XMLHttpRequest();
    oReq.open('POST', baseUrl + '/produit/insert', true);
    oReq.onload = function(e){
      if (this.status == 200) {
        showDone()
        Produit.loadProduitDT(dt);
      }else{
        showError(this.response);
      }
    };
    oReq.send();
  }
}
