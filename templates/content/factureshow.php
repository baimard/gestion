<?php
    $configuration = json_decode($_['configuration'])[0];
    $iopoleConfigured = (bool)($configuration->einvoice_configured ?? false);
?>
<div class="gestion-document-view">
    <div class="gestion-document-toolbar" data-html2canvas-ignore data-document-lock data-table="facture" data-id="<?php p($_['facture'][0]->id); ?>" data-locked="<?php p((int)($_['facture'][0]->locked ?? 0)); ?>">
        <div class="gestion-document-actions">
            <?php print_unescaped($this->inc('navigation/toggle')); ?>
            <span class="gestion-status"><?php p($l->t('Draft')); ?></span>
            <button id="pdf" type="button" class="btn btn-outline-success" data-html2canvas-ignore data-name=""><?php p($l->t('Save PDF')); ?></button>
            <button id="facturx" type="button" class="btn btn-outline-primary" data-html2canvas-ignore data-name="" data-factureid="<?php p((string)$_['facture'][0]->id); ?>"><?php p($l->t('Factur-X PDF + XML')); ?></button>
            <button id="facturx-xml" type="button" class="btn btn-outline-info" data-html2canvas-ignore data-name="" data-factureid="<?php p((string)$_['facture'][0]->id); ?>"><?php p($l->t('Factur-X XML')); ?></button>
            <?php if ($iopoleConfigured): ?><button id="facturx-iopole" type="button" class="btn btn-outline-warning" data-html2canvas-ignore data-name="" data-factureid="<?php p((string)$_['facture'][0]->id); ?>"><?php p($l->t('Send to Iopole')); ?></button><?php endif; ?>
            <button type="button" data-open-history title="<?php p($l->t('Change history')); ?>" aria-label="<?php p($l->t('Change history')); ?>"><span class="material-symbols-outlined" aria-hidden="true">history</span></button>
            <button type="button" class="primary" id="lock-document"><?php p($l->t('Finalize and lock')); ?></button>
        </div>
        <?php if (!empty($_['senderProfile'])): ?>
            <p class="gestion-sender-choice"><?php p($l->t('Sender profile')); ?> · <?php p($_['senderProfile']['label']); ?></p>
        <?php endif; ?>
    </div>
    <div id="PDFcontent" class="gestion-document-custom">
        <?php print_unescaped($this->inc('content/document_layout', ['documentKind' => 'invoice'])); ?>
    </div>
</div>
