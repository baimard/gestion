<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\DataService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\AppFramework\Http\DataResponse;
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
	 * @UseSession
	 */
	#[UseSession]
	public function insertProduit() {
		return $this->dataService->insertProduit();
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 */
	#[UseSession]
	public function getVatExemptionReasons(): DataResponse {
		return new DataResponse($this->dataService->getVatExemptionReasons());
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 */
	#[UseSession]
	public function updateVatExemptionReason(string $id, string $code): DataResponse {
		try {
			return new DataResponse(
				$this->dataService->updateProductVatExemptionReason($id, $code)
			);
		} catch (\InvalidArgumentException $e) {
			return new DataResponse(['message' => $e->getMessage()], 400);
		} catch (\RuntimeException $e) {
			return new DataResponse(['message' => $e->getMessage()], 409);
		}
	}
}
