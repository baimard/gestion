<?php
namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Service\DocumentLogoSize;
use PHPUnit\Framework\TestCase;

class DocumentLogoSizeTest extends TestCase {
    private function png(int $width, int $height): string {
        $image = imagecreatetruecolor($width, $height);
        ob_start();
        imagepng($image);
        return base64_encode(ob_get_clean());
    }

    public function testWidthsAboveTheOldLimitAreHonoured(): void {
        $image = $this->png(200, 200);
        $this->assertSame([160, 160], DocumentLogoSize::fit($image, 160));
        $this->assertSame([320, 320], DocumentLogoSize::fit($image, 320));
        $this->assertSame([600, 600], DocumentLogoSize::fit($image, 600));
    }

    public function testBothBoundsPreservePortraitAndLandscapeProportions(): void {
        $this->assertSame([30, 120], DocumentLogoSize::fit($this->png(120, 480), 200, 120));
        $this->assertSame([200, 50], DocumentLogoSize::fit($this->png(480, 120), 200, 120));
        $this->assertSame([80, 80], DocumentLogoSize::fit($this->png(200, 200), 320, 80));
        $this->assertSame([200, 800], DocumentLogoSize::fit($this->png(120, 480), 200, 0));
    }
}
