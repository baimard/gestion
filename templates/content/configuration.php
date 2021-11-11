<div id="contentTable">
    <div class="breadcrumb" data-html2canvas-ignore>
        <div class="crumb svg crumbhome">
            <a href="<?php echo($_['url']['index']); ?>" class="icon-home"></a>
            <span style="display: none;"></span>
        </div>
        <div class="crumb svg crumbhome">
            <span><?php p($l->t('Configuration'));?></span>
        </div>
    </div>
	<table id="configuration" class="display tabledt">
        <thead>
            <tr>
                <th><?php p($l->t('Company'));?></th>
                <th><?php p($l->t('Name'));?></th>
                <th><?php p($l->t('First name'));?></th>
                <th><?php p($l->t('Limited company'));?></th>
                <th><?php p($l->t('Unique identification'));?></th>
                <th><?php p($l->t('Phone number'));?></th>
                <th><?php p($l->t('Email'));?></th>
                <th><?php p($l->t('Address'));?></th>
                <th><?php p($l->t('VAT Default'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
	</table>
    <hr/>
    <h2><?php p($l->t('legal disclaimer'));?></h2>
    <div id="mentions_default" class="editable" data-table="configuration" data-column="mentions_default" data-id=""><?php p($l->t('Loading'));?></div>
</div>
