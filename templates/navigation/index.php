<nav class="gestion-nav" aria-label="<?php p($l->t('Gestion')); ?>">
    <div class="gestion-mobile-navigation-controls">
        <span>Gestion</span>
        <button type="button" class="gestion-navigation-close" aria-label="<?php p($l->t('Close navigation')); ?>" title="<?php p($l->t('Close navigation')); ?>">
            <span class="material-symbols-outlined" aria-hidden="true">close</span>
        </button>
    </div>

    <div class="gestion-nav-section">
        <label class="gestion-nav-heading" for="CurrentCompany-select"><?php p($l->t('COMPANY')); ?></label>
        <select name="CurrentCompany" id="CurrentCompany-select">
            <?php foreach ($_['CompaniesList'] as $value): ?>
                <option value="<?php p($value['id']); ?>" <?php if ((int)$value['id'] === (int)$_['CurrentCompany']) echo 'selected'; ?>>
                    <?php p('id : ' . $value['id'] . ' - ' . $value['entreprise']); ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

    <div class="gestion-nav-section">
        <h2 class="gestion-nav-heading" id="gestion-nav-documents"><?php p($l->t('Gestion')); ?></h2>
        <ul class="gestion-nav-list" aria-labelledby="gestion-nav-documents">
            <?php
                $links = [
                    'index' => [$l->t('Customers'), 'statsclient'],
                    'devis' => [$l->t('Quotes'), 'statsdevis'],
                    'facture' => [$l->t('Invoices'), 'statsfacture'],
                    'produit' => [$l->t('Products'), 'statsproduit'],
                ];
            ?>
            <?php foreach ($links as $route => [$label, $counter]): ?>
                <li>
                    <a class="gestion-nav-link" href="<?php p($_['url'][$route]); ?>" <?php if (in_array($route, ['devis', 'facture'], true)) echo 'data-navigation-descendants'; ?>>
                        <?php p($label); ?>
                        <span class="gestion-nav-count" id="<?php p($counter); ?>"></span>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>

    <div class="gestion-nav-section">
        <h2 class="gestion-nav-heading" id="gestion-nav-information"><?php p($l->t('INFORMATION')); ?></h2>
        <ul class="gestion-nav-list" aria-labelledby="gestion-nav-information">
            <li><a class="gestion-nav-link" href="<?php p($_['url']['statistique']); ?>"><?php p($l->t('Statistics')); ?></a></li>
            <li><a class="gestion-nav-link" href="<?php p($_['url']['legalnotice']); ?>"><?php p($l->t('Legal notice')); ?></a></li>
        </ul>
    </div>

    <div class="gestion-nav-section">
        <label class="gestion-nav-heading" for="theFolder"><?php p($l->t('Save folder')); ?></label>
        <input id="theFolder" type="text" placeholder="<?php p($l->t('Please choose a folder')); ?>">
    </div>

    <div class="gestion-nav-footer">
        <a class="gestion-nav-link" href="<?php p($_['url']['config']); ?>"><?php p($l->t('My company')); ?></a>
        <a class="gestion-nav-link" href="<?php p($_['url']['templates']); ?>"><?php p($l->t('Templates')); ?></a>
        <button class="gestion-nav-link" type="button" id="about"><?php p($l->t('About')); ?></button>
    </div>
    <p class="gestion-version"><?php p($l->t('Gestion version')); ?> <?php p($_['appVersion']); ?></p>
</nav>
