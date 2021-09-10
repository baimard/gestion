<div id="contentTable">
    <div class="breadcrumb" data-html2canvas-ignore>
        <div class="crumb svg crumbhome">
            <a href="<?php echo($_['url']['index']); ?>" class="icon-home"></a>
            <span style="display: none;"></span>
        </div>
        <div class="crumb svg crumbhome">
            <span><?php p($l->t('Quote'));?></span>
        </div>
        <div class="crumb svg crumbhome">
            <a><span id="newDevis"><?php p($l->t('Add new quote'));?></span></a>
        </div>
    </div>
    <table id="devis" class="display tabledt" style="table-layout: fixed; width: 100%; white-space: pre-wrap;">
        <thead>
            <tr>
                <th><?php p($l->t('Quote date'));?></th>
                <th><?php p($l->t('Quote number'));?></th>
                <th><?php p($l->t('Customer quote'));?></th>
                <th><?php p($l->t('Actions'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>