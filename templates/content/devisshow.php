<div class="gestion-document-view">
    <div class="gestion-document-toolbar" data-html2canvas-ignore data-document-lock data-table="devis" data-id="<?php p($_['devis'][0]->devisid); ?>" data-locked="<?php p((int)($_['devis'][0]->locked ?? 0)); ?>">
        <div class="gestion-document-actions">
            <?php print_unescaped($this->inc('navigation/toggle')); ?>
            <button id="devisAdd" type="button" class="btn btn-outline-success" data-html2canvas-ignore><?php p($l->t('Add product')); ?></button>
            <button type="button" class="btn btn-outline-primary createInvoiceFromQuote" data-devis-id="<?php p((string)$_['devis'][0]->devisid); ?>" data-html2canvas-ignore><?php p($l->t('Create invoice')); ?></button>
            <button id="pdf" type="button" class="btn btn-outline-success" data-html2canvas-ignore data-name=""><?php p($l->t('Save PDF')); ?></button>
            <button type="button" data-open-history title="<?php p($l->t('Change history')); ?>" aria-label="<?php p($l->t('Change history')); ?>"><span class="material-symbols-outlined" aria-hidden="true">history</span></button>
        </div>
        <?php if (!empty($_['senderChoices'])): ?>
            <form method="post" class="gestion-sender-choice" data-sender-choice data-company="<?php p($_['CurrentCompany']); ?>" data-quote="<?php p($_['devis'][0]->devisid); ?>" data-html2canvas-ignore>
                <label><?php p($l->t('Sender profile')); ?>
                    <select name="profile" <?php if (!empty($_['devis'][0]->locked)) echo 'disabled'; ?>>
                        <option value=""><?php p($l->t('Company defaults')); ?></option>
                        <?php foreach ($_['senderChoices'] as $id => $name): ?>
                            <option value="<?php p($id); ?>" <?php if ($_['senderProfileId'] === $id) echo 'selected'; ?>><?php p($name); ?></option>
                        <?php endforeach; ?>
                    </select>
                </label>
                <?php if (empty($_['devis'][0]->locked)): ?><button type="submit"><?php p($l->t('Apply')); ?></button><?php endif; ?>
                <p role="status" data-profile-status></p>
            </form>
        <?php endif; ?>
    </div>
    <div id="PDFcontent" class="gestion-document-custom">
        <?php print_unescaped($this->inc('content/document_layout', ['documentKind' => 'quote'])); ?>
    </div>
</div>
