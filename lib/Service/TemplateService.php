<?php
namespace OCA\Gestion\Service;

use OCA\Gestion\Db\Bdd;
use OCP\App\IAppManager;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\TemplateResponse;

class TemplateService {
	private $userId;
	private IAppManager $appManager;
	private CompanyService $companyService;
	private DataService $dataService;
	private FileService $fileService;
	private NavigationService $navigationService;
	private ContentSecurityPolicy $csp;

	public function __construct(
		$UserId,
		IAppManager $appManager,
		CompanyService $companyService,
		DataService $dataService,
		FileService $fileService,
		NavigationService $navigationService,
		ContentSecurityPolicy $csp,
        private AnnouncementService $announcementService,
        private Bdd $db
	) {
		$this->userId = $UserId;
		$this->appManager = $appManager;
		$this->companyService = $companyService;
		$this->dataService = $dataService;
		$this->fileService = $fileService;
		$this->navigationService = $navigationService;
		$this->csp = $csp;
	}

	private function baseParams(): array {
		return [
			'path' => $this->userId,
			'appVersion' => $this->appManager->getAppVersion('gestion'),
            'announcementVersion' => $this->announcementService->pendingVersion(),
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
        $params = $this->baseParams();
        $company = (int)$params['CurrentCompany'];
        $canManageProfiles = $company > 0 && $this->companyService->ownsCompany($company);

		$response = new TemplateResponse('gestion', 'configuration', array_merge(
			$params,
			[
                'shareUsers' => $this->companyService->getShareUsers(),
                'canManageSenderProfiles' => $canManageProfiles,
                'senderProfiles' => $canManageProfiles ? $this->db->getSenderProfiles($company) : [],
            ]
		));

		$response->setContentSecurityPolicy($this->csp);
		return $response;
	}

	public function devisshow($numdevis): TemplateResponse {
		$devis = json_decode($this->dataService->getOneDevis($numdevis));
		$produits = $this->dataService->getProduitsById($numdevis);

		return new TemplateResponse('gestion', 'devisshow', array_merge([
			'configuration' => $this->dataService->getConfiguration(),
			'devis' => $devis,
			'produit' => json_decode($produits),
		], $this->documentSender($devis[0]->sender_profile ?? '', true), $this->baseParams()));
	}

	public function factureshow($numfacture): TemplateResponse {
		$facture = json_decode($this->dataService->getOneFacture($numfacture));

		return new TemplateResponse('gestion', 'factureshow', array_merge([
			'configuration' => $this->dataService->getConfiguration(),
			'facture' => $facture,
		], $this->documentSender($facture[0]->sender_profile ?? '', false), $this->baseParams()));
	}

    private function documentSender(string $id, bool $showChoices): array {
        $company = (int)$this->companyService->getCurrentCompany();
        $profiles = $showChoices || $id !== '' ? $this->db->getSenderProfiles($company) : [];
        $profile = $profiles[$id] ?? [];
        $logo = $profile['logo'] ?? '';
        return [
            'senderProfileId' => $id,
            'senderProfile' => $profile,
            'senderChoices' => $showChoices ? array_map(static fn (array $entry): string => $entry['label'], $profiles) : [],
            'logo' => $logo !== '' ? $logo : $this->fileService->getLogo($company . 'logo.png'),
            'logo_header' => $logo !== '' ? 'nothing' : $this->fileService->getLogo($company . 'logo_header.png'),
            'logo_footer' => $logo !== '' ? 'nothing' : $this->fileService->getLogo($company . 'logo_footer.png'),
        ];
    }
}
