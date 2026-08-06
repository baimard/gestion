<?php

namespace OCA\Gestion\Service;

require_once __DIR__ . '/../../vendor/autoload.php';

use Exception;
use Mpdf\Mpdf;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\Mail\IMailer;

class PdfService {

	private IMailer $mailer;
	private FileService $fileService;
	private DataService $dataService;
	private IopoleService $iopoleService;
	private FacturXService $facturXService;

	public function __construct(
		IMailer $mailer,
		FileService $fileService,
		DataService $dataService,
		IopoleService $iopoleService,
		FacturXService $facturXService
	) {
		$this->mailer = $mailer;
		$this->fileService = $fileService;
		$this->dataService = $dataService;
		$this->iopoleService = $iopoleService;
		$this->facturXService = $facturXService;
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

			$AttachementPDF = $this->mailer->createAttachment(
				$data,
				$clean_name . ".pdf",
				"application/pdf"
			);

			$message->attach($AttachementPDF);

			$this->mailer->send($message);

			return new DataResponse("", 200, [
				'Content-Type' => 'application/json'
			]);

		} catch (Exception $e) {

			return new DataResponse(
				"Is your global mail server configured in Nextcloud ?",
				500,
				['Content-Type' => 'application/json']
			);
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

			$css = file_get_contents(__DIR__ . '/../../css/pdf.css');

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

	public function generateFacturX(
		string $html,
		string $name,
		string $folder,
		int $factureId
	) {

		try {

			$facturxXml = $this->buildFacturXml($factureId);

			if ($facturxXml instanceof DataResponse) {
				return $facturxXml;
			}

			$pdfContent = $this->renderPdf($html);

			$facturxPdfContent = $this->facturXService->generateFacturXPdf(
				$pdfContent,
				$facturxXml
			);

			$cleanName = html_entity_decode($name);

			$this->fileService->saveContent(
				$facturxPdfContent,
				$folder,
				$cleanName
			);

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

	public function sendFacturXToIopole(
		string $html,
		string $name,
		int $factureId
	): DataResponse {

		try {

			$facturxPdfContent = $this->buildFacturXPdfContent(
				$html,
				$factureId
			);

			$payload = $this->iopoleService->sendInvoice(
				$facturxPdfContent,
				html_entity_decode($name)
			);

			return new DataResponse([
				'status' => 'success',
				'iopoleInvoiceId' => $payload['id'],
				'iopoleResponse' => $payload,
			]);

		} catch (Exception $e) {

			return new DataResponse([
				'status' => 'error',
				'message' => $e->getMessage(),
			], 500);
		}
	}

	public function generateFacturXml(
		int $factureId,
		string $name,
		string $folder
	) {

		try {

			$facturxXml = $this->buildFacturXml($factureId);

			if ($facturxXml instanceof DataResponse) {
				return $facturxXml;
			}

			$xmlFileName = html_entity_decode($name);

			$this->fileService->saveContent(
				$facturxXml,
				$folder,
				$xmlFileName
			);

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

		$css = file_get_contents(__DIR__ . '/../../css/pdf.css');

		$mpdf->WriteHTML($css, \Mpdf\HTMLParserMode::HEADER_CSS);
		$mpdf->WriteHTML($html, \Mpdf\HTMLParserMode::HTML_BODY);

		return $mpdf->Output('', \Mpdf\Output\Destination::STRING_RETURN);
	}

	private function buildFacturXPdfContent(
		string $html,
		int $factureId
	): string {
		$facturxXml = $this->buildFacturXml($factureId);

		if ($facturxXml instanceof DataResponse) {
			throw new Exception($facturxXml->getData()['message'] ?? 'Unable to build Factur-X XML.');
		}

		$pdfContent = $this->renderPdf($html);

		return $this->facturXService->generateFacturXPdf(
			$pdfContent,
			$facturxXml
		);
	}

	private function buildFacturXml(int $factureId) {
		$factureRows = json_decode(
			$this->dataService->getOneFacture($factureId)
		);
		$configRows = json_decode(
			$this->dataService->getConfiguration()
		);

		if (empty($factureRows) || empty($configRows)) {
			return new DataResponse([
				'status' => 'error',
				'message' => 'Unable to find the invoice or configuration.',
			], 404);
		}

		$invoice = $factureRows[0];
		$products = json_decode(
			$this->dataService->getProduitsById($invoice->id_devis)
		);

		return $this->facturXService->buildXml(
			$invoice,
			$configRows[0],
			$products ?? [],
			$invoice
		);
	}
}
