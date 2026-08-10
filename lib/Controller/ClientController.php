<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\DataService;
use OCA\Gestion\Service\ContactImportService;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class ClientController extends Controller {
	private DataService $dataService;

	public function __construct($AppName, IRequest $request, DataService $dataService, ContactImportService $contactImportService) {
		parent::__construct($AppName, $request);
		$this->dataService = $dataService;
		$this->contactImportService = $contactImportService;
	}
	private ContactImportService $contactImportService;

	/** @NoAdminRequired */
	#[UseSession]
	public function contacts(): DataResponse {
		return new DataResponse($this->contactImportService->list());
	}

	/** @NoAdminRequired */
	#[UseSession]
	public function importContact(array $contact): DataResponse {
		$this->dataService->insertContactClient($contact);
		return new DataResponse(['status' => 'success']);
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
