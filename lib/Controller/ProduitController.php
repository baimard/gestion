<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\DataService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class ProduitController extends Controller {
	private DataService $dataService;

	public function __construct($AppName, IRequest $request, DataService $dataService) {
		parent::__construct($AppName, $request);
		$this->dataService = $dataService;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function getProduits() {
		return $this->dataService->getProduits();
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $numdevis
	 * @UseSession
	 */
	#[UseSession]
	public function getProduitsById($numdevis) {
		return $this->dataService->getProduitsById($numdevis);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function insertProduit() {
		return $this->dataService->insertProduit();
	}
}
