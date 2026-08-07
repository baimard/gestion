<?php

namespace OCA\Gestion\Service;

use DateTime;
use OCA\Gestion\Controller\GestionFacturXWriter;

class FacturXService
{
	public const PROFILE_ID = 'urn:cen.eu:en16931:2017';
	public const BUSINESS_PROCESS_ID = 'S1';
	private const VAT_CATEGORIES = ['S', 'E', 'Z', 'O', 'AE', 'G', 'K'];
	private const FRENCH_INVOICE_NOTES = [
		'PMT' => 'Indemnité forfaitaire de 40 euros pour frais de recouvrement due en cas de retard de paiement.',
		'PMD' => 'Pénalités de retard exigibles au taux annuel de trois fois le taux d’intérêt légal en vigueur.',
		'AAB' => 'Aucun escompte accordé pour paiement anticipé.',
	];
	private const PAYMENT_MEANS = [
		'10' => 'Cash',
		'20' => 'Cheque',
		'30' => 'Credit transfer',
		'48' => 'Payment card',
		'58' => 'SEPA credit transfer',
	];

    /**
     * Generate complete Factur-X PDF
     */
    public function generateFacturXPdf(
        string $pdfContent,
        string $xmlContent
    ): string {

        $writer = new GestionFacturXWriter();

        return $writer->generate(
            $pdfContent,
            $xmlContent,
            null,
            false
        );
    }

    /**
     * Build EN16931 XML
     */
    public function buildXml(
        object $invoice,
        object $company,
        array $products,
		?object $customer = null
    ): string {
		$customer ??= $invoice;
		$this->assertConsistentVatExemptionReasons($products);

        $totals = $this->calculateTotals($products);

        $invoiceDate = new DateTime($invoice->date);
        $dueDate     = new DateTime($invoice->date_paiement);

        $lineItemsXml = $this->buildLineItems($products);
        $taxXml       = $this->buildTaxes($totals['vatLines']);

        $sellerVatId = htmlspecialchars(
          trim($company->vat_number ?? ''),
          ENT_XML1
        );
		$sellerSiret = ElectronicInvoiceIdentifiers::extractDigits(
			(string)($company->legal_one ?? ''),
			'SIRET'
		);
		$sellerSiren = ElectronicInvoiceIdentifiers::extractDigits(
			(string)($company->legal_two ?? ''),
			'SIREN'
		);
		$sellerSiret = ElectronicInvoiceIdentifiers::siretFrom($sellerSiret);
		$sellerSiren = ElectronicInvoiceIdentifiers::sirenFrom($sellerSiren);
		if ($sellerSiren === '') {
			$sellerSiren = ElectronicInvoiceIdentifiers::sirenFrom($sellerSiret);
		}

        return $this->buildDocument(
            invoice: $invoice,
            company: $company,
            customer: $customer,
            invoiceDate: $invoiceDate,
            dueDate: $dueDate,
            lineItemsXml: $lineItemsXml,
            taxXml: $taxXml,
            totals: $totals,
            sellerVatId: $sellerVatId,
			sellerSiret: $sellerSiret,
			sellerSiren: $sellerSiren
        );
    }

    /**
     * Calculate totals and VAT
     */
    private function calculateTotals(array $products): array
    {
        $vatLines = [];
        $totalHT = 0.0;

        foreach ($products as $product) {

            $lineTotal =
                (float)$product->prix_unitaire *
                (float)$product->quantite;

            $totalHT += $lineTotal;

			$vatRate = $this->getVatRate($product);
			$vatCategory = $this->getVatCategory($product, $vatRate);

            $key = $vatCategory . ':' . number_format($vatRate, 2);

			if (!isset($vatLines[$key])) {
				$vatLines[$key] = [
					'rate' => $vatRate,
					'category' => $vatCategory,
					'exemptionReasonCode' => $vatCategory === 'E'
						? $this->getVatExemptionReasonCode($product)
						: null,
					'exemptionReason' => $vatCategory === 'E'
						? $this->getVatExemptionReason($product)
						: null,
                    'base' => 0.0,
                    'amount' => 0.0
                ];
            }

            $vatLines[$key]['base'] += $lineTotal;
            $vatLines[$key]['amount'] += $lineTotal * $vatRate / 100;
        }

        $totalVAT = array_sum(array_column($vatLines, 'amount'));

        return [
            'vatLines' => $vatLines,
            'totalHT'  => $totalHT,
            'totalVAT' => $totalVAT,
            'totalTTC' => $totalHT + $totalVAT,
        ];
    }

