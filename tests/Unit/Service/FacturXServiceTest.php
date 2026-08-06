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

	public function testBuildsQualifiedFrenchSellerAndBuyerIdentifiers(): void {
		$service = new FacturXService();
		$invoice = (object)[
			'date' => '2026-08-06',
			'date_paiement' => '2026-09-06',
			'num' => 'F-2',
			'type_paiement' => 'bank',
			'nom' => 'Client',
			'prenom' => 'Test',
		];
		$company = (object)[
			'entreprise' => 'Gestion',
			'adresse' => '1 rue de Paris',
			'zip_code' => '75001',
			'city_name' => 'Paris',
			'legal_one' => 'SIRET: 89157747000034',
			'legal_two' => 'SIREN: 000000000',
		];
		$customer = (object)[
			'company_identification' => '493845341',
		];
		$products = [(object)[
			'description' => 'Service',
			'prix_unitaire' => 100,
			'quantite' => 1,
			'vat' => 20,
		]];

		$xml = $service->buildXml($invoice, $company, $products, $customer);

		$this->assertStringContainsString('<ram:GlobalID schemeID="0009">89157747000034</ram:GlobalID>', $xml);
		$this->assertStringContainsString('<ram:ID schemeID="0002">891577470</ram:ID>', $xml);
		$this->assertStringContainsString('<ram:ID schemeID="0002">493845341</ram:ID>', $xml);
		$this->assertStringNotContainsString('<ram:ID>493845341</ram:ID>', $xml);
		$this->assertStringNotContainsString('000000000', $xml);
	}

	public function testBuildsBuyerSiretAndDerivesItsSiren(): void {
		$service = new FacturXService();
		$invoice = (object)[
			'date' => '2026-08-06',
			'date_paiement' => '2026-09-06',
			'num' => 'F-3',
		];
		$company = (object)[];
		$customer = (object)[
			'company_identification' => '493 845 341 00038',
		];
		$products = [(object)[
			'description' => 'Service',
			'prix_unitaire' => 100,
			'quantite' => 1,
			'vat' => 20,
		]];

		$xml = $service->buildXml($invoice, $company, $products, $customer);

		$this->assertStringContainsString('<ram:GlobalID schemeID="0009">49384534100038</ram:GlobalID>', $xml);
		$this->assertStringContainsString('<ram:ID schemeID="0002">493845341</ram:ID>', $xml);
	}
}
