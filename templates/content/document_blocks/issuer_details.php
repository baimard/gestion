<?php $documentCompany = json_decode($_['configuration'])[0]; ?>
<table class="<?php p($_['documentKind'] === 'quote' ? 'table-mentions-signature' : 'table-mentions-signature-facture'); ?>">
    <tr><td class="cell-mentions">
        <p class="mentions-titre"><?php p(html_entity_decode((string)$documentCompany->entreprise, ENT_QUOTES, 'UTF-8')); ?></p>
        <p class="mentions-ligne"><?php p(html_entity_decode((string)$documentCompany->adresse, ENT_QUOTES, 'UTF-8')); ?></p>
        <p class="mentions-ligne"><?php p(html_entity_decode(trim(($documentCompany->zip_code ?? '') . ' ' . ($documentCompany->city_name ?? '')), ENT_QUOTES, 'UTF-8')); ?></p>
        <p class="mentions-ligne"><?php p(html_entity_decode((string)$documentCompany->legal_one, ENT_QUOTES, 'UTF-8')); ?></p>
        <p class="mentions-ligne"><?php p(html_entity_decode((string)$documentCompany->legal_two, ENT_QUOTES, 'UTF-8')); ?></p>
    </td></tr>
</table>
