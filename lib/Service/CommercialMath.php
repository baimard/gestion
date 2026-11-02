<?php

declare(strict_types=1);
namespace OCA\Gestion\Service;

/** Shared monetary rules: percent discount per line, totals rounded to currency cents. */
final class CommercialMath {
    public static function discount($value): float {
        if (!is_numeric($value) || !is_finite((float)$value) || (float)$value < 0 || (float)$value > 100) {
            throw new \InvalidArgumentException('Discount must be between 0 and 100.');
        }
        return (float)$value;
    }
    public static function netPrice(object $line): float {
        return (float)$line->prix_unitaire * (1 - self::discount($line->discount ?? 0) / 100);
    }
    public static function lineTotal(object $line): float {
        return round(self::netPrice($line) * (float)$line->quantite, 2);
    }
}
