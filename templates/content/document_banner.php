<?php
    $bannerCompany = json_decode($_['configuration'])[0];
    $bannerPosition = ($_['logoPosition'] ?? 'header') === 'footer' ? 'footer' : 'header';
    $bannerLogo = $_['logo_' . $bannerPosition] ?? 'nothing';
    $bannerWidth = max(40, min(600, (int)($bannerCompany->{'logo_' . $bannerPosition . '_width'} ?? 320)));
?>
<?php if ($bannerLogo !== 'nothing' && $bannerLogo !== ''): ?>
    <div class="titre-centre">
        <img class="img-fluid gestion-document-logo gestion-document-logo-<?php p($bannerPosition); ?>" width="<?php echo $bannerWidth; ?>" style="width: <?php echo $bannerWidth; ?>px; height: auto;" alt="<?php p($l->t($bannerPosition === 'footer' ? 'footer image' : 'Company logo')); ?>" src="data:image/png;base64,<?php p($bannerLogo); ?>">
    </div>
<?php endif; ?>
