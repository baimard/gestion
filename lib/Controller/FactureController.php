<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\DataService;
use OCA\Gestion\Service\TemplateService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class FactureController extends Controller {
	private DataService $dataService;
	private TemplateService $templateService;

	public function __construct($AppName, IRequest $request, DataService $dataService, TemplateService $templateService) {
		parent::__construct($AppName, $request);
		$this->dataService = $dataService;
		$this->templateService = $templateService;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function getFactures() {
		return $this->dataService->getFactures();
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $numfacture
	 * @UseSession
	 */
	#[UseSession]
	public function factureshow($numfacture) {
		return $this->templateService->factureshow($numfacture);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function insertFacture() {
		return $this->dataService->insertFacture();
	}
}
