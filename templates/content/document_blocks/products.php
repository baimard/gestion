<div class="gestion-document-table-scroll">
    <table id="produits" class="table-produit"<?php if ($_['documentKind'] === 'invoice') echo ' data-type="facture"'; ?>>
        <colgroup>
            <?php if ($_['documentKind'] === 'quote'): ?><col class="document-col-order" data-html2canvas-ignore width="3%"><?php endif; ?>
            <col class="document-col-reference" width="9%">
            <col class="document-col-description" width="<?php p($_['documentKind'] === 'quote' ? '31' : '34'); ?>%">
            <col class="document-col-comment" width="12%"><col class="document-col-quantity" width="6%"><col class="document-col-price" width="9%"><col class="document-col-discount" width="6%"><col class="document-col-price" width="9%"><col class="document-col-vat" width="5%"><col class="document-col-price" width="10%">
        </colgroup>
        <thead><tr>
            <?php if ($_['documentKind'] === 'quote'): ?><th class="product-order-column" data-html2canvas-ignore aria-label="<?php p($l->t('Product order')); ?>"></th><?php endif; ?>
            <th class="document-text-heading"><?php p($l->t('Reference')); ?></th><th class="document-text-heading"><?php p($l->t('Designation')); ?></th><th class="document-text-heading"><?php p($l->t('Comment')); ?></th><th class="document-number-heading"><?php p($l->t('Quantity')); ?></th><th class="document-number-heading"><?php p($l->t('Unit price without VAT')); ?></th><th class="document-number-heading"><?php p($l->t('Discount')); ?> (%)</th><th class="document-number-heading"><?php p($l->t('Total without VAT')); ?></th><th class="document-number-heading"><?php p($l->t('VAT')); ?></th><th class="document-number-heading"><?php p($l->t('Total including VAT')); ?></th>
        </tr></thead>
        <tbody>
            <?php if (isset($_['printRows'])) print_unescaped($this->inc('content/document_blocks/print_rows', [
                'rows' => $_['printRows']['products'], 'productRows' => true,
            ])); ?>
        </tbody>
    </table>
</div>
