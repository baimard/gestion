    <div class="bootstrap-iso">
        <h2 class="mt-3 mb-3 text-center">FACTURE N° <div id="factureid" style="display:inline" class="editable" data-table="facture" data-column="num" data-id="<?php echo $_['facture'][0]->id;?>"><?php echo $_['facture'][0]->num;?></div></h2>
        <hr/>
        <div class="row">
            <div class="col col-md">
                <h5 class="p-3 m-0 text-dark text-center border border-2 border-dark">PART CYBERCORP</h6>
                <p class="p-3 m-0 text-center text-dark text-center border border-top-0 border-2 border-dark">
                    Benjamin AIMARD<br/>
                    34 Avenue Blaise Pascal<br/>
                    33160 SAINT MEDARD EN JALLES<br/>
                    benjamin@cybercorp.fr<br/>
                    06 60 51 44 86<br/>
                </p>
            </div>
            <div class="col col-md">
            <h5 class="p-3 m-0 text-dark text-center border border-2 border-dark">POUR <span id="entreprise"></span></h6>
                <p class="p-3 mt-0 mb-4 text-center text-dark text-center border border-top-0 border-2 border-dark">
                    <span id="nomprenom"></span><br/>
                    <span id="adresse"></span><br/>
                    <span id="mail"></span><br/>
                    <span id="telephone"></span><br/>
                    SIRET : <span id="siret"></span><br/>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col col-md">
                <hr/>
                    <div class="col col-xl mb-3 text-center">
                        <span>Date de règlement : <b><?php echo (new DateTime($_['facture'][0]->date_paiement))->format('d-m-Y');?></b>, </span><span>Date de prestation : <b><?php echo $_['facture'][0]->date;?></b></span><br/>
                        <span id="devisid" data-id=<?php echo $_['facture'][0]->id_devis;?>>Application du Devis : <b><?php echo $_['facture'][0]->dnum;?></b>, </span><span>Payé par : <b><?php echo $_['facture'][0]->type_paiement;?></b></span><br/>
                    </div>
                <hr/>
            </div>
        </div>
        <div class="table-responsive">
            <table id="produits" class="table table-striped">
                <thead>
                    <tr>
                    <th>Reference</th>
                    <th>Désignation</th>
                    <th>Quantité</th>
                    <th>PU HT</th>
                    <th>Total HT</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <button id="pdf" type="button" class="mb-2 btn btn-outline-success" data-html2canvas-ignore>Generer PDF</button>
        </div>
        <div class="mt-0 table-responsive">
            <table id="totaldevis" class="table table-striped table-xl">
                <thead class="bg-dark text-white">
                    <tr>
                        <th class="text-center">Total HT</th>
                        <th class="text-center">Taux TVA</th>
                        <th class="text-center">Total TVA</th>
                        <th class="text-center">Total TTC</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
            <div class="col m-0 pb-0 alert alert-info text-center">
                <p>Délai de paiement le 5ième jour du mois suivant la commande. En cas de retard, une pénalité au taux annuel de 5 % sera appliquée.<p/><p>TVA non applicable, art. 293B du CGI.</p>
                <hr/>
                <p>Société CYBERCORP<br/> 34 avenue Blaise Pascal 33160 SAINT MEDARD EN JALLES<br/> SIREN : 891 577 470 - SIRET : 891 577 470 00018</p>
            </div>
    </div>