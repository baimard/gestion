<div id="contentTable" class="gestion-settings-page">
    <header class="gestion-page-heading">
        <div class="gestion-heading-title">
            <?php print_unescaped($this->inc('navigation/toggle')); ?>
            <div><h1><?php p($l->t('My company')); ?></h1>
            <p><?php p($l->t('Manage your company, documents and data in one place.')); ?></p></div>
        </div>
        <div class="gestion-card-actions">
            <button type="button" id="HelpSection" aria-label="<?php p($l->t('Help')); ?>"><?php p($l->t('Help')); ?></button>
            <button type="button" id="newCompany"><?php p($l->t('Create new company')); ?></button>
        </div>
    </header>
    <div class="gestion-management-grid">
        <section class="gestion-card">
            <div class="gestion-card-heading"><span class="gestion-section-icon material-symbols-outlined" aria-hidden="true">store</span><h2><?php p($l->t('Company details')); ?></h2></div>
            <p><?php p($l->t('Manage your identity, billing information, electronic invoicing and document appearance.')); ?></p>
            <button type="button" class="primary" id="open_configuration_modal"><?php p($l->t('Edit company details')); ?></button>
        </section>
        <section class="gestion-card">
            <div class="gestion-card-heading"><span class="gestion-section-icon material-symbols-outlined" aria-hidden="true">person_add</span><h2><?php p($l->t('Access and sharing')); ?></h2></div>
            <p><?php p($l->t('Give another Nextcloud user access to this company.')); ?></p>
            <div class="gestion-card-actions gestion-share-form">
                <label for="emailInput"><?php p($l->t('Email')); ?><input list="search" type="email" id="emailInput" placeholder="<?php p($l->t('Enter email')); ?>"></label>
                <datalist id="search"></datalist>
                <button type="button" id="submitEmail"><?php p($l->t('Add')); ?></button>
            </div>
            <?php $sharedUsers = array_values(array_filter($_['shareUsers'])); ?>
            <div id="shareUsers">
                <?php if ($sharedUsers): ?>
                <table id="shareUsersTable">
                    <thead><tr><th scope="col"><?php p($l->t('User Display Name')); ?></th><th scope="col"><?php p($l->t('Delete')); ?></th></tr></thead>
                    <tbody>
                    <?php foreach ($sharedUsers as $user): ?>
                        <tr><td><?php p($user->getDisplayName()); ?></td><td><button class="deleteShareUser" data-uid="<?php p($user->getUID()); ?>" aria-label="<?php p($l->t('Remove access')); ?>"><?php p($l->t('Remove')); ?></button></td></tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
                <?php else: ?>
                <p class="gestion-sharing-empty"><?php p($l->t('This company is not shared with anyone yet.')); ?></p>
                <?php endif; ?>
            </div>
        </section>
        <?php print_unescaped($this->inc('content/backup_tools')); ?>
        <section class="gestion-card" aria-labelledby="precision-heading">
            <div class="gestion-card-heading"><span class="gestion-section-icon material-symbols-outlined" aria-hidden="true">tune</span><h2 id="precision-heading"><?php p($l->t('Number formatting')); ?></h2></div>
            <p><?php p($l->t('Set the display precision for unit prices and quantities. Monetary totals remain rounded to two decimal places. Stored values are preserved.')); ?></p>
            <form id="gestion-precision">
                <label><?php p($l->t('Unit price decimal places')); ?><input name="price_decimals" type="number" min="0" max="6" step="1" required value="2"></label>
                <label><?php p($l->t('Quantity decimal places')); ?><input name="quantity_decimals" type="number" min="0" max="6" step="1" required value="2"></label>
                <button class="primary" type="submit"><?php p($l->t('Save')); ?></button>
            </form>
        </section>
        <section class="gestion-card">
            <div class="gestion-card-heading"><span class="gestion-section-icon material-symbols-outlined" aria-hidden="true">history</span><h2><?php p($l->t('Change history')); ?></h2></div>
            <p><?php p($l->t('Review the latest changes to the current company and its documents.')); ?></p>
            <button type="button" data-open-history><?php p($l->t('View change history')); ?></button>
        </section>
        <section class="gestion-card gestion-danger-card">
            <div class="gestion-card-heading"><span class="gestion-section-icon material-symbols-outlined" aria-hidden="true">delete</span><h2><?php p($l->t('Delete company')); ?></h2></div>
            <p><?php p($l->t('Deletion is permanent. Companies with finalized documents are protected. Download a backup before deleting a company.')); ?></p>
            <button type="button" id="deleteCompany"><?php p($l->t('Delete company')); ?></button>
        </section>
    </div>
</div>
