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

	public function testBuildsSirenFromSirenOrSiret(): void {
		$this->assertSame('493845341', ElectronicInvoiceIdentifiers::sirenFrom('493845341'));
		$this->assertSame('493845341', ElectronicInvoiceIdentifiers::sirenFrom('493 845 341 00038'));
	}

	public function testRejectsAnAllZeroSiren(): void {
		$this->assertSame('', ElectronicInvoiceIdentifiers::sirenFrom('000000000'));
	}

	public function testBuildsOnlyFourteenDigitSiret(): void {
		$this->assertSame('49384534100038', ElectronicInvoiceIdentifiers::siretFrom('493 845 341 00038'));
		$this->assertSame('', ElectronicInvoiceIdentifiers::siretFrom('493845341'));
	}
}
