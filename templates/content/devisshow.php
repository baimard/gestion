    <div class="bootstrap-iso">
        <h2 class="mt-3 mb-3 text-center"> DEVIS N° <div id="devisid" style="display:inline" class="editable" data-table="devis" data-column="num" data-id="<?php echo $_['devis'][0]->devisid; ?>"><?php echo $_['devis'][0]->num; ?></div>
        </h2>
        <hr />
        <div class="row">
            <div class="col col-md">
                <?php $res = json_decode($_['configuration'])[0]; ?>
                <h5 class="p-3 m-0 text-dark text-center border border-2 border-dark">PART <?php echo $res->entreprise; ?></h5>
                <p class="p-3 m-0 text-center text-dark text-center border border-top-0 border-2 border-dark">
                    <?php echo $res->prenom . " " . $res->nom; ?><br />
                    <?php echo $res->adresse; ?><br />
                    <?php echo $res->mail; ?><br />
                    <?php echo $res->telephone; ?>
                </p>
            </div>
            <div class="col col-md">
                <h5 class="p-3 m-0 text-dark text-center border border-2 border-dark">POUR <span id="entreprise"></span></h6>
                    <p class="p-3 mt-0 mb-4 text-center text-dark text-center border border-top-0 border-2 border-dark">
                        <span id="nomprenom" data-id="0" data-table="devis" data-column="id_client"></span><br />
                        <span id="adresse"></span><br />
                        <span id="mail"></span><br />
                        <span id="telephone"></span><br />
                        SIRET : <span id="siret"></span><br />
                    </p>
            </div>
        </div>
        <div class="row">
            <div class="col col-md">
                <hr />
                <div class="col col-xl mb-3 text-center"><b><span>Offre valide 1 mois à compter du : </span><span><?php echo (new DateTime($_['devis'][0]->date))->format('d-m-Y'); ?></span></b></div>
                <hr />
            </div>
        </div>
        <div class="table-responsive">
            <table id="produits" class="table table-striped">
                <thead>
                    <tr>
                        <th>Reference</th>
                        <th>Désignation</th>
                        <th>Quantité</th>
                        <th>PU HT</th>
                        <th>Total HT</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <button id="devisAdd" type="button" class="mb-2 btn btn-outline-success" data-html2canvas-ignore>Ajouter</button>
            <button id="pdf" type="button" data-name="" class="mb-2 btn btn-outline-success" data-html2canvas-ignore>Sauvegarde cloud</button>
        </div>
        <div class="mt-0 table-responsive">
            <table id="totaldevis" class="table table-striped table-xl">
                <thead class="bg-dark text-white">
                    <tr>
                        <th class="text-center">Total HT</th>
                        <th class="text-center">Taux TVA</th>
                        <th class="text-center">Total TVA</th>
                        <th class="text-center">Total TTC</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="col m-0 pb-0 alert alert-info text-center">
            <p>Délai de paiement le 5ième jour du mois suivant la commande. En cas de retard, une pénalité au taux annuel de 5 % sera appliquée.</p>
            <p>TVA non applicable, art. 293B du CGI.</p>
            <hr />
            <p>Société <?php echo $res->entreprise; ?><br /><?php echo $res->adresse; ?><br /> SIREN : <?php echo $res->siren; ?> - SIRET : <?php echo $res->siret; ?></p>
        </div>
    </div>