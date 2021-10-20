    <div class="bootstrap-iso">
        <h2 class="mt-3 mb-3 text-center"><?php p($l->t('Invoice #'));?> <div id="factureid" style="display:inline" class="editable" data-table="facture" data-column="num" data-id="<?php echo $_['facture'][0]->id;?>"><?php echo $_['facture'][0]->num;?></div></h2>
        <hr/>
        <div class="row">
            <div class="col col-md">
                <?php $res = json_decode($_['configuration'])[0]; ?>
                <h5 class="p-3 m-0 text-dark text-center border border-2 border-dark"><?php p($l->t('FROM'));?> <?php echo $res->entreprise;?></h5>
                <p class="p-3 m-0 text-center text-dark text-center border border-top-0 border-2 border-dark">
                <?php echo $res->prenom . " " . $res->nom; ?><br/>
                <?php echo $res->adresse; ?><br/>
                <?php echo $res->mail; ?><br/>
                <?php echo $res->telephone; ?>
                </p>
            </div>
            <div class="col col-md">
            <h5 class="p-3 m-0 text-dark text-center border border-2 border-dark"><?php p($l->t('TO'));?> <span id="entreprise"></span></h6>
                <p class="p-3 mt-0 mb-4 text-center text-dark text-center border border-top-0 border-2 border-dark">
                    <span id="nomprenom"></span><br/>
                    <span id="adresse"></span><br/>
                    <span id="mail"></span><br/>
                    <span id="telephone"></span><br/>
                    <?php p($l->t('Limited company'));?> : <span id="siret"></span><br/>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col col-md">
                <hr/>
                    <div class="col col-xl mb-3 text-center">
                        <span><?php p($l->t('Settlement date'));?> : <b><?php echo (new DateTime($_['facture'][0]->date_paiement))->format('d-m-Y');?></b>, </span><span><?php p($l->t('date of service'));?> : <b><?php echo $_['facture'][0]->date;?></b></span><br/>
                        <span id="devisid" data-id=<?php echo $_['facture'][0]->id_devis;?>><?php p($l->t('Associated quote'));?> : <b><?php echo $_['facture'][0]->dnum;?></b>, </span><span><?php p($l->t('Means of payment'));?> : <b><?php echo $_['facture'][0]->type_paiement;?></b></span><br/>
                    </div>
                <hr/>
            </div>
        </div>
        <div class="table-responsive">
            <table id="produits" data-type="facture" class="table table-striped">
                <thead>
                    <tr>
                        <th><?php p($l->t('Reference'));?></th>
                        <th><?php p($l->t('Designation'));?></th>
                        <th><?php p($l->t('Quantity'));?></th>
                        <th><?php p($l->t('Unit price without VAT'));?></th>
                        <th><?php p($l->t('Total without VAT'));?></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="table-responsive">
            <table id="discounts" data-type="facture" class="table table-striped discountRelated">
                <thead>
                    <tr>
<!--                        <th><?php p($l->t('Priority'));?></th>-->
                        <th><?php p($l->t('Discount'));?> <?php p($l->t('Designation'));?></th>
                        <th><?php p($l->t('Value'));?></th>
<!--                        <th><?php p($l->t('Type'));?></th>-->
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="mt-0 table-responsive">
            <table id="totaldevis" class="table table-striped table-xl">
                <thead class="bg-dark text-white">
                    <tr>
                        <th class="text-center"><?php p($l->t('Total without VAT'));?></th>
                        <th class="text-center discountRelated"><?php p($l->t('Discount'));?></th>
                        <th class="text-center"><?php p($l->t('VAT Rate'));?></th>
                        <th class="text-center"><?php p($l->t('Total VAT'));?></th>
                        <th class="text-center"><?php p($l->t('Total Price'));?></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center" id="rawTotalValue" data-value="0" >0</td>
                        <td class="text-center discountRelated" id="discountRate" data-value="0">0%</td>
                        <td class="text-center" id="vatRate" data-value="0">0%</td>
                        <td class="text-center" id="totalVat" data-value="0">0</td>
                        <td class="text-center" id="finalTotalValue" data-value="0">0</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col m-0 pb-0 alert alert-info text-center">
            <!-- Need to set in Database -->
            <p>Délai de paiement le 5ième jour du mois suivant la commande. En cas de retard, une pénalité au taux annuel de 5 % sera appliquée.</p>
            <p>TVA non applicable, art. 293B du CGI.</p>
            <hr />
            <p><?php p($l->t('Company'));?> <?php echo $res->entreprise; ?><br /><?php echo $res->adresse; ?><br /> <?php p($l->t('Unique identification'));?> : <?php echo $res->siren; ?> - <?php p($l->t('Limited company'));?> : <?php echo $res->siret; ?></p>
        </div>
        
        <button id="pdf" type="button" class="mb-2 btn btn-outline-success" data-html2canvas-ignore><?php p($l->t('Save in Nextcloud'));?></button>
    </div>
