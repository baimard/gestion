import { baseUrl, checkSelectPurJs, LoadDT, removeOptions, showDone } from "../modules/mainFunction.mjs";

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
        showDone()
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

  /**
   * 
   * @param {*} id 
   */
  static getClientByIdDevis(id) {
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
            $("#legal_one").html(myresp.legal_one);
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

  /**
   * 
   */
  static loadClientList() {
    Client.getClients(function (response) {
      var listClients = document.querySelectorAll(".listClient");

      listClients.forEach(selectElement => {
        removeOptions(selectElement);
        var option = document.createElement("option");
        option.value = 0;
        option.text = t('gestion', 'Choose customer');
        selectElement.appendChild(option);

        JSON.parse(response).forEach(myresp => {
          var option = document.createElement("option");
          option.value = myresp.id;
          option.text = myresp.prenom + ' ' + myresp.nom;
          selectElement.appendChild(option);
        });
  
        checkSelectPurJs(selectElement);
      });
    });
  }
}
