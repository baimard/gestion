<div id="contentTable">
    <div class="menu-content">
        <a href="<?php echo($_['url']['index']); ?>"><span class="material-symbols-outlined">home</span></a>
        <span class="material-symbols-outlined">chevron_right</span>
        <span><?php p($l->t('Configuration'));?></span>
        <span class="material-symbols-outlined">chevron_right</span>
        <button style="margin-left:3px;" type="button"  id="newCompany"><?php p($l->t('Create new company')); ?></button>
    </div>

    <p><a href="#"><button id="open_configuration_modal" style="margin-left:10px;width:270px;"><?php p($l->t('Modify current company'));?></button></a> - <a id="HelpSection"><u><?php p($l->t('Need help?')); ?></u></a></p>

</div>