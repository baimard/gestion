<?php
namespace OCA\Gestion\Service;

use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\TemplateResponse;

class TemplateService {
	private $userId;
	private CompanyService $companyService;
	private DataService $dataService;
	private FileService $fileService;
	private NavigationService $navigationService;
	private ContentSecurityPolicy $csp;

	public function __construct(
		$UserId,
		CompanyService $companyService,
		DataService $dataService,
		FileService $fileService,
		NavigationService $navigationService,
		ContentSecurityPolicy $csp
	) {
		$this->userId = $UserId;
		$this->companyService = $companyService;
		$this->dataService = $dataService;
		$this->fileService = $fileService;
		$this->navigationService = $navigationService;
		$this->csp = $csp;
	}

	private function baseParams(): array {
		return [
			'path' => $this->userId,
			'url' => $this->navigationService->getNavigationLink(),
			'CompaniesList' => $this->companyService->getCompaniesList(),
			'CurrentCompany' => $this->companyService->getCurrentCompany(),
		];
	}

	public function page($template): TemplateResponse {
		return new TemplateResponse('gestion', $template, $this->baseParams());
	}

	public function legalnotice($page): TemplateResponse {
		return new TemplateResponse('gestion', 'legalnotice', array_merge(['page' => $page], $this->baseParams()));
	}

	public function config(): TemplateResponse {
		$this->companyService->ensureConfigExists();

		$response = new TemplateResponse('gestion', 'configuration', array_merge(
			$this->baseParams(),
			['shareUsers' => $this->companyService->getShareUsers()]
		));

		$response->setContentSecurityPolicy($this->csp);
		return $response;
	}

	public function devisshow($numdevis): TemplateResponse {
		$devis = $this->dataService->getOneDevis($numdevis);
		$produits = $this->dataService->getProduitsById($numdevis);

		return new TemplateResponse('gestion', 'devisshow', array_merge([
			'configuration' => $this->dataService->getConfiguration(),
			'devis' => json_decode($devis),
			'produit' => json_decode($produits),
			'logo' => $this->fileService->getLogo($this->companyService->getCurrentCompany() . 'logo.png'),
			'logo_header' => $this->fileService->getLogo($this->companyService->getCurrentCompany() . 'logo_header.png'),
			'logo_footer' => $this->fileService->getLogo($this->companyService->getCurrentCompany() . 'logo_footer.png'),
		], $this->baseParams()));
	}

	public function factureshow($numfacture): TemplateResponse {
		$facture = $this->dataService->getOneFacture($numfacture);

		return new TemplateResponse('gestion', 'factureshow', array_merge([
			'configuration' => $this->dataService->getConfiguration(),
			'facture' => json_decode($facture),
			'logo' => $this->fileService->getLogo($this->companyService->getCurrentCompany() . 'logo.png'),
			'logo_header' => $this->fileService->getLogo($this->companyService->getCurrentCompany() . 'logo_header.png'),
			'logo_footer' => $this->fileService->getLogo($this->companyService->getCurrentCompany() . 'logo_footer.png'),
		], $this->baseParams()));
	}
}
