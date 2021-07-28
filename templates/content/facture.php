<div id="contentTable">
    <div class="breadcrumb" data-html2canvas-ignore>
        <div class="crumb svg crumbhome">
            <a href="/apps/gestion/" class="icon-home"></a>
            <span style="display: none;"></span>
        </div>
        <div class="crumb svg crumbhome">
            <span><?php p($l->t('facture'));?></span>
        </div>
        <div class="crumb svg crumbhome">
            <a><span id="newFacture"><?php p($l->t('Ajouter facture'));?></span></a>
        </div>
    </div>
    <table id="facture" class="display tabledt" style="table-layout: fixed; width: 100%; white-space: pre-wrap;">
        <thead>
            <tr>
                <th><?php p($l->t('numero facture'));?></th>
                <th><?php p($l->t('date realisation'));?></th>
                <th><?php p($l->t('date paiement'));?></th>
                <th><?php p($l->t('Moyen paiement'));?></th>
                <th><?php p($l->t('Devis associe'));?></th>
                <th><?php p($l->t('Actions'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>