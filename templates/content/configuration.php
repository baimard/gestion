<div id="contentTable">
    <div class="menu-content">
        <a href="<?php echo($_['url']['index']); ?>"><span class="material-symbols-outlined">home</span></a>
        <span class="material-symbols-outlined">chevron_right</span>
        <span><?php p($l->t('Configuration'));?></span>
        <span class="material-symbols-outlined">chevron_right</span>
        <button style="margin-left:3px;" type="button"  id="newCompany"><?php p($l->t('Create new company')); ?></button>
        <span class="material-symbols-outlined">chevron_right</span>
        <a id="HelpSection"><span class="material-symbols-outlined">question_mark</span></a>
    </div>
    <div>
        <p>
            <a href="#">
                <button id="open_configuration_modal" style="margin-left:10px;width:270px;">
                    <?php p($l->t('Modify current company information'));?>
                </button>
                
            </a>
        </p>
        <p>
            <input list="search" type="text" id="emailInput" placeholder="Enter email">
            <datalist id="search"></datalist>
            <button id="submitEmail"><?= p($l->t('Add')); ?></button>
        </p>
    </div>

</div>