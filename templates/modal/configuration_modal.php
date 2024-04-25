<div syle="display: none;" id="configuration_modal" class="modal">
	<div class="modal-content">
		<span class="modalClose">&times;</span>
        
        <!-- Entreprise -->
        <div title="<?php p($l->t('Name of the company that will appear in the footer of your quote and invoice. For example, you can set: "Company: Cybercorp" or just "Cybercorp".')); ?>" class="configuration-global">
            <label class="configuration" for="entreprise"><span class="material-symbols-outlined">store</span><?php p($l->t('Company name'));?></label>
            <input type="text" style="float:none;width:80%;" id="entreprise" class="configuration-content editableConfiguration" data-table="configuration" data-column="entreprise" data-id="" value="<?php p($l->t('Loading …')); ?>" />
        </div>

        <!-- Prénom -->
        <div title="<?php p($l->t('First name appears in the Quote/Invoice header as a contact')); ?>" class="configuration-global">
            <label class="configuration" for="prenom"><span class="material-symbols-outlined">store</span><?php p($l->t('First name'));?></label>
            <input type="text" style="float:none;width:80%;" id="prenom" class="configuration-content editableConfiguration" data-table="configuration" data-column="prenom" data-id="" value="<?php p($l->t('Loading …')); ?>" />
        </div>

        <!-- Nom -->
        <div title="<?php p($l->t('Last name appears in the Quote/Invoice header as a contact')); ?>" class="configuration-global">
            <label class="configuration" for="nom"><span class="material-symbols-outlined">store</span><?php p($l->t('Last name'));?></label>
            <input type="text" style="float:none;width:80%;" id="nom" class="configuration-content editableConfiguration" data-table="configuration" data-column="nom" data-id="" value="<?php p($l->t('Loading …')); ?>" />
        </div>

        <!-- Adresse -->
        <div title="<?php p($l->t('Show company address in the Quote/Invoice header')); ?>" class="configuration-global">
            <label class="configuration" for="adresse"><span class="material-symbols-outlined">store</span><?php p($l->t('Address'));?></label>
            <input type="text" style="float:none;width:80%;" id="adresse" class="configuration-content editableConfiguration" data-table="configuration" data-column="adresse" data-id="" value="<?php p($l->t('Loading …')); ?>" />
        </div>

        <!-- Legal One -->
        <div title="<?php p($l->t('First line in the footer of your Quote/Invoice with all legal information you need')); ?>" class="configuration-global">
            <label class="configuration" for="legal_one"><span class="material-symbols-outlined">store</span><?php p($l->t('Legal One'));?></label>
            <input type="text" style="float:none;width:80%;" id="legal_one" class="configuration-content editableConfiguration" data-table="configuration" data-column="legal_one" data-id="" value="<?php p($l->t('Loading …')); ?>" />
        </div>

        <!-- Legal Two -->
        <div title="<?php p($l->t('Second line in the footer of your Quote/Invoice with all legal information you need')); ?>" class="configuration-global">
            <label class="configuration" for="legal_two"><span class="material-symbols-outlined">store</span><?php p($l->t('Legal Two'));?></label>
            <input type="text" style="float:none;width:80%;" id="legal_two" class="configuration-content editableConfiguration" data-table="configuration" data-column="legal_two" data-id="" value="<?php p($l->t('Loading …')); ?>" />
        </div>

        <!-- Téléphone -->
        <div title="<?php p($l->t('Show phone number in the Quote/Invoice header')); ?>" class="configuration-global">
            <label class="configuration" for="telephone"><span class="material-symbols-outlined">store</span><?php p($l->t('Cellphone'));?></label>
            <input type="text" style="float:none;width:80%;" id="telephone" class="configuration-content editableConfiguration" data-table="configuration" data-column="telephone" data-id="" value="<?php p($l->t('Loading …')); ?>" />
        </div>

        <!-- Mail -->
        <div title="<?php p($l->t('E-mail address which appears in the header of the Quote/Invoice')); ?>" class="configuration-global">
            <label class="configuration" for="mail"><span class="material-symbols-outlined">store</span><?php p($l->t('Mail'));?></label>
            <input type="text" style="float:none;width:80%;" id="mail" class="configuration-content editableConfiguration" data-table="configuration" data-column="mail" data-id="" value="<?php p($l->t('Loading …')); ?>" />
        </div>

        <!-- TVA Default -->
        <div title="<?php p($l->t('Global Default VAT rate apply to your Quote/Invoice (globally), to change it, just insert VAT rate amount without the percent sign.')); ?>" class="configuration-global">
            <label class="configuration" for="tva_default"><span class="material-symbols-outlined">store</span><?php p($l->t('TVA Default'));?></label>
            <input type="number" style="float:none;width:80%;" id="tva_default" class="configuration-content editableConfiguration" data-table="configuration" data-column="tva_default" data-id="" value="<?php p($l->t('Loading …')); ?>" /> %
        </div>

        <!-- Facture Prefixe -->
        <div title="<?php p($l->t('Set prefix for generated invoice')); ?>" class="configuration-global">
            <label class="configuration" for="facture_prefixe"><span class="material-symbols-outlined">store</span><?php p($l->t('Facture Prefixe'));?></label>
            <input type="text" style="float:none;width:80%;" id="facture_prefixe" class="configuration-content editableConfiguration" data-table="configuration" data-column="facture_prefixe" data-id="" value="<?php p($l->t('Loading …')); ?>" />
        </div>

        <!-- Currency Select -->
        <div title="<?php p($l->t('Global currency for the application')); ?>" class="configuration-global">
            <label class="configuration" for="currency"><span class="material-symbols-outlined">store</span><?php p($l->t('Currency Select'));?></label>
            <select style="float:none;width:80%;" id="currency" class="configuration-content editableConfigurationSelect" data-table="configuration" data-column="devise" data-id=""></select>
        </div>

        <!-- Format Select -->
        <div title="<?php p($l->t('Global monetary format for the application')); ?>" class="configuration-global">
            <label class="configuration" for="format"><span class="material-symbols-outlined">store</span><?php p($l->t('Format Select'));?></label>
            <select style="float:none;width:80%;" id="format" class="configuration-content editableConfigurationSelect" data-table="configuration" data-column="format" data-id=""></select>
        </div>

        <!-- Mentions Default -->
        <div title="<?php p($l->t('Legal disclaimer/mentions you need in your footer - before company information')); ?>" class="configuration-global">
            <label class="configuration" for="mentions_default"><span class="material-symbols-outlined">store</span><?php p($l->t('Mentions Default'));?></label>
            <input type="text" style="float:none;width:80%;" id="mentions_default" class="configuration-content editableConfiguration" data-table="configuration" data-column="mentions_default" data-id="" value="<?php p($l->t('Loading …')); ?>" />
        </div>
    </div>
</div>