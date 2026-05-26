<?php
namespace OCA\Gestion\Service;

require_once __DIR__ . '/../../vendor/autoload.php';

use Exception;
use Mpdf\Mpdf;
use OCA\Gestion\Controller\GestionFacturXWriter;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\Mail\IMailer;

class PdfService {
	private IMailer $mailer;
	private FileService $fileService;
	private DataService $dataService;

	public function __construct(IMailer $mailer, FileService $fileService, DataService $dataService) {
		$this->mailer = $mailer;
		$this->fileService = $fileService;
		$this->dataService = $dataService;
	}

	public function sendPDF($content, $name, $subject, $body, $to, $Cc): DataResponse {
		$clean_name = html_entity_decode($name);

		try {
			$data = base64_decode($content);
			$message = $this->mailer->createMessage();
			$message->setSubject($subject);
			$message->setTo((array) json_decode($to));
			$myrrCc = (array) json_decode($Cc);
			if ($myrrCc[0] != "") {
				$message->setCc($myrrCc);
			}
			$message->setBody($body, 'text/html');
			$AttachementPDF = $this->mailer->createAttachment($data, $clean_name . ".pdf", "application/pdf");
			$message->attach($AttachementPDF);

			$this->mailer->send($message);
			return new DataResponse("", 200, ['Content-Type' => 'application/json']);
		} catch (Exception $e) {
			return new DataResponse("Is your global mail server configured in Nextcloud ?", 500, ['Content-Type' => 'application/json']);
		}
	}

	public function savePDF($content, $folder, $name): void {
		$this->fileService->savePDF($content, $folder, $name);
	}

	public function generatePDF($html, $name, $folder) {
		try {
			$mpdf = new Mpdf([
				'mode' => 'utf-8',
				'format' => 'A4',
				'margin_top' => 10,
				'margin_bottom' => 10,
				'margin_left' => 10,
				'margin_right' => 10,
				'tempDir' => '/tmp',
			]);

			$css = file_get_contents(__DIR__ . '/../../css/style.css');

			$mpdf->WriteHTML($css, \Mpdf\HTMLParserMode::HEADER_CSS);
			$mpdf->WriteHTML($html, \Mpdf\HTMLParserMode::HTML_BODY);

			$pdfContent = $mpdf->Output('', \Mpdf\Output\Destination::STRING_RETURN);
			$encoded = base64_encode($pdfContent);
			$this->savePDF($encoded, $folder, $name);

			return new DataDownloadResponse(
				$pdfContent,
				$name . '.pdf',
				'application/pdf'
			);
		} catch (\Mpdf\MpdfException $e) {
			return new DataResponse([
				'status' => 'error',
				'message' => $e->getMessage()
			], 500);
		}
	}

	public function generateFacturX(string $html, string $name, string $folder, int $factureId) {
		try {
			$facturxXml = $this->buildFacturXml($factureId);
			if ($facturxXml instanceof DataResponse) {
				return $facturxXml;
			}

			$pdfContent = $this->renderPdf($html);
			$writer = new GestionFacturXWriter();
			$facturxPdfContent = $writer->generate($pdfContent, $facturxXml, null, false);

			$cleanName = html_entity_decode($name);
			$this->fileService->saveContent($facturxPdfContent, $folder, $cleanName);

			return new DataDownloadResponse(
				$facturxPdfContent,
				$cleanName,
				'application/pdf'
			);
		} catch (Exception $e) {
			return new DataResponse([
				'status' => 'error',
				'message' => $e->getMessage(),
			], 500);
		}
	}

	public function generateFacturXml(int $factureId, string $name, string $folder) {
		try {
			$facturxXml = $this->buildFacturXml($factureId);
			if ($facturxXml instanceof DataResponse) {
				return $facturxXml;
			}

			$xmlFileName = html_entity_decode($name);
			$this->fileService->saveContent($facturxXml, $folder, $xmlFileName);

			return new DataDownloadResponse(
				$facturxXml,
				$xmlFileName,
				'application/xml'
			);
		} catch (Exception $e) {
			return new DataResponse([
				'status' => 'error',
				'message' => $e->getMessage(),
			], 500);
		}
	}

