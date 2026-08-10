<div
	style="display: none;"
	id="invoice_quote_selector_modal"
	class="modal product-selector-modal"
	role="dialog"
	aria-modal="true"
	aria-labelledby="invoice_quote_selector_title"
>
	<div class="modal-content">
		<span class="modalClose" role="button" tabindex="0" aria-label="<?php p($l->t('Close')); ?>">&times;</span>
		<h2 id="invoice_quote_selector_title"><?php p($l->t('Create an invoice from a quote')); ?></h2>
		<p class="product-selector-help"><?php p($l->t('Select the quote to associate with the new invoice.')); ?></p>
		<label for="invoice_quote_selector_search"><?php p($l->t('Search quotes')); ?></label>
		<input
			type="search"
			id="invoice_quote_selector_search"
			placeholder="<?php p($l->t('Quote number or customer')); ?>"
			autocomplete="off"
		>
		<div id="invoice_quote_selector_list" class="product-selector-list" role="listbox"></div>
	</div>
</div>
