<div id="contentTable">
    <div class="menu-content">
        <a href="<?php echo($_['url']['index']); ?>"><span class="material-symbols-outlined">home</span></a>
        <span class="material-symbols-outlined">chevron_right</span>
        <span><?php p($l->t('Quote'));?></span>
        <span class="material-symbols-outlined">chevron_right</span>
        <button style="margin-left:3px;" type="button"  id="newDevis"><?php p($l->t('Add quote'));?></button>
    </div>
    <table id="devis" class="display tabledt">
        <thead>
            <tr>
                <th><?php p($l->t('ID'));?></th>
                <th><?php p($l->t('Quote date'));?></th>
                <th><?php p($l->t('Quote number'));?></th>
                <th><?php p($l->t('Customer quote'));?></th>
                <th><?php p($l->t('Version'));?></th>
                <th><?php p($l->t('Status'));?></th>
                <th><?php p($l->t('Actions'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