    /**
     * Build XML invoice lines
     */
    private function buildLineItems(array $products): string
    {
        $xml = '';
        $lineNumber = 1;

        foreach ($products as $product) {

            $lineTotal = round(
                (float)$product->prix_unitaire *
                (float)$product->quantite,
                4
            );

			$vatRate = $this->getVatRate($product);
			$vatCategory = $this->getVatCategory($product, $vatRate);

            $designation = htmlspecialchars(
                $product->description
                    ?? $product->reference
                    ?? '',
                ENT_XML1
            );

            $xml .= <<<XML

<ram:IncludedSupplyChainTradeLineItem>
    <ram:AssociatedDocumentLineDocument>
        <ram:LineID>{$lineNumber}</ram:LineID>
    </ram:AssociatedDocumentLineDocument>

    <ram:SpecifiedTradeProduct>
        <ram:Name>{$designation}</ram:Name>
    </ram:SpecifiedTradeProduct>

    <ram:SpecifiedLineTradeAgreement>
        <ram:NetPriceProductTradePrice>
            <ram:ChargeAmount>{$product->prix_unitaire}</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
    </ram:SpecifiedLineTradeAgreement>

    <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="C62">
            {$product->quantite}
        </ram:BilledQuantity>
    </ram:SpecifiedLineTradeDelivery>

    <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax>
            <ram:TypeCode>VAT</ram:TypeCode>
            <ram:CategoryCode>{$vatCategory}</ram:CategoryCode>
            <ram:RateApplicablePercent>{$vatRate}</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>

        <ram:SpecifiedTradeSettlementLineMonetarySummation>
            <ram:LineTotalAmount>{$lineTotal}</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
    </ram:SpecifiedLineTradeSettlement>
</ram:IncludedSupplyChainTradeLineItem>

XML;

            $lineNumber++;
        }

        return $xml;
    }

    /**
     * Build XML VAT section
     */
    private function buildTaxes(array $vatLines): string
    {
        $xml = '';

        foreach ($vatLines as $vat) {
			$amount = number_format($vat['amount'], 2, '.', '');
			$basis = number_format($vat['base'], 2, '.', '');
			$rate = $vat['rate'];
			$category = $vat['category'];
			$exemptionReason = $category === 'E'
				? "\n    <ram:ExemptionReason>"
					. htmlspecialchars((string)$vat['exemptionReason'], ENT_XML1)
					. '</ram:ExemptionReason>'
				: '';
			$exemptionReasonCode = $category === 'E'
				? "\n    <ram:ExemptionReasonCode>"
					. htmlspecialchars((string)$vat['exemptionReasonCode'], ENT_XML1)
					. '</ram:ExemptionReasonCode>'
				: '';

            $xml .= <<<XML

<ram:ApplicableTradeTax>
    <ram:CalculatedAmount>{$amount}</ram:CalculatedAmount>
    <ram:TypeCode>VAT</ram:TypeCode>
    {$exemptionReason}
    <ram:BasisAmount>{$basis}</ram:BasisAmount>
    <ram:CategoryCode>{$category}</ram:CategoryCode>
    {$exemptionReasonCode}
    <ram:RateApplicablePercent>{$rate}</ram:RateApplicablePercent>
</ram:ApplicableTradeTax>

XML;
        }

        return $xml;
    }

	private function getVatRate(object $product): float
	{
		return (float)($product->vat ?? $product->tva ?? 20.0);
	}

	private function getVatCategory(object $product, float $vatRate): string
	{
		$category = strtoupper(trim((string)($product->vat_category ?? '')));
		if ($vatRate > 0.0) {
			return 'S';
		}

		if (in_array($category, self::VAT_CATEGORIES, true)) {
			return $category;
		}

		// Backward compatibility for products created before categories were stored.
		return $vatRate == 0.0 ? 'E' : 'S';
	}

	private function getVatExemptionReasonCode(object $product): string {
		$code = trim((string)($product->vat_exemption_reason_code ?? ''));
		if ($code === '') {
			return VatExemptionReasonCatalog::DEFAULT_CODE;
		}

		if (!VatExemptionReasonCatalog::isValid($code)) {
			throw new \InvalidArgumentException('Unknown VAT exemption reason code: ' . $code);
		}

		return $code;
	}

