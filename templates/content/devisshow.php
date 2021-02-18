    <div class="container">
        <?php //var_dump($_['devis'][0]);  ?>
        <h2 class="mt-3 mb-3 text-center"> DEVIS N° <?php echo $_['devis'][0]->num;?></h2>
        <hr/>
        <div class="row">
            <div class="col col-md">
                <h5 class="p-3 m-0 text-dark text-center border border-2 border-dark">PART CYBERCORP</h6>
                <p class="p-3 m-0 text-center text-dark text-center border border-top-0 border-2 border-dark">
                    Benjamin AIMARD<br/>
                    34 Avenue Blaise Pascal<br/>
                    33160 SAINT MEDARD EN JALLES<br/>
                    benjamin@cybercorp.fr<br/>
                    06 60 51 44 86<br/>
                </p>
            </div>
            <div class="col col-md">
            <h5 class="p-3 m-0 text-dark text-center border border-2 border-dark">POUR <?php echo $_['devis'][0]->entreprise;?></h6>
                <p class="p-3 mt-0 mb-4 text-center text-dark text-center border border-top-0 border-2 border-dark">
                    <?php echo $_['devis'][0]->prenom.' '.$_['devis'][0]->nom?><br/>
                    <?php echo $_['devis'][0]->adresse;?><br/>
                    <?php echo $_['devis'][0]->mail;?><br/>
                    <?php echo $_['devis'][0]->telephone;?><br/>
                    SIRET : <?php echo $_['devis'][0]->siret;?><br/>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col col-md">
                <hr/>
                <div class="col col-xl mb-3 text-center"><b><span>Offre valide 1 mois à compter du : </span><span><?php echo (new DateTime($_['devis'][0]->date))->format('d-m-Y');?></span></b></div>
                <hr/>
            </div>
        </div>
        <div class="table-responsive">
            <table class="mt-4 mb-5 table table-striped table-xl">
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
                    <?php 
                        $devis = $_['devis'][0];
                        //var_dump($devis);
                        $produit = $_['produit'];
                        //var_dump($produit);
                        foreach ($produit as $p){
                            echo "<tr><td>$p->reference</td><td>$p->description</td><td>$p->quantité</td><td class=\"text-center\">$p->prix_unitaire &euro;</td><td class='text-center'>".intval($p->quantité)*floatval($p->prix_unitaire)." &euro;</td></tr>";
                        }
                    ?>
                </tbody>
            </table>
        </div>
        <div class="mt-0 table-responsive">
            <table class="table table-striped table-xl">
                <thead class="bg-dark text-white">
                    <tr>
                    <th>Total HT</th>
                    <th>Taux TVA</th>
                    <th>Total TVA</th>
                    <th>Total TTC</th>
                    </tr>
                </thead>
                <tbody>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tbody>
            </table>
        </div>
        <div class="row">
            <div class="col col-md mt-5 pb-0 alert alert-info text-center">
                <p>Délai de paiement le 5ième jour du mois suivant la commande. En cas de retard, une pénalité au taux annuel de 5 % sera appliquée.<p/><p>TVA non applicable, art. 293B du CGI.</p>
                <hr/>
                <p>Société CYBERCORP<br/> 34 avenue Blaise Pascal 33160 SAINT MEDARD EN JALLES<br/> SIREN : 891 577 470 - SIRET : 891 577 470 00018</p>
            </div>
        </div>
    </div>