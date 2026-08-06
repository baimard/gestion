<?php

namespace OCA\Gestion\Service;

final class ElectronicInvoiceIdentifiers {
	public static function extractDigits(string $value, string $identifier): string {
		if (!preg_match('/^\s*' . preg_quote($identifier, '/') . '\s*:\s*(.*)$/iu', $value, $matches)) {
			return '';
		}

		return preg_replace('/\D+/', '', $matches[1]);
	}

	public static function sirenFrom(string $value): string {
		$digits = preg_replace('/\D+/', '', $value);

		if (strlen($digits) === 14) {
			$digits = substr($digits, 0, 9);
		}

		return self::isUsableIdentifier($digits, 9) ? $digits : '';
	}

	public static function siretFrom(string $value): string {
		$digits = preg_replace('/\D+/', '', $value);

		return self::isUsableIdentifier($digits, 14) ? $digits : '';
	}

	private static function isUsableIdentifier(string $digits, int $length): bool {
		return strlen($digits) === $length && preg_match('/[1-9]/', $digits) === 1;
	}
}