	private function getVatExemptionReason(object $product): string {
		$code = $this->getVatExemptionReasonCode($product);
		$reason = trim((string)($product->vat_exemption_reason ?? ''));

		return $reason !== ''
			? $reason
			: (string)VatExemptionReasonCatalog::reasonFor($code);
	}

	private function assertConsistentVatExemptionReasons(array $products): void {
		$reasonCodes = [];

		foreach ($products as $product) {
			$vatRate = $this->getVatRate($product);
			if ($this->getVatCategory($product, $vatRate) !== 'E') {
				continue;
			}

			$reasonCodes[$this->getVatExemptionReasonCode($product)] = true;
		}

		if (count($reasonCodes) > 1) {
			throw new \InvalidArgumentException(
				'All VAT-exempt invoice lines must use the same exemption reason.'
			);
		}
	}

    /**
     * Build VAT number
     */
    private function buildVatNumber(string $vatNumber): string
    {
        if (empty($vatNumber)) {
            return '';
        }

        if (strpos($vatNumber, 'FR') === 0) {
            return $vatNumber;
        }

        return 'FR00' . preg_replace('/[^0-9]/', '', $vatNumber);
    }

    

    /**
     * Build complete XML document
     */
    private function buildDocument(
        object $invoice,
        object $company,
		object $customer,
        DateTime $invoiceDate,
        DateTime $dueDate,
        string $lineItemsXml,
        string $taxXml,
        array $totals,
        string $sellerVatId,
		string $sellerSiret,
		string $sellerSiren
    ): string {

        $sellerName = htmlspecialchars($company->entreprise ?? '', ENT_XML1);

        $sellerAddress = htmlspecialchars($company->adresse ?? '', ENT_XML1);

        $sellerCity = htmlspecialchars($company->city_name ?? '', ENT_XML1);

        $sellerZip = htmlspecialchars($company->zip_code ?? '', ENT_XML1);

        $sellerCountry = htmlspecialchars($company->pays ?? 'FR', ENT_XML1);
		$sellerEndpointXml = $this->buildElectronicAddress((string)($company->mail ?? ''));

		$buyerCompanyName = trim((string)($customer->entreprise ?? $invoice->entreprise ?? ''));
		$buyerPersonName = trim(
			(string)($customer->prenom ?? $invoice->prenom ?? '')
			. ' '
			. (string)($customer->nom ?? $invoice->nom ?? '')
		);
		$buyerName = htmlspecialchars(
			$buyerCompanyName !== '' ? $buyerCompanyName : $buyerPersonName,
			ENT_XML1
		);

        $buyerAddress = htmlspecialchars($customer->adresse ?? '', ENT_XML1);
        $buyerZip = htmlspecialchars($customer->zip_code ?? '', ENT_XML1);
        $buyerCity = htmlspecialchars($customer->city_name ?? '', ENT_XML1);
        $buyerCountry = htmlspecialchars($customer->country_code ?? 'FR', ENT_XML1);
		$buyerEndpointXml = $this->buildElectronicAddress((string)($customer->mail ?? ''));
		$buyerCompanyId = trim($customer->company_identification ?? '');
		$buyerVatId = htmlspecialchars(trim($customer->vat_number ?? ''), ENT_XML1);
		$buyerSiret = ElectronicInvoiceIdentifiers::siretFrom($buyerCompanyId);
		$buyerSiren = ElectronicInvoiceIdentifiers::sirenFrom($buyerCompanyId);
		$buyerSiretXml = $buyerSiret !== '' ? "<ram:GlobalID schemeID=\"0009\">{$buyerSiret}</ram:GlobalID>" : '';
		$buyerSirenXml = $buyerSiren !== '' ? "<ram:SpecifiedLegalOrganization><ram:ID schemeID=\"0002\">{$buyerSiren}</ram:ID></ram:SpecifiedLegalOrganization>" : '';
        $buyerVatIdXml = $buyerVatId !== '' ? "<ram:SpecifiedTaxRegistration><ram:ID schemeID=\"VA\">{$buyerVatId}</ram:ID></ram:SpecifiedTaxRegistration>" : '';
		$sellerSiretXml = $sellerSiret !== '' ? "<ram:GlobalID schemeID=\"0009\">{$sellerSiret}</ram:GlobalID>" : '';
		$sellerSirenXml = $sellerSiren !== '' ? "<ram:SpecifiedLegalOrganization><ram:ID schemeID=\"0002\">{$sellerSiren}</ram:ID></ram:SpecifiedLegalOrganization>" : '';
		$sellerVatIdXml = $sellerVatId !== '' ? "<ram:SpecifiedTaxRegistration><ram:ID schemeID=\"VA\">{$sellerVatId}</ram:ID></ram:SpecifiedTaxRegistration>" : '';

        $invoiceNumber = htmlspecialchars($invoice->num, ENT_XML1);

		$paymentCode = $this->getPaymentMeansCode((string)($invoice->type_paiement ?? ''));
		$paymentMethod = self::PAYMENT_MEANS[$paymentCode] ?? '';
		$paymentMeansXml = $this->buildPaymentMeans($paymentCode, (string)($company->iban ?? ''));
		$paymentDescriptionXml = $paymentMethod !== ''
			? "<ram:Description>{$paymentMethod}</ram:Description>"
			: '';

        $totalHT = number_format($totals['totalHT'], 2, '.', '');
        $totalVAT = number_format($totals['totalVAT'], 2, '.', '');
        $totalTTC = number_format($totals['totalTTC'], 2, '.', '');

        $invoiceDateFormatted = $invoiceDate->format('Ymd');
        $dueDateFormatted = $dueDate->format('Ymd');
		$profileId = self::PROFILE_ID;
		$businessProcessId = self::BUSINESS_PROCESS_ID;
		$invoiceNotesXml = $this->buildFrenchInvoiceNotes();

        return <<<XML
<?xml version="1.0" encoding="UTF-8"?>

<rsm:CrossIndustryInvoice
    xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
    xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:100"
    xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">

    <rsm:ExchangedDocumentContext>
        <ram:BusinessProcessSpecifiedDocumentContextParameter>
            <ram:ID>{$businessProcessId}</ram:ID>
        </ram:BusinessProcessSpecifiedDocumentContextParameter>
        <ram:GuidelineSpecifiedDocumentContextParameter>
            <ram:ID>{$profileId}</ram:ID>
        </ram:GuidelineSpecifiedDocumentContextParameter>
    </rsm:ExchangedDocumentContext>

    <rsm:ExchangedDocument>
        <ram:ID>{$invoiceNumber}</ram:ID>
        <ram:TypeCode>380</ram:TypeCode>

        <ram:IssueDateTime>
            <udt:DateTimeString format="102">{$invoiceDateFormatted}</udt:DateTimeString>
        </ram:IssueDateTime>

		{$invoiceNotesXml}
    </rsm:ExchangedDocument>

    <rsm:SupplyChainTradeTransaction>

        {$lineItemsXml}

        <ram:ApplicableHeaderTradeAgreement>

            <ram:SellerTradeParty>

				{$sellerSiretXml}

                <ram:Name>{$sellerName}</ram:Name>

				{$sellerSirenXml}

                <ram:PostalTradeAddress>
                    <ram:PostcodeCode>{$sellerZip}</ram:PostcodeCode>
                    <ram:LineOne>{$sellerAddress}</ram:LineOne>
                    <ram:CityName>{$sellerCity}</ram:CityName>
                    <ram:CountryID>{$sellerCountry}</ram:CountryID>
                </ram:PostalTradeAddress>

				{$sellerEndpointXml}

				{$sellerVatIdXml}

            </ram:SellerTradeParty>

            <ram:BuyerTradeParty>

	    {$buyerSiretXml}

	    <ram:Name>{$buyerName}</ram:Name>

	    {$buyerSirenXml}

    <ram:PostalTradeAddress>

        <ram:PostcodeCode>{$buyerZip}</ram:PostcodeCode>

        <ram:LineOne>{$buyerAddress}</ram:LineOne>

        <ram:CityName>{$buyerCity}</ram:CityName>

        <ram:CountryID>{$buyerCountry}</ram:CountryID>

    </ram:PostalTradeAddress>

    {$buyerEndpointXml}

    {$buyerVatIdXml}

</ram:BuyerTradeParty>

        </ram:ApplicableHeaderTradeAgreement>

        <ram:ApplicableHeaderTradeDelivery>
            <ram:ActualDeliverySupplyChainEvent>
                <ram:OccurrenceDateTime>
                    <udt:DateTimeString format="102">{$invoiceDateFormatted}</udt:DateTimeString>
                </ram:OccurrenceDateTime>
            </ram:ActualDeliverySupplyChainEvent>
        </ram:ApplicableHeaderTradeDelivery>

        <ram:ApplicableHeaderTradeSettlement>

            <ram:PaymentReference>{$invoiceNumber}</ram:PaymentReference>

            <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>

            {$paymentMeansXml}

            {$taxXml}

            <ram:SpecifiedTradePaymentTerms>
                {$paymentDescriptionXml}

                <ram:DueDateDateTime>
                    <udt:DateTimeString format="102">{$dueDateFormatted}</udt:DateTimeString>
                </ram:DueDateDateTime>

            </ram:SpecifiedTradePaymentTerms>

            <ram:SpecifiedTradeSettlementHeaderMonetarySummation>

                <ram:LineTotalAmount>{$totalHT}</ram:LineTotalAmount>
                <ram:TaxBasisTotalAmount>{$totalHT}</ram:TaxBasisTotalAmount>
                <ram:TaxTotalAmount currencyID="EUR">{$totalVAT}</ram:TaxTotalAmount>
                <ram:GrandTotalAmount>{$totalTTC}</ram:GrandTotalAmount>
                <ram:DuePayableAmount>{$totalTTC}</ram:DuePayableAmount>

            </ram:SpecifiedTradeSettlementHeaderMonetarySummation>

        </ram:ApplicableHeaderTradeSettlement>

    </rsm:SupplyChainTradeTransaction>

</rsm:CrossIndustryInvoice>
XML;
    }

