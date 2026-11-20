<?php
    $bannerCompany = json_decode($_['configuration'])[0];
    $bannerPosition = ($_['logoPosition'] ?? '') === 'footer' ? 'footer' : 'header';
    $bannerLogoKey = 'logo_' . $bannerPosition;
    $bannerWidthKey = $bannerLogoKey . '_width';
    $bannerLogo = $_[$bannerLogoKey] ?? 'nothing';
    $bannerWidth = (int)($bannerCompany->{$bannerWidthKey} ?? 320);
    $bannerHeightKey = $bannerLogoKey . '_height';
    [$bannerWidth, $bannerHeight] = \OCA\Gestion\Service\DocumentLogoSize::fit(
        $bannerLogo, $bannerWidth, (int)($bannerCompany->{$bannerHeightKey} ?? 0)
    );
?>
<?php if ($bannerLogo !== 'nothing' && $bannerLogo !== ''): ?>
    <div class="titre-centre">
        <img class="img-fluid gestion-document-logo gestion-document-logo-<?php p($bannerPosition); ?>" width="<?php echo $bannerWidth; ?>" height="<?php echo $bannerHeight; ?>" style="width: <?php echo $bannerWidth; ?>px; height: auto;" alt="<?php p($bannerPosition === 'footer' ? $l->t('footer image') : $l->t('Company logo')); ?>" src="data:image/png;base64,<?php p($bannerLogo); ?>">
    </div>
<?php endif; ?>
