import { showError } from "@nextcloud/dialogs";
import { baseUrl, cur, LoadDT, showDone } from "../modules/mainFunction.js";
import { setCsrfRequestHeader } from "../modules/csrf.js";
import { translate as t } from '@nextcloud/l10n';

const VAT_CATEGORIES = [
  ['S', 'S — ' + t('gestion', 'Subject to VAT')],
  ['E', 'E — ' + t('gestion', 'VAT exempt')],
  ['Z', 'Z — ' + t('gestion', 'Taxable at zero rate')],
  ['O', 'O — ' + t('gestion', 'Outside the scope of VAT')],
  ['AE', 'AE — ' + t('gestion', 'Reverse charge')],
  ['G', 'G — ' + t('gestion', 'Export outside the EU')],
  ['K', 'K — ' + t('gestion', 'Intra-Community supply')],
];
const DEFAULT_VAT_EXEMPTION_REASON_CODE = 'VATEX-FR-FRANCHISE';

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
    this.vat = myresp.vat ?? '-';
    this.vat_category = myresp.vat_category ?? (Number(this.vat) === 0 ? 'E' : 'S');
    this.vat_exemption_reason_code = myresp.vat_exemption_reason_code
      ?? (this.vat_category === 'E' ? DEFAULT_VAT_EXEMPTION_REASON_CODE : '');
    this.header = myresp.header;
  }

  /**
   * Get datatable row for a product
   */
  getDTRow() {
    const vatCategoryOptions = VAT_CATEGORIES.map(([value, label]) =>
      '<option value="' + value + '"' + (value === this.vat_category ? ' selected' : '') + '>' + label + '</option>'
    ).join('');
    const exemptionReasonButtonHidden = this.vat_category === 'E' ? '' : ' hidden';
    const isHeader = String(this.header) === '1';
    let myrow = [
      '<div class="editable" data-table="produit" data-column="reference" data-id="' + this.id + '">' + this.reference + '</div>',
      '<div class="editable" data-table="produit" data-column="description" data-id="' + this.id + '">' + this.description + '</div>',
      '<div class="editableNumeric" data-table="produit" data-column="prix_unitaire" data-id="' + this.id + '">' + cur.format(this.prix_unitaire) + '</div>',
      '<div class="editable" data-table="produit" data-column="vat" data-id="' + this.id + '">' + this.vat + '%</div>',
      '<select class="editableSelect vat-category-select" data-table="produit" data-column="vat_category" data-id="' + this.id + '" data-current="' + this.vat_category + '" aria-label="' + t('gestion', 'Electronic invoice VAT category') + '">' + vatCategoryOptions + '</select>',
      '<button type="button" class="product-header-toggle' + (isHeader ? ' active' : '') + '" data-id="' + this.id + '" data-value="' + (isHeader ? '1' : '0') + '" aria-pressed="' + (isHeader ? 'true' : 'false') + '" aria-label="' + t('gestion', 'Use as a header row') + '"><span class="product-header-toggle-knob"><span class="material-symbols">check</span></span></button>',
      '<button type="button" class="vat-exemption-reason-action" data-id="' + this.id + '" data-reason-code="' + this.vat_exemption_reason_code + '" title="' + t('gestion', 'VAT exemption reason') + '" aria-label="' + t('gestion', 'VAT exemption reason') + '"' + exemptionReasonButtonHidden + '><span class="material-symbols-outlined">gavel</span></button>'
        + '<div data-modifier="produit" data-id=' + this.id + ' data-table="produit" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>',
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
    setCsrfRequestHeader(oReq);
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
    setCsrfRequestHeader(oReq);
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
