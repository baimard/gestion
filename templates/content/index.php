<div id="contentTable">
    <div id="modalConfig" class="modalConfig">
        <div class="modal-content">
            <span class="modalClose">&times;</span>
            <p><?php p($l->t('Configuration Entreprise'));?><a href="/apps/gestion/config"><?php p($l->t('Mon entreprise'));?></a></p>
        </div>
    </div>
    <div class="breadcrumb" data-html2canvas-ignore>
        <div class="crumb svg crumbhome">
            <a href="/apps/gestion/" class="icon-home"></a>
            <span style="display: none;"></span>
        </div>
        <div class="crumb svg crumbhome">
            <span><?php p($l->t('Client'));?></span>
        </div>
        <div class="crumb svg crumbhome">
            <a><span id="newClient"><?php p($l->t('Ajout Client'));?></span></a>
        </div>
    </div>
    <table id="client" class="display tabledt" style="table-layout: fixed; font-size:11px; width: 100%; white-space: pre-wrap;">
        <thead>
            <tr>
                <th><?php p($l->t('Entreprise'));?></th>
                <th><?php p($l->t('Nom'));?></th>
                <th><?php p($l->t('Prenom'));?></th>
                <th><?php p($l->t('Siret'));?></th>
                <th><?php p($l->t('Telephone'));?></th>
                <th><?php p($l->t('Mail'));?></th>
                <th><?php p($l->t('Adresse'));?></th>
                <th><?php p($l->t('Actions'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>