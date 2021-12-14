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
    this.siret = ((myresp.siret.length === 0) ? '-' : myresp.siret);
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
      '<div class="editable" data-table="client" data-column="siret" data-id="' + this.id + '">' + this.siret + '</div>',
      '<div class="editable" data-table="client" data-column="telephone" data-id="' + this.id + '">' + this.telephone + '</div>',
      '<div class="editable" data-table="client" data-column="mail" data-id="' + this.id + '">' + this.mail + '</div>',
      '<div class="editable" data-table="client" data-column="adresse" data-id="' + this.id + '">' + this.adresse + '</div>',
      '<center><div data-modifier="client" data-id=' + this.id + ' data-table="client" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div></center>'
    ];
    return myrow;
  }
}
