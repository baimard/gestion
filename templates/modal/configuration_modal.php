<div style="display: none;" id="configuration_modal" class="modal">
	<div class="modal-content configuration-modal-content">
		<span class="modalClose">&times;</span>
		<h2 class="configuration-modal-title"><?php p($l->t('Company settings'));?></h2>
		<div class="configuration-modal-layout">
			<nav class="configuration-section-navigation" aria-label="<?php p($l->t('Company settings sections'));?>">
				<a class="configuration-section-link active" href="#configuration-general"><?php p($l->t('General'));?></a>
				<a class="configuration-section-link" href="#configuration-invoicing"><?php p($l->t('Invoicing'));?></a>
				<a class="configuration-section-link" href="#configuration-electronic-invoicing"><?php p($l->t('Electronic invoicing'));?></a>
				<a class="configuration-section-link" href="#configuration-logos"><?php p($l->t('Logos'));?></a>
			</nav>
			<div class="configuration-sections">
				<section id="configuration-general" class="configuration-section" tabindex="-1">
					<h2><?php p($l->t('General'));?></h2>
					<div title="<?php p($l->t('Name of the company that will appear in the footer of your quote and invoice.')); ?>" class="configuration-global"><label class="configuration" for="entreprise"><span class="material-symbols-outlined">store</span><?php p($l->t('Company name'));?></label><input type="text" id="entreprise" class="configuration-content editableConfiguration" data-table="configuration" data-column="entreprise" data-id="" value="<?php p($l->t('Loading …')); ?>" /></div>
					<div class="configuration-global"><label class="configuration" for="prenom"><?php p($l->t('First name'));?></label><input type="text" id="prenom" class="configuration-content editableConfiguration" data-table="configuration" data-column="prenom" data-id="" /></div>
					<div class="configuration-global"><label class="configuration" for="nom"><?php p($l->t('Last name'));?></label><input type="text" id="nom" class="configuration-content editableConfiguration" data-table="configuration" data-column="nom" data-id="" /></div>
					<div class="configuration-global"><label class="configuration" for="adresse"><?php p($l->t('Address'));?></label><input type="text" id="adresse" class="configuration-content editableConfiguration" data-table="configuration" data-column="adresse" data-id="" /></div>
					<div class="configuration-global"><label class="configuration" for="zip_code"><?php p($l->t('Zip code'));?></label><input type="text" id="zip_code" class="configuration-content editableConfiguration" data-table="configuration" data-column="zip_code" data-id="" /></div>
					<div class="configuration-global"><label class="configuration" for="city_name"><?php p($l->t('City name'));?></label><input type="text" id="city_name" class="configuration-content editableConfiguration" data-table="configuration" data-column="city_name" data-id="" /></div>
					<div class="configuration-global"><label class="configuration" for="legal_one"><?php p($l->t('Legal One'));?></label><input type="text" id="legal_one" class="configuration-content editableConfiguration" data-table="configuration" data-column="legal_one" data-id="" /></div>
					<div class="configuration-global"><label class="configuration" for="legal_two"><?php p($l->t('Legal Two'));?></label><input type="text" id="legal_two" class="configuration-content editableConfiguration" data-table="configuration" data-column="legal_two" data-id="" /></div>
					<button type="button" class="electronic-invoice-help" title="<?php p($l->t('Use “SIRET:” in Legal One and “SIREN:” in Legal Two for these identifiers to be included in the electronic invoice.')); ?>"><?php p($l->t('Electroning invoice')); ?></button>
					<div class="configuration-global"><label class="configuration" for="telephone"><?php p($l->t('Cellphone'));?></label><input type="text" id="telephone" class="configuration-content editableConfiguration" data-table="configuration" data-column="telephone" data-id="" /></div>
					<div class="configuration-global"><label class="configuration" for="mail"><?php p($l->t('Mail'));?></label><input type="text" id="mail" class="configuration-content editableConfiguration" data-table="configuration" data-column="mail" data-id="" /></div>
					<div class="configuration-global"><label class="configuration" for="vat_number"><?php p($l->t('VAT number'));?></label><input type="text" id="vat_number" class="configuration-content editableConfiguration" data-table="configuration" data-column="vat_number" data-id="" /></div>
					<div class="configuration-global"><label class="configuration" for="iban"><?php p($l->t('IBAN'));?></label><input type="text" id="iban" class="configuration-content editableConfiguration" data-table="configuration" data-column="iban" data-id="" /></div>
				</section>
				<section id="configuration-invoicing" class="configuration-section" tabindex="-1">
					<h2><?php p($l->t('Invoicing'));?></h2>
					<div class="configuration-global"><label class="configuration" for="tva_default"><?php p($l->t('VAT Default'));?></label><input type="number" id="tva_default" class="configuration-content editableConfiguration" data-table="configuration" data-column="tva_default" data-id="" /> %</div>
					<div class="configuration-global"><label class="configuration" for="facture_prefixe"><?php p($l->t('Invoice prefixe'));?></label><input type="text" id="facture_prefixe" class="configuration-content editableConfiguration" data-table="configuration" data-column="facture_prefixe" data-id="" /></div>
					<div class="configuration-global"><label class="configuration" for="currency"><?php p($l->t('Currency Select'));?></label><select id="currency" class="configuration-content editableConfigurationSelect" data-table="configuration" data-column="devise" data-id=""></select></div>
					<div class="configuration-global"><label class="configuration" for="format"><?php p($l->t('Format Select'));?></label><select id="format" class="configuration-content editableConfigurationSelect" data-table="configuration" data-column="format" data-id=""></select></div>
					<div class="configuration-global"><label class="configuration" for="mentions_default"><?php p($l->t('Mentions Default'));?></label><textarea id="mentions_default" class="configuration-content editableConfiguration" data-table="configuration" data-column="mentions_default" data-id="" rows="5"></textarea></div>
				</section>
				<section id="configuration-electronic-invoicing" class="configuration-section" tabindex="-1">
					<h2><?php p($l->t('Electronic invoicing platform'));?></h2>
					<p><?php p($l->t('Electronic invoicing is only for businesses in France. If your business is not based in France, you can still generate and download simple PDF invoices.'));?></p>
					<p><?php p($l->t('Factur-X generation and download remain available even when no platform is selected. You can chose your preferred platform.'));?></p>
					<div class="configuration-global"><label class="configuration" for="einvoice_provider"><?php p($l->t('Approved platform'));?></label><select id="einvoice_provider" class="configuration-content"><option value=""><?php p($l->t('No platform'));?></option><option value="iopole">Iopole</option></select></div>
					<div id="einvoice-provider-iopole" style="display:none;">
						<div class="configuration-global"><label class="configuration" for="iopole_client_id"><?php p($l->t('Client ID'));?></label><input type="text" id="iopole_client_id" class="einvoice-provider-field" autocomplete="off" /></div>
						<div class="configuration-global"><label class="configuration" for="iopole_client_secret"><?php p($l->t('Client secret'));?></label><input type="password" id="iopole_client_secret" class="einvoice-provider-field" autocomplete="new-password" /></div>
						<div class="configuration-global"><label class="configuration" for="iopole_customer_id"><?php p($l->t('Customer ID'));?></label><input type="text" id="iopole_customer_id" class="einvoice-provider-field" autocomplete="off" /></div>
						<div class="configuration-global"><label class="configuration" for="iopole_base_url"><?php p($l->t('API URL'));?></label><input type="url" id="iopole_base_url" class="einvoice-provider-field" placeholder="https://…" /></div>
						<div class="configuration-global"><label class="configuration" for="iopole_auth_url"><?php p($l->t('Authentication URL'));?></label><input type="url" id="iopole_auth_url" class="einvoice-provider-field" placeholder="https://…" /></div>
					</div>
					<p><button type="button" id="save_einvoice_provider"><?php p($l->t('Save electronic invoicing platform'));?></button> <span id="einvoice_provider_status"></span></p>
				</section>
				<section id="configuration-logos" class="configuration-section" tabindex="-1">
					<h2><?php p($l->t('Logos'));?></h2>
					<p><?php p($l->t('Set the width used for each logo in quotes, invoices and generated PDFs.'));?></p>
					<div class="configuration-global"><label class="configuration" for="logo_header_width"><?php p($l->t('Header logo width'));?></label><input type="number" min="40" max="600" step="10" id="logo_header_width" class="configuration-content editableConfiguration" data-table="configuration" data-column="logo_header_width" data-id="" /> px</div>
					<div class="configuration-global"><label class="configuration" for="logo_width"><?php p($l->t('Main logo width'));?></label><input type="number" min="40" max="600" step="10" id="logo_width" class="configuration-content editableConfiguration" data-table="configuration" data-column="logo_width" data-id="" /> px</div>
					<div class="configuration-global"><label class="configuration" for="logo_footer_width"><?php p($l->t('Footer logo width'));?></label><input type="number" min="40" max="600" step="10" id="logo_footer_width" class="configuration-content editableConfiguration" data-table="configuration" data-column="logo_footer_width" data-id="" /> px</div>
				</section>
			</div>
		</div>
	</div>
</div>
