<?php
	script('gestion', array('adminSection.app'));
?>

<div class="section">
    <h2><?php p($l->t('Backup all data')); ?></h2>
    <p><?php p($l->t('You can save all Gestion app data.')); ?></p>
    <p><button id="backup"><?php p($l->t('Backup now!')); ?></button></p>
    <p><?php p($l->t('You can restore a backup file for Gestion (in next release).')); ?></p>
    <p><button disabled id="restore"><?php p($l->t('Restore now!')); ?></button></p>
    <hr/>
</div>
