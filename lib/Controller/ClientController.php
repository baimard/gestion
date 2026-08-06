<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\DataService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class ClientController extends Controller {
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
	public function getClients() {
		return $this->dataService->getClients();
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $id
	 * @UseSession
	 */
	#[UseSession]
	public function getClient($id) {
		return $this->dataService->getClient($id);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $id
	 * @UseSession
	 */
	#[UseSession]
	public function getClientbyiddevis($id) {
		return $this->dataService->getClientbyiddevis($id);
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 */
	#[UseSession]
	public function insertClient() {
		return $this->dataService->insertClient();
	}
}
