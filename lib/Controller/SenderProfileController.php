<?php

declare(strict_types=1);

namespace OCA\Gestion\Controller;

use OCA\Gestion\Db\Bdd;
use OCA\Gestion\Service\CompanyService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\AppFramework\Http\DataResponse;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUserSession;

class SenderProfileController extends Controller {
    public function __construct(
        string $appName,
        IRequest $request,
        private Bdd $db,
        private CompanyService $companies,
        private IL10N $l,
        private IUserSession $session
    ) {
        parent::__construct($appName, $request);
    }

    #[NoAdminRequired]
    #[UseSession]
    public function save(int $company, string $id, ?array $profile = null): DataResponse {
        try {
            if ($company < 1 || $company !== (int)$this->companies->getCurrentCompany() || !$this->companies->ownsCompany($company)) {
                return new DataResponse(['message' => $this->l->t('Only the company owner can manage sender profiles.')], 403);
            }
            $this->db->saveSenderProfile($company, $this->session->getUser()?->getUID() ?? '', $id, $profile);
            return new DataResponse([]);
        } catch (\DomainException $e) {
            return new DataResponse(['message' => $this->l->t('A quote uses this profile. Keep it for existing documents or create another profile.')], 409);
        } catch (\InvalidArgumentException $e) {
            return new DataResponse(['message' => $this->l->t('Check the profile name, contact details, PNG limits and the maximum of 12 profiles.')], 400);
        }
    }

    #[NoAdminRequired]
    #[UseSession]
    public function select(int $company, int $quote, string $id): DataResponse {
        try {
            if ($company < 1 || $company !== (int)$this->companies->getCurrentCompany()) {
                return new DataResponse(['message' => $this->l->t('Select the company that owns this quote.')], 403);
            }
            $this->db->setQuoteSenderProfile($company, $quote, $id);
            return new DataResponse([]);
        } catch (\DomainException $e) {
            return new DataResponse(['message' => $this->l->t('The quote cannot be edited. Check company access and document status.')], 409);
        } catch (\InvalidArgumentException $e) {
            return new DataResponse(['message' => $this->l->t('The quote or sender profile could not be found in this company.')], 404);
        }
    }
}
