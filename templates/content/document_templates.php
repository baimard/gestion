<?php
    $requiredBlocks = ['parties', 'details', 'products', 'grand_totals'];
    $templateNames = ['quote' => $l->t('Quote template'), 'invoice' => $l->t('Invoice template')];
?>
<main id="contentTable" class="gestion-settings-page gestion-template-page">
    <header class="gestion-page-heading">
        <div class="gestion-heading-title">
            <?php print_unescaped($this->inc('navigation/toggle')); ?>
            <div>
                <h1><?php p($l->t('Document templates')); ?></h1>
                <p><?php p($l->t('Arrange the approved blocks and customize the visual style of quotes and invoices.')); ?></p>
            </div>
        </div>
    </header>

    <div class="gestion-template-security" role="note">
        <span class="material-symbols-outlined" aria-hidden="true">verified_user</span>
        <div>
            <strong><?php p($l->t('Secure by design')); ?></strong>
            <p><?php p($l->t('Templates never execute HTML, JavaScript or PHP. CSS is limited to approved selectors, visual properties and local document content. External resources are forbidden.')); ?></p>
        </div>
    </div>

    <?php if (empty($_['templates'])): ?>
        <p class="gestion-template-empty"><?php p($l->t('Create or select a company before configuring document templates.')); ?></p>
    <?php else: ?>
        <?php if (empty($_['canManageTemplates'])): ?>
            <p class="gestion-lock-information"><?php p($l->t('Only the company owner can change document templates. Shared users can view the current configuration.')); ?></p>
        <?php endif; ?>

        <div class="gestion-template-grid">
            <?php foreach (['quote', 'invoice'] as $type): ?>
                <?php $template = $_['templates'][$type]; ?>
                <form class="gestion-template-editor gestion-card" data-template-editor data-template-type="<?php p($type); ?>" data-can-manage="<?php p(!empty($_['canManageTemplates']) ? 'true' : 'false'); ?>" data-default-layout="<?php p(json_encode($_['templateDefaults'][$type], JSON_THROW_ON_ERROR)); ?>">
                    <div class="gestion-card-heading">
                        <span class="gestion-section-icon material-symbols-outlined" aria-hidden="true"><?php p($type === 'quote' ? 'description' : 'receipt_long'); ?></span>
                        <div>
                            <h2><?php p($templateNames[$type]); ?></h2>
                            <p><?php p($l->t('The preview shows the reading order used in the screen view and generated PDF.')); ?></p>
                        </div>
                    </div>

                    <div class="gestion-template-workspace">
                        <section aria-labelledby="<?php p($type); ?>-blocks-title">
                            <h3 id="<?php p($type); ?>-blocks-title"><?php p($l->t('Blocks')); ?></h3>
                            <ol class="gestion-template-block-list" data-block-list>
                                <?php foreach ($template['layout'] as $block): ?>
                                    <?php $required = in_array($block['id'], $requiredBlocks, true); ?>
                                    <li data-template-block="<?php p($block['id']); ?>" data-required="<?php p($required ? 'true' : 'false'); ?>">
                                        <span class="material-symbols-outlined gestion-template-drag" aria-hidden="true">drag_indicator</span>
                                        <span class="gestion-template-block-name"><?php p($_['templateBlocks'][$block['id']]); ?></span>
                                        <?php if ($required): ?><span class="gestion-template-required"><?php p($l->t('Required')); ?></span><?php endif; ?>
                                        <label>
                                            <input type="checkbox" data-block-visible <?php if ($block['visible']) echo 'checked'; ?> <?php if ($required || empty($_['canManageTemplates'])) echo 'disabled'; ?>>
                                            <span><?php p($l->t('Visible')); ?></span>
                                        </label>
                                        <button type="button" data-move="up" title="<?php p($l->t('Move up')); ?>" aria-label="<?php p($l->t('Move up')); ?>" <?php if (empty($_['canManageTemplates'])) echo 'disabled'; ?>><span class="material-symbols-outlined" aria-hidden="true">arrow_upward</span></button>
                                        <button type="button" data-move="down" title="<?php p($l->t('Move down')); ?>" aria-label="<?php p($l->t('Move down')); ?>" <?php if (empty($_['canManageTemplates'])) echo 'disabled'; ?>><span class="material-symbols-outlined" aria-hidden="true">arrow_downward</span></button>
                                    </li>
                                <?php endforeach; ?>
                            </ol>
                        </section>
                        <section class="gestion-template-preview" aria-labelledby="<?php p($type); ?>-preview-title">
                            <h3 id="<?php p($type); ?>-preview-title"><?php p($l->t('Page preview')); ?></h3>
                            <div class="gestion-template-sheet" data-template-preview></div>
                        </section>
                    </div>

                    <label class="gestion-template-css-label" for="<?php p($type); ?>-css">
                        <strong><?php p($l->t('Custom document CSS')); ?></strong>
                        <span><?php p($l->t('Use only the selectors shown below. The CSS applies only inside quotes or invoices of this company.')); ?></span>
                    </label>
                    <textarea id="<?php p($type); ?>-css" data-template-css rows="10" maxlength="32768" spellcheck="false" placeholder=".block-products th {&#10;  background-color: #e8f3ff;&#10;  color: #1f4b73;&#10;}"><?php p($template['css']); ?></textarea>
                    <details class="gestion-template-css-help">
                        <summary><?php p($l->t('Allowed CSS selectors and properties')); ?></summary>
                        <p><code>.document</code>, <code>.block-header-logo</code>, <code>.block-parties</code>, <code>.block-details</code>, <code>.block-comment</code>, <code>.block-products</code>, <code>.block-vat-totals</code>, <code>.block-grand-totals</code>, <code>.block-legal-notice</code>, <code>.block-footer-logo</code>, <code>.block-issuer-details</code>, <code>.block-signature</code></p>
                        <p><?php p($l->t('A selector may target table, thead, tbody, tfoot, tr, th, td, p, span, div or img below one of these blocks. Visual properties such as colors, borders, spacing, typography and dimensions are accepted.')); ?></p>
                    </details>

                    <div class="gestion-card-actions">
                        <button type="button" data-reset-template <?php if (empty($_['canManageTemplates'])) echo 'disabled'; ?>><?php p($l->t('Restore default')); ?></button>
                        <button type="submit" class="primary" <?php if (empty($_['canManageTemplates'])) echo 'disabled'; ?>><?php p($l->t('Save template')); ?></button>
                        <p role="status" data-template-status></p>
                    </div>
                </form>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</main>
