<?php
namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Service\PdfHtmlPolicy;
use PHPUnit\Framework\TestCase;

class PdfHtmlPolicyTest extends TestCase {
    /** @dataProvider unsafeDocuments */
    public function testRejectsResourceLoadingMarkup(string $html): void {
        $this->expectException(\InvalidArgumentException::class);
        PdfHtmlPolicy::sanitize($html);
    }
    public function unsafeDocuments(): array {
        return array_map(fn($html) => [$html], [
            '<img src="file:///etc/passwd">', '<img src="https://example.test/logo.png">',
            '<img src="http://127.0.0.1/private">', '<img src="data:image/svg+xml;base64,PHN2Zy8+">',
            '<img src="data:image/png;base64,bm90IGFuIGltYWdl">',
            '<div style="background-image: url(file:///etc/passwd)">test</div>',
            '<div style="background: u&#114;l(http://127.0.0.1/)">test</div>',
            '<div style="background: u\\72l(https://example.test/)">test</div>',
            '<style>@import "https://example.test/";</style>',
            '<link rel="stylesheet" href="file:///etc/passwd">',
            '<svg><image href="https://example.test/"></image></svg>',
            '<annotation file="/etc/passwd" />', '<iframe src="file:///etc/passwd"></iframe>',
        ]);
    }
    public function testRetainsDocumentTextAndRasterLogoWithoutExecutableAttributes(): void {
        $png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aD1sAAAAASUVORK5CYII=';
        $safe = PdfHtmlPolicy::sanitize('<div onclick="alert(1)" style="color:#333"><table><tr><td>Devis été &amp; société</td></tr></table><img src="data:image/png;base64,'.$png.'"><!--mpdf <img src="file:///etc/passwd"> mpdf--><a href="javascript:alert(1)">link</a></div>');
        $this->assertStringContainsString('Devis', $safe);
        $this->assertStringContainsString('data:image/png;base64,'.$png, $safe);
        $this->assertStringNotContainsString('onclick', $safe);
        $this->assertStringNotContainsString('file:', $safe);
        $this->assertStringNotContainsString('javascript:', $safe);
    }
}
