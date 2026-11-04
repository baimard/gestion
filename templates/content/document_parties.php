<?php
    $company = json_decode($_['configuration'])[0];
    $decodePartyValue = static fn ($value): string => trim(html_entity_decode((string)$value, ENT_QUOTES, 'UTF-8'));
    $companyContact = $decodePartyValue(($company->prenom ?? '') . ' ' . ($company->nom ?? ''));
    $companySections = [
        [$company->adresse ?? '', trim(($company->zip_code ?? '') . ' ' . ($company->city_name ?? ''))],
        [$company->mail ?? '', $company->telephone ?? ''],
        [$company->legal_one ?? '', $company->legal_two ?? '', $company->vat_number ?? ''],
    ];
    $hasMainLogo = isset($_['logo']) && $_['logo'] !== 'nothing';
    // Honour the configured width; large logos get their own branding area.
    [$mainLogoWidth, $mainLogoHeight] = \OCA\Gestion\Service\DocumentLogoSize::fit(
        $_['logo'] ?? '', (int)($company->logo_width ?? 160), (int)($company->logo_height ?? 0)
    );
    $standaloneMainLogo = $mainLogoWidth > 160 || $mainLogoHeight > 160;
?>
<?php if ($hasMainLogo && $standaloneMainLogo): ?>
    <?php print_unescaped($this->inc('content/document_banner', ['logoPosition' => 'main'])); ?>
<?php endif; ?>
<table id="headertable" class="document-parties">
    <colgroup><col width="50%"><col width="50%"></colgroup>
    <thead>
        <tr>
            <th id="document-issuer" scope="col"><?php p($l->t('Issuer')); ?></th>
            <th id="document-recipient" scope="col"><?php p($l->t('Recipient')); ?></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td width="50%" class="document-party" aria-labelledby="document-issuer" data-party-label="<?php p($l->t('Issuer')); ?>">
                <table class="document-party-identity" role="presentation">
                    <tr>
                        <td>
                            <div class="document-party-name"><?php p($decodePartyValue($company->entreprise ?? '')); ?></div>
                            <?php if ($companyContact !== ''): ?><div class="document-party-line"><?php p($companyContact); ?></div><?php endif; ?>
                            <?php foreach ($companySections as $section): ?>
                                <?php $lines = array_filter(array_map($decodePartyValue, $section), static fn (string $line): bool => $line !== ''); ?>
                                <?php if ($lines !== []): ?>
                                    <div class="document-party-section">
                                        <?php foreach ($lines as $line): ?>
                                            <div class="document-party-line"><?php print_unescaped(nl2br(htmlspecialchars($line, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'))); ?></div>
                                        <?php endforeach; ?>
                                    </div>
                                <?php endif; ?>
                            <?php endforeach; ?>
                        </td>
                        <?php if ($hasMainLogo && !$standaloneMainLogo): ?>
                            <td class="document-party-logo" width="<?php echo $mainLogoWidth; ?>" style="width: <?php echo $mainLogoWidth; ?>px;">
                                <img class="gestion-document-logo" width="<?php echo $mainLogoWidth; ?>" height="<?php echo $mainLogoHeight; ?>" style="width: <?php echo $mainLogoWidth; ?>px; height: <?php echo $mainLogoHeight; ?>px;" alt="<?php p($l->t('Company logo')); ?>" src="data:image/png;base64,<?php p($_['logo']); ?>">
                            </td>
                        <?php endif; ?>
                    </tr>
                </table>
            </td>
            <td width="50%" class="document-party" aria-labelledby="document-recipient" data-party-label="<?php p($l->t('Recipient')); ?>">
                <div id="entreprise" class="document-party-name"></div>
                <div id="nomprenom" class="document-party-line" data-id="0" data-table="devis" data-column="id_client"></div>
                <div class="document-party-section">
                    <div id="adresse" class="document-party-line"></div>
                    <div id="client_city" class="document-party-line"></div>
                    <div id="country_code" class="document-party-line"></div>
                </div>
                <div class="document-party-section">
                    <div id="mail" class="document-party-line"></div>
                    <div id="telephone" class="document-party-line"></div>
                </div>
                <div class="document-party-section">
                    <div id="legal_one" class="document-party-line"></div>
                    <div id="company_identification" class="document-party-line"></div>
                    <div id="vat_number" class="document-party-line"></div>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<?php if (!$hasMainLogo): ?>
    <details class="document-logo-help" data-html2canvas-ignore>
        <summary><?php p($l->t('You can add your company logo here.')); ?></summary>
        <p><?php p($l->t('To add the main logo, use the numeric company ID shown in the company selector as the filename prefix (for example, company 1 uses 1logo.png). Place the file in the ".gestion" folder at the root of Nextcloud Files and enable "Show hidden files" to display this folder.')); ?></p>
    </details>
<?php endif; ?>
