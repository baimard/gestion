<?php
    $res = json_decode($_['configuration'])[0];
?>
<div class="gestion-document-view">
    <div class="gestion-document-toolbar" data-html2canvas-ignore data-document-lock data-table="devis" data-id="<?php p($_['devis'][0]->devisid); ?>" data-locked="<?php p((int)($_['devis'][0]->locked ?? 0)); ?>">
        <div class="gestion-document-actions">
            <?php print_unescaped($this->inc('navigation/toggle')); ?>
            <button id="devisAdd"       type="button"       class="btn btn-outline-success"            data-html2canvas-ignore><?php p($l->t('Add product'));?></button>
            <button type="button" class="btn btn-outline-primary createInvoiceFromQuote" data-devis-id="<?php p(html_entity_decode((string)($_['devis'][0]->devisid), ENT_QUOTES, 'UTF-8')); ?>" data-html2canvas-ignore><?php p($l->t('Create invoice'));?></button>
            <button id="pdf"            type="button"       class="btn btn-outline-success"            data-html2canvas-ignore data-name="""><?php p($l->t('Save PDF')); ?></button>
            <button type="button" data-open-history title="<?php p($l->t('Change history')); ?>" aria-label="<?php p($l->t('Change history')); ?>"><span class="material-symbols-outlined" aria-hidden="true">history</span></button>
        </div>
    </div>
    <div id="PDFcontent">
    <?php print_unescaped($this->inc('content/document_banner', ['logoPosition' => 'header'])); ?>

    <?php print_unescaped($this->inc('content/document_parties')); ?>


    <div class="titre-centre">
        <b><span id="devisid" class="inline editable" data-table="devis" data-column="num" data-id="<?php p(html_entity_decode((string)($_['devis'][0]->devisid), ENT_QUOTES, 'UTF-8')); ?>"><?php p(html_entity_decode((string)($_['devis'][0]->num), ENT_QUOTES, 'UTF-8')); ?></span></b>
        <span data-html2canvas-ignore class="inline"><?php p($l->t('Version'));?></span>
        <span data-html2canvas-ignore id="devisversion" class="inline editable" data-table="devis" data-column="version" data-id="<?php p(html_entity_decode((string)($_['devis'][0]->devisid), ENT_QUOTES, 'UTF-8')); ?>"><?php p(html_entity_decode((string)($_['devis'][0]->version), ENT_QUOTES, 'UTF-8')); ?></span>
        <span id="delay" class="inline editable" data-table="devis" data-column="delay" data-id="<?php p(html_entity_decode((string)($_['devis'][0]->devisid), ENT_QUOTES, 'UTF-8')); ?>">
            <?php p(html_entity_decode($_['devis'][0]->delay ?: $l->t('Offer valid for 1 month from: '), ENT_QUOTES, 'UTF-8')); ?>
        </span>
        <span class="inline"><?php echo (new DateTime($_['devis'][0]->date))->format('d-m-Y'); ?></span>
    </div>

    <div id="deviscomment" class="comment editableComment" data-table="devis" data-column="comment" data-id="<?php p(html_entity_decode((string)($_['devis'][0]->devisid), ENT_QUOTES, 'UTF-8')); ?>"><?php echo ($_['devis'][0]->comment == "" ) ? "-" : nl2br(htmlspecialchars($_['devis'][0]->comment)); ?></div>

    <div>




        <div class="gestion-document-table-scroll"><table id="produits" class="table-produit">
            <colgroup>
                <col class="document-col-order" data-html2canvas-ignore width="3%">
                <col class="document-col-reference" width="9%">
                <col class="document-col-description" width="31%">
                <col class="document-col-comment" width="12%">
                <col class="document-col-quantity" width="6%">
                <col class="document-col-price" width="9%">
                <col class="document-col-discount" width="6%">
                <col class="document-col-price" width="9%">
                <col class="document-col-vat" width="5%">
                <col class="document-col-price" width="10%">
            </colgroup>
            <thead>
                <tr>
                    <th class="product-order-column" data-html2canvas-ignore aria-label="<?php p($l->t('Product order'));?>"></th>
                    <th class="document-text-heading"><?php p($l->t('Reference'));?></th>
                    <th class="document-text-heading"><?php p($l->t('Designation'));?></th>
                    <th class="document-text-heading"><?php p($l->t('Comment'));?></th>
                    <th class="document-number-heading"><?php p($l->t('Quantity'));?></th>
                    <th class="document-number-heading"><?php p($l->t('Unit price without VAT'));?></th>
                    <th class="document-number-heading"><?php p($l->t('Discount')); ?> (%)</th><th class="document-number-heading"><?php p($l->t('Total without VAT'));?></th>
                    <th class="document-number-heading"><?php p($l->t('VAT'));?></th>
                    <th class="document-number-heading"><?php p($l->t('Total including VAT'));?></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table></div>
        </div>

        <div class="table-section-title">
            <?php p($l->t('VAT price per percentage')); ?>
        </div>
        <div class="div-prix">
            <table id="totaldevis" class="table-prix">
                <thead>
                    <tr>
                        <th class="text-center"><?php p($l->t('Number of products'));?></th>
                        <th class="text-center"><?php p($l->t('Total without VAT'));?></th>
                        <th class="text-center"><?php p($l->t('VAT Rate'));?></th>
                        <th class="text-center"><?php p($l->t('Total VAT'));?></th>
                        <th class="text-center"><?php p($l->t('Total including VAT'));?></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>

        <div class="table-section-title">
            <?php p($l->t('Total price')); ?>
        </div>
        <div class="div-prix">
            <table id="totalglobal" class="table-prix">
                <thead>
                    <tr>
                        <th class="text-center"><?php p($l->t('Total without VAT'));?></th>
                        <th class="text-center"><?php p($l->t('Total VAT'));?></th>
                        <th class="text-center"><?php p($l->t('Total including VAT'));?></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>

    <div class="alert-info-custom">
        <p><span id="mentions_default"><?php p($l->t('Please set in global configuration'));?></span></p>
    </div>

    <?php print_unescaped($this->inc('content/document_banner', ['logoPosition' => 'footer'])); ?>

    <table class="table-mentions-signature">
        <tr>
            <td class="cell-mentions">
                <p class="mentions-titre"><?php p(html_entity_decode((string)($res->entreprise), ENT_QUOTES, 'UTF-8')); ?></p>
                <p class="mentions-ligne"><?php p(html_entity_decode((string)($res->adresse), ENT_QUOTES, 'UTF-8')); ?></p>
                <p class="mentions-ligne"><?php p(html_entity_decode((string)(trim(($res->zip_code ?? '') . ' ' . ($res->city_name ?? ''))), ENT_QUOTES, 'UTF-8')); ?></p>
                <p class="mentions-ligne"><?php p(html_entity_decode((string)($res->legal_one), ENT_QUOTES, 'UTF-8')); ?></p>
                <p class="mentions-ligne"><?php p(html_entity_decode((string)($res->legal_two), ENT_QUOTES, 'UTF-8')); ?></p>
            </td>

            <td class="cell-signature">
                <span class="signature-title"><?php p($l->t('Approved for Agreement'));?></span>
                <table class="signature-table">
                    <tr class="row-date">
                        <th><?php p($l->t('Date:'));?></th>
                    </tr>
                    <tr class="row-signature">
                        <th><?php p($l->t('Signature:'));?></th>
                    </tr>
                </table>
            </td>
        </tr>
    </table>


    </div>
</div>
