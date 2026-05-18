<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\CompanyService;
use OCA\Gestion\Service\DataService;
use OCA\Gestion\Service\TemplateService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class ConfigurationController extends Controller {
	private TemplateService $templateService;
	private DataService $dataService;
	private CompanyService $companyService;

	public function __construct($AppName, IRequest $request, TemplateService $templateService, DataService $dataService, CompanyService $companyService) {
		parent::__construct($AppName, $request);
		$this->templateService = $templateService;
		$this->dataService = $dataService;
		$this->companyService = $companyService;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function config() {
		return $this->templateService->config();
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function isConfig() {
		return $this->companyService->isConfig();
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function getConfiguration() {
		return $this->dataService->getConfiguration();
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $table
	 * @param string $column
	 * @param string $data
	 * @param string $id
	 * @UseSession
	 */
	#[UseSession]
	public function updateConfiguration($table, $column, $data, $id) {
		return $this->dataService->updateConfiguration($table, $column, $data, $id);
	}
}
