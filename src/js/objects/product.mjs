export class Product {

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
            '<div class="editable" data-table="produit" data-column="prix_unitaire" data-id="' + this.id + '">' + this.prix_unitaire + '</div>',
            '<div data-modifier="produit" data-id=' + this.id + ' data-table="produit" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>'
        ];
      return myrow;
    }
}