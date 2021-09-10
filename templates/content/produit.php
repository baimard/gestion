<div id="contentTable">
<div class="breadcrumb" data-html2canvas-ignore>
        <div class="crumb svg crumbhome">
            <a href="<?php echo($_['url']['index']); ?>" class="icon-home"></a>
            <span style="display: none;"></span>
        </div>
        <div class="crumb svg crumbhome">
            <span><?php p($l->t('Product'));?></span>
        </div>
        <div class="crumb svg crumbhome">
            <a><span id="newProduit"><?php p($l->t('Add product'));?></span></a>
        </div>
    </div>
	<table id="produit" class="display tabledt" style="table-layout: fixed; width: 100%; white-space: pre-wrap;">
        <thead>
            <tr>
                <th><?php p($l->t('Reference'));?></th>
                <th><?php p($l->t('Designation'));?></th>
                <th><?php p($l->t('Unit price without VAT'));?></th>
                <th><?php p($l->t('Actions'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
	</table>
</div>
