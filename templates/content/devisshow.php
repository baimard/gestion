<?php
    $res = json_decode($_['configuration'])[0];
    $logoWidth = max(40, min(600, (int)($res->logo_width ?? 160)));
    $logoHeaderWidth = max(40, min(600, (int)($res->logo_header_width ?? 320)));
    $logoFooterWidth = max(40, min(600, (int)($res->logo_footer_width ?? 320)));
?>
<div class="gestion-document-view">
    <div class="menu-content" data-html2canvas-ignore>
        <?php print_unescaped($this->inc('navigation/toggle')); ?>
    </div>
    <div class="gestion-document-toolbar" data-html2canvas-ignore data-document-lock data-table="devis" data-id="<?php p($_['devis'][0]->devisid); ?>" data-locked="<?php p((int)($_['devis'][0]->locked ?? 0)); ?>">
        <span class="gestion-status"><?php p($l->t('Draft')); ?></span>
        <button type="button" class="primary" id="lock-document"><?php p($l->t('Finalize and lock')); ?></button>
        <button type="button" data-open-history><?php p($l->t('Change history')); ?></button>
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

    <table id="headertable">
        <tr>
            <td style="text-align: center;">
                <span><?php p($l->t('From'));?> <?php p(html_entity_decode((string)($res->entreprise), ENT_QUOTES, 'UTF-8')); ?><span>
                <p>
                    <span><?php p(html_entity_decode((string)($res->prenom . " " . $res->nom), ENT_QUOTES, 'UTF-8')); ?></span><br />
                    <span><?php p(html_entity_decode((string)($res->adresse), ENT_QUOTES, 'UTF-8')); ?></span><br />
                    <span><?php p(html_entity_decode((string)(trim(($res->zip_code ?? '') . ' ' . ($res->city_name ?? ''))), ENT_QUOTES, 'UTF-8')); ?></span><br />
                    <span><?php p(html_entity_decode((string)($res->mail), ENT_QUOTES, 'UTF-8')); ?></span><br />
                    <span><?php p(html_entity_decode((string)($res->telephone), ENT_QUOTES, 'UTF-8')); ?></span><br/>
                    <span><?php p(html_entity_decode((string)($res->legal_one), ENT_QUOTES, 'UTF-8')); ?></span><br />
                    <span><?php p(html_entity_decode((string)($res->legal_two), ENT_QUOTES, 'UTF-8')); ?></span><br />
                    <span><?php p(html_entity_decode((string)($res->vat_number ?? ''), ENT_QUOTES, 'UTF-8')); ?></span><br />
                    <br/>
                </p>
            </td>
            <td>
                <span>
                    <?php
                        if(isset($_['logo']) && $_['logo'] !== "nothing"){
                            echo "<center><a><img alt='".$l->t('Company logo')."' class=\"img-fluid gestion-document-logo gestion-document-logo-main\" src=\"data:image/png;base64,".$_['logo']."\"/></a></center>";
                        }else{
                            echo "<span style='font-size:12px' id='Company-logo' data-html2canvas-ignore><b><center>".$l->t('You can add your company logo here.')."</center></b><br/><i>".$l->t('To add the main logo, use the numeric company ID shown in the company selector as the filename prefix (for example, company 1 uses 1logo.png). Place the file in the ".gestion" folder at the root of Nextcloud Files and enable "Show hidden files" to display this folder.')."</i><br/><br/><center>".$l->t('This message will not appear on generated PDF.')."</center></span>";
                        }
                    ?>
                </span>
            </td>
            <td style="text-align: center;">
                <span><?php p($l->t('To'));?> <span id="entreprise"></span></span>
                <p>
                    <span id="nomprenom" data-id="0" data-table="devis" data-column="id_client"></span><br />
                    <span id="adresse"></span><br />
                    <span id="client_city"></span><br />
                    <span id="country_code"></span><br />
                    <span id="mail"></span><br />
                    <span id="telephone"></span><br />
                    <span id="legal_one"></span><br /><span id="company_identification"></span><br /><span id="vat_number"></span><br />
                </p>
            </td>
        </tr>
    </table>


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
        <button id="devisAdd"       type="button"       class="mb-2 btn btn-outline-success"            data-html2canvas-ignore><?php p($l->t('Add product'));?></button>
        <button type="button" class="mb-2 btn btn-outline-primary createInvoiceFromQuote" data-devis-id="<?php p(html_entity_decode((string)($_['devis'][0]->devisid), ENT_QUOTES, 'UTF-8')); ?>" data-html2canvas-ignore><?php p($l->t('Create invoice'));?></button>
        <button id="pdf"            type="button"       class="mb-2 btn btn-outline-success"            data-html2canvas-ignore data-name=""><?php p($l->t('Save in Nextcloud'));?></button>
        
        <table id="produits" class="table-produit">
            <thead>
                <tr>
                    <th class="product-order-column" data-html2canvas-ignore aria-label="<?php p($l->t('Product order'));?>"></th>
                    <th><?php p($l->t('Reference'));?></th>
                    <th><?php p($l->t('Designation'));?></th>
                    <th><?php p($l->t('Comment'));?></th>
                    <th><?php p($l->t('Quantity'));?></th>
                    <th><?php p($l->t('Unit price without VAT'));?></th>
                    <th><?php p($l->t('Discount')); ?> (%)</th><th><?php p($l->t('Total without VAT'));?></th>
                    <th><?php p($l->t('VAT'));?></th>
                    <th><?php p($l->t('Total including VAT'));?></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
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

    <div class="titre-centre">
        <span>
            <?php
                if(isset($_['logo_footer']) && $_['logo_footer'] !== "nothing"){
                    echo "<a><img alt='".$l->t('footer image')."' class=\"img-fluid gestion-document-logo gestion-document-logo-footer\" src=\"data:image/png;base64,".$_['logo_footer']."\"/></a>";
                }else{
                    echo "<span style='font-size:12px;' id='footer-logo' data-html2canvas-ignore><b>".$l->t('You can add your footer logo here.')."</b><br/><i>".$l->t('To add a footer logo, use the numeric company ID shown in the company selector as the filename prefix (for example, company 1 uses 1logo_footer.png). Place the file in the ".gestion" folder at the root of Nextcloud Files and enable "Show hidden files" to display this folder.')."</i><br/><br/>".$l->t('This message will not appear on generated PDF.')."</span>";
                }
            ?>
        </span>
    </div>
    
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
