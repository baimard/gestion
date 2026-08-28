<div id="contentTable">
    <div class="menu-content">
        <?php print_unescaped($this->inc('navigation/toggle')); ?>
        <a href="<?php echo($_['url']['index']); ?>"><span class="material-symbols-outlined">home</span></a>
        <span class="material-symbols-outlined">chevron_right</span>
        <span><?php p($l->t('Legal notice'));?></span>
    </div>
    <h2><?php p($l->t('Legal notice')); ?></h2>
    <p><?php p($l->t('This section provides information pertaining to the use of this application under the legal framework applicable in various countries.')); ?></p>
    <p><?php p($l->t('If you want to contribute to this section just contact me by mail')); ?> <b><a style="text-decoration:underline" href="mailto:benjamin@cybercorp.fr">Benjamin A.</a></b></p>
    <hr/>
    <ul style="margin-left:30px;">
        <li>🇫🇷 <a href="<?php echo $_['url']['france']; ?>" title="Cliquer ici pour voir la notice" style="font-size:20px;">France</a> par <b>Timo RAINIO</b> Avocat <a title="Droit des affaires et de l’entreprise – Droit du travail – Droit du numérique. Vous pouvez retrouver nos domaines d’intervention sur notre site internet" style="text-decoration:underline" href="https://www.avocat-rainio.com">Cabinet d’Avocats Rainio</a> - mise à jour 16 mai 2022</li>
    </ul>
</div>
