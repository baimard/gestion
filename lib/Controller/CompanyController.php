<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\CompanyService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class CompanyController extends Controller {
	private CompanyService $companyService;

	public function __construct($AppName, IRequest $request, CompanyService $companyService) {
		parent::__construct($AppName, $request);
		$this->companyService = $companyService;
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 */
	#[UseSession]
	public function createCompany() {
		$this->companyService->createCompany();
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 */
	#[UseSession]
	public function deleteCompany() {
		return $this->companyService->deleteCompany();
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 * @param string $companyID
	 */
	#[UseSession]
	public function setCurrentCompany($companyID) {
		$this->companyService->setCurrentCompany($companyID);
	}

	/**
	 * @NoAdminRequired
	 * @param string $email
	 * @UseSession
	 */
	#[UseSession]
	public function addShareUser($email) {
		return $this->companyService->addShareUser($email);
	}

	/**
	 * @NoAdminRequired
	 * @param string $uid
	 * @UseSession
	 */
	#[UseSession]
	public function delShareUser($uid) {
		return $this->companyService->delShareUser($uid);
	}
}
