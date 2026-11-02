<section class="gestion-card" aria-labelledby="backup-heading">
    <h2 id="backup-heading"><?php p($l->t('Backups and recovery')); ?></h2>
    <p><?php p($l->t('Download a backup of companies you own. Restore it into new companies without replacing existing data.')); ?></p>
    <div class="gestion-card-actions">
        <button type="button" class="primary" data-backup><?php p($l->t('Download a backup')); ?></button>
        <label class="gestion-file-label"><?php p($l->t('Choose a backup to restore')); ?>
            <input type="file" accept="application/json,.json" data-restore-file aria-label="<?php p($l->t('Choose a backup to restore')); ?>">
        </label>
    </div>
    <p class="gestion-hint"><?php p($l->t('JSON format, up to 20 MB. Files, sharing permissions and provider credentials are not included. Legacy text backups cannot be restored safely.')); ?></p>
</section>
