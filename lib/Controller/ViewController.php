<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\TemplateService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class ViewController extends Controller {
	private TemplateService $templateService;

	public function __construct($AppName, IRequest $request, TemplateService $templateService) {
		parent::__construct($AppName, $request);
		$this->templateService = $templateService;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function index() {
		return $this->templateService->page('index');
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function devis() {
		return $this->templateService->page('devis');
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function facture() {
		return $this->templateService->page('facture');
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function produit() {
		return $this->templateService->page('produit');
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function statistique() {
		return $this->templateService->page('statistique');
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function legalnotice($page = null) {
		return $this->templateService->legalnotice('content/legalnotice');
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function france() {
		return $this->templateService->legalnotice('legalnotice/france');
	}
}
