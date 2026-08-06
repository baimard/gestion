<div id="contentTable">
    <div class="menu-content">
        <a href="<?php echo($_['url']['index']); ?>"><span class="material-symbols-outlined">home</span></a>
        <span class="material-symbols-outlined">chevron_right</span>
        <span><?php p($l->t('Customer'));?></span>
        <span class="material-symbols-outlined">chevron_right</span>
        <button style="margin-left:3px;" type="button"  id="newClient"><?php p($l->t('Add customer'));?></button>
        <button style="margin-left:3px;" type="button" id="importContactClient"><?php p($l->t('Add from Nextcloud contacts'));?></button>
        <label class="hidden-visually" for="contactClientSelect"><?php p($l->t('Nextcloud contact'));?></label>
        <select style="margin-left:3px;display:none;" id="contactClientSelect" disabled><option value=""><?php p($l->t('Select a Nextcloud contact'));?></option></select>
    </div>
    <table id="client" class="display tabledt" style="font-size:11px;">
        <thead>
            <tr>
                <th><?php p($l->t('Company'));?></th>
                <th><?php p($l->t('First name'));?></th>
                <th><?php p($l->t('Last name'));?></th>
                <th><?php p($l->t('Legal information'));?></th>
                <th><?php p($l->t('Phone number'));?></th>
                <th><?php p($l->t('Email'));?></th>
                <th><?php p($l->t('Address'));?></th>
                <th>zipCode</th>
                <th>cityName</th>
                <th>Country code</th>
                <th><?php p($l->t('Actions'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
