<?php

declare(strict_types=1);

namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\DocumentTemplateService;
use OCA\Gestion\Service\TemplateService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use OCP\IL10N;

final class DocumentTemplateController extends Controller {
    public function __construct(
        string $AppName,
        IRequest $request,
        private TemplateService $templateService,
        private DocumentTemplateService $documentTemplateService,
        private IL10N $l,
    ) {
        parent::__construct($AppName, $request);
    }

    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     * @UseSession
     */
    #[UseSession]
    public function index() {
        return $this->templateService->documentTemplates();
    }

    /**
     * @NoAdminRequired
     * @UseSession
     */
    #[UseSession]
    public function save(string $type, array $layout, string $css = ''): DataResponse {
        try {
            return new DataResponse($this->documentTemplateService->save($type, $layout, $css));
        } catch (\DomainException) {
            return new DataResponse(['message' => $this->l->t('Only the company owner can manage document templates.')], 403);
        } catch (\InvalidArgumentException | \JsonException) {
            return new DataResponse(['message' => $this->l->t('The template could not be saved. Check the block order and use only the allowed CSS selectors and properties.')], 400);
        }
    }
}
