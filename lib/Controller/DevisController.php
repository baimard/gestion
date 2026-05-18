<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\DataService;
use OCA\Gestion\Service\TemplateService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class DevisController extends Controller {
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
	public function getDevis() {
		return $this->dataService->getDevis();
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $numdevis
	 * @UseSession
	 */
	#[UseSession]
	public function devisshow($numdevis) {
		return $this->templateService->devisshow($numdevis);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function insertDevis() {
		return $this->dataService->insertDevis();
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $id
	 * @UseSession
	 */
	#[UseSession]
	public function insertProduitDevis($id) {
		return $this->dataService->insertProduitDevis($id);
	}
}
