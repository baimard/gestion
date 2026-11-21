<?php

declare(strict_types=1);

namespace OCA\Gestion\Service;

/**
 * Validates the document layout and the deliberately small CSS dialect exposed
 * to company owners. User supplied HTML, URLs and executable CSS are never
 * accepted.
 */
final class DocumentTemplatePolicy {
    public const MAX_LAYOUT_BYTES = 8192;
    public const MAX_CSS_BYTES = 32768;
    public const SCOPE = '#PDFcontent.gestion-document-custom';

    private const DEFAULTS = [
        'quote' => [
            'header_logo', 'parties', 'main_logo', 'details', 'comment', 'products',
            'vat_totals', 'grand_totals', 'legal_notice', 'footer_logo',
            'issuer_details', 'signature',
        ],
        'invoice' => [
            'header_logo', 'parties', 'main_logo', 'details', 'comment', 'products',
            'vat_totals', 'grand_totals', 'legal_notice', 'footer_logo',
            'issuer_details',
        ],
    ];

    private const REQUIRED = ['parties', 'details', 'products', 'grand_totals'];

    private const SELECTORS = [
        '.document', '.block-header-logo', '.block-parties', '.block-details',
        '.block-comment', '.block-products', '.block-vat-totals',
        '.block-grand-totals', '.block-legal-notice', '.block-footer-logo',
        '.block-issuer-details', '.block-signature',
    ];

