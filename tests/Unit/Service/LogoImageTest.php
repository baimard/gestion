<?php

declare(strict_types=1);

namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Service\LogoImage;
use PHPUnit\Framework\TestCase;

class LogoImageTest extends TestCase {
    public function testLargeTransparentPngKeepsItsProportionsAndAlpha(): void {
        $source = imagecreatetruecolor(1800, 900);
        imagealphablending($source, false);
        imagesavealpha($source, true);
        imagefill($source, 0, 0, imagecolorallocatealpha($source, 90, 110, 130, 85));
        $png = LogoImage::prepareUpload(base64_encode($this->encode($source, 'png')));

        $this->assertSame([1200, 600], array_slice(getimagesizefromstring($png), 0, 2));
        $this->assertLessThanOrEqual(LogoImage::MAX_OUTPUT_BYTES, strlen($png));
        $result = imagecreatefromstring($png);
        $this->assertSame(85, imagecolorsforindex($result, imagecolorat($result, 0, 0))['alpha']);
    }

    public function testHeavyJpegIsReducedToPortablePng(): void {
        $source = imagecreatetruecolor(700, 350);
        for ($y = 0; $y < 350; $y++) {
            for ($x = 0; $x < 700; $x++) {
                imagesetpixel($source, $x, $y, crc32($x . ':' . $y) & 0xffffff);
            }
        }
        $jpeg = $this->encode($source, 'jpeg');
        $this->assertGreaterThan(LogoImage::MAX_OUTPUT_BYTES, strlen($jpeg));
        $png = LogoImage::prepare($jpeg);
        [$width, $height, $type] = getimagesizefromstring($png);
        $this->assertSame(IMAGETYPE_PNG, $type);
        $this->assertLessThan(700, $width);
        $this->assertEqualsWithDelta(2, $width / $height, 0.02);
        $this->assertLessThanOrEqual(LogoImage::MAX_OUTPUT_BYTES, strlen($png));
    }

    public function testSmallLogoIsRejectedOnUploadButStillReadableFromExistingFiles(): void {
        $small = $this->encode(imagecreatetruecolor(40, 20), 'png');
        $this->assertSame($small, LogoImage::prepare($small, false));
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('too small');
        LogoImage::prepare($small);
    }

    private function encode(\GdImage $image, string $format): string {
        ob_start();
        if ($format === 'jpeg') {
            imagejpeg($image, null, 100);
        } else {
            imagepng($image);
        }
        return ob_get_clean();
    }
}
