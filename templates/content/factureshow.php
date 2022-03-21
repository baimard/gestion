    <div class="bootstrap-iso">
        <h2 class="mt-3 mb-3 text-center"><?php p($l->t('Invoice #'));?>
            <div id="factureid" style="display:inline" class="editable" data-table="facture" data-column="num" data-id="<?php echo $_['facture'][0]->id;?>"><?php echo $_['facture'][0]->num;?></div>
            <span data-html2canvas-ignore><?php p($l->t('Version'));?></span> <div data-html2canvas-ignore id="factureversion" style="display:inline" class="editable" data-table="facture" data-column="version" data-id="<?php echo $_['facture'][0]->id; ?>"><?php echo $_['facture'][0]->version; ?></div>
        </h2>
        <hr/>
        <div class="row">
            <div class="col-5 h-100 m-0" style="min-height:250px;">
                <?php $res = json_decode($_['configuration'])[0]; ?>
                <h5 class="p-3 m-0 text-dark text-center border border-2 border-dark"><?php p($l->t('FROM'));?> <?php echo $res->entreprise; ?></h5>
                <p style="min-height:180px;" class="p-3 m-0 h-100 text-center text-dark text-center border border-top-0 border-2 border-dark">
                    <?php echo $res->prenom . " " . $res->nom; ?><br />
                    <?php echo $res->adresse; ?><br />
                    <?php echo $res->mail; ?><br />
                    <?php echo $res->telephone; ?><br/>
                    <span id="nothing"></span><br />
                </p>
            </div>
            <div class="col-2 h-100 m-0" style="min-height:250px;">
                <?php
                    if(isset($_['logo']) && $_['logo'] !== "nothing"){
                        echo "<center><a><img alt='".$l->t('Company logo')."' class=\"img-fluid\" src=\"data:image/png;base64, ".$_['logo']."\"/></a></center>";
                    }else{
                        echo "<span style='font-size:12px' id='Company-logo' data-html2canvas-ignore><b><center>".$l->t('You can add your company logo here.')."</center></b><br/><i>".$l->t('To add a logo, drop the logo.png file in ".gestion" folder at the root of your Nextcloud Files app. Remember to set "Show hidden files".')."</i><br/><br/><center>".$l->t('This message will not appear on generated PDF.')."</center></span>";
                    }
                ?>
            </div>
            <div class="col-5 h-100 m-0" style="min-height:250px;">
                <h5 class="p-3 m-0 text-dark text-center border border-2 border-dark"><?php p($l->t('TO'));?> <span id="entreprise"></span></h6>
                    <p style="min-height:180px;" class="p-3 m-0 h-100 text-center text-dark text-center border border-top-0 border-2 border-dark">
                        <span id="nomprenom" data-id="0" data-table="devis" data-column="id_client"></span><br />
                        <span id="adresse"></span><br />
                        <span id="mail"></span><br />
                        <span id="telephone"></span><br />
                        <span id="legal_one"></span><br />
                    </p>
            </div>
        </div>
        <div class="row">
            <div class="col col-md">
                <hr/>
                    <div class="col col-xl mb-3 text-center">
                        <span><?php p($l->t('Settlement date'));?> : <b><?php echo (new DateTime($_['facture'][0]->date_paiement))->format('d-m-Y');?></b>, </span><span><?php p($l->t('Date of service'));?> : <b><?php echo $_['facture'][0]->date;?></b></span><br/>
                        <span id="devisid" data-id=<?php echo $_['facture'][0]->id_devis;?>><?php p($l->t('Associated quote'));?> : <b><?php echo $_['facture'][0]->dnum;?></b>, </span><span><?php p($l->t('Means of payment'));?> : <b><?php echo $_['facture'][0]->type_paiement;?></b></span><br/>
                    </div>
                <hr/>
            </div>
        </div>
        <div class="row">
            <div class="col col-md">
                <hr />
                <div class="col col-xl mb-3 text-center" style="display:inline" ><?php echo ($_['facture'][0]->comment == "" ) ? "-" : $_['facture'][0]->comment ; ?></div>
                <hr />
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
            <button id="pdf" type="button" class="mb-2 btn btn-outline-success" data-html2canvas-ignore><?php p($l->t('Save in Nextcloud'));?></button>
            <button id="mailGestion" type="button" data-name="" class="mb-2 btn btn-outline-success sendmail" data-html2canvas-ignore><?php p($l->t('Send by email'));?></button>
        </div>
        <div class="mt-0 table-responsive">
            <table id="totaldevis" class="table table-striped table-xl">
                <thead class="bg-dark text-white">
                    <tr>
                        <th class="text-center"><?php p($l->t('Total without VAT'));?></th>
                        <th class="text-center"><?php p($l->t('VAT Rate'));?></th>
                        <th class="text-center"><?php p($l->t('Total VAT'));?></th>
                        <th class="text-center"><?php p($l->t('Total Price'));?></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="col m-0 pb-0 alert alert-info text-center">
            <p><span id="mentions_default"><?php p($l->t('Please set in global configuration'));?></span></p>
        </div>
        <hr />
        <div class="col m-0 pb-0 alert alert-info text-center">
            <p><?php echo $res->entreprise; ?><br /><?php echo $res->adresse; ?><br /><?php echo $res->legal_one; ?><br/><?php echo $res->legal_two; ?></p>
        </div>
    </div>

