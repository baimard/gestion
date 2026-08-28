<div
	style="display: none;"
	id="product_selector_modal"
	class="modal product-selector-modal"
	role="dialog"
	aria-modal="true"
	aria-labelledby="product_selector_modal_title"
>
	<div class="modal-content">
		<span class="modalClose" role="button" tabindex="0" aria-label="<?php p($l->t('Close')); ?>">&times;</span>
		<h2 id="product_selector_modal_title"><?php p($l->t('Select a product')); ?></h2>
		<p class="product-selector-help"><?php p($l->t('Double-click a product to select it.')); ?></p>
		<label for="product_selector_search"><?php p($l->t('Search products')); ?></label>
		<input
			type="search"
			id="product_selector_search"
			placeholder="<?php p($l->t('Reference or designation')); ?>"
			autocomplete="off"
		>
		<div id="product_selector_list" class="product-selector-list" role="listbox"></div>
		<div class="product-selector-actions">
			<button type="button" id="product_selector_confirm" disabled>
				<?php p($l->t('Add product')); ?>
			</button>
		</div>
	</div>
</div>
