<div id="contentTable">
    <div id="modalConfig" class="modalConfig">
        <div class="modal-content">
            <span class="modalClose">&times;</span>
            <p>Veuillez configurer les informations concernant votre entreprise : <a href="/apps/gestion/config">Mon entreprise</a></p>
        </div>
    </div>
    <div class="breadcrumb" data-html2canvas-ignore>
        <div class="crumb svg crumbhome">
            <a href="/apps/gestion/" class="icon-home">Home</a>
            <span style="display: none;"></span>
        </div>
        <div class="crumb svg crumbhome">
            <span>Client</span>
        </div>
        <div class="crumb svg crumbhome">
            <a><span id="newClient">Ajouter un client</span></a>
        </div>
    </div>
    <table id="client" class="display" style="table-layout: fixed; font-size:11px; width: 100%; white-space: pre-wrap;">
        <thead>
            <tr>
                <th>Entreprise <?php p($l->t('TEST'));?></th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Siret</th>
                <th>Telephone</th>
                <th>Mail</th>
                <th>Adresse</th>
                <th>Action(s)</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>