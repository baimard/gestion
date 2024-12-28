import { generateUrl } from "@nextcloud/router";
import { updateDB } from "../modules/ajaxRequest.js";
import { baseUrl, checkSelectPurJs, LoadDT, showDone } from "../modules/mainFunction.js";

export class Devis {

  /**
   * Devis object
   * @param myresp instantiate devis object
   */
  constructor(myresp) {
    this.id = myresp.id;
    this.user_id = myresp.user_id;
    this.date = ((myresp.date == null || myresp.date.length === 0) ? '-' : myresp.date);
    this.num = ((myresp.num == null || myresp.num.length === 0) ? '-' : myresp.num);
    this.cid = ((myresp.cid == null || myresp.cid.length === 0) ? '-' : myresp.cid);
    this.entreprise = ((myresp.entreprise == null || myresp.entreprise.length === 0) ? '-' : myresp.entreprise);
    this.nom = ((myresp.nom == null || myresp.nom.length === 0) ? '-' : myresp.nom);
    this.prenom = ((myresp.prenom == null || myresp.prenom.length === 0) ? '-' : myresp.prenom);
    this.version = ((myresp.version == null || myresp.version.length === 0) ? '-' : myresp.version);
    this.mentions = ((myresp.mentions == null || myresp.mentions.length === 0) ? '-' : myresp.mentions);
    this.baseUrl = generateUrl(`/apps/gestion/devis/${this.id}/show`);
  }

  /**
   * Get datatable row for a devis
   */
  getDTRow() {
    let myrow = [
      `<div>${this.user_id}</div>`,
      `<input style="margin:0;padding:0;" class="inputDate" type="date" value=${this.date} data-table="devis" data-column="date" data-id="${this.id}"/>`,
      `<div class="editable" data-table="devis" data-column="num" data-id="${this.id}" style="display:inline">${this.num}</div>`,
      `<div class="loadSelect_listclient" data-table="devis" data-column="id_client" data-id="${this.id}" data-current="${this.cid}">${this.entreprise} - ${this.prenom} ${this.nom}</div>`,
      `<div class="editable" data-table="devis" data-column="version" data-id="${this.id}" style="display:inline">${this.version}</div>`,
      `<div class="editable" data-table="devis" data-column="mentions" data-id="${this.id}" style="display:inline">${this.mentions}</div>`,
      `<div class="material-symbols">
        <span title="${t('gestion', 'Open')}"><a href="${this.baseUrl}">open_in_new</a></span>
        <span title="${t('gestion', 'Duplicate')}" data-modifier="devis" data-id=${this.id} data-table="devis" class="link duplicateItem">content_copy</span>
        <span title="${t('gestion', 'Delete')}" data-modifier="devis" data-id=${this.id} data-table="devis" class="link deleteItem">delete</span>
      </div>`
    ];
    return myrow;
  }

  /**
   * 
   * @param {*} dt 
   */
  static newDevis(dt) {
    fetch(baseUrl + '/devis/insert', {
      method: 'POST'
    })
    .then(response => {
      if (response.ok) {
      showDone();
      Devis.loadDevisDT(dt);
      } else {
      return response.text().then(text => { throw new Error(text) });
      }
    })
    .catch(error => showError(error.message));
  }

  /**
   * Load devis ajax
   * @param devisDT devis datatable
   */
  static loadDevisDT(devisDT) {
    var oReq = new XMLHttpRequest();
    oReq.open('PROPFIND', baseUrl + '/getDevis', true);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.onload = function(e){
      if (this.status == 200) {
        LoadDT(devisDT, JSON.parse(this.response), Devis);
      }else{
        showError(this.response);
      }
    };
    oReq.send();
  }

  static getDevis(callback){
    fetch(baseUrl + '/getDevis', {
      method: 'PROPFIND',
      headers: {
      'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then(text => { throw new Error(text) });
      }
    })
    .then(data => callback(data))
    .catch(error => showError(error.message));
  }

  static loadDevisList_dnum(e){
    Devis.getDevis( response => {
      var selectElement = document.createElement("select");
      selectElement.dataset.current = e.target.dataset.current;
      selectElement.dataset.id = e.target.dataset.id;
      selectElement.dataset.old = e.target.innerHTML;

      selectElement.addEventListener("change", el=>{
        if(el.target.value != 0){
          updateDB(el.target.parentElement.dataset.table,
            el.target.parentElement.dataset.column,
            el.target.value,
            el.target.parentElement.dataset.id
          );

          var parentElement = el.target.parentElement;
          parentElement.innerHTML = el.target.options[el.target.selectedIndex].text;
          parentElement.dataset.current = el.target.value;
        }else{
          var parentElement = el.target.parentElement
          parentElement.innerHTML = el.target.dataset.old
        }
      });

      var option = document.createElement("option");
        option.value = 0;
        option.text = t('gestion', 'Cancel');
        selectElement.appendChild(option);

      JSON.parse(response).forEach(myresp => {
        var option = document.createElement("option");
        option.value = myresp.id;
        option.text = myresp.num + ' ' + myresp.prenom + ' ' + myresp.nom;
        selectElement.appendChild(option);
      });
      
      checkSelectPurJs(selectElement);

      e.target.innerHTML = ''
      e.target.appendChild(selectElement);
    });
  }
}
