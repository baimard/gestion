<?php

namespace OCA\Gestion\Service;

final class ElectronicInvoiceIdentifiers {
	public static function extractDigits(string $value, string $identifier): string {
		if (!preg_match('/^\s*' . preg_quote($identifier, '/') . '\s*:\s*(.*)$/iu', $value, $matches)) {
			return '';
		}

		return preg_replace('/\D+/', '', $matches[1]);
	}
}
