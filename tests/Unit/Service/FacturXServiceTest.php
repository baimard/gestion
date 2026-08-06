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

	public function testBuildsHeaderTradeDeliveryBeforeSettlement(): void {
		$service = new FacturXService();
		$invoice = (object)[
			'date' => '2026-08-06',
			'date_paiement' => '2026-09-06',
			'num' => 'F-DELIVERY',
		];
		$products = [(object)[
			'description' => 'Service',
			'prix_unitaire' => 100,
			'quantite' => 1,
			'vat' => 20,
		]];

		$xml = $service->buildXml($invoice, (object)[], $products);

		$this->assertStringContainsString(
			'<udt:DateTimeString format="102">20260806</udt:DateTimeString>',
			$xml
		);
		$this->assertLessThan(
			strpos($xml, '<ram:ApplicableHeaderTradeSettlement>'),
			strpos($xml, '<ram:ApplicableHeaderTradeDelivery>')
		);
		$this->assertStringContainsString(
			'<udt:DateTimeString format="102">20260906</udt:DateTimeString>',
			$xml
		);
	}

	public function testBuildsMandatoryFrenchInvoiceNotes(): void {
		$service = new FacturXService();
		$invoice = (object)[
			'date' => '2026-08-06',
			'date_paiement' => '2026-09-06',
			'num' => 'F-NOTES',
		];
		$products = [(object)[
			'description' => 'Service',
			'prix_unitaire' => 100,
			'quantite' => 1,
			'vat' => 20,
		]];

		$xml = $service->buildXml($invoice, (object)[], $products);

		foreach (['PMT', 'PMD', 'AAB'] as $subjectCode) {
			$this->assertStringContainsString(
				'<ram:SubjectCode>' . $subjectCode . '</ram:SubjectCode>',
				$xml
			);
		}
		$this->assertSame(3, substr_count($xml, '<ram:IncludedNote>'));
	}

	public function testBuildsSellerAndBuyerElectronicAddresses(): void {
		$service = new FacturXService();
		$invoice = (object)[
			'date' => '2026-08-06',
			'date_paiement' => '2026-09-06',
			'num' => 'F-ENDPOINTS',
		];
		$company = (object)['mail' => 'seller&billing@example.com'];
		$customer = (object)['mail' => 'buyer@example.com'];
		$products = [(object)[
			'description' => 'Service',
			'prix_unitaire' => 100,
			'quantite' => 1,
			'vat' => 20,
		]];

		$xml = $service->buildXml($invoice, $company, $products, $customer);

		$this->assertStringContainsString(
			'<ram:URIID schemeID="EM">seller&amp;billing@example.com</ram:URIID>',
			$xml
		);
		$this->assertStringContainsString(
			'<ram:URIID schemeID="EM">buyer@example.com</ram:URIID>',
			$xml
		);
		$this->assertSame(2, substr_count($xml, '<ram:URIUniversalCommunication>'));
	}

	public function testDoesNotDeclareAnAccountingCurrencyWithoutItsVatTotal(): void {
		$service = new FacturXService();
		$invoice = (object)[
			'date' => '2026-08-06',
			'date_paiement' => '2026-09-06',
			'num' => 'F-CURRENCY',
		];
		$products = [(object)[
			'description' => 'Service',
			'prix_unitaire' => 100,
			'quantite' => 1,
			'vat' => 20,
		]];

		$xml = $service->buildXml($invoice, (object)[], $products);

		$this->assertStringContainsString('<ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>', $xml);
		$this->assertStringNotContainsString('<ram:TaxCurrencyCode>', $xml);
	}

	public function testBuildsCreditTransferWithConfiguredIban(): void {
		$service = new FacturXService();
		$invoice = (object)[
			'date' => '2026-08-06',
			'date_paiement' => '2026-09-06',
			'num' => 'F-TRANSFER',
			'type_paiement' => '58',
		];
		$company = (object)['iban' => 'FR76 3000 6000 0112 3456 7890 189'];
		$products = [(object)[
			'description' => 'Service',
			'prix_unitaire' => 100,
			'quantite' => 1,
			'vat' => 20,
		]];

		$xml = $service->buildXml($invoice, $company, $products);

		$this->assertStringContainsString('<ram:TypeCode>58</ram:TypeCode>', $xml);
		$this->assertStringContainsString('<ram:IBANID>FR7630006000011234567890189</ram:IBANID>', $xml);
	}

	public function testIgnoresUnsupportedFreeTextPaymentMeans(): void {
		$service = new FacturXService();
		$invoice = (object)[
			'date' => '2026-08-06',
			'date_paiement' => '2026-09-06',
			'num' => 'F-FREE-TEXT',
			'type_paiement' => 'Anything entered by a user',
		];
		$products = [(object)[
			'description' => 'Service',
			'prix_unitaire' => 100,
			'quantite' => 1,
			'vat' => 20,
		]];

		$xml = $service->buildXml($invoice, (object)[], $products);

		$this->assertStringNotContainsString('<ram:SpecifiedTradeSettlementPaymentMeans>', $xml);
		$this->assertStringNotContainsString('Anything entered by a user', $xml);
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

	public function testBuildsEveryProductVatBreakdownAndTotalsIncludingTax(): void {
		$service = new FacturXService();
		$invoice = (object)[
			'date' => '2026-07-25',
			'date_paiement' => '2026-08-25',
			'num' => 'FACTURE-10',
		];
		$products = [
			(object)['description' => 'Produit sans TVA', 'prix_unitaire' => 10, 'quantite' => 1, 'vat' => 0, 'vat_category' => 'E'],
			(object)['description' => 'Produit 1', 'prix_unitaire' => 10, 'quantite' => 1, 'vat' => 5.5, 'vat_category' => 'S'],
			(object)['description' => 'Produit 2', 'prix_unitaire' => 20, 'quantite' => 1, 'vat' => 10, 'vat_category' => 'S'],
			(object)['description' => 'Produit 3', 'prix_unitaire' => 30, 'quantite' => 1, 'vat' => 20, 'vat_category' => 'S'],
		];

		$xml = $service->buildXml($invoice, (object)[], $products);

		$this->assertSame(4, substr_count($xml, '<ram:IncludedSupplyChainTradeLineItem>'));
		foreach ($products as $index => $product) {
			$this->assertStringContainsString('<ram:LineID>' . ($index + 1) . '</ram:LineID>', $xml);
			$this->assertStringContainsString('<ram:Name>' . $product->description . '</ram:Name>', $xml);
			$this->assertStringContainsString('<ram:RateApplicablePercent>' . $product->vat . '</ram:RateApplicablePercent>', $xml);
		}
		$this->assertStringContainsString('<ram:CategoryCode>E</ram:CategoryCode>', $xml);
		$this->assertStringContainsString('<ram:ExemptionReason>TVA non applicable, art. 293 B du CGI</ram:ExemptionReason>', $xml);
		$this->assertStringNotContainsString('<ram:CategoryCode>Z</ram:CategoryCode>', $xml);
		$this->assertStringContainsString('<ram:LineTotalAmount>70.00</ram:LineTotalAmount>', $xml);
		$this->assertStringContainsString('<ram:TaxBasisTotalAmount>70.00</ram:TaxBasisTotalAmount>', $xml);
		$this->assertStringContainsString('<ram:TaxTotalAmount currencyID="EUR">8.55</ram:TaxTotalAmount>', $xml);
		$this->assertStringContainsString('<ram:GrandTotalAmount>78.55</ram:GrandTotalAmount>', $xml);
		$this->assertStringContainsString('<ram:DuePayableAmount>78.55</ram:DuePayableAmount>', $xml);
	}

	public function testUsesTheCategorySelectedForEachProduct(): void {
		$service = new FacturXService();
		$invoice = (object)[
			'date' => '2026-08-06',
			'date_paiement' => '2026-09-06',
			'num' => 'F-4',
		];
		$products = [
			(object)['description' => 'Exonéré', 'prix_unitaire' => 10, 'quantite' => 1, 'vat' => 0, 'vat_category' => 'E'],
			(object)['description' => 'Taux zéro', 'prix_unitaire' => 20, 'quantite' => 1, 'vat' => 0, 'vat_category' => 'Z'],
		];

		$xml = $service->buildXml($invoice, (object)[], $products);

		$this->assertSame(2, substr_count($xml, '<ram:CategoryCode>E</ram:CategoryCode>'));
		$this->assertSame(2, substr_count($xml, '<ram:CategoryCode>Z</ram:CategoryCode>'));
		$this->assertSame(2, substr_count($xml, '<ram:BasisAmount>'));
		$this->assertStringContainsString('<ram:BasisAmount>10.00</ram:BasisAmount>', $xml);
		$this->assertStringContainsString('<ram:BasisAmount>20.00</ram:BasisAmount>', $xml);
	}
}
