<?php

declare(strict_types=1);

namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Service\VatExemptionReasonCatalog;
use PHPUnit\Framework\TestCase;

class VatExemptionReasonCatalogTest extends TestCase {
	public function testDefaultReasonIsAvailableInCatalog(): void {
		$this->assertTrue(
			VatExemptionReasonCatalog::isValid(VatExemptionReasonCatalog::DEFAULT_CODE)
		);
		$this->assertSame(
			VatExemptionReasonCatalog::DEFAULT_REASON,
			VatExemptionReasonCatalog::reasonFor(VatExemptionReasonCatalog::DEFAULT_CODE)
		);
	}

	public function testCatalogContainsFrenchDomesticExemptionReasons(): void {
		$this->assertSame(
			'Exonération de TVA, art. 261, 4 du CGI',
			VatExemptionReasonCatalog::reasonFor('VATEX-FR-CGI261-4')
		);
		$this->assertNull(VatExemptionReasonCatalog::reasonFor('VATEX-FR-UNKNOWN'));
	}

	public function testCatalogEntriesExposeCodeAndReason(): void {
		foreach (VatExemptionReasonCatalog::all() as $entry) {
			$this->assertNotSame('', $entry['code']);
			$this->assertNotSame('', $entry['reason']);
		}
	}
}
