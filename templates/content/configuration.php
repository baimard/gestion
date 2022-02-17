<div id="contentTable">
    <div class="breadcrumb" data-html2canvas-ignore>
        <div class="crumb svg crumbhome">
            <a href="<?php echo ($_['url']['index']); ?>" class="icon-home"></a>
            <span style="display: none;"></span>
        </div>
        <div class="crumb svg crumbhome">
            <span><?php p($l->t('Configuration')); ?></span>
        </div>
    </div>
    <h2 id="configuration"><?php p($l->t('Click to edit')); ?> - <a id="HelpSection"><u><?php p($l->t('Need help?')); ?></u></a></h2>
    <div title="<?php p($l->t('Name of the company that will appear in the footer of your quote and invoice. For example, you can set: "Company: Cybercorp" or just "Cybercorp".')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="entreprise" class="configuration-content editable" data-table="configuration" data-column="entreprise" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('First name appears in the Quote/Invoice header as a contact')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="prenom" class="configuration-content editable" data-table="configuration" data-column="prenom" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Last name appears in the Quote/Invoice header as a contact')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="nom" class="configuration-content editable" data-table="configuration" data-column="nom" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Show company address in the Quote/Invoice header')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="adresse" class="configuration-content editable" data-table="configuration" data-column="adresse" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('First line in the footer of your Quote/Invoice with all legal information you need')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="legal_one" class="configuration-content editable" data-table="configuration" data-column="legal_one" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Second line in the footer of your Quote/Invoice with all legal information you need')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="legal_two" class="configuration-content editable" data-table="configuration" data-column="legal_two" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Show phone number in the Quote/Invoice header')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="telephone" class="configuration-content editable" data-table="configuration" data-column="telephone" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('E-mail address which appears in the header of the Quote/Invoice')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="mail" class="configuration-content editable" data-table="configuration" data-column="mail" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Global Default VAT rate apply to your Quote/Invoice (globally), to change it, just insert VAT rate amount without the percent sign.')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="tva_default" class="configuration-content editable" data-table="configuration" data-column="tva_default" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('If you want to automatically generated an invoice number, set to enable. If you want to be free, set disable. You can enable and disable when you want.')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <select style="float:none;" id="auto_invoice_number" class="configuration-content editableSelect" data-table="configuration" data-column="auto_invoice_number" data-id=""></select>
    </div>
    <div title="<?php p($l->t('Global currency for the application')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <select style="float:none;" id="currency" class="configuration-content editableSelect" data-table="configuration" data-column="devise" data-id=""></select>
    </div>
    <div title="<?php p($l->t('Legal disclaimer/mentions you need in your footer - before company information')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="mentions_default" class="configuration-content editable" data-table="configuration" data-column="mentions_default" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
</div>
