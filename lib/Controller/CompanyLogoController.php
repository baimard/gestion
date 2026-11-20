<?php

declare(strict_types=1);

namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\CompanyService;
use OCA\Gestion\Service\FileService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\AppFramework\Http\DataResponse;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IRequest;

class CompanyLogoController extends Controller {
    public function __construct(
        string $appName,
        IRequest $request,
        private CompanyService $companies,
        private FileService $files,
        private IL10N $l
    ) {
        parent::__construct($appName, $request);
    }

    #[NoAdminRequired]
    #[UseSession]
    public function save(int $company, string $position, string $image): DataResponse {
        try {
            if ($company < 1 || $company !== (int)$this->companies->getCurrentCompany() || !$this->companies->ownsCompany($company)) {
                throw new \DomainException('Company ownership required.');
            }
            $this->files->saveCompanyLogo($company, $position, $image);
            return new DataResponse([]);
        } catch (\DomainException $e) {
            return new DataResponse(['message' => $this->l->t('Only the company owner can manage company logos.')], 403);
        } catch (\InvalidArgumentException $e) {
            return new DataResponse(['message' => $this->l->t('Choose a valid PNG or JPEG up to 5 MiB and 20 megapixels. The longest side must be at least 64 pixels and the shortest at least 16 pixels after resizing.')], 400);
        } catch (NotFoundException | NotPermittedException $e) {
            return new DataResponse(['message' => $this->l->t('Unable to save the logo in your .gestion folder.')], 409);
        }
    }
}
