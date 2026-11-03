<?php
    $res = json_decode($_['configuration'])[0];
    $iopoleConfigured = (bool)($res->einvoice_configured ?? false);
    $logoWidth = max(40, min(600, (int)($res->logo_width ?? 160)));
    $logoHeaderWidth = max(40, min(600, (int)($res->logo_header_width ?? 320)));
    $logoFooterWidth = max(40, min(600, (int)($res->logo_footer_width ?? 320)));
?>
<div class="gestion-document-view">
    <div class="gestion-document-toolbar" data-html2canvas-ignore data-document-lock data-table="facture" data-id="<?php p($_['facture'][0]->id); ?>" data-locked="<?php p((int)($_['facture'][0]->locked ?? 0)); ?>">
        <div class="gestion-document-actions">
            <?php print_unescaped($this->inc('navigation/toggle')); ?>
            <span class="gestion-status"><?php p($l->t('Draft')); ?></span>
            <button id="pdf" type="button" class="btn btn-outline-success" data-html2canvas-ignore data-name="""><?php p($l->t('Save PDF')); ?></button>
            <button id="facturx" type="button" class="btn btn-outline-primary" data-html2canvas-ignore data-name="" data-factureid="<?php p(html_entity_decode((string)($_['facture'][0]->id), ENT_QUOTES, 'UTF-8')); ?>""><?php p($l->t('Factur-X PDF + XML')); ?></button>
            <button id="facturx-xml" type="button" class="btn btn-outline-info" data-html2canvas-ignore data-name="" data-factureid="<?php p(html_entity_decode((string)($_['facture'][0]->id), ENT_QUOTES, 'UTF-8')); ?>""><?php p($l->t('Factur-X XML')); ?></button>
            <?php if ($iopoleConfigured): ?><button id="facturx-iopole" type="button" class="btn btn-outline-warning" data-html2canvas-ignore data-name="" data-factureid="<?php p(html_entity_decode((string)($_['facture'][0]->id), ENT_QUOTES, 'UTF-8')); ?>"><?php p($l->t('Send to Iopole'));?></button><?php endif; ?>
            <button type="button" data-open-history title="<?php p($l->t('Change history')); ?>" aria-label="<?php p($l->t('Change history')); ?>"><span class="material-symbols-outlined" aria-hidden="true">history</span></button>
            <button type="button" class="primary" id="lock-document"><?php p($l->t('Finalize and lock')); ?></button>
        </div>
    </div>
    <div id="PDFcontent" style="--gestion-logo-main-width: <?php echo $logoWidth; ?>px; --gestion-logo-header-width: <?php echo $logoHeaderWidth; ?>px; --gestion-logo-footer-width: <?php echo $logoFooterWidth; ?>px;">
    <div class="titre-centre">
        <span>
            <?php
                if(isset($_['logo_header']) && $_['logo_header'] !== "nothing"){
                    echo "<a><img alt='".$l->t('Company logo')."' class=\"img-fluid gestion-document-logo gestion-document-logo-header\" src=\"data:image/png;base64,".$_['logo_header']."\"/></a>";
                }else{
                    echo "<span style='font-size:12px' id='Company-logo' data-html2canvas-ignore><b>".$l->t('You can add your company logo here.')."</b><br/><i>".$l->t('To add a header logo, use the numeric company ID shown in the company selector as the filename prefix (for example, company 1 uses 1logo_header.png). Place the file in the ".gestion" folder at the root of Nextcloud Files and enable "Show hidden files" to display this folder.')."</i><br/><br/>".$l->t('This message will not appear on generated PDF.')."</span>";
                }
            ?>
        </span>
    </div>

    <?php
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
    <?php print_unescaped($this->inc('content/document_parties')); ?>

    <div class="titre-centre">
        <b><span id="factureid" class="inline"><?php p(html_entity_decode((string)($_['facture'][0]->num), ENT_QUOTES, 'UTF-8')); ?></span> <span data-html2canvas-ignore class="inline"><?php p($l->t('Version'));?></span> <span data-html2canvas-ignore id="factureversion" class="inline"><?php p(html_entity_decode((string)($_['facture'][0]->version), ENT_QUOTES, 'UTF-8')); ?></span></b><br/>
        <span><?php p($l->t('Settlement date'));?> : <b><?php echo (new DateTime($_['facture'][0]->date_paiement))->format('d-m-Y');?></b>, </span><span><?php p($l->t('Date of service'));?> : <b><?php p(html_entity_decode((string)($_['facture'][0]->date), ENT_QUOTES, 'UTF-8')); ?></b></span><br/>
        <span id="devisid" data-id="<?php p(html_entity_decode((string)($_['facture'][0]->id_devis), ENT_QUOTES, 'UTF-8')); ?>"><?php p($l->t('Associated quote'));?> : <b><?php p(html_entity_decode((string)($_['facture'][0]->dnum), ENT_QUOTES, 'UTF-8')); ?></b>, </span><span><?php p($l->t('Means of payment'));?> : <b><?php p(html_entity_decode((string)$paymentMeansLabel, ENT_QUOTES, 'UTF-8')); ?></b></span><br/>
    </div>

    <div class="comment"><?php echo ($_['facture'][0]->comment == "" ) ? "-" : nl2br(htmlspecialchars($_['facture'][0]->comment)); ?></div>
    <div>




        <div class="gestion-document-table-scroll"><table id="produits" class="table-produit" data-type="facture">
            <colgroup>
                <col class="document-col-reference" width="9%">
                <col class="document-col-description" width="34%">
                <col class="document-col-comment" width="12%">
                <col class="document-col-quantity" width="6%">
                <col class="document-col-price" width="9%">
                <col class="document-col-discount" width="6%">
                <col class="document-col-price" width="9%">
                <col class="document-col-vat" width="5%">
                <col class="document-col-price" width="10%">
            </colgroup><thead><tr><th class="document-text-heading"><?php p($l->t('Reference'));?></th><th class="document-text-heading"><?php p($l->t('Designation'));?></th><th class="document-text-heading"><?php p($l->t('Comment'));?></th><th class="document-number-heading"><?php p($l->t('Quantity'));?></th><th class="document-number-heading"><?php p($l->t('Unit price without VAT'));?></th><th class="document-number-heading"><?php p($l->t('Discount')); ?> (%)</th><th class="document-number-heading"><?php p($l->t('Total without VAT'));?></th><th class="document-number-heading"><?php p($l->t('VAT'));?></th><th class="document-number-heading"><?php p($l->t('Total including VAT'));?></th></tr></thead><tbody></tbody></table></div>
    </div>

    <div class="table-section-title"><?php p($l->t('VAT price per percentage'));?></div>
    <div class="div-prix"><table id="totaldevis" class="table-prix"><thead><tr><th class="text-center"><?php p($l->t('Number of products'));?></th><th class="text-center"><?php p($l->t('Total without VAT'));?></th><th class="text-center"><?php p($l->t('VAT Rate'));?></th><th class="text-center"><?php p($l->t('Total VAT'));?></th><th class="text-center"><?php p($l->t('Total including VAT'));?></th></tr></thead><tbody></tbody></table></div>
    <div class="table-section-title"><?php p($l->t('Total price'));?></div>
    <div class="div-prix"><table id="totalglobal" class="table-prix"><thead><tr><th class="text-center"><?php p($l->t('Total without VAT'));?></th><th class="text-center"><?php p($l->t('Total VAT'));?></th><th class="text-center"><?php p($l->t('Total including VAT'));?></th></tr></thead><tbody></tbody></table></div>
    <div class="alert-info-custom"><p><span id="mentions_default"><?php p($l->t('Please set in global configuration'));?></span></p></div>
    <table class="table-mentions-signature-facture"><tr><td class="cell-mentions"><p class="mentions-titre"><?php p(html_entity_decode((string)($res->entreprise), ENT_QUOTES, 'UTF-8')); ?></p><p class="mentions-ligne"><?php p(html_entity_decode((string)($res->adresse), ENT_QUOTES, 'UTF-8')); ?></p><p class="mentions-ligne"><?php p(html_entity_decode((string)(trim(($res->zip_code ?? '') . ' ' . ($res->city_name ?? ''))), ENT_QUOTES, 'UTF-8')); ?></p><p class="mentions-ligne"><?php p(html_entity_decode((string)($res->legal_one), ENT_QUOTES, 'UTF-8')); ?></p><p class="mentions-ligne"><?php p(html_entity_decode((string)($res->legal_two), ENT_QUOTES, 'UTF-8')); ?></p></td></tr></table>
    </div>
</div>
