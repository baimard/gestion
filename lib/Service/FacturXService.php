<?php

namespace OCA\Gestion\Service;

use DateTime;

class FacturXService
{
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
        array $products
    ): string {

        $totals = $this->calculateTotals(
            $products
        );

        $invoiceDate = new DateTime(
            $invoice->date
        );

        $dueDate = new DateTime(
            $invoice->date_paiement
        );

        $lineItemsXml = $this->buildLineItems(
            $products
        );

        $taxXml = $this->buildTaxes(
            $totals['vatLines']
        );

        $sellerVatId = $this->buildVatNumber(
            $company->siret ?? ''
        );

        return $this->buildDocument(
            invoice: $invoice,
            company: $company,
            invoiceDate: $invoiceDate,
            dueDate: $dueDate,
            lineItemsXml: $lineItemsXml,
            taxXml: $taxXml,
            totals: $totals,
            sellerVatId: $sellerVatId
        );
    }

    /**
     * Calculate totals and VAT
     */
    private function calculateTotals(
        array $products
    ): array {

        $vatLines = [];

        $totalHT = 0.0;

        foreach ($products as $product) {

            $lineTotal =
                (float)$product->prix_unitaire *
                (float)$product->quantite;

            $totalHT += $lineTotal;

            $vatRate =
                isset($product->tva)
                    ? (float)$product->tva
                    : 20.0;

            $key = number_format(
                $vatRate,
                2
            );

            if (!isset($vatLines[$key])) {

                $vatLines[$key] = [
                    'rate' => $vatRate,
                    'base' => 0.0,
                    'amount' => 0.0
                ];
            }

            $vatLines[$key]['base'] +=
                $lineTotal;

            $vatLines[$key]['amount'] +=
                $lineTotal * $vatRate / 100;
        }

        $totalVAT = array_sum(
            array_column(
                $vatLines,
                'amount'
            )
        );

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
    private function buildLineItems(
        array $products
    ): string {

        $xml = '';

        $lineNumber = 1;

        foreach ($products as $product) {

            $lineTotal = round(
                (float)$product->prix_unitaire *
                (float)$product->quantite,
                4
            );

            $vatRate =
                isset($product->tva)
                    ? (float)$product->tva
                    : 20.0;

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
            <ram:CategoryCode>S</ram:CategoryCode>
            <ram:RateApplicablePercent>{$vatRate}</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>

        <ram:SpecifiedTradeMonetarySummation>
            <ram:LineTotalAmount>{$lineTotal}</ram:LineTotalAmount>
        </ram:SpecifiedTradeMonetarySummation>
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
    private function buildTaxes(
        array $vatLines
    ): string {

        $xml = '';

        foreach ($vatLines as $vat) {

            $xml .= <<<XML

<ram:ApplicableTradeTax>
    <ram:CalculatedAmount>{$vat['amount']}</ram:CalculatedAmount>
    <ram:TypeCode>VAT</ram:TypeCode>
    <ram:BasisAmount>{$vat['base']}</ram:BasisAmount>
    <ram:CategoryCode>S</ram:CategoryCode>
    <ram:RateApplicablePercent>{$vat['rate']}</ram:RateApplicablePercent>
</ram:ApplicableTradeTax>

XML;
        }

        return $xml;
    }

    /**
     * Build VAT number
     */
    private function buildVatNumber(
        string $siret
    ): string {

        if (empty($siret)) {
            return '';
        }

        if (strpos($siret, 'FR') === 0) {
            return $siret;
        }

        return 'FR00' . preg_replace(
            '/[^0-9]/',
            '',
            $siret
        );
    }

    /**
     * Build complete XML document
     */
    private function buildDocument(
        object $invoice,
        object $company,
        DateTime $invoiceDate,
        DateTime $dueDate,
        string $lineItemsXml,
        string $taxXml,
        array $totals,
        string $sellerVatId
    ): string {

        $sellerName = htmlspecialchars(
            $company->entreprise ?? '',
            ENT_XML1
        );

        $sellerAddress = htmlspecialchars(
            $company->adresse ?? '',
            ENT_XML1
        );

        $sellerCity = htmlspecialchars(
            $company->ville ?? '',
            ENT_XML1
        );

        $sellerZip = htmlspecialchars(
            $company->codepostal ?? '',
            ENT_XML1
        );

        $sellerCountry = htmlspecialchars(
            $company->pays ?? 'FR',
            ENT_XML1
        );

        $buyerName = htmlspecialchars(
            trim(
                ($invoice->prenom ?? '') .
                ' ' .
                ($invoice->nom ?? '')
            ),
            ENT_XML1
        );

        $invoiceNumber = htmlspecialchars(
            $invoice->num,
            ENT_XML1
        );

        $paymentMethod = htmlspecialchars(
            $invoice->type_paiement ?? '',
            ENT_XML1
        );

        $totalHT = number_format(
            $totals['totalHT'],
            2,
            '.',
            ''
        );

        $totalVAT = number_format(
            $totals['totalVAT'],
            2,
            '.',
            ''
        );

        $totalTTC = number_format(
            $totals['totalTTC'],
            2,
            '.',
            ''
        );

        $invoiceDateFormatted =
            $invoiceDate->format('Ymd');

        $dueDateFormatted =
            $dueDate->format('Ymd');

        return <<<XML
<?xml version="1.0" encoding="UTF-8"?>

<rsm:CrossIndustryInvoice
    xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
    xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:100"
    xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">

    <rsm:ExchangedDocumentContext>
        <ram:GuidelineSpecifiedDocumentContextParameter>
            <ram:ID>
                urn:cen.eu:en16931:2017#conformant#urn:factur-x.eu:1p0:en16931
            </ram:ID>
        </ram:GuidelineSpecifiedDocumentContextParameter>
    </rsm:ExchangedDocumentContext>

    <rsm:ExchangedDocument>
        <ram:ID>{$invoiceNumber}</ram:ID>

        <ram:TypeCode>380</ram:TypeCode>

        <ram:IssueDateTime>
            <udt:DateTimeString format="102">
                {$invoiceDateFormatted}
            </udt:DateTimeString>
        </ram:IssueDateTime>
    </rsm:ExchangedDocument>

    <rsm:SupplyChainTradeTransaction>

        {$lineItemsXml}

        <ram:ApplicableHeaderTradeAgreement>

            <ram:SellerTradeParty>

                <ram:Name>{$sellerName}</ram:Name>

                <ram:PostalTradeAddress>

                    <ram:PostcodeCode>
                        {$sellerZip}
                    </ram:PostcodeCode>

                    <ram:LineOne>
                        {$sellerAddress}
                    </ram:LineOne>

                    <ram:CityName>
                        {$sellerCity}
                    </ram:CityName>

                    <ram:CountryID>
                        {$sellerCountry}
                    </ram:CountryID>

                </ram:PostalTradeAddress>

                <ram:SpecifiedTaxRegistration>
                    <ram:ID schemeID="VA">
                        {$sellerVatId}
                    </ram:ID>
                </ram:SpecifiedTaxRegistration>

            </ram:SellerTradeParty>

            <ram:BuyerTradeParty>
                <ram:Name>{$buyerName}</ram:Name>
            </ram:BuyerTradeParty>

        </ram:ApplicableHeaderTradeAgreement>

        <ram:ApplicableHeaderTradeDelivery/>

        <ram:ApplicableHeaderTradeSettlement>

            <ram:PaymentReference>
                {$invoiceNumber}
            </ram:PaymentReference>

            <ram:TaxCurrencyCode>
                EUR
            </ram:TaxCurrencyCode>

            <ram:InvoiceCurrencyCode>
                EUR
            </ram:InvoiceCurrencyCode>

            <ram:SpecifiedTradePaymentTerms>

                <ram:Description>
                    {$paymentMethod}
                </ram:Description>

                <ram:DueDateDateTime>
                    <udt:DateTimeString format="102">
                        {$dueDateFormatted}
                    </udt:DateTimeString>
                </ram:DueDateDateTime>

            </ram:SpecifiedTradePaymentTerms>

            {$taxXml}

            <ram:SpecifiedTradeSettlementHeaderMonetarySummation>

                <ram:LineTotalAmount>
                    {$totalHT}
                </ram:LineTotalAmount>

                <ram:TaxBasisTotalAmount>
                    {$totalHT}
                </ram:TaxBasisTotalAmount>

                <ram:TaxTotalAmount currencyID="EUR">
                    {$totalVAT}
                </ram:TaxTotalAmount>

                <ram:GrandTotalAmount>
                    {$totalTTC}
                </ram:GrandTotalAmount>

                <ram:DuePayableAmount>
                    {$totalTTC}
                </ram:DuePayableAmount>

            </ram:SpecifiedTradeSettlementHeaderMonetarySummation>

        </ram:ApplicableHeaderTradeSettlement>

    </rsm:SupplyChainTradeTransaction>

</rsm:CrossIndustryInvoice>
XML;
    }
}