<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\PdfService;
use OCA\Gestion\Service\PersonalMailService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class PdfController extends Controller {
	private PdfService $pdfService;

	public function __construct($AppName, IRequest $request, PdfService $pdfService, PersonalMailService $personalMailService) {
		parent::__construct($AppName, $request);
		$this->pdfService = $pdfService;
		$this->personalMailService = $personalMailService;
	}

	private PersonalMailService $personalMailService;

	/** @NoAdminRequired */
	#[UseSession]
	public function personalMailStatus(): DataResponse {
		return new DataResponse($this->personalMailService->getStatus());
	}

	/** @NoAdminRequired */
	#[UseSession]
	public function sendPersonalMail(string $html, string $name, string $subject, string $body, string $to): DataResponse {
		try {
			$this->personalMailService->sendPdf(
				$this->pdfService->renderPdf($html),
				$name,
				$subject,
				$body,
				$to,
			);
			return new DataResponse(['status' => 'success']);
		} catch (\Throwable $e) {
			return new DataResponse(['status' => 'error', 'message' => $e->getMessage()], 400);
		}
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $content
	 * @param string $name
	 * @param string $subject
	 * @param string $body
	 * @param string $to
	 * @param string $Cc
	 * @UseSession
	 */
	#[UseSession]
	public function sendPDF($content, $name, $subject, $body, $to, $Cc) {
		return $this->pdfService->sendPDF($content, $name, $subject, $body, $to, $Cc);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
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
	 * @NoCSRFRequired
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
	 * @NoCSRFRequired
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
		return $this->pdfService->sendFacturXToIopole($html, $name, $factureId);
	}
}
