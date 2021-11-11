<div class="bootstrap-iso">
        <h2 class="mt-3 mb-3 text-center"> <?php p($l->t('Quote #'));?>
        <div id="devisid" style="display:inline" class="editable" data-table="devis" data-column="num" data-id="<?php echo $_['devis'][0]->devisid; ?>"><?php echo $_['devis'][0]->num; ?></div>
        <span><?php p($l->t('Version'));?></span> <div id="devisversion" style="display:inline" class="editable" data-table="devis" data-column="version" data-id="<?php echo $_['devis'][0]->devisid; ?>"><?php echo $_['devis'][0]->version; ?></div>
        </h2>
        <hr />
        <div class="row">
            <div class="col col-md">
                <?php $res = json_decode($_['configuration'])[0]; ?>
                <h5 class="p-3 m-0 text-dark text-center border border-2 border-dark"><?php p($l->t('FROM'));?> <?php echo $res->entreprise; ?></h5>
                <p class="p-3 m-0 text-center text-dark text-center border border-top-0 border-2 border-dark">
                    <?php echo $res->prenom . " " . $res->nom; ?><br />
                    <?php echo $res->adresse; ?><br />
                    <?php echo $res->mail; ?><br />
                    <?php echo $res->telephone; ?>
                </p>
            </div>
            <div class="col col-md">
                <h5 class="p-3 m-0 text-dark text-center border border-2 border-dark"><?php p($l->t('TO'));?> <span id="entreprise"></span></h6>
                    <p class="p-3 mt-0 mb-4 text-center text-dark text-center border border-top-0 border-2 border-dark">
                        <span id="nomprenom" data-id="0" data-table="devis" data-column="id_client"></span><br />
                        <span id="adresse"></span><br />
                        <span id="mail"></span><br />
                        <span id="telephone"></span><br />
                        <?php p($l->t('Limited company'));?> : <span id="siret"></span><br />
                    </p>
            </div>
        </div>
        <div class="row">
            <div class="col col-md">
                <hr />
                <div class="col col-xl mb-3 text-center"><b><span><?php p($l->t('Offer valid for 1 month from'));?> : </span><span><?php echo (new DateTime($_['devis'][0]->date))->format('d-m-Y'); ?></span></b></div>
                <hr />
            </div>
        </div>
        <div class="row">
            <div class="col col-md">
                <hr />
                <div class="col col-xl mb-3 text-center editable" id="deviscomment" style="display:inline" data-table="devis" data-column="comment" data-id="<?php echo $_['devis'][0]->devisid; ?>"><?php echo ($_['devis'][0]->comment == "" ) ? "-" : $_['devis'][0]->comment ; ?></div>
                <hr />
            </div>
        </div>
        <div class="table-responsive">
            <table id="produits" class="table table-striped">
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
            <button id="devisAdd" type="button" class="mb-2 btn btn-outline-success" data-html2canvas-ignore><?php p($l->t('Add product'));?></button>
            <button id="pdf" type="button" data-name="" class="mb-2 btn btn-outline-success" data-html2canvas-ignore><?php p($l->t('Save in Nextcloud'));?></button>
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
            <p><?php p($l->t('Company'));?> <?php echo $res->entreprise; ?><br /><?php echo $res->adresse; ?><br /> <?php p($l->t('Unique identification'));?> : <?php echo $res->siren; ?> - <?php p($l->t('Limited company'));?> : <?php echo $res->siret; ?></p>
        </div>
    </div>
