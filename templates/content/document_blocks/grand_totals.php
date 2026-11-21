<div class="table-section-title"><?php p($l->t('Total price')); ?></div>
<div class="div-prix"><table id="totalglobal" class="table-prix"><thead><tr><th class="text-center"><?php p($l->t('Total without VAT')); ?></th><th class="text-center"><?php p($l->t('Total VAT')); ?></th><th class="text-center"><?php p($l->t('Total including VAT')); ?></th></tr></thead><tbody>
            <?php if (isset($_['printRows'])) print_unescaped($this->inc('content/document_blocks/print_rows', [
                'rows' => $_['printRows']['grand_totals'], 'productRows' => false,
            ])); ?>
        </tbody></table></div>
