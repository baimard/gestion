<?php if ($_['documentKind'] === 'quote'): ?>
    <div id="deviscomment" class="comment editableComment" data-table="devis" data-column="comment" data-id="<?php p((string)$_['devis'][0]->devisid); ?>"><?php print_unescaped($_['devis'][0]->comment === '' ? '-' : nl2br(htmlspecialchars($_['devis'][0]->comment, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'))); ?></div>
<?php else: ?>
    <div class="comment"><?php print_unescaped($_['facture'][0]->comment === '' ? '-' : nl2br(htmlspecialchars($_['facture'][0]->comment, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'))); ?></div>
<?php endif; ?>
