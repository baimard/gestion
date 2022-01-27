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
    <div title="<?php p($l->t('This is the name of the company that will appear in the footer of your quote and invoice.  For example, you can set : "Company : Cybercorp" or just "Cybercorp"')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="entreprise" class="configuration-content editable" data-table="configuration" data-column="entreprise" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('First name appear in the quote/invoice header as a contact')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="prenom" class="configuration-content editable" data-table="configuration" data-column="prenom" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Last name appear in the quote/invoice header as a contact')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="nom" class="configuration-content editable" data-table="configuration" data-column="nom" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Company address appear in the quote/invoice header')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="adresse" class="configuration-content editable" data-table="configuration" data-column="adresse" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('This is a first line in the footer of your Quote/Invoice with all legals informations you need')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="legal_one" class="configuration-content editable" data-table="configuration" data-column="legal_one" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('This is a second line in the footer of your Quote/Invoice with all legals informations you need')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="legal_two" class="configuration-content editable" data-table="configuration" data-column="legal_two" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Phone number appear in the quote/invoice header')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="telephone" class="configuration-content editable" data-table="configuration" data-column="telephone" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Email appear in the quote/invoice header')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="mail" class="configuration-content editable" data-table="configuration" data-column="mail" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Global Default VAT apply to your Quote/Invoice (globally), to change it, please just insert VAT amount without the percent sign')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="tva_default" class="configuration-content editable" data-table="configuration" data-column="tva_default" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Automatic generated invoice number')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <select style="float:none;" id="auto_invoice_number" class="configuration-content editableSelect" data-table="configuration" data-column="auto_invoice_number" data-id=""></select>
    </div>
    <div title="<?php p($l->t('Global default Currency')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <select style="float:none;" id="currency" class="configuration-content editableSelect" data-table="configuration" data-column="devise" data-id=""></select>
    </div>
    <div title="<?php p($l->t('Legal disclaimer/mentions you need in your footer - before company information')); ?>" class="configuration-global">
        <div class="configuration-icon icon-details"></div>
        <div style="float:none;" id="mentions_default" class="configuration-content editable" data-table="configuration" data-column="mentions_default" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
</div>