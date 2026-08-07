<div
	style="display: none;"
	id="vat_exemption_reason_modal"
	class="modal"
	role="dialog"
	aria-modal="true"
	aria-labelledby="vat_exemption_reason_modal_title"
>
	<div class="modal-content">
		<span
			class="modalClose"
			role="button"
			tabindex="0"
			aria-label="<?php p($l->t('Close')); ?>"
		>&times;</span>

		<h2 id="vat_exemption_reason_modal_title">
			<?php p($l->t('VAT exemption reason')); ?>
		</h2>

		<div class="alert-info-custom vat-exemption-information">
			<p>
				<?php p($l->t('This line is exempt from VAT. Check that the selected exemption reason matches your situation.')); ?>
			</p>
			<p>
				<?php p($l->t('If you benefit from the VAT basic exemption — a common situation for micro-entrepreneurs — “VAT not applicable, art. 293 B of the French General Tax Code” is already selected. You do not need to change anything.')); ?>
			</p>
			<p>
				<?php p($l->t('If your exemption is based on another provision, select the corresponding reason. If in doubt, contact your accountant or the tax authorities.')); ?>
			</p>
		</div>

		<div class="configuration-global">
			<label class="configuration" for="vat_exemption_reason_select">
				<?php p($l->t('Exemption reason')); ?>
			</label>
			<select
				id="vat_exemption_reason_select"
				class="configuration-content"
				aria-describedby="vat_exemption_reason_modal_title"
			>
				<option value=""><?php p($l->t('Loading …')); ?></option>
			</select>
		</div>

		<p class="vat-exemption-modal-actions">
			<button type="button" id="save_vat_exemption_reason">
				<?php p($l->t('Save')); ?>
			</button>
		</p>
	</div>
</div>
