<?php

declare(strict_types=1);

namespace OCA\Gestion\Service;

final class InvoicePaymentMeans {
    public const SEPA = '58';

    public static function normalizeTransfer(string $value): string {
        return match (strtolower(trim($value))) {
            '30', self::SEPA, 'bank', 'bank transfer', 'credit transfer', 'sepa credit transfer',
            'virement', 'virement bancaire', 'virement sepa', 'transfert' => self::SEPA,
            default => $value,
        };
    }
}
