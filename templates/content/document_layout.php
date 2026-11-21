<?php
    $documentTemplate = $_['documentTemplate'] ?? ['layout' => [], 'scopedCss' => ''];
    $documentKind = $_['documentKind'] ?? 'quote';
?>
<?php if ($documentTemplate['scopedCss'] !== ''): ?>
    <style class="gestion-document-custom-css"><?php print_unescaped($documentTemplate['scopedCss']); ?></style>
<?php endif; ?>
<div class="document">
    <?php foreach ($documentTemplate['layout'] as $templateBlock): ?>
        <?php if (empty($templateBlock['visible'])) continue; ?>
        <div class="gestion-document-block block-<?php p($templateBlock['id']); ?>" data-document-block="<?php p($templateBlock['id']); ?>">
            <?php switch ($templateBlock['id']) {
                case 'header_logo': print_unescaped($this->inc('content/document_blocks/header_logo')); break;
                case 'parties': print_unescaped($this->inc('content/document_blocks/parties')); break;
                case 'details': print_unescaped($this->inc('content/document_blocks/details', ['documentKind' => $documentKind])); break;
                case 'comment': print_unescaped($this->inc('content/document_blocks/comment', ['documentKind' => $documentKind])); break;
                case 'products': print_unescaped($this->inc('content/document_blocks/products', ['documentKind' => $documentKind])); break;
                case 'vat_totals': print_unescaped($this->inc('content/document_blocks/vat_totals')); break;
                case 'grand_totals': print_unescaped($this->inc('content/document_blocks/grand_totals')); break;
                case 'legal_notice': print_unescaped($this->inc('content/document_blocks/legal_notice')); break;
                case 'footer_logo': print_unescaped($this->inc('content/document_blocks/footer_logo')); break;
                case 'issuer_details': print_unescaped($this->inc('content/document_blocks/issuer_details', ['documentKind' => $documentKind])); break;
                case 'signature': print_unescaped($this->inc('content/document_blocks/signature')); break;
            } ?>
        </div>
    <?php endforeach; ?>
</div>
