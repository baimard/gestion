<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\DataService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class StatsController extends Controller {
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
	public function getStats() {
		return $this->dataService->getStats();
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function getAnnualTurnoverPerMonthNoVat() {
		return $this->dataService->getAnnualTurnoverPerMonthNoVat();
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 */
	#[UseSession]
	public function getServerFromMail() {
		return $this->dataService->getServerFromMail();
	}
}
