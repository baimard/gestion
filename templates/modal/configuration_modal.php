<div syle="display: none;" id="configuration_modal" class="modal">
	<div class="modal-content">
		<span class="modalClose">&times;</span>
        
        <!-- Entreprise -->
        <div title="<?php p($l->t('Name of the company that will appear in the footer of your quote and invoice. For example, you can set: "Company: Cybercorp" or just "Cybercorp".')); ?>" class="configuration-global">
            <label class="configuration" for="entreprise"><span class="material-symbols-outlined">store</span><?php p($l->t('Company name'));?></label>
            <input type="text" style="float:none;width:80%;" id="entreprise" class="configuration-content editableConfiguration" data-table="configuration" data-column="entreprise" data-id="" value="<?php p($l->t('Loading …')); ?>" />
        </div>

        <div class="configuration-global"><label class="configuration" for="prenom"><?php p($l->t('First name'));?></label><input type="text" style="float:none;width:80%;" id="prenom" class="configuration-content editableConfiguration" data-table="configuration" data-column="prenom" data-id="" /></div>
        <div class="configuration-global"><label class="configuration" for="nom"><?php p($l->t('Last name'));?></label><input type="text" style="float:none;width:80%;" id="nom" class="configuration-content editableConfiguration" data-table="configuration" data-column="nom" data-id="" /></div>
        <div class="configuration-global"><label class="configuration" for="adresse"><?php p($l->t('Address'));?></label><input type="text" style="float:none;width:80%;" id="adresse" class="configuration-content editableConfiguration" data-table="configuration" data-column="adresse" data-id="" /></div>
        <div class="configuration-global"><label class="configuration" for="zip_code"><?php p($l->t('Zip code'));?></label><input type="text" style="float:none;width:80%;" id="zip_code" class="configuration-content editableConfiguration" data-table="configuration" data-column="zip_code" data-id="" /></div>
        <div class="configuration-global"><label class="configuration" for="city_name"><?php p($l->t('City name'));?></label><input type="text" style="float:none;width:80%;" id="city_name" class="configuration-content editableConfiguration" data-table="configuration" data-column="city_name" data-id="" /></div>
        <div class="configuration-global"><label class="configuration" for="legal_one"><?php p($l->t('Legal One'));?></label><input type="text" style="float:none;width:80%;" id="legal_one" class="configuration-content editableConfiguration" data-table="configuration" data-column="legal_one" data-id="" /></div>
        <div class="configuration-global"><label class="configuration" for="legal_two"><?php p($l->t('Legal Two'));?></label><input type="text" style="float:none;width:80%;" id="legal_two" class="configuration-content editableConfiguration" data-table="configuration" data-column="legal_two" data-id="" /></div>
        <div class="configuration-global"><label class="configuration" for="telephone"><?php p($l->t('Cellphone'));?></label><input type="text" style="float:none;width:80%;" id="telephone" class="configuration-content editableConfiguration" data-table="configuration" data-column="telephone" data-id="" /></div>
        <div class="configuration-global"><label class="configuration" for="mail"><?php p($l->t('Mail'));?></label><input type="text" style="float:none;width:80%;" id="mail" class="configuration-content editableConfiguration" data-table="configuration" data-column="mail" data-id="" /></div>
        <div class="configuration-global"><label class="configuration" for="tva_default"><?php p($l->t('VAT Default'));?></label><input type="number" style="float:none;width:80%;" id="tva_default" class="configuration-content editableConfiguration" data-table="configuration" data-column="tva_default" data-id="" /> %</div>
        <div class="configuration-global"><label class="configuration" for="vat_number"><?php p($l->t('VAT number'));?></label><input type="text" style="float:none;width:80%;" id="vat_number" class="configuration-content editableConfiguration" data-table="configuration" data-column="vat_number" data-id="" /></div>
        <div class="configuration-global"><label class="configuration" for="iban">IBAN</label><input type="text" style="float:none;width:80%;" id="iban" class="configuration-content editableConfiguration" data-table="configuration" data-column="iban" data-id="" /></div>
        <div class="configuration-global"><label class="configuration" for="facture_prefixe"><?php p($l->t('Invoice prefixe'));?></label><input type="text" style="float:none;width:80%;" id="facture_prefixe" class="configuration-content editableConfiguration" data-table="configuration" data-column="facture_prefixe" data-id="" /></div>
        <div class="configuration-global"><label class="configuration" for="currency"><?php p($l->t('Currency Select'));?></label><select style="float:none;width:80%;" id="currency" class="configuration-content editableConfigurationSelect" data-table="configuration" data-column="devise" data-id=""></select></div>
        <div class="configuration-global"><label class="configuration" for="format"><?php p($l->t('Format Select'));?></label><select style="float:none;width:80%;" id="format" class="configuration-content editableConfigurationSelect" data-table="configuration" data-column="format" data-id=""></select></div>
        <div class="configuration-global"><label class="configuration" for="mentions_default"><?php p($l->t('Mentions Default'));?></label><textarea style="float:none;width:80%;" id="mentions_default" class="configuration-content editableConfiguration" data-table="configuration" data-column="mentions_default" data-id="" rows="5"></textarea></div>

        <hr/>
        <h2><?php p($l->t('Electronic invoicing platform'));?></h2>
        <p><?php p($l->t('Factur-X generation and download remain available even when no platform is selected.'));?></p>

        <div class="configuration-global">
            <label class="configuration" for="einvoice_provider"><?php p($l->t('Approved platform'));?></label>
            <select style="float:none;width:80%;" id="einvoice_provider" class="configuration-content">
                <option value=""><?php p($l->t('No platform'));?></option>
                <option value="iopole">Iopole</option>
            </select>
        </div>

        <div id="einvoice-provider-iopole" style="display:none;">
            <div class="configuration-global"><label class="configuration" for="iopole_client_id">Client ID</label><input type="text" style="float:none;width:80%;" id="iopole_client_id" class="einvoice-provider-field" autocomplete="off" /></div>
            <div class="configuration-global"><label class="configuration" for="iopole_client_secret">Client secret</label><input type="password" style="float:none;width:80%;" id="iopole_client_secret" class="einvoice-provider-field" autocomplete="new-password" /></div>
            <div class="configuration-global"><label class="configuration" for="iopole_customer_id">Customer ID</label><input type="text" style="float:none;width:80%;" id="iopole_customer_id" class="einvoice-provider-field" autocomplete="off" /></div>
            <div class="configuration-global"><label class="configuration" for="iopole_base_url">API URL</label><input type="url" style="float:none;width:80%;" id="iopole_base_url" class="einvoice-provider-field" placeholder="https://…" /></div>
            <div class="configuration-global"><label class="configuration" for="iopole_auth_url">Authentication URL</label><input type="url" style="float:none;width:80%;" id="iopole_auth_url" class="einvoice-provider-field" placeholder="https://…" /></div>
        </div>

        <p><button type="button" id="save_einvoice_provider"><?php p($l->t('Save electronic invoicing platform'));?></button> <span id="einvoice_provider_status"></span></p>
    </div>
</div>
