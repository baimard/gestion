<?php

namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Service\ElectronicInvoiceIdentifiers;
use PHPUnit\Framework\TestCase;

class ElectronicInvoiceIdentifiersTest extends TestCase {
	public function testExtractsOnlySiretDigits(): void {
		$this->assertSame(
			'12345678901234',
			ElectronicInvoiceIdentifiers::extractDigits('SIRET : 123 456 789 012 34', 'SIRET')
		);
	}

	public function testExtractsOnlySirenDigitsCaseInsensitively(): void {
		$this->assertSame(
			'123456789',
			ElectronicInvoiceIdentifiers::extractDigits('siren: 123 456 789', 'SIREN')
		);
	}

	public function testIgnoresFieldWithoutExpectedPrefix(): void {
		$this->assertSame(
			'',
			ElectronicInvoiceIdentifiers::extractDigits('RCS : 123 456 789', 'SIRET')
		);
	}

	public function testIgnoresAFieldUsingTheOtherIdentifier(): void {
		$this->assertSame(
			'',
			ElectronicInvoiceIdentifiers::extractDigits('SIREN : 123 456 789', 'SIRET')
		);
	}
}
