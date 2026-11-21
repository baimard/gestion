<div class="table-section-title"><?php p($l->t('VAT price per percentage')); ?></div>
<div class="div-prix"><table id="totaldevis" class="table-prix"><thead><tr><th class="text-center"><?php p($l->t('Number of products')); ?></th><th class="text-center"><?php p($l->t('Total without VAT')); ?></th><th class="text-center"><?php p($l->t('VAT Rate')); ?></th><th class="text-center"><?php p($l->t('Total VAT')); ?></th><th class="text-center"><?php p($l->t('Total including VAT')); ?></th></tr></thead><tbody>
            <?php if (isset($_['printRows'])) print_unescaped($this->inc('content/document_blocks/print_rows', [
                'rows' => $_['printRows']['vat_totals'], 'productRows' => false,
            ])); ?>
        </tbody></table></div>
