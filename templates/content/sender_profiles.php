<section class="gestion-card gestion-sender-profiles" aria-labelledby="sender-profiles-heading">
    <div class="gestion-card-heading">
        <span class="gestion-section-icon material-symbols-outlined" aria-hidden="true">mail</span>
        <h2 id="sender-profiles-heading"><?php p($l->t('Sender profiles')); ?></h2>
    </div>
    <p><?php p($l->t('Set up different contacts and logos for this company. Choose a profile on a quote to use it on the quote and its invoices.')); ?></p>
    <p><?php p($l->t('A finalized document protects its profile. Create another profile when your details change.')); ?></p>

    <?php foreach (($_['senderProfiles'] + ['' => []]) as $id => $profile): ?>
        <details class="gestion-sender-profile">
            <summary><?php p($profile['label'] ?? $l->t('Add a sender profile')); ?></summary>
            <form method="post" data-sender-profile data-company="<?php p($_['CurrentCompany']); ?>" data-id="<?php p($id); ?>">
                <label><?php p($l->t('Profile name')); ?>
                    <input name="label" required maxlength="80" value="<?php p($profile['label'] ?? ''); ?>">
                </label>
                <label><?php p($l->t('Contact name')); ?>
                    <input name="contact" maxlength="160" value="<?php p($profile['contact'] ?? ''); ?>">
                </label>
                <label><?php p($l->t('Correspondence address')); ?>
                    <textarea name="address" maxlength="500" rows="3"><?php p($profile['address'] ?? ''); ?></textarea>
                </label>
                <label><?php p($l->t('Email')); ?>
                    <input name="email" type="email" maxlength="254" value="<?php p($profile['email'] ?? ''); ?>">
                </label>
                <label><?php p($l->t('Phone number')); ?>
                    <input name="phone" maxlength="80" type="tel" value="<?php p($profile['phone'] ?? ''); ?>">
                </label>
                <?php if (!empty($profile['logo'])): ?>
                    <img class="gestion-sender-logo" src="data:image/png;base64,<?php p($profile['logo']); ?>" alt="<?php p($l->t('Sender profile logo')); ?>">
                    <label class="gestion-sender-logo-reset"><input type="checkbox" name="remove_logo"><?php p($l->t('Use company logos again')); ?></label>
                <?php endif; ?>
                <label><?php p($l->t('Sender profile logo')); ?>
                    <input name="logo_file" type="file" accept="image/png,image/jpeg">
                </label>
                <?php print_unescaped($this->inc('content/logo_upload_hint')); ?>
                <small><?php p($l->t('Blank contact fields use company defaults.')); ?></small>
                <div class="gestion-card-actions">
                    <button type="submit" class="primary"><?php p($l->t('Save')); ?></button>
                    <?php if ($id !== ''): ?><button type="button" data-delete-profile><?php p($l->t('Delete')); ?></button><?php endif; ?>
                </div>
                <p role="status" data-profile-status></p>
            </form>
        </details>
    <?php endforeach; ?>
</section>