    private const DESCENDANTS = ['table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'p', 'span', 'div', 'img'];

    private const PROPERTIES = [
        'background', 'background-color', 'border', 'border-color',
        'border-radius', 'border-style', 'border-width', 'color', 'display',
        'font-family', 'font-size', 'font-style', 'font-weight', 'height',
        'letter-spacing', 'line-height', 'margin', 'margin-block',
        'margin-block-end', 'margin-block-start', 'margin-bottom', 'margin-left',
        'margin-right', 'margin-top', 'max-height', 'max-width', 'min-height',
        'min-width', 'padding', 'padding-block', 'padding-block-end',
        'padding-block-start', 'padding-bottom', 'padding-left', 'padding-right',
        'padding-top', 'page-break-after', 'page-break-before',
        'page-break-inside', 'text-align', 'text-decoration', 'text-transform',
        'vertical-align', 'white-space', 'width',
    ];

    public static function defaultLayout(string $type): array {
        self::assertType($type);
        return array_map(
            static fn (string $id): array => ['id' => $id, 'visible' => self::defaultVisibility($type, $id)],
            self::DEFAULTS[$type]
        );
    }

    public static function normalizeLayout(string $type, mixed $layout): array {
        self::assertType($type);
        if (is_string($layout)) {
            if (strlen($layout) > self::MAX_LAYOUT_BYTES) {
                throw new \InvalidArgumentException('The document layout is too large.');
            }
            try {
                $layout = json_decode($layout, true, 16, JSON_THROW_ON_ERROR);
            } catch (\JsonException) {
                throw new \InvalidArgumentException('Invalid document layout.');
            }
        }
        if (!is_array($layout)) {
            throw new \InvalidArgumentException('Invalid document layout.');
        }
        if (count($layout) > count(self::DEFAULTS[$type])) {
            throw new \InvalidArgumentException('The document layout contains too many blocks.');
        }

        $normalized = [];
        $seen = [];
        foreach ($layout as $entry) {
            $id = is_string($entry) ? $entry : (is_array($entry) ? ($entry['id'] ?? null) : null);
            if (!is_string($id) || !in_array($id, self::DEFAULTS[$type], true) || isset($seen[$id])) {
                throw new \InvalidArgumentException('The document layout contains an unknown or duplicate block.');
            }
            $seen[$id] = true;
            $normalized[] = [
                'id' => $id,
                'visible' => in_array($id, self::REQUIRED, true) || (bool)(is_array($entry) ? ($entry['visible'] ?? true) : true),
            ];
        }

        foreach (self::DEFAULTS[$type] as $id) {
            if (!isset($seen[$id])) {
                $normalized[] = ['id' => $id, 'visible' => self::defaultVisibility($type, $id)];
            }
        }
        return $normalized;
    }

    public static function sanitizeCss(string $css): string {
        return self::parseCss($css, false);
    }

    public static function scopeCss(string $css): string {
        $css = self::sanitizeCss($css);
        return $css === '' ? '' : self::parseCss($css, false, true);
    }

    public static function validateScopedCss(string $css): string {
        return self::parseCss($css, true);
    }

    private static function parseCss(string $css, bool $scoped, bool $addScope = false): string {
        if (strlen($css) > self::MAX_CSS_BYTES) {
            throw new \InvalidArgumentException('The custom CSS exceeds 32 KiB.');
        }
        $css = trim(str_replace(["\r\n", "\r"], "\n", $css));
        if ($css === '') return '';
        if (!mb_check_encoding($css, 'UTF-8') || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $css)) {
            throw new \InvalidArgumentException('The custom CSS contains invalid characters.');
        }
        if (preg_match('~(?:/\*|\*/|@|\\\\|<|>|url\s*\(|expression\s*\(|javascript|data\s*:|behavior\s*:|-moz-binding|var\s*\(|attr\s*\()~i', $css)) {
            throw new \InvalidArgumentException('External resources and executable CSS are not allowed.');
        }

        $rules = [];
        foreach (explode('}', $css) as $rawRule) {
            if (trim($rawRule) === '') continue;
            if (substr_count($rawRule, '{') !== 1) {
                throw new \InvalidArgumentException('Invalid custom CSS rule.');
            }
            [$selectorText, $declarationText] = array_map('trim', explode('{', $rawRule, 2));
            $selectors = [];
            foreach (explode(',', $selectorText) as $selector) {
                $selector = trim($selector);
                if ($scoped) {
                    if (!str_starts_with($selector, self::SCOPE . ' ')) {
                        throw new \InvalidArgumentException('Custom CSS is not scoped to the document.');
                    }
                    $selector = substr($selector, strlen(self::SCOPE) + 1);
                }
                self::assertSelector($selector);
                $selectors[] = ($scoped || $addScope ? self::SCOPE . ' ' : '') . $selector;
            }

            $declarations = [];
            foreach (explode(';', $declarationText) as $declaration) {
                $declaration = trim($declaration);
                if ($declaration === '') continue;
                if (!str_contains($declaration, ':')) {
                    throw new \InvalidArgumentException('Invalid custom CSS declaration.');
                }
                [$property, $value] = array_map('trim', explode(':', $declaration, 2));
                $property = strtolower($property);
                if (!in_array($property, self::PROPERTIES, true)) {
                    throw new \InvalidArgumentException('This CSS property is not allowed: ' . $property);
                }
                if ($value === '' || strlen($value) > 256 || !preg_match('/^[A-Za-z0-9#.,()%\s\-]+$/D', $value) || str_contains(strtolower($value), '!important')) {
                    throw new \InvalidArgumentException('Invalid value for CSS property: ' . $property);
                }
                $declarations[] = $property . ': ' . preg_replace('/\s+/', ' ', $value);
            }
            if ($declarations === []) {
                throw new \InvalidArgumentException('A custom CSS rule cannot be empty.');
            }
            $rules[] = implode(', ', $selectors) . " {\n  " . implode(";\n  ", $declarations) . ";\n}";
        }
        return implode("\n\n", $rules);
    }

    private static function assertSelector(string $selector): void {
        foreach (self::SELECTORS as $allowed) {
            if ($selector === $allowed) return;
            foreach (self::DESCENDANTS as $descendant) {
                if ($selector === $allowed . ' ' . $descendant) return;
            }
        }
        throw new \InvalidArgumentException('This CSS selector is not allowed: ' . $selector);
    }

    private static function assertType(string $type): void {
        if (!isset(self::DEFAULTS[$type])) {
            throw new \InvalidArgumentException('Invalid document template type.');
        }
    }

    private static function defaultVisibility(string $type, string $id): bool {
        return !($type === 'invoice' && $id === 'footer_logo');
    }
}
