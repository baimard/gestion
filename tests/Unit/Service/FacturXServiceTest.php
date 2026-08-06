<?php

namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Service\FacturXService;
use PHPUnit\Framework\TestCase;

class FacturXServiceTest extends TestCase {
	public function testBuildsOnlyTheEn16931Profile(): void {
		$service = new FacturXService();
		$invoice = (object)[
			'date' => '2026-08-06',
			'date_paiement' => '2026-09-06',
			'num' => 'F-1',
			'type_paiement' => 'bank',
		];
		$company = (object)[
			'entreprise' => 'Gestion',
			'adresse' => '1 rue de Paris',
			'zip_code' => '75001',
			'city_name' => 'Paris',
		];
		$products = [(object)[
			'description' => 'Service',
			'prix_unitaire' => 100,
			'quantite' => 1,
			'vat' => 20,
		]];

		$xml = $service->buildXml($invoice, $company, $products);

		$this->assertStringContainsString(FacturXService::PROFILE_ID, $xml);
		$this->assertStringNotContainsString('factur-x.eu:1p0:extended', $xml);
		$this->assertSame(1, substr_count($xml, '<ram:GuidelineSpecifiedDocumentContextParameter>'));
	}
}
