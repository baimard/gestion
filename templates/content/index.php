<div id="contentTable">
    <div id="modalConfig" class="modalConfig">
        <div class="modal-content">
            <span class="modalClose">&times;</span>
            <h2><?php p($l->t('Welcome to GESTION'));?></h2>
            <p style="margin-bottom:20px;"><?php p($l->t('This application is an opensource application design by Benjamin AIMARD, if you like my work you can'));?> &#129321; <a href="https://www.buymeacoffee.com/benjaminaimard"><?php p($l->t('buy me a coffee'));?></a> &#129321;</p>
            <p style="margin-bottom:20px;"><?php p($l->t('To start with this application you need to configure your company information, follow this link'));?> &#128073; <a href="<?php echo($_['url']['config']); ?>"><?php p($l->t('My company'));?></a></p>
            <p style="margin-bottom:20px;"><?php p($l->t('If you need documentation, follow this link'));?> &#128073; <a href="https://baimard.github.io/gestion/"><?php p($l->t('Documentation'));?></a></p>
            <p style="margin-bottom:20px;"><?php p($l->t('Others questions?'));?> &#128073; <a href="mailto:contact@cybercorp.fr"><?php p($l->t('Contact'));?></a></p>
        </div>
    </div>
    <div class="breadcrumb" data-html2canvas-ignore>
        <div class="crumb svg crumbhome">
            <a href="<?php echo($_['url']['index']); ?>" class="icon-home"></a>
            <span style="display: none;"></span>
        </div>
        <div class="crumb svg crumbhome">
            <span><?php p($l->t('Customer'));?></span>
        </div>
        <div class="crumb svg crumbhome">
            <a><span id="newClient"><?php p($l->t('Add customer'));?></span></a>
        </div>
    </div>
    <table id="client" class="display tabledt" style="font-size:11px;">
        <thead>
            <tr>
                <th><?php p($l->t('Company'));?></th>
                <th><?php p($l->t('Name'));?></th>
                <th><?php p($l->t('First name'));?></th>
                <th><?php p($l->t('Limited company'));?></th>
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
