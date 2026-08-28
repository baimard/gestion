<div class="menu-content" data-html2canvas-ignore>
    <?php print_unescaped($this->inc('navigation/toggle')); ?>
    <a href="<?php echo($_['url']['index']); ?>"><span class="material-symbols-outlined">home</span></a>
    <span class="material-symbols-outlined">chevron_right</span>
    <a href="<?php echo($_['url']['facture']); ?>"><?php p($l->t('Invoice')); ?></a>
</div>
<div id="PDFcontent">
    <div class="titre-centre">
        <span>
            <?php
                if(isset($_['logo_header']) && $_['logo_header'] !== "nothing"){
                    echo "<a><img alt='".$l->t('Company logo')."' class=\"img-fluid gestion-document-logo gestion-document-logo-wide\" src=\"data:image/png;base64,".$_['logo_header']."\"/></a>";
                }else{
                    echo "<span style='font-size:12px' id='Company-logo' data-html2canvas-ignore><b>".$l->t('You can add your company logo here.')."</b><br/><i>".$l->t('To add a header logo, use the numeric company ID shown in the company selector as the filename prefix (for example, company 1 uses 1logo_header.png). Place the file in the ".gestion" folder at the root of Nextcloud Files and enable "Show hidden files" to display this folder.')."</i><br/><br/>".$l->t('This message will not appear on generated PDF.')."</span>";
                }
            ?>
        </span>
    </div>
    
    <?php
        $res = json_decode($_['configuration'])[0];
        $provider = $res->einvoice_provider ?? '';
        $providerConfig = json_decode($res->einvoice_provider_config ?? '', true);
        $iopoleRequired = ['client_id', 'client_secret', 'customer_id', 'base_url', 'auth_url'];
        $iopoleConfigured = $provider === 'iopole' && is_array($providerConfig);
        foreach ($iopoleRequired as $requiredField) {
            if (empty($providerConfig[$requiredField])) {
                $iopoleConfigured = false;
            }
        }
        $paymentMeans = [
            '10' => $l->t('Cash'),
            '20' => $l->t('Cheque'),
            '30' => $l->t('Credit transfer'),
            '48' => $l->t('Payment card'),
            '58' => $l->t('SEPA credit transfer'),
        ];
        $paymentMeansLabel = $paymentMeans[(string)$_['facture'][0]->type_paiement]
            ?? $_['facture'][0]->type_paiement;
    ?>
    <table id="headertable"><tr>
        <td style="text-align: center;"><span><?php p($l->t('From'));?> <?php echo $res->entreprise; ?><span><p><span><?php echo $res->prenom . " " . $res->nom; ?></span><br /><span><?php echo $res->adresse; ?></span><br /><span><?php echo trim(($res->zip_code ?? '') . ' ' . ($res->city_name ?? '')); ?></span><br /><span><?php echo $res->mail; ?></span><br /><span><?php echo $res->telephone; ?></span><br /><span><?php echo $res->legal_one; ?></span><br /><span><?php echo $res->legal_two; ?></span><br /><span><?php echo $res->vat_number ?? ''; ?></span><br /><br/></p></td>
        <td><span><?php if(isset($_['logo']) && $_['logo'] !== "nothing"){ echo "<center><a><img alt='".$l->t('Company logo')."' class=\"img-fluid gestion-document-logo gestion-document-logo-main\" src=\"data:image/png;base64,".$_['logo']."\"/></a></center>"; }else{ echo "<span style='font-size:12px' id='Company-logo' data-html2canvas-ignore><b><center>".$l->t('You can add your company logo here.')."</center></b><br/><i>".$l->t('To add the main logo, use the numeric company ID shown in the company selector as the filename prefix (for example, company 1 uses 1logo.png). Place the file in the ".gestion" folder at the root of Nextcloud Files and enable "Show hidden files" to display this folder.')."</i><br/><br/><center>".$l->t('This message will not appear on generated PDF.')."</center></span>"; } ?></span></td>
        <td style="text-align: center;"><span><?php p($l->t('To'));?> <span id="entreprise"></span></span><p><span id="nomprenom" data-id="0" data-table="devis" data-column="id_client"></span><br /><span id="adresse"></span><br /><span id="client_city"></span><br /><span id="country_code"></span><br /><span id="mail"></span><br /><span id="telephone"></span><br /><span id="legal_one"></span><br /><span id="company_identification"></span><br /><span id="vat_number"></span><br /></p></td>
    </tr></table>

    <div class="titre-centre">
        <b><span id="factureid" class="inline"><?php echo $_['facture'][0]->num;?></span> <span data-html2canvas-ignore class="inline"><?php p($l->t('Version'));?></span> <span data-html2canvas-ignore id="factureversion" class="inline"><?php echo $_['facture'][0]->version; ?></span></b><br/>
        <span><?php p($l->t('Settlement date'));?> : <b><?php echo (new DateTime($_['facture'][0]->date_paiement))->format('d-m-Y');?></b>, </span><span><?php p($l->t('Date of service'));?> : <b><?php echo $_['facture'][0]->date;?></b></span><br/>
        <span id="devisid" data-id=<?php echo $_['facture'][0]->id_devis;?>><?php p($l->t('Associated quote'));?> : <b><?php echo $_['facture'][0]->dnum;?></b>, </span><span><?php p($l->t('Means of payment'));?> : <b><?php echo $paymentMeansLabel;?></b></span><br/>
    </div>

    <div class="comment"><?php echo ($_['facture'][0]->comment == "" ) ? "-" : nl2br(htmlspecialchars($_['facture'][0]->comment)); ?></div>
    <div>
        <button id="pdf" type="button" class="mb-2 btn btn-outline-success" data-html2canvas-ignore data-name=""><?php p($l->t('Save to Nextcloud (pdf)'));?></button>
        <button id="facturx" type="button" class="mb-2 btn btn-outline-primary" data-html2canvas-ignore data-name="" data-factureid="<?php echo $_['facture'][0]->id; ?>"><?php p($l->t('Generate electronic invoice (pdf+xml)'));?></button>
        <button id="facturx-xml" type="button" class="mb-2 btn btn-outline-info" data-html2canvas-ignore data-name="" data-factureid="<?php echo $_['facture'][0]->id; ?>"><?php p($l->t('Generate electronic part (xml)'));?></button>
        <?php if ($iopoleConfigured): ?><button id="facturx-iopole" type="button" class="mb-2 btn btn-outline-warning" data-html2canvas-ignore data-name="" data-factureid="<?php echo $_['facture'][0]->id; ?>"><?php p($l->t('Send to Iopole'));?></button><?php endif; ?>
        <table id="produits" class="table-produit" data-type="facture"><thead><tr><th><?php p($l->t('Reference'));?></th><th><?php p($l->t('Designation'));?></th><th><?php p($l->t('Comment'));?></th><th><?php p($l->t('Quantity'));?></th><th><?php p($l->t('Unit price without VAT'));?></th><th><?php p($l->t('Total without VAT'));?></th><th><?php p($l->t('VAT'));?></th><th><?php p($l->t('Total including VAT'));?></th></tr></thead><tbody></tbody></table>
    </div>

    <div class="table-section-title"><?php p($l->t('VAT price per percentage'));?></div>
    <div class="div-prix"><table id="totaldevis" class="table-prix"><thead><tr><th class="text-center"><?php p($l->t('Number of products'));?></th><th class="text-center"><?php p($l->t('Total without VAT'));?></th><th class="text-center"><?php p($l->t('VAT Rate'));?></th><th class="text-center"><?php p($l->t('Total VAT'));?></th><th class="text-center"><?php p($l->t('Total including VAT'));?></th></tr></thead><tbody></tbody></table></div>
    <div class="table-section-title"><?php p($l->t('Total price'));?></div>
    <div class="div-prix"><table id="totalglobal" class="table-prix"><thead><tr><th class="text-center"><?php p($l->t('Total without VAT'));?></th><th class="text-center"><?php p($l->t('Total VAT'));?></th><th class="text-center"><?php p($l->t('Total including VAT'));?></th></tr></thead><tbody></tbody></table></div>
    <div class="alert-info-custom"><p><span id="mentions_default"><?php p($l->t('Please set in global configuration'));?></span></p></div>
    <table class="table-mentions-signature-facture"><tr><td class="cell-mentions"><p class="mentions-titre"><?php echo $res->entreprise; ?></p><p class="mentions-ligne"><?php echo $res->adresse; ?></p><p class="mentions-ligne"><?php echo trim(($res->zip_code ?? '') . ' ' . ($res->city_name ?? '')); ?></p><p class="mentions-ligne"><?php echo $res->legal_one; ?></p><p class="mentions-ligne"><?php echo $res->legal_two; ?></p></td></tr></table>
