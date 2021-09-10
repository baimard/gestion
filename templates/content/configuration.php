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
	<table id="configuration" class="display tabledt" style="table-layout: fixed; font-size:11px; width: 100%; white-space: pre-wrap;">
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
            </tr>
        </thead>
        <tbody>
        </tbody>
	</table>
</div>
