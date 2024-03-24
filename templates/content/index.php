<div id="contentTable">
    <div class="menu-content">
        <a href="<?php echo($_['url']['index']); ?>"><span class="material-symbols-outlined">home</span></a>
        <span class="material-symbols-outlined">chevron_right</span>
        <span><?php p($l->t('Customer'));?></span>
        <span class="material-symbols-outlined">chevron_right</span>
        <button style="margin-left:3px;" type="button"  id="newClient"><?php p($l->t('Add customer'));?></button>
    </div>
    <table id="client" class="display tabledt" style="font-size:11px;">
        <thead>
            <tr>
                <th><?php p($l->t('ID'));?></th>
                <th><?php p($l->t('Company'));?></th>
                <th><?php p($l->t('First name'));?></th>
                <th><?php p($l->t('Last name'));?></th>
                <th><?php p($l->t('Legal information'));?></th>
                <th><?php p($l->t('Phone number'));?></th>
                <th><?php p($l->t('Email'));?></th>
                <th><?php p($l->t('Address'));?></th>
                <th><?php p($l->t('Actions'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
