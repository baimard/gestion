<div id="PDFcontent">
    <div class="titre-centre">
        <span>
            <?php
                if(isset($_['logo_header']) && $_['logo_header'] !== "nothing"){
                    echo "<a><img alt='".$l->t('Company logo')."' class=\"img-fluid\" src=\"data:image/png;base64, ".$_['logo_header']."\"/></a>";
                }else{
                    echo "<span style='font-size:12px' id='Company-logo' data-html2canvas-ignore><b>".$l->t('You can add your company logo here.')."</b><br/><i>".$l->t('To add a logo, drop the logo_header.png file in ".gestion" folder at the root of your Nextcloud Files app. Remember to set "Show hidden files".')."</i><br/><br/>".$l->t('This message will not appear on generated PDF.')."</span>";
                }
            ?>
        </span>
    </div>
    
    <?php $res = json_decode($_['configuration'])[0]; ?>
    <table id="headertable">
        <tr>
            <td style="text-align: center;">
                <span><?php p($l->t('FROM'));?> <?php echo $res->entreprise; ?><span>
                <p>
                    <span><?php echo $res->prenom . " " . $res->nom; ?></span><br />
                    <span><?php echo $res->adresse; ?></span><br />
                    <span><?php echo $res->mail; ?></span><br />
                    <span><?php echo $res->telephone; ?></span><br/>
                    <br/>
                </p>
            </td>
            <td>
                <span>
                    <?php
                        if(isset($_['logo']) && $_['logo'] !== "nothing"){
                            echo "<center><a><img alt='".$l->t('Company logo')."' class=\"img-fluid\" src=\"data:image/png;base64, ".$_['logo']."\"/></a></center>";
                        }else{
                            echo "<span style='font-size:12px' id='Company-logo' data-html2canvas-ignore><b><center>".$l->t('You can add your company logo here.')."</center></b><br/><i>".$l->t('To add a logo, drop the logo.png file in ".gestion" folder at the root of your Nextcloud Files app. Remember to set "Show hidden files".')."</i><br/><br/><center>".$l->t('This message will not appear on generated PDF.')."</center></span>";
                        }
                    ?>
                </span>
            </td>
            <td style="text-align: center;">
                <span><?php p($l->t('TO'));?> <span id="entreprise"></span></span>
                <p>
                    <span id="nomprenom" data-id="0" data-table="devis" data-column="id_client"></span><br />
                    <span id="adresse"></span><br />
                    <span id="mail"></span><br />
                    <span id="telephone"></span><br />
                    <span id="legal_one"></span><br />
                </p>
            </td>
        </tr>
    </table>

    <div class="titre-centre">
        <b><span id="factureid" class="inline"><?php echo $_['facture'][0]->num;?></span>
        <span data-html2canvas-ignore class="inline"><?php p($l->t('Version'));?></span>
        <span data-html2canvas-ignore id="factureversion" class="inline editable" data-table="facture" data-column="version" data-id="<?php echo $_['facture'][0]->id; ?>"><?php echo $_['facture'][0]->version; ?></span></b>
        <br/>
         <span><?php p($l->t('Settlement date'));?> : <b><?php echo (new DateTime($_['facture'][0]->date_paiement))->format('d-m-Y');?></b>, </span>
         <span><?php p($l->t('Date of service'));?> : <b><?php echo $_['facture'][0]->date;?></b></span><br/>
        <span id="devisid" data-id=<?php echo $_['facture'][0]->id_devis;?>><?php p($l->t('Associated quote'));?> : <b><?php echo $_['facture'][0]->dnum;?></b>, </span>
        <span><?php p($l->t('Means of payment'));?> : <b><?php echo $_['facture'][0]->type_paiement;?></b></span><br/>
    </div>

    <div class="comment" ><?php echo ($_['facture'][0]->comment == "" ) ? "-" : $_['facture'][0]->comment ; ?></div>

 <div>
        <button id="devisAdd"       type="button"       class="mb-2 btn btn-outline-success"            data-html2canvas-ignore><?php p($l->t('Add product'));?></button>
        <button id="pdf"            type="button"       class="mb-2 btn btn-outline-success"            data-html2canvas-ignore data-name=""><?php p($l->t('Save in Nextcloud'));?></button>
        <!-- <button id="mailGestion"       type="button"   class="mb-2 btn btn-outline-success sendmail"    data-html2canvas-ignore data-name=""><?php p($l->t('Send by email'));?></button> -->
        
        <table id="produits" class="table-produit">
            <thead>
                <tr>
                    <th><?php p($l->t('Reference'));?></th>
                    <th><?php p($l->t('Designation'));?></th>
                    <th><?php p($l->t('Comment'));?></th>
                    <th><?php p($l->t('Quantity'));?></th>
                    <th><?php p($l->t('Unit price without VAT'));?></th>
                    <th><?php p($l->t('Total without VAT'));?></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    <div class="div-prix">
        <table id="totaldevis" class="table-prix">
            <thead>
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
    <div class="alert-info-custom">
        <p><span id="mentions_default"><?php p($l->t('Please set in global configuration'));?></span></p>
    </div>

    <table class="table-mentions-signature-facture">
        <tr>
            <td class="cell-mentions">
                <p class="mentions-titre"><?php echo $res->entreprise; ?></p>
                <p class="mentions-ligne"><?php echo $res->adresse; ?></p>
                <p class="mentions-ligne"><?php echo $res->legal_one; ?></p>
                <p class="mentions-ligne"><?php echo $res->legal_two; ?></p>
            </td>
        </tr>
    </table>


</div>