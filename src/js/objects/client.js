import { updateDB } from "../modules/ajaxRequest.js";
import { baseUrl, checkSelectPurJs, LoadDT} from "../modules/mainFunction.js";
import { showSuccess, showError } from "@nextcloud/dialogs";

export class Client {

  /**
   * 
   * @param myresp instantiate client object
   */
  constructor(myresp) {
    this.id = myresp.id;
    this.entreprise = ((myresp.entreprise.length === 0) ? '-' : myresp.entreprise);
    this.prenom = ((myresp.prenom.length === 0) ? '-' : myresp.prenom);
    this.nom = ((myresp.nom.length === 0) ? '-' : myresp.nom);
    this.legal_one = ((myresp.legal_one.length === 0) ? '-' : myresp.legal_one);
    this.telephone = ((myresp.telephone.length === 0) ? '-' : myresp.telephone);
    this.mail = ((myresp.mail.length === 0) ? '-' : myresp.mail);
    this.adresse = ((myresp.adresse.length === 0) ? '-' : myresp.adresse);
  }

  /**
   * Get datatable row for a client
   */
  getDTRow() {
    let myrow = [
      '<div class="editable" data-table="client" data-column="entreprise" data-id="' + this.id + '">' + this.entreprise + '</div>',
      '<div class="editable" data-table="client" data-column="prenom" data-id="' + this.id + '">' + this.prenom + '</div>',
      '<div class="editable" data-table="client" data-column="nom" data-id="' + this.id + '">' + this.nom + '</div>',
      '<div class="editable" data-table="client" data-column="legal_one" data-id="' + this.id + '">' + this.legal_one + '</div>',
      '<div class="editable" data-table="client" data-column="telephone" data-id="' + this.id + '">' + this.telephone + '</div>',
      '<div class="editable" data-table="client" data-column="mail" data-id="' + this.id + '">' + this.mail + '</div>',
      '<div class="editable" data-table="client" data-column="adresse" data-id="' + this.id + '">' + this.adresse + '</div>',
      '<center><div data-modifier="client" data-id=' + this.id + ' data-table="client" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div></center>'
    ];
    return myrow;
  }

  /**
   * 
   * @param {*} dt 
   */
  static newClient(dt) {
    var oReq = new XMLHttpRequest();
    oReq.open('POST', baseUrl + '/client/insert', true);
    oReq.onload = function(e){
      if (this.status == 200) {
        showSuccess()
        Client.loadClientDT(dt);
      }else{
        showError(this.response);
      }
    };
    oReq.send();
  }

  /**
   * 
   * @param {*} clientDT 
   */
  static loadClientDT(clientDT) {
    var oReq = new XMLHttpRequest();
    oReq.open('PROPFIND', baseUrl + '/getClients', true);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.onload = function(e){
      if (this.status == 200) {
        LoadDT(clientDT, JSON.parse(this.response), Client);
      }else{
        showError(this.response);
      }
    };
    oReq.send();
  }

  /**
   * 
   * @param {*} callback 
   */
  static getClients(callback) {
    var oReq = new XMLHttpRequest();
    oReq.open('PROPFIND', baseUrl + '/getClients', true);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.onload = function(e){
      if (this.status == 200) {
        callback(JSON.parse(this.response));
      }else{
        showError(this.response);
      }
    };
    oReq.send();
    }

  static getClientByIdDevis(id) {
    const myData = { id: id };

    fetch(baseUrl + '/clientbyiddevis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myData)
    })
    .then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json(); // On suppose que le backend renvoie du JSON
    })
    .then(data => {
      var dataArray = JSON.parse(data);
      dataArray.forEach(myresp => {
        document.getElementById("nomprenom").innerHTML = `${myresp.prenom} ${myresp.nom}`;
        document.getElementById("nomprenom").setAttribute("data-id", id);
        document.getElementById("entreprise").innerHTML = myresp.entreprise;
        document.getElementById("adresse").innerHTML = myresp.adresse;
        document.getElementById("mail").innerHTML = myresp.mail;
        document.getElementById("telephone").innerHTML = myresp.telephone;
        document.getElementById("legal_one").innerHTML = myresp.legal_one;
        document.getElementById("pdf").setAttribute("data-folder", myresp.num);

        const factureEl = document.getElementById("factureid");
        const devisVersion = document.getElementById("devisversion");
        const factureVersion = document.getElementById("factureversion");

        const name = factureEl
          ? `${myresp.entreprise}_${factureEl.textContent}_v${factureVersion.textContent}`
          : `${myresp.entreprise}_${myresp.num}_v${devisVersion.textContent}`;

        document.getElementById("pdf").setAttribute("data-name", name);
      });
    }).catch(error => {
            showError(error);
        });
  }


  /**
   * 
   * @param {*} cid 
   */
  static loadClientList_cid(e){
    Client.getClients(response => {

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

          var parentElement = el.target.parentElement
          parentElement.innerHTML = el.target.value + " " + el.target.options[el.target.selectedIndex].text;
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
        option.text = myresp.entreprise + " - " + myresp.prenom + ' ' + myresp.nom;
        selectElement.appendChild(option);
      });
      
      checkSelectPurJs(selectElement);

      e.target.innerHTML = ''
      e.target.appendChild(selectElement);
    });
  }
}
