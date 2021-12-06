<div id="contentTable">
    <div class="breadcrumb" data-html2canvas-ignore>
        <div class="crumb svg crumbhome">
            <a href="<?php echo($_['url']['index']); ?>" class="icon-home"></a>
            <span style="display: none;"></span>
        </div>
        <div class="crumb svg crumbhome">
            <span><?php p($l->t('Invoice'));?></span>
        </div>
        <div class="crumb svg crumbhome">
            <a><span id="newInvoice"><?php p($l->t('Add invoice'));?></span></a>
        </div>
    </div>
    <table id="facture" class="display tabledt">
        <thead>
            <tr>
                <th><?php p($l->t('Invoice number'));?></th>
                <th><?php p($l->t('Date of service'));?></th>
                <th><?php p($l->t('Payment date'));?></th>
                <th><?php p($l->t('Means of payment'));?></th>
                <th><?php p($l->t('Associated quote'));?></th>
                <th><?php p($l->t('Version'));?></th>
                <th><?php p($l->t('Status'));?></th>
                <th><?php p($l->t('Actions'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
