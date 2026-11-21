<?php if ($_['documentKind'] === 'quote'): ?>
    <div class="titre-centre">
        <b><span id="devisid" class="inline editable" data-table="devis" data-column="num" data-id="<?php p((string)$_['devis'][0]->devisid); ?>"><?php p(html_entity_decode((string)$_['devis'][0]->num, ENT_QUOTES, 'UTF-8')); ?></span></b>
        <span data-html2canvas-ignore class="inline"><?php p($l->t('Version')); ?></span>
        <span data-html2canvas-ignore id="devisversion" class="inline editable" data-table="devis" data-column="version" data-id="<?php p((string)$_['devis'][0]->devisid); ?>"><?php p(html_entity_decode((string)$_['devis'][0]->version, ENT_QUOTES, 'UTF-8')); ?></span>
        <span id="delay" class="inline editable" data-table="devis" data-column="delay" data-id="<?php p((string)$_['devis'][0]->devisid); ?>"><?php p(html_entity_decode($_['devis'][0]->delay ?: $l->t('Offer valid for 1 month from: '), ENT_QUOTES, 'UTF-8')); ?></span>
        <span class="inline"><?php p((new DateTime($_['devis'][0]->date))->format('d-m-Y')); ?></span>
    </div>
<?php else: ?>
    <?php
        $paymentMeans = [
            '10' => $l->t('Cash'), '20' => $l->t('Cheque'),
            '30' => $l->t('Credit transfer'), '48' => $l->t('Payment card'),
            '58' => $l->t('SEPA credit transfer'),
        ];
        $paymentCode = (string)$_['facture'][0]->type_paiement;
        if (empty($_['facture'][0]->locked)) $paymentCode = \OCA\Gestion\Service\InvoicePaymentMeans::normalizeTransfer($paymentCode);
        $paymentMeansLabel = $paymentMeans[$paymentCode] ?? $paymentCode;
    ?>
    <div class="titre-centre">
        <b><span id="factureid" class="inline"><?php p(html_entity_decode((string)$_['facture'][0]->num, ENT_QUOTES, 'UTF-8')); ?></span> <span data-html2canvas-ignore class="inline"><?php p($l->t('Version')); ?></span> <span data-html2canvas-ignore id="factureversion" class="inline"><?php p(html_entity_decode((string)$_['facture'][0]->version, ENT_QUOTES, 'UTF-8')); ?></span></b><br>
        <span><?php p($l->t('Settlement date')); ?> : <b><?php p((new DateTime($_['facture'][0]->date_paiement))->format('d-m-Y')); ?></b>, </span><span><?php p($l->t('Date of service')); ?> : <b><?php p(html_entity_decode((string)$_['facture'][0]->date, ENT_QUOTES, 'UTF-8')); ?></b></span><br>
        <span id="devisid" data-id="<?php p((string)$_['facture'][0]->id_devis); ?>"><?php p($l->t('Associated quote')); ?> : <b><?php p(html_entity_decode((string)$_['facture'][0]->dnum, ENT_QUOTES, 'UTF-8')); ?></b>, </span><span><?php p($l->t('Means of payment')); ?> : <b><?php p(html_entity_decode((string)$paymentMeansLabel, ENT_QUOTES, 'UTF-8')); ?></b></span><br>
    </div>
<?php endif; ?>
