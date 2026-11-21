<?php

declare(strict_types=1);

namespace OCA\Gestion\Service;

use NumberFormatter;

/** Format the saved invoice lines and Factur-X tax breakdown for the document tables. */
final class InvoicePrintRows {
    public static function fromInvoice(object $company, array $products, array $totals): array {
        $locale = ($company->format ?? '') ?: 'fr-FR';
        $currency = FacturXService::currency($company);
        $money = new NumberFormatter($locale, NumberFormatter::CURRENCY);
        $money->setTextAttribute(NumberFormatter::CURRENCY_CODE, $currency);
        $money->setAttribute(NumberFormatter::FRACTION_DIGITS, 2);
        $unit = clone $money;
        $unit->setAttribute(NumberFormatter::FRACTION_DIGITS, max(0, min(6, (int)($company->price_decimals ?? 2))));
        $quantity = new NumberFormatter($locale, NumberFormatter::DECIMAL);
        $quantity->setAttribute(NumberFormatter::MAX_FRACTION_DIGITS, max(0, min(6, (int)($company->quantity_decimals ?? 2))));
        $rows = ['products' => [], 'vat_totals' => [], 'grand_totals' => []];
        foreach ($products as $product) {
            if (!empty($product->header)) {
                $rows['products'][] = [$product->reference];
                continue;
            }
            $net = CommercialMath::lineTotal($product);
            $vat = (float)($product->vat ?? $product->tva ?? 20);
            $rows['products'][] = [
                $product->reference, $product->description, $product->comment ?: '-',
                $quantity->format((float)$product->quantite), $unit->formatCurrency((float)$product->prix_unitaire, $currency),
                (float)($product->discount ?? 0) . ' %', $money->formatCurrency($net, $currency),
                $vat . ' %', $money->formatCurrency($net * (1 + $vat / 100), $currency),
            ];
        }
        foreach ($totals['vatLines'] as $group) {
            $rows['vat_totals'][] = [
                $quantity->format($group['quantity']), $money->formatCurrency($group['base'], $currency),
                $group['rate'] . ' %', $money->formatCurrency($group['amount'], $currency),
                $money->formatCurrency($group['base'] + $group['amount'], $currency),
            ];
        }
        $rows['grand_totals'][] = [
            $money->formatCurrency($totals['totalHT'], $currency),
            $money->formatCurrency($totals['totalVAT'], $currency),
            $money->formatCurrency($totals['totalTTC'], $currency),
        ];
        return $rows;
    }
}
