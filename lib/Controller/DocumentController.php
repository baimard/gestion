<?php

namespace OCA\Gestion\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

use OCA\Gestion\Db\Bdd;

use OCA\Gestion\Service\CompanyService;
use OCA\Gestion\Service\FacturXService;
use OCA\Gestion\Service\MailService;
use OCA\Gestion\Service\PdfService;
use OCA\Gestion\Service\StorageService;

class DocumentController extends Controller
{
    public function __construct(
        string $appName,
        IRequest $request,

        private Bdd $db,

        private CompanyService $companyService,
        private PdfService $pdfService,
        private StorageService $storageService,
        private FacturXService $facturXService,
        private MailService $mailService
    ) {
        parent::__construct(
            $appName,
            $request
        );
    }

    /**
     * @NoAdminRequired
     */
    #[UseSession]
    public function generatePDF(
        string $html,
        string $name,
        string $folder
    ): DataDownloadResponse|DataResponse {

        try {

            $pdfContent =
                $this->pdfService->generate(
                    $html
                );

            $this->storageService->saveFile(
                $folder,
                $name . '.pdf',
                $pdfContent
            );

            return new DataDownloadResponse(
                $pdfContent,
                $name . '.pdf',
                'application/pdf'
            );

        } catch (\Exception $e) {

            return new DataResponse([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @NoAdminRequired
     */
    #[UseSession]
    public function generateFacturX(
        string $html,
        string $name,
        string $folder,
        int $invoiceId
    ): DataDownloadResponse|DataResponse {

        try {

            $companyId =
                $this->companyService
                    ->getCurrentCompany();

            /*
             |--------------------------------------------------------------------------
             | Load invoice
             |--------------------------------------------------------------------------
             */

            $invoiceRows = json_decode(
                $this->db->getOneFacture(
                    $invoiceId,
                    $companyId
                )
            );

            if (empty($invoiceRows)) {

                return new DataResponse([
                    'status' => 'error',
                    'message' => 'Invoice not found'
                ], 404);
            }

            $invoice = $invoiceRows[0];

            /*
             |--------------------------------------------------------------------------
             | Load company configuration
             |--------------------------------------------------------------------------
             */

            $companyRows = json_decode(
                $this->db->getConfiguration(
                    $companyId
                )
            );

            if (empty($companyRows)) {

                return new DataResponse([
                    'status' => 'error',
                    'message' => 'Company configuration not found'
                ], 404);
            }

            $company = $companyRows[0];

            /*
             |--------------------------------------------------------------------------
             | Load products
             |--------------------------------------------------------------------------
             */

            $products = json_decode(
                $this->db->getListProduit(
                    $invoice->id_devis,
                    $companyId
                )
            );

            /*
             |--------------------------------------------------------------------------
             | Generate PDF
             |--------------------------------------------------------------------------
             */

            $pdfContent =
                $this->pdfService->generate(
                    $html
                );

            /*
             |--------------------------------------------------------------------------
             | Generate XML
             |--------------------------------------------------------------------------
             */

            $xmlContent =
                $this->facturXService->buildXml(
                    $invoice,
                    $company,
                    $products
                );

            /*
             |--------------------------------------------------------------------------
             | Generate Factur-X PDF
             |--------------------------------------------------------------------------
             */

            $facturXPdf =
                $this->facturXService
                    ->generateFacturXPdf(
                        $pdfContent,
                        $xmlContent
                    );

            /*
             |--------------------------------------------------------------------------
             | Save file
             |--------------------------------------------------------------------------
             */

            $this->storageService->saveFile(
                $folder,
                $name,
                $facturXPdf
            );

            /*
             |--------------------------------------------------------------------------
             | Download response
             |--------------------------------------------------------------------------
             */

            return new DataDownloadResponse(
                $facturXPdf,
                $name,
                'application/pdf'
            );

        } catch (\Exception $e) {

            return new DataResponse([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @NoAdminRequired
     */
    #[UseSession]
    public function generateFacturXml(
        int $invoiceId,
        string $name,
        string $folder
    ): DataDownloadResponse|DataResponse {

        try {

            $companyId =
                $this->companyService
                    ->getCurrentCompany();

            /*
             |--------------------------------------------------------------------------
             | Load invoice
             |--------------------------------------------------------------------------
             */

            $invoiceRows = json_decode(
                $this->db->getOneFacture(
                    $invoiceId,
                    $companyId
                )
            );

            if (empty($invoiceRows)) {

                return new DataResponse([
                    'status' => 'error',
                    'message' => 'Invoice not found'
                ], 404);
            }

            $invoice = $invoiceRows[0];

            /*
             |--------------------------------------------------------------------------
             | Load company
             |--------------------------------------------------------------------------
             */

            $companyRows = json_decode(
                $this->db->getConfiguration(
                    $companyId
                )
            );

            if (empty($companyRows)) {

                return new DataResponse([
                    'status' => 'error',
                    'message' => 'Company configuration not found'
                ], 404);
            }

            $company = $companyRows[0];

            /*
             |--------------------------------------------------------------------------
             | Load products
             |--------------------------------------------------------------------------
             */

            $products = json_decode(
                $this->db->getListProduit(
                    $invoice->id_devis,
                    $companyId
                )
            );

            /*
             |--------------------------------------------------------------------------
             | Generate XML
             |--------------------------------------------------------------------------
             */

            $xmlContent =
                $this->facturXService->buildXml(
                    $invoice,
                    $company,
                    $products
                );

            /*
             |--------------------------------------------------------------------------
             | Save XML
             |--------------------------------------------------------------------------
             */

            $this->storageService->saveFile(
                $folder,
                $name,
                $xmlContent
            );

            /*
             |--------------------------------------------------------------------------
             | Download response
             |--------------------------------------------------------------------------
             */

            return new DataDownloadResponse(
                $xmlContent,
                $name,
                'application/xml'
            );

        } catch (\Exception $e) {

            return new DataResponse([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @NoAdminRequired
     */
    #[UseSession]
    public function sendPDF(
        string $content,
        string $name,
        string $subject,
        string $body,
        string $to,
        string $cc
    ): DataResponse {

        return new DataResponse(
            $this->mailService->sendPdf(
                content: $content,
                name: $name,
                subject: $subject,
                body: $body,
                to: $to,
                cc: $cc
            )
        );
    }
}