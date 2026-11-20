<?php

declare(strict_types=1);

namespace OCA\Gestion\Service;

final class LogoImage {
    public const MAX_INPUT_BYTES = 5 * 1024 * 1024;
    public const MAX_OUTPUT_BYTES = 256 * 1024;
    private const MAX_PIXELS = 20000000;
    private const MAX_EDGE = 1200;
    private const MIN_LONG_EDGE = 64;
    private const MIN_SHORT_EDGE = 16;

    public static function prepareUpload(string $encoded): string {
        if (strlen($encoded) > 4 * (int)ceil(self::MAX_INPUT_BYTES / 3)) {
            throw new \InvalidArgumentException('Logo exceeds the 5 MiB upload limit.');
        }
        $bytes = base64_decode($encoded, true);
        if ($bytes === false) {
            throw new \InvalidArgumentException('Invalid logo encoding.');
        }
        return self::prepare($bytes);
    }

    public static function prepare(string $bytes, bool $requireMinimum = true): string {
        $size = strlen($bytes) <= self::MAX_INPUT_BYTES ? @getimagesizefromstring($bytes) : false;
        if (!$size || !in_array($size[2], [IMAGETYPE_PNG, IMAGETYPE_JPEG], true)
            || $size[0] < 1 || $size[1] < 1 || $size[0] * $size[1] > self::MAX_PIXELS) {
            throw new \InvalidArgumentException('Invalid or oversized PNG or JPEG logo.');
        }

        [$width, $height] = $size;
        $long = max($width, $height);
        $short = min($width, $height);
        if ($requireMinimum && ($long < self::MIN_LONG_EDGE || $short < self::MIN_SHORT_EDGE)) {
            throw new \InvalidArgumentException('The logo is too small.');
        }
        if (!$requireMinimum && $size[2] === IMAGETYPE_PNG && $long <= self::MAX_EDGE && strlen($bytes) <= self::MAX_OUTPUT_BYTES) {
            return $bytes;
        }

        $image = @imagecreatefromstring($bytes);
        if (!$image) {
            throw new \InvalidArgumentException('The logo image could not be decoded.');
        }

        $scale = min(1, self::MAX_EDGE / $long);
        $minimumScale = $requireMinimum ? max(self::MIN_LONG_EDGE / $long, self::MIN_SHORT_EDGE / $short) : 0;
        if ($scale < $minimumScale) {
            throw new \InvalidArgumentException('The logo is too narrow to fit without going below the minimum size.');
        }
        do {
            $targetWidth = max(1, (int)round($width * $scale));
            $targetHeight = max(1, (int)round($height * $scale));
            $canvas = imagecreatetruecolor($targetWidth, $targetHeight);
            imagealphablending($canvas, false);
            imagesavealpha($canvas, true);
            imagecopyresampled($canvas, $image, 0, 0, 0, 0, $targetWidth, $targetHeight, $width, $height);
            ob_start();
            try {
                $success = imagepng($canvas, null, 6);
                $png = ob_get_contents();
            } finally {
                ob_end_clean();
            }
            if ($success && is_string($png) && strlen($png) <= self::MAX_OUTPUT_BYTES) {
                return $png;
            }
            if ($scale <= $minimumScale || ($targetWidth === 1 && $targetHeight === 1)) {
                break;
            }
            $scale = max($minimumScale, $scale * 0.8);
        } while (true);

        throw new \InvalidArgumentException('The logo could not be reduced without going below the minimum size.');
    }
}
