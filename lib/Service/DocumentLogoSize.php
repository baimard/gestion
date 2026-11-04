<?php
declare(strict_types=1);

namespace OCA\Gestion\Service;

/** Pixel dimensions shared by the browser and mPDF, without stretching images. */
final class DocumentLogoSize {
    public static function fit(string $base64, int $width, int $maximumHeight = 0): array {
        $width = max(40, min(600, $width));
        $maximumHeight = max(0, min(600, $maximumHeight));
        $bytes = base64_decode($base64, true);
        $size = $bytes === false ? false : @getimagesizefromstring($bytes);
        if (!$size || $size[0] < 1 || $size[1] < 1) {
            return [$width, $maximumHeight > 0 ? min($width, $maximumHeight) : $width];
        }
        $scale = $width / $size[0];
        if ($maximumHeight > 0) $scale = min($scale, $maximumHeight / $size[1]);
        return [max(1, (int)round($size[0] * $scale)), max(1, (int)round($size[1] * $scale))];
    }
}
