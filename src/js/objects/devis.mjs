import {generateUrl, getRootUrl} from "@nextcloud/router";

export class Devis {

    /**
     * Devis object
     * @param myresp instantiate devis object
     */
    constructor(myresp) {
     
      this.id = myresp.id;
      this.date = ((myresp.date == null || myresp.date.length === 0) ? '-' : myresp.date);
      this.num = ((myresp.num == null || myresp.num.length === 0) ? '-' : myresp.num);
      this.cid = ((myresp.cid == null || myresp.cid.length === 0) ? '-' : myresp.cid);
      this.version = ((myresp.version == null || myresp.version.length === 0) ? '-' : myresp.version);
      this.mentions = ((myresp.mentions == null || myresp.mentions.length === 0) ? '-' : myresp.mentions);
      this.baseUrl = getRootUrl()+generateUrl('/apps/gestion');
    }

    /**
     * Get datatable row for a devis
     */
    getDTRow() {
        let myrow = [
          '<input style="margin:0;padding:0;" class="inputDate" type="date" value='+this.date+' data-table="devis" data-column="date" data-id="' + this.id + '"/>',
          '<div class="editable" data-table="devis" data-column="num" data-id="' + this.id + '" style="display:inline">' + this.num + '</div>',
          '<div data-table="devis" data-column="id_client" data-id="' + this.id + '"><select class="listClient" data-current="'+ this.cid +'"></select></div>',
          '<div class="editable" data-table="devis" data-column="version" data-id="' + this.id + '" style="display:inline">' + this.version + '</div>',
          '<div class="editable" data-table="devis" data-column="mentions" data-id="' + this.id + '" style="display:inline">' + this.mentions + '</div>',
          '<div style="display:inline-block;margin-right:0px;width:80%;"><a href="'+this.baseUrl+"/devis/"+this.id+'/show"><button>'+t('gestion', 'Open')+'</button></a></div><div data-modifier="devis" data-id='+this.id+' data-table="devis" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>'
        ];
      return myrow;
    }
}
