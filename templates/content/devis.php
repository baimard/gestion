<div id="contentTable">
    <div class="breadcrumb" data-html2canvas-ignore>
        <div class="crumb svg crumbhome">
            <a href="/apps/gestion/" class="icon-home"></a>
            <span style="display: none;"></span>
        </div>
        <div class="crumb svg crumbhome">
            <span><?php p($l->t('Devis'));?></span>
        </div>
        <div class="crumb svg crumbhome">
            <a><span id="newDevis"><?php p($l->t('Ajouter un devis'));?></span></a>
        </div>
    </div>
    <table id="devis" class="display tabledt" style="table-layout: fixed; width: 100%; white-space: pre-wrap;">
        <thead>
            <tr>
                <th><?php p($l->t('date devis'));?></th>
                <th><?php p($l->t('numero devis'));?></th>
                <th><?php p($l->t('devis client'));?></th>
                <th><?php p($l->t('Actions'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>