	private function buildElectronicAddress(string $email): string
	{
		$email = trim($email);
		if ($email === '') {
			return '';
		}

		$email = htmlspecialchars($email, ENT_XML1);

		return "<ram:URIUniversalCommunication><ram:URIID schemeID=\"EM\">{$email}</ram:URIID></ram:URIUniversalCommunication>";
	}

	private function buildFrenchInvoiceNotes(): string
	{
		$notes = [];
		foreach (self::FRENCH_INVOICE_NOTES as $subjectCode => $content) {
			$content = htmlspecialchars($content, ENT_XML1);
			$notes[] = <<<XML
<ram:IncludedNote>
            <ram:Content>{$content}</ram:Content>
            <ram:SubjectCode>{$subjectCode}</ram:SubjectCode>
        </ram:IncludedNote>
XML;
		}

		return implode("\n\n        ", $notes);
	}

	private function getPaymentMeansCode(string $paymentMethod): string
	{
		$paymentMethod = trim($paymentMethod);
		if (isset(self::PAYMENT_MEANS[$paymentMethod])) {
			return $paymentMethod;
		}

		$legacyMethods = [
			'cash' => '10',
			'cheque' => '20',
			'check' => '20',
			'bank' => '30',
			'credit transfer' => '30',
			'card' => '48',
			'payment card' => '48',
			'sepa credit transfer' => '58',
		];

		return $legacyMethods[strtolower($paymentMethod)] ?? '';
	}

	private function buildPaymentMeans(string $paymentCode, string $iban): string
	{
		if ($paymentCode === '') {
			return '';
		}

		$accountXml = '';
		if (in_array($paymentCode, ['30', '58'], true)) {
			$iban = strtoupper(preg_replace('/\s+/', '', $iban));
			if ($iban === '') {
				return '';
			}
			$iban = htmlspecialchars($iban, ENT_XML1);
			$accountXml = "\n                <ram:PayeePartyCreditorFinancialAccount>\n                    <ram:IBANID>{$iban}</ram:IBANID>\n                </ram:PayeePartyCreditorFinancialAccount>";
		}

		$information = self::PAYMENT_MEANS[$paymentCode];

		return <<<XML
<ram:SpecifiedTradeSettlementPaymentMeans>
                <ram:TypeCode>{$paymentCode}</ram:TypeCode>
                <ram:Information>{$information}</ram:Information>{$accountXml}
            </ram:SpecifiedTradeSettlementPaymentMeans>
XML;
	}
}
