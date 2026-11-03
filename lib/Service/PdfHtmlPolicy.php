<?php

declare(strict_types=1);
namespace OCA\Gestion\Service;

/** Restrict mPDF input to document markup and embedded raster logos. */
final class PdfHtmlPolicy {
    private const TAGS = ['html','body','head','div','span','p','br','hr','b','strong','i','em','u','small','s','sub','sup','h1','h2','h3','h4','h5','h6','table','thead','tbody','tfoot','tr','th','td','colgroup','col','ul','ol','li','img','a','center','caption','button'];
    private const ATTRIBUTES = ['class','id','style','width','height','align','valign','colspan','rowspan','scope','alt','title','border','cellpadding','cellspacing','src','href'];
    public static function sanitize(string $html): string {
        if (strlen($html) > 20 * 1024 * 1024) throw new \InvalidArgumentException('The PDF content exceeds 20 MB.');
        $dom = new \DOMDocument();
        $dom->loadHTML('<?xml encoding="UTF-8">' . $html, LIBXML_NONET | LIBXML_NOERROR | LIBXML_NOWARNING);
        $walk = function (\DOMNode $node) use (&$walk): void {
            foreach (iterator_to_array($node->childNodes) as $child) {
                if ($child instanceof \DOMComment || $child instanceof \DOMProcessingInstruction || $child instanceof \DOMDocumentType) { $node->removeChild($child); continue; }
                if ($child instanceof \DOMElement) {
                    $tag = strtolower($child->tagName);
                    if (!in_array($tag, self::TAGS, true)) throw new \InvalidArgumentException('Unsupported markup in PDF content.');
                    foreach (iterator_to_array($child->attributes) as $attribute) {
                        $name = strtolower($attribute->name);
                        if (!in_array($name, self::ATTRIBUTES, true)) { $child->removeAttributeNode($attribute); continue; }
                        $value = $attribute->value;
                        if ($name === 'style' && preg_match('/url\s*\(|@|\\\\|\/\*|expression\s*\(/i', $value)) throw new \InvalidArgumentException('External resources are not allowed in PDF styles.');
                        if ($name === 'src') {
                            if ($tag !== 'img' || !preg_match('~^data:image/(png|jpeg);base64,([A-Za-z0-9+/=\s]+)$~D', $value, $m)) throw new \InvalidArgumentException('PDF images must be embedded PNG or JPEG logos.');
                            $bytes = base64_decode($m[2], true);
                            $size = $bytes === false ? false : @getimagesizefromstring($bytes);
                            if ($bytes === false || strlen($bytes) > 5 * 1024 * 1024 || !$size || !in_array($size[2], [IMAGETYPE_PNG, IMAGETYPE_JPEG], true) || $size[0] * $size[1] > 20000000) throw new \InvalidArgumentException('Invalid or oversized PDF image.');
                        }
                        if ($name === 'href' && ($tag !== 'a' || ($value !== '' && $value[0] !== '#' && !preg_match('~^https://~i', $value)))) $child->removeAttributeNode($attribute);
                    }
                }
                $walk($child);
            }
        };
        $walk($dom);
        return $dom->saveHTML();
    }
}
