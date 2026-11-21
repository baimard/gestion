<?php

namespace OCA\Gestion\Tests\Unit\Service;

use Atgp\FacturX\Reader;
use OCA\Gestion\Db\Bdd;
use OCA\Gestion\Service\AnnouncementService;
use OCA\Gestion\Service\CompanyService;
use OCA\Gestion\Service\DataService;
use OCA\Gestion\Service\DocumentTemplateService;
use OCA\Gestion\Service\FacturXService;
use OCA\Gestion\Service\FileService;
use OCA\Gestion\Service\IopoleService;
use OCA\Gestion\Service\NavigationService;
use OCA\Gestion\Service\PdfService;
use OCA\Gestion\Service\TemplateService;
use OCP\App\IAppManager;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\IL10N;
use OCP\Mail\IMailer;
use PHPUnit\Framework\TestCase;
use Smalot\PdfParser\Parser;

class FacturXDeliveryTest extends TestCase {
    /** @dataProvider deliveryModes */
    public function testSavedInvoiceAppearsInThePdfAndEmbeddedXml(bool $send): void {
        $invoice = ['id' => 17, 'id_devis' => 9, 'num' => 'INV-17', 'dnum' => 'Q-9', 'version' => '1',
            'entreprise' => 'Customer Test', 'date' => '2026-11-21', 'date_paiement' => '2026-12-21',
            'type_paiement' => '58', 'comment' => 'Invoice comment'];
        $company = ['entreprise' => 'Seller Test', 'devise' => 'USD', 'format' => 'en-US', 'adresse' => '123 Test St',
            'legal_one' => '', 'legal_two' => '', 'mentions_default' => 'Legal notice'];
        $lines = [['reference' => 'REF', 'description' => 'Saved product &amp; service', 'comment' => '', 'prix_unitaire' => 50,
            'quantite' => 2, 'discount' => 10, 'vat' => 20]];
        $data = $this->createMock(DataService::class);
        $data->expects($this->once())->method('getOneFacture')->with(17)->willReturn(json_encode([$invoice]));
        $data->expects($this->once())->method('getConfiguration')->willReturn(json_encode([$company]));
        $data->expects($this->once())->method('getProduitsById')->with(9)->willReturn(json_encode($lines));
        $files = $this->createMock(FileService::class);
        $files->method('getLogo')->willReturn('nothing');
        $db = $this->createMock(Bdd::class);
        $companies = $this->createMock(CompanyService::class);
        $templates = new TemplateService('tester', $this->createMock(IAppManager::class), $companies, $data, $files,
            $this->createMock(NavigationService::class), new ContentSecurityPolicy(),
            $this->createMock(AnnouncementService::class), $db,
            new DocumentTemplateService($db, $companies, $this->createMock(IL10N::class)));
        $platform = $this->createMock(IopoleService::class);
        $pdf = '';
        $platform->expects($send ? $this->once() : $this->never())->method('sendInvoice')
            ->willReturnCallback(static function (string $content) use (&$pdf): array {
                $pdf = $content;
                return ['id' => 'test-invoice'];
            });
        $service = new PdfService($this->createMock(IMailer::class), $files, $data, $platform, new FacturXService(), $templates);
        if ($send) {
            $response = $service->sendFacturXToIopole('INV-17.pdf', 17);
            self::assertSame(200, $response->getStatus(), json_encode($response->getData()));
        } else {
            $response = $service->generateFacturX('INV-17.pdf', '/', 17);
            self::assertInstanceOf(DataDownloadResponse::class, $response);
            $pdf = $response->render();
        }
        $text = preg_replace('/\s+/u', ' ', (new Parser())->parseContent($pdf)->getText());
        $xml = (new Reader())->extractXML($pdf, false);
        foreach (['INV-17', 'Customer Test', 'Saved product', '108.00'] as $field) {
            self::assertStringContainsString($field, $text);
            self::assertStringContainsString($field, $xml);
        }
        self::assertStringContainsString('Saved product & service', $text);
        self::assertStringContainsString('Saved product &amp; service</ram:Name>', $xml);
        self::assertStringContainsString('<ram:InvoiceCurrencyCode>USD</ram:InvoiceCurrencyCode>', $xml);
    }

    public function deliveryModes(): array {
        return [[false], [true]];
    }
}
