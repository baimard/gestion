<?php

declare(strict_types=1);

namespace OCA\Gestion\Service;

final class SenderProfile {
    public const MAX_COUNT = 12;

    public static function validate(array $input): array {
        $profile = [];
        foreach (['label' => 80, 'contact' => 160, 'address' => 500, 'email' => 254, 'phone' => 80] as $field => $limit) {
            $value = $input[$field] ?? '';
            if (!is_string($value) || !mb_check_encoding($value, 'UTF-8') || mb_strlen($value) > $limit) {
                throw new \InvalidArgumentException('Invalid sender profile fields.');
            }
            $profile[$field] = trim($value);
        }
        if ($profile['label'] === '' || ($profile['email'] !== '' && !filter_var($profile['email'], FILTER_VALIDATE_EMAIL))) {
            throw new \InvalidArgumentException('Enter a profile name and a valid email address if provided.');
        }

        $logo = $input['logo'] ?? '';
        if (!is_string($logo) || strlen($logo) > 4 * (int)ceil(LogoImage::MAX_OUTPUT_BYTES / 3)) {
            throw new \InvalidArgumentException('Invalid stored sender profile logo.');
        }
        if ($logo !== '') {
            $bytes = base64_decode($logo, true);
            $size = $bytes === false ? false : @getimagesizefromstring($bytes);
            if (!$size || strlen($bytes) > LogoImage::MAX_OUTPUT_BYTES || $size[2] !== IMAGETYPE_PNG
                || $size[0] < 1 || $size[1] < 1 || $size[0] > 1200 || $size[1] > 1200) {
                throw new \InvalidArgumentException('Invalid stored sender profile logo.');
            }
            $logo = base64_encode($bytes);
        }
        $profile['logo'] = $logo;
        $hideCompanyLogos = $input['hide_company_logos'] ?? false;
        if (!is_bool($hideCompanyLogos)) {
            throw new \InvalidArgumentException('Invalid sender profile logo preference.');
        }
        $profile['hide_company_logos'] = $hideCompanyLogos;
        return $profile;
    }

    public static function decode(?string $stored): array {
        if ($stored === null || $stored === '') {
            return [];
        }
        try {
            $profiles = json_decode($stored, true, 8, JSON_THROW_ON_ERROR);
        } catch (\JsonException $e) {
            throw new \InvalidArgumentException('Invalid sender profiles.', 0, $e);
        }
        if (!is_array($profiles) || count($profiles) > self::MAX_COUNT) {
            throw new \InvalidArgumentException('Invalid sender profiles.');
        }
        foreach ($profiles as $id => &$profile) {
            if (!preg_match('/^[a-f0-9]{32}$/D', (string)$id) || !is_array($profile)) {
                throw new \InvalidArgumentException('Invalid sender profiles.');
            }
            $profile = self::validate($profile);
        }
        return $profiles;
    }
}
