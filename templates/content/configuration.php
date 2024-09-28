<div id="contentTable">
    <div class="menu-content">
        <a href="<?= $_['url']['index'] ?>"><span class="material-symbols-outlined">home</span></a>
        <span class="material-symbols-outlined">chevron_right</span>
        <span><?= p($l->t('Configuration')) ?></span>
        <span class="material-symbols-outlined">chevron_right</span>
        <button style="margin-left:3px;" type="button" id="newCompany"><?= p($l->t('Create new company')) ?></button>
        <span class="material-symbols-outlined">chevron_right</span>
        <a id="HelpSection"><span class="material-symbols-outlined">question_mark</span></a>
    </div>
    <div>
        <p>
            <a href="#">
                <button id="open_configuration_modal" style="margin-left:10px;width:270px;">
                    <?= p($l->t('Modify current company information')) ?>
                </button>
            </a>
        </p>
        <hr/>
        <h2><?= p($l->t('Share with ...')) ?></h2>
        <p>
            <input list="search" type="text" id="emailInput" placeholder="Enter email">
            <datalist id="search"></datalist>
            <button id="submitEmail"><?= p($l->t('Add')) ?></button>
        </p>
        <div id="shareUsers">
            <table id="shareUsersTable">
                <thead>
                    <tr>
                        <th><?= p($l->t('User Diplay Name')) ?></th>
                        <th><?= p($l->t('Delete')) ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                        foreach ($_['shareUsers'] as $user){
                            echo '<tr>';
                            echo '<td>'.$user->getDisplayName().'</td>';
                            echo '<td><button class="deleteShareUser" data-uid="'.$user->getUID().'">X</button></td>';
                            echo '</tr>';
                        } 
                    ?>
                </tbody>
            </table>
        </div>

        <hr/>
        <button id="deleteCompany" style="background-color: red; color: white;"><?= p($l->t('Delete Company')) ?></button>
    </div>
</div>
