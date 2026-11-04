<?php
    $bannerCompany = json_decode($_['configuration'])[0];
    $bannerPosition = in_array($_['logoPosition'] ?? '', ['main', 'header', 'footer'], true) ? $_['logoPosition'] : 'header';
    $bannerLogoKey = $bannerPosition === 'main' ? 'logo' : 'logo_' . $bannerPosition;
    $bannerWidthKey = $bannerPosition === 'main' ? 'logo_width' : 'logo_' . $bannerPosition . '_width';
    $bannerLogo = $_[$bannerLogoKey] ?? 'nothing';
    $bannerWidth = max(40, min(600, (int)($bannerCompany->{$bannerWidthKey} ?? ($bannerPosition === 'main' ? 160 : 320))));
    $bannerHeightKey = $bannerPosition === 'main' ? 'logo_height' : 'logo_' . $bannerPosition . '_height';
    [$bannerWidth, $bannerHeight] = \OCA\Gestion\Service\DocumentLogoSize::fit(
        $bannerLogo, $bannerWidth, (int)($bannerCompany->{$bannerHeightKey} ?? 0)
    );
?>
<?php if ($bannerLogo !== 'nothing' && $bannerLogo !== ''): ?>
    <div class="titre-centre<?php if ($bannerPosition === 'main') { echo ' gestion-document-branding'; } ?>">
        <img class="img-fluid gestion-document-logo gestion-document-logo-<?php p($bannerPosition); ?>" width="<?php echo $bannerWidth; ?>" height="<?php echo $bannerHeight; ?>" style="width: <?php echo $bannerWidth; ?>px; height: auto;" alt="<?php p($bannerPosition === 'footer' ? $l->t('footer image') : $l->t('Company logo')); ?>" src="data:image/png;base64,<?php p($bannerLogo); ?>">
    </div>
<?php endif; ?>
