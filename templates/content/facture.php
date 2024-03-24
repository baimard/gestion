<div id="contentTable">
    <div class="menu-content">
        <a href="<?php echo($_['url']['index']); ?>"><span class="material-symbols-outlined">home</span></a>
        <span class="material-symbols-outlined">chevron_right</span>
        <span><?php p($l->t('Invoice'));?></span>
        <span class="material-symbols-outlined">chevron_right</span>
        <button style="margin-left:3px;" type="button"  id="newInvoice"><?php p($l->t('Add invoice'));?></button>
    </div>
    <table id="facture" class="display tabledt">
        <thead>
            <tr>
                <th><?php p($l->t('ID'));?></th>
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
