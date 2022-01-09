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
    <h2 id="configuration"><?php p($l->t('Click to edit')); ?></h2>
    <div title="<?php p($l->t('Company name')); ?>" class="configuration-global">
        <div class="configuration-icon icon-timezone"></div>
        <div style="float:none;" id="entreprise" class="configuration-content editable" data-table="configuration" data-column="entreprise" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Contact First name')); ?>" class="configuration-global">
        <div class="configuration-icon icon-user"></div>
        <div style="float:none;" id="prenom" class="configuration-content editable" data-table="configuration" data-column="prenom" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Contact name')); ?>" class="configuration-global">
        <div class="configuration-icon icon-user"></div>
        <div style="float:none;" id="nom" class="configuration-content editable" data-table="configuration" data-column="nom" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Company address')); ?>" class="configuration-global">
        <div class="configuration-icon icon-address"></div>
        <div style="float:none;" id="adresse" class="configuration-content editable" data-table="configuration" data-column="adresse" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Limited company')); ?>" class="configuration-global">
        <div class="configuration-icon icon-edit"></div>
        <div style="float:none;" id="siret" class="configuration-content editable" data-table="configuration" data-column="siret" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Unique identification')); ?>" class="configuration-global">
        <div class="configuration-icon icon-category-enabled"></div>
        <div style="float:none;" id="siren" class="configuration-content editable" data-table="configuration" data-column="siren" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Phone number')); ?>" class="configuration-global">
        <div class="configuration-icon icon-phone"></div>
        <div style="float:none;" id="telephone" class="configuration-content editable" data-table="configuration" data-column="telephone" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Email')); ?>" class="configuration-global">
        <div class="configuration-icon icon-mail"></div>
        <div style="float:none;" id="mail" class="configuration-content editable" data-table="configuration" data-column="mail" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Default VAT')); ?>" class="configuration-global">
        <div class="configuration-icon icon-info"></div>
        <div style="float:none;" id="tva_default" class="configuration-content editable" data-table="configuration" data-column="tva_default" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
    <div title="<?php p($l->t('Automatic invoice number')); ?>" class="configuration-global">
        <div class="configuration-icon icon-category-dashboard"></div>
        <select style="float:none;" id="auto_invoice_number" class="configuration-content editableSelect" data-table="configuration" data-column="auto_invoice_number" data-id=""></select>
    </div>
    <div title="<?php p($l->t('Default Currency')); ?>" class="configuration-global">
        <div class="configuration-icon icon-rename"></div>
        <select style="float:none;" id="currency" class="configuration-content editableSelect" data-table="configuration" data-column="devise" data-id=""></select>
    </div>
    <div title="<?php p($l->t('Legal disclaimer/mentions')); ?>" class="configuration-global">
        <div class="configuration-icon icon-comment"></div>
        <div style="float:none;" id="mentions_default" class="configuration-content editable" data-table="configuration" data-column="mentions_default" data-id=""><?php p($l->t('Loading …')); ?></div>
    </div>
</div>