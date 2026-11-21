<?php
    $company = json_decode($_['configuration'])[0];
    $decodePartyValue = static fn ($value): string => trim(html_entity_decode((string)$value, ENT_QUOTES, 'UTF-8'));
    $sender = $_['senderProfile'] ?? [];
    $companyContact = ($sender['contact'] ?? '') !== ''
        ? $sender['contact'] : $decodePartyValue(($company->prenom ?? '') . ' ' . ($company->nom ?? ''));
    $companySections = [
        ($sender['address'] ?? '') !== '' ? [$l->t('Correspondence address'), $sender['address']] : [
            $decodePartyValue($company->adresse ?? ''),
            $decodePartyValue(($company->zip_code ?? '') . ' ' . ($company->city_name ?? '')),
        ],
        [
            ($sender['email'] ?? '') !== '' ? $sender['email'] : $decodePartyValue($company->mail ?? ''),
            ($sender['phone'] ?? '') !== '' ? $sender['phone'] : $decodePartyValue($company->telephone ?? ''),
        ],
        array_map($decodePartyValue, [$company->legal_one ?? '', $company->legal_two ?? '', $company->vat_number ?? '']),
    ];
    $logo = $_['logo'] ?? 'nothing';
    $hasMainLogo = !empty($_['showMainLogo']) && $logo !== 'nothing' && $logo !== '';
    [$mainLogoWidth, $mainLogoHeight] = \OCA\Gestion\Service\DocumentLogoSize::fit(
        $logo, min(300, (int)($company->logo_width ?? 160)), min(240, (int)($company->logo_height ?? 0) ?: 240)
    );
    // A4 with 10 mm margins on each side has about 718 printable pixels at 96 dpi.
    $logoShare = $hasMainLogo ? (int)ceil(($mainLogoWidth + 16) / (190 * 96 / 25.4) * 100) : 0;
    $partyShare = (100 - $logoShare) / 2;
?>
<table id="headertable" class="document-parties<?php if ($hasMainLogo) echo ' document-parties-with-logo'; ?>">
    <thead>
        <tr>
            <th id="document-issuer" class="document-party-heading" scope="col" width="<?php p($partyShare); ?>%"><?php p($l->t('Issuer')); ?></th>
            <?php if ($hasMainLogo): ?>
                <th class="document-party-logo-heading" width="<?php p($logoShare); ?>%" style="--document-logo-column-width: <?php p($mainLogoWidth + 24); ?>px;" aria-hidden="true"></th>
            <?php endif; ?>
            <th id="document-recipient" class="document-party-heading" scope="col" width="<?php p($partyShare); ?>%"><?php p($l->t('Recipient')); ?></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td width="<?php p($partyShare); ?>%" class="document-party" aria-labelledby="document-issuer" data-party-label="<?php p($l->t('Issuer')); ?>">
                <div class="document-party-name"><?php p($decodePartyValue($company->entreprise ?? '')); ?></div>
                <?php if ($companyContact !== ''): ?><div class="document-party-line"><?php p($companyContact); ?></div><?php endif; ?>
                <?php foreach ($companySections as $section): ?>
                    <?php $lines = array_filter($section, static fn (string $line): bool => $line !== ''); ?>
                    <?php if ($lines !== []): ?>
                        <div class="document-party-section">
                            <?php foreach ($lines as $line): ?>
                                <div class="document-party-line"><?php print_unescaped(nl2br(htmlspecialchars($line, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'))); ?></div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                <?php endforeach; ?>
            </td>
            <?php if ($hasMainLogo): ?>
                <td class="document-party-logo" width="<?php p($logoShare); ?>%">
                    <img class="gestion-document-logo gestion-document-logo-main" width="<?php p($mainLogoWidth); ?>" height="<?php p($mainLogoHeight); ?>" style="width: <?php p($mainLogoWidth); ?>px; height: auto;" alt="<?php p($l->t('Company logo')); ?>" src="data:image/png;base64,<?php p($logo); ?>">
                </td>
            <?php endif; ?>
            <td width="<?php p($partyShare); ?>%" class="document-party" aria-labelledby="document-recipient" data-party-label="<?php p($l->t('Recipient')); ?>">
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
        <p><?php p($l->t('To add the main logo, open My company, edit the company details and select Logos.')); ?></p>
    </details>
<?php endif; ?>
