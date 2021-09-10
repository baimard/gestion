<div id="contentTable">
    <div id="modalConfig" class="modalConfig">
        <div class="modal-content">
            <span class="modalClose">&times;</span>
            <p><?php p($l->t('Please configure your company information'));?> - <a href="<?php echo($_['url']['config']); ?>"><?php p($l->t('My company'));?></a></p>
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
    <table id="client" class="display tabledt" style="table-layout: fixed; font-size:11px; width: 100%; white-space: pre-wrap;">
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
