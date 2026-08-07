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
                <th class="help-heading" title="<?php p($l->t('Enter a unique internal reference or SKU used to identify the product or service consistently.'));?>"><?php p($l->t('Reference'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter a precise description of the supplied product or service. A clear designation is mandatory on French invoices.'));?>"><?php p($l->t('Designation'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter the unit price before VAT in the configured invoice currency. The unit price excluding VAT is mandatory on French invoices when line details are required.'));?>"><?php p($l->t('Unit price without VAT'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter the applicable VAT rate as a number, for example 20 for 20 percent. French invoices must distinguish the applicable VAT rate and related tax amount when VAT applies.'));?>"><?php p($l->t('VAT percentage'));?></th>
	            <th class="help-heading" title="<?php p($l->t('Choose S for VAT at 5.5%%, 10%% or 20%%; E for a VAT-exempt supply, then verify its exemption reason in Actions; Z for a legally zero-rated taxable supply; O for an operation outside the scope of VAT; AE for reverse charge; G for export outside the EU; or K for an intra-Community supply.'));?>"><?php p($l->t('VAT category (France only)'));?></th>
                <th class="help-heading" title="<?php p($l->t('Use this button to turn the product into a description row in a quote.'));?>"><?php p($l->t('Header'));?></th>
                <th class="help-heading" title="<?php p($l->t('For category E, use this column to select the VAT exemption reason. You can also delete the product or service from the catalogue.'));?>"><?php p($l->t('Actions'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
	</table>
</div>
