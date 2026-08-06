<div id="contentTable">
    <div class="menu-content">
        <a href="<?php echo($_['url']['index']); ?>"><span class="material-symbols-outlined">home</span></a>
        <span class="material-symbols-outlined">chevron_right</span>
        <span><?php p($l->t('Product'));?></span>
        <span class="material-symbols-outlined">chevron_right</span>
        <button style="margin-left:3px;" type="button"  id="newProduit"><?php p($l->t('Add product'));?></button>
    </div>
	<table id="produit" class="display tabledt">
        <thead>
            <tr>
                <th><?php p($l->t('Reference'));?></th>
                <th><?php p($l->t('Designation'));?></th>
                <th><?php p($l->t('Unit price without VAT'));?></th>
                <th><?php p($l->t('VAT percentage'));?></th>
                <th>
					<?php p($l->t('VAT category (France only)'));?>
					<button type="button" id="vatCategoryHelp" class="vat-category-help" aria-label="<?php p($l->t('Explain VAT categories'));?>" title="<?php p($l->t('Explain VAT categories'));?>">
						<span class="vat-category-help-icon" aria-hidden="true">!</span>
					</button>
				</th>
                <th><?php p($l->t('Header'));?></th>
                <th><?php p($l->t('Actions'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
	</table>
</div>