	private function renderPdf($html): string {
		$mpdf = new Mpdf([
			'mode' => 'utf-8',
			'format' => 'A4',
			'margin_top' => 10,
			'margin_bottom' => 10,
			'margin_left' => 10,
			'margin_right' => 10,
			'tempDir' => '/tmp',
		]);

		$css = file_get_contents(__DIR__ . '/../../css/style.css');

		$mpdf->WriteHTML($css, \Mpdf\HTMLParserMode::HEADER_CSS);
		$mpdf->WriteHTML($html, \Mpdf\HTMLParserMode::HTML_BODY);

		return $mpdf->Output('', \Mpdf\Output\Destination::STRING_RETURN);
	}

	private function buildFacturXml(int $factureId) {
		$factureRows = json_decode($this->dataService->getOneFacture($factureId));
		$configRows = json_decode($this->dataService->getConfiguration());

		if (empty($factureRows) || empty($configRows)) {
			return new DataResponse(['status' => 'error', 'message' => 'Facture ou configuration introuvable.'], 404);
		}

		$facture = $factureRows[0];
		$config = $configRows[0];
		$produitsRows = json_decode($this->dataService->getProduitsById($facture->id_devis));

		$vatLines = [];
		$totalHT = 0.0;

		foreach ($produitsRows as $p) {
			$lineTotal = (float)$p->prix_unitaire * (float)$p->quantite;
			$totalHT += $lineTotal;
			$vatRate = isset($p->vat) ? (float)$p->vat : 20.0;
			$key = number_format($vatRate, 2);
			if (!isset($vatLines[$key])) {
				$vatLines[$key] = ['rate' => $vatRate, 'base' => 0.0, 'amount' => 0.0];
			}
			$vatLines[$key]['base'] += $lineTotal;
			$vatLines[$key]['amount'] += $lineTotal * $vatRate / 100;
		}

		$totalVAT = array_sum(array_column($vatLines, 'amount'));
		$totalTTC = $totalHT + $totalVAT;

		$invoiceDate = new \DateTime($facture->date);
		$dueDate = new \DateTime($facture->date_paiement);
		$invoiceDateFormatted = $invoiceDate->format('Ymd');
		$dueDateFormatted = $dueDate->format('Ymd');

		$sellerVatId = '';
		if (!empty($config->siret)) {
			$sellerVatId = (strpos($config->siret, 'FR') === 0)
				? $config->siret
				: 'FR00' . preg_replace('/[^0-9]/', '', $config->siret);
		}

		$lineItemsXml = '';
		$lineNum = 1;
		foreach ($produitsRows as $p) {
			$lineTotal = round((float)$p->prix_unitaire * (float)$p->quantite, 4);
			$vatRate = isset($p->vat) ? (float)$p->vat : 20.0;
			$designation = htmlspecialchars($p->description ?? $p->reference ?? '', ENT_XML1);
			$lineItemsXml .= <<<XML

	<ram:IncludedSupplyChainTradeLineItem>
		<ram:AssociatedDocumentLineDocument>
			<ram:LineID>{$lineNum}</ram:LineID>
		</ram:AssociatedDocumentLineDocument>
		<ram:SpecifiedTradeProduct>
			<ram:Name>{$designation}</ram:Name>
		</ram:SpecifiedTradeProduct>
		<ram:SpecifiedLineTradeAgreement>
			<ram:NetPriceProductTradePrice>
				<ram:ChargeAmount>{$p->prix_unitaire}</ram:ChargeAmount>
			</ram:NetPriceProductTradePrice>
		</ram:SpecifiedLineTradeAgreement>
		<ram:SpecifiedLineTradeDelivery>
			<ram:BilledQuantity unitCode="C62">{$p->quantite}</ram:BilledQuantity>
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
			$lineNum++;
		}

		$taxXml = '';
		foreach ($vatLines as $vl) {
			$taxXml .= <<<XML

	<ram:ApplicableTradeTax>
		<ram:CalculatedAmount>{$vl['amount']}</ram:CalculatedAmount>
		<ram:TypeCode>VAT</ram:TypeCode>
		<ram:BasisAmount>{$vl['base']}</ram:BasisAmount>
		<ram:CategoryCode>S</ram:CategoryCode>
		<ram:RateApplicablePercent>{$vl['rate']}</ram:RateApplicablePercent>
	</ram:ApplicableTradeTax>
XML;
		}

		$sellerName = htmlspecialchars($config->entreprise ?? '', ENT_XML1);
		$sellerAddress = htmlspecialchars($config->adresse ?? '', ENT_XML1);
		$sellerCity = htmlspecialchars($config->ville ?? '', ENT_XML1);
		$sellerZip = htmlspecialchars($config->codepostal ?? '', ENT_XML1);
		$sellerCountry = htmlspecialchars($config->pays ?? 'FR', ENT_XML1);
		$buyerName = htmlspecialchars(trim(($facture->prenom ?? '') . ' ' . ($facture->nom ?? '')), ENT_XML1);
		$invoiceNum = htmlspecialchars($facture->num, ENT_XML1);
		$paymentMeans = htmlspecialchars($facture->type_paiement ?? '', ENT_XML1);

		$totalHTFmt = number_format($totalHT, 2, '.', '');
		$totalVATFmt = number_format($totalVAT, 2, '.', '');
		$totalTTCFmt = number_format($totalTTC, 2, '.', '');

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
			<ram:ID>urn:cen.eu:en16931:2017#conformant#urn:factur-x.eu:1p0:en16931</ram:ID>
		</ram:GuidelineSpecifiedDocumentContextParameter>
	</rsm:ExchangedDocumentContext>
	<rsm:ExchangedDocument>
		<ram:ID>{$invoiceNum}</ram:ID>
		<ram:TypeCode>380</ram:TypeCode>
		<ram:IssueDateTime>
			<udt:DateTimeString format="102">{$invoiceDateFormatted}</udt:DateTimeString>
		</ram:IssueDateTime>
	</rsm:ExchangedDocument>
	<rsm:SupplyChainTradeTransaction>
		{$lineItemsXml}
		<ram:ApplicableHeaderTradeAgreement>
			<ram:SellerTradeParty>
				<ram:Name>{$sellerName}</ram:Name>
				<ram:PostalTradeAddress>
					<ram:PostcodeCode>{$sellerZip}</ram:PostcodeCode>
					<ram:LineOne>{$sellerAddress}</ram:LineOne>
					<ram:CityName>{$sellerCity}</ram:CityName>
					<ram:CountryID>{$sellerCountry}</ram:CountryID>
				</ram:PostalTradeAddress>
				<ram:SpecifiedTaxRegistration>
					<ram:ID schemeID="VA">{$sellerVatId}</ram:ID>
				</ram:SpecifiedTaxRegistration>
			</ram:SellerTradeParty>
			<ram:BuyerTradeParty>
				<ram:Name>{$buyerName}</ram:Name>
			</ram:BuyerTradeParty>
		</ram:ApplicableHeaderTradeAgreement>
		<ram:ApplicableHeaderTradeDelivery/>
		<ram:ApplicableHeaderTradeSettlement>
			<ram:PaymentReference>{$invoiceNum}</ram:PaymentReference>
			<ram:TaxCurrencyCode>EUR</ram:TaxCurrencyCode>
			<ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>
			<ram:SpecifiedTradePaymentTerms>
				<ram:Description>{$paymentMeans}</ram:Description>
				<ram:DueDateDateTime>
					<udt:DateTimeString format="102">{$dueDateFormatted}</udt:DateTimeString>
				</ram:DueDateDateTime>
			</ram:SpecifiedTradePaymentTerms>
			{$taxXml}
			<ram:SpecifiedTradeSettlementHeaderMonetarySummation>
				<ram:LineTotalAmount>{$totalHTFmt}</ram:LineTotalAmount>
				<ram:TaxBasisTotalAmount>{$totalHTFmt}</ram:TaxBasisTotalAmount>
				<ram:TaxTotalAmount currencyID="EUR">{$totalVATFmt}</ram:TaxTotalAmount>
				<ram:GrandTotalAmount>{$totalTTCFmt}</ram:GrandTotalAmount>
				<ram:DuePayableAmount>{$totalTTCFmt}</ram:DuePayableAmount>
			</ram:SpecifiedTradeSettlementHeaderMonetarySummation>
		</ram:ApplicableHeaderTradeSettlement>
	</rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>
XML;
	}
}
