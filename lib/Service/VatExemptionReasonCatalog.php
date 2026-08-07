<?php

declare(strict_types=1);

namespace OCA\Gestion\Service;

final class VatExemptionReasonCatalog {
	public const DEFAULT_CODE = 'VATEX-FR-FRANCHISE';
	public const DEFAULT_REASON = 'TVA non applicable, art. 293 B du CGI';

	private const REASONS = [
		self::DEFAULT_CODE => self::DEFAULT_REASON,
		'VATEX-FR-CGI261-1' => 'Exonération de TVA, art. 261, 1 du CGI',
		'VATEX-FR-CGI261-2' => 'Exonération de TVA, art. 261, 2 du CGI',
		'VATEX-FR-CGI261-3' => 'Exonération de TVA, art. 261, 3 du CGI',
		'VATEX-FR-CGI261-4' => 'Exonération de TVA, art. 261, 4 du CGI',
		'VATEX-FR-CGI261-5' => 'Exonération de TVA, art. 261, 5 du CGI',
		'VATEX-FR-CGI261-7' => 'Exonération de TVA, art. 261, 7 du CGI',
		'VATEX-FR-CGI261-8' => 'Exonération de TVA, art. 261, 8 du CGI',
		'VATEX-FR-CGI261A' => 'Exonération de TVA, art. 261 A du CGI',
		'VATEX-FR-CGI261B' => 'Exonération de TVA, art. 261 B du CGI',
		'VATEX-FR-CGI261C-1' => 'Exonération de TVA, art. 261 C, 1° du CGI',
		'VATEX-FR-CGI261C-2' => 'Exonération de TVA, art. 261 C, 2° du CGI',
		'VATEX-FR-CGI261C-3' => 'Exonération de TVA, art. 261 C, 3° du CGI',
		'VATEX-FR-CGI261D-1' => 'Exonération de TVA, art. 261 D, 1° du CGI',
		'VATEX-FR-CGI261D-1BIS' => 'Exonération de TVA, art. 261 D, 1° bis du CGI',
		'VATEX-FR-CGI261D-2' => 'Exonération de TVA, art. 261 D, 2° du CGI',
		'VATEX-FR-CGI261D-3' => 'Exonération de TVA, art. 261 D, 3° du CGI',
		'VATEX-FR-CGI261D-4' => 'Exonération de TVA, art. 261 D, 4° du CGI',
		'VATEX-FR-CGI261E-1' => 'Exonération de TVA, art. 261 E, 1° du CGI',
		'VATEX-FR-CGI261E-2' => 'Exonération de TVA, art. 261 E, 2° du CGI',
		'VATEX-FR-CGI275' => 'Exonération de TVA, art. 275 du CGI',
		'VATEX-FR-CGI277A' => 'Exonération de TVA, art. 277 A du CGI',
		'VATEX-FR-298SEXDECIESA' => 'Exonération de TVA, art. 298 sexdecies A du CGI',
		'VATEX-FR-CGI295' => 'Exonération de TVA, art. 295 du CGI',
	];

	/**
	 * @return array<int, array{code: string, reason: string}>
	 */
	public static function all(): array {
		$reasons = [];

		foreach (self::REASONS as $code => $reason) {
			$reasons[] = [
				'code' => $code,
				'reason' => $reason,
			];
		}

		return $reasons;
	}

	public static function reasonFor(string $code): ?string {
		return self::REASONS[$code] ?? null;
	}

	public static function isValid(string $code): bool {
		return isset(self::REASONS[$code]);
	}
}
