<?php

declare(strict_types=1);

namespace OCA\Gestion\Service;

use OCA\Gestion\Db\Bdd;
use OCP\IL10N;

final class DocumentTemplateService {
    public function __construct(
        private Bdd $db,
        private CompanyService $companyService,
        private IL10N $l,
        private $UserId = null,
    ) {
    }

    /** @return array<string, mixed> */
    public function pageData(): array {
        $company = (int)$this->companyService->getCurrentCompany();
        if ($company < 1) {
            return ['templates' => [], 'canManageTemplates' => false, 'templateBlocks' => []];
        }
        $configuration = $this->db->getDocumentTemplateConfiguration($company);
        return [
            'templates' => [
                'quote' => $this->decode('quote', $configuration),
                'invoice' => $this->decode('invoice', $configuration),
            ],
            'templateDefaults' => [
                'quote' => DocumentTemplatePolicy::defaultLayout('quote'),
                'invoice' => DocumentTemplatePolicy::defaultLayout('invoice'),
            ],
            'canManageTemplates' => $this->companyService->ownsCompany($company),
            'templateBlocks' => $this->labels(),
        ];
    }

    /** @return array{layout: array<int, array{id: string, visible: bool}>, css: string, scopedCss: string} */
    public function forDocument(string $type): array {
        $company = (int)$this->companyService->getCurrentCompany();
        if ($company < 1) {
            return ['layout' => DocumentTemplatePolicy::defaultLayout($type), 'css' => '', 'scopedCss' => ''];
        }
        return $this->decode($type, $this->db->getDocumentTemplateConfiguration($company));
    }

    public function save(string $type, array $layout, string $css): array {
        $company = (int)$this->companyService->getCurrentCompany();
        if ($company < 1 || !$this->companyService->ownsCompany($company) || !is_string($this->UserId) || $this->UserId === '') {
            throw new \DomainException('Only the company owner can manage document templates.');
        }
        $layout = DocumentTemplatePolicy::normalizeLayout($type, $layout);
        $css = DocumentTemplatePolicy::sanitizeCss($css);
        $encoded = json_encode($layout, JSON_THROW_ON_ERROR);
        $this->db->saveDocumentTemplate($company, $this->UserId, $type, $encoded, $css);
        return ['layout' => $layout, 'css' => $css];
    }

    /** @return array{layout: array<int, array{id: string, visible: bool}>, css: string, scopedCss: string} */
    private function decode(string $type, array $configuration): array {
        $layoutKey = $type . '_template_layout';
        $cssKey = $type . '_template_css';
        try {
            $layout = empty($configuration[$layoutKey])
                ? DocumentTemplatePolicy::defaultLayout($type)
                : DocumentTemplatePolicy::normalizeLayout($type, (string)$configuration[$layoutKey]);
        } catch (\InvalidArgumentException) {
            $layout = DocumentTemplatePolicy::defaultLayout($type);
        }
        try {
            $css = DocumentTemplatePolicy::sanitizeCss((string)($configuration[$cssKey] ?? ''));
        } catch (\InvalidArgumentException) {
            $css = '';
        }
        return ['layout' => $layout, 'css' => $css, 'scopedCss' => DocumentTemplatePolicy::scopeCss($css)];
    }

    /** @return array<string, string> */
    private function labels(): array {
        return [
            'header_logo' => $this->l->t('Header logo'),
            'parties' => $this->l->t('Issuer and recipient'),
            'details' => $this->l->t('Document details'),
            'comment' => $this->l->t('Comment'),
            'products' => $this->l->t('Products'),
            'vat_totals' => $this->l->t('VAT totals'),
            'grand_totals' => $this->l->t('Grand totals'),
            'legal_notice' => $this->l->t('Legal notice'),
            'footer_logo' => $this->l->t('Footer logo'),
            'issuer_details' => $this->l->t('Issuer legal details'),
            'signature' => $this->l->t('Approval and signature'),
        ];
    }
}
