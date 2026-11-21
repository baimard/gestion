<?php

declare(strict_types=1);

namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Service\DocumentTemplatePolicy;
use PHPUnit\Framework\TestCase;

final class DocumentTemplatePolicyTest extends TestCase {
    public function testNormalizesKnownBlocksAndKeepsRequiredBlocksVisible(): void {
        $layout = DocumentTemplatePolicy::normalizeLayout('quote', [
            ['id' => 'products', 'visible' => false],
            ['id' => 'comment', 'visible' => false],
            ['id' => 'parties', 'visible' => true],
        ]);
        $this->assertSame('products', $layout[0]['id']);
        $this->assertTrue($layout[0]['visible']);
        $this->assertFalse($layout[1]['visible']);
        $this->assertContains(['id' => 'details', 'visible' => true], $layout);
        $this->assertContains(['id' => 'header_logo', 'visible' => true], $layout);
        $this->assertContains(['id' => 'main_logo', 'visible' => true], $layout);
    }

    /** @dataProvider invalidLayouts */
    public function testRejectsUnknownAndDuplicateBlocks(array $layout): void {
        $this->expectException(\InvalidArgumentException::class);
        DocumentTemplatePolicy::normalizeLayout('invoice', $layout);
    }

    public function invalidLayouts(): array {
        return [
            'unknown' => [[['id' => '../../config/config.php', 'visible' => true]]],
            'duplicate' => [[['id' => 'products'], ['id' => 'products']]],
        ];
    }

    public function testScopesSafeVisualCss(): void {
        $css = DocumentTemplatePolicy::scopeCss('.block-products th { background-color: #e8f3ff; color: #123; }');
        $this->assertStringContainsString('#PDFcontent.gestion-document-custom .block-products th', $css);
        $this->assertStringContainsString('background-color: #e8f3ff', $css);
        $this->assertSame($css, DocumentTemplatePolicy::validateScopedCss($css));
    }

    /** @dataProvider unsafeCss */
    public function testRejectsCodeAndExternalResourceCss(string $css): void {
        $this->expectException(\InvalidArgumentException::class);
        DocumentTemplatePolicy::sanitizeCss($css);
    }

    public function unsafeCss(): array {
        return array_map(static fn (string $css): array => [$css], [
            '@import "https://example.test/a.css";',
            '.block-products { background: url(https://example.test/a.png); }',
            '.block-products { behavior: url(x.htc); }',
            '.block-products { position: fixed; }',
            '.block-products::before { content: attr(data-secret); }',
            'body { color: red; }',
            '.block-products { color: red; } </style><script>alert(1)</script>',
        ]);
    }
}
