<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\PdfService;
use OCA\Gestion\Service\DataService;
use OCA\Gestion\Service\PersonalMailService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class PdfController extends Controller {
	private PdfService $pdfService;

	public function __construct($AppName, IRequest $request, PdfService $pdfService, PersonalMailService $personalMailService, private DataService $dataService) {
		parent::__construct($AppName, $request);
		$this->pdfService = $pdfService;
		$this->personalMailService = $personalMailService;
	}

	private PersonalMailService $personalMailService;

	#[NoAdminRequired]
	#[UseSession]
	public function personalMailStatus(): DataResponse {
		return new DataResponse($this->personalMailService->getStatus());
	}

	#[NoAdminRequired]
	#[UseSession]
	public function sendPersonalMail(string $html, string $name, string $subject, string $body, string $to, string $table, int $documentId): DataResponse {
        $documentLocked = false;
		try {
            $documentLocked = $this->dataService->prepareDocumentForSending($table, $documentId);
			$this->personalMailService->sendPdf(
				$this->pdfService->renderPdf($html),
				$name,
				$subject,
				$body,
				$to,
			);
			return new DataResponse(['status' => 'success', 'documentLocked' => $documentLocked]);
		} catch (\Throwable $e) {
			return new DataResponse(['status' => 'error', 'message' => $e->getMessage(), 'documentLocked' => $documentLocked], 400);
		}
	}

	/**
	 * @NoAdminRequired
	 * @param string $content
	 * @param string $name
	 * @param string $subject
	 * @param string $body
	 * @param string $to
	 * @param string $Cc
	 * @UseSession
	 */
	#[UseSession]
	public function sendPDF($content, $name, $subject, $body, $to, $Cc, string $table, int $documentId) {
        $this->dataService->prepareDocumentForSending($table, $documentId);
		return $this->pdfService->sendPDF($content, $name, $subject, $body, $to, $Cc);
	}

	/**
	 * @NoAdminRequired
	 * @param string $content
	 * @param string $folder
	 * @param string $name
	 * @UseSession
	 */
	#[UseSession]
	public function savePDF($content, $folder, $name) {
		$this->pdfService->savePDF($content, $folder, $name);
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 * @param string $html
	 * @param string $name
	 * @param string $folder
	 * @return void
	 */
	#[UseSession]
	public function generatePDF($html, $name, $folder) {
		return $this->pdfService->generatePDF($html, $name, $folder);
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 *
	 * @param string $html
	 * @param string $name
	 * @param string $folder
	 * @param int $factureId
	 */
	#[UseSession]
	public function generateFacturX(string $html, string $name, string $folder, int $factureId) {
		return $this->pdfService->generateFacturX($html, $name, $folder, $factureId);
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 *
	 * @param int $factureId
	 * @param string $name
	 * @param string $folder
	 */
	#[UseSession]
	public function generateFacturXml(int $factureId, string $name, string $folder) {
		return $this->pdfService->generateFacturXml($factureId, $name, $folder);
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 *
	 * @param string $html
	 * @param string $name
	 * @param int $factureId
	 */
	#[UseSession]
	public function sendFacturXToIopole(string $html, string $name, int $factureId) {
        $documentLocked = false;
        try {
            $this->dataService->lockDocument('facture', $factureId);
            $documentLocked = true;
            $response = $this->pdfService->sendFacturXToIopole($html, $name, $factureId);
            $data = $response->getData();
            $data['documentLocked'] = true;
            $response->setData($data);
            return $response;
        } catch (\Throwable $e) {
            return new DataResponse(['status' => 'error', 'message' => $e->getMessage(), 'documentLocked' => $documentLocked], 400);
        }
	}
}
