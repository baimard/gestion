<?php
namespace OCA\Gestion\Tests\Unit\Controller;

use OCA\Gestion\Controller\PdfController;
use OCA\Gestion\Controller\CrudController;
use OCA\Gestion\Controller\DevisController;
use OCA\Gestion\Controller\CompanyController;
use OCA\Gestion\Controller\ProduitController;
use OCA\Gestion\Service\DataService;
use OCA\Gestion\Service\PdfService;
use OCA\Gestion\Service\PersonalMailService;
use OCA\Gestion\Service\CompanyService;
use OCA\Gestion\Service\TemplateService;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

class LockInformationTest extends TestCase {
    public function testFailedMailDeliveryReportsTheCompletedLock(): void {
        $data = $this->createMock(DataService::class);
        $data->expects($this->once())->method('prepareDocumentForSending')->with('facture', 12)->willReturn(true);
        $pdf = $this->createMock(PdfService::class);
        $pdf->method('renderPdf')->willReturn('%PDF-test');
        $mail = $this->createMock(PersonalMailService::class);
        $mail->method('sendPdf')->willThrowException(new \RuntimeException('Delivery unavailable.'));
        $controller = new PdfController('gestion', $this->createMock(IRequest::class), $pdf, $mail, $data);
        $response = $controller->sendPersonalMail('html','invoice.pdf','subject','body','test@example.test','facture',12);
        $this->assertSame(400, $response->getStatus());
        $this->assertTrue($response->getData()['documentLocked']);
        $this->assertSame('Delivery unavailable.', $response->getData()['message']);
    }
    public function testFailedQuoteDeliveryDoesNotFinalizeTheQuote(): void {
        $data = $this->createMock(DataService::class);
        $data->expects($this->once())->method('prepareDocumentForSending')->with('devis', 12)->willReturn(false);
        $data->expects($this->never())->method('lockDocument');
        $pdf = $this->createMock(PdfService::class);
        $pdf->method('renderPdf')->willReturn('%PDF-test');
        $mail = $this->createMock(PersonalMailService::class);
        $mail->method('sendPdf')->willThrowException(new \RuntimeException('Delivery unavailable.'));
        $response = (new PdfController('gestion', $this->createMock(IRequest::class), $pdf, $mail, $data))->sendPersonalMail('html', 'quote.pdf', 'subject', 'body', 'test@example.test', 'devis', 12);
        $this->assertSame(400, $response->getStatus());
        $this->assertFalse($response->getData()['documentLocked']);
    }

    public function testRejectedFinalizationDoesNotClaimTheDocumentWasLocked(): void {
        $data = $this->createMock(DataService::class);
        $data->method('prepareDocumentForSending')->willThrowException(new \DomainException('Access denied.'));
        $mail = $this->createMock(PersonalMailService::class);
        $mail->expects($this->never())->method('sendPdf');
        $controller = new PdfController('gestion', $this->createMock(IRequest::class), $this->createMock(PdfService::class), $mail, $data);
        $response = $controller->sendPersonalMail('html','invoice.pdf','subject','body','test@example.test','facture',12);
        $this->assertFalse($response->getData()['documentLocked']);
    }
    public function testIopoleRejectionPreservesTheLockedInformation(): void {
        $data = $this->createMock(DataService::class);
        $data->expects($this->once())->method('lockDocument')->with('facture',12);
        $pdf = $this->createMock(PdfService::class);
        $pdf->method('sendFacturXToIopole')->willReturn(new DataResponse(['message' => 'Platform rejected document.'], 400));
        $controller = new PdfController('gestion', $this->createMock(IRequest::class), $pdf, $this->createMock(PersonalMailService::class), $data);
        $response = $controller->sendFacturXToIopole('html','invoice.pdf',12);
        $this->assertSame(400, $response->getStatus());
        $this->assertTrue($response->getData()['documentLocked']);
    }
    public function testLockedActionsReturnAnExplanatoryConflict(): void {
        $data = $this->createMock(DataService::class);
        foreach (['reorderProducts','insertProduitDevis','updateProductVatExemptionReason'] as $method) $data->method($method)->willThrowException(new \DomainException('This record is used by a locked document.'));
        $request = $this->createMock(IRequest::class);
        $company = $this->createMock(CompanyService::class);
        $company->method('deleteCompany')->willThrowException(new \DomainException('A company with issued invoices cannot be deleted.'));
        $responses = [
            (new CrudController('gestion',$request,$data))->reorderProducts(1,[]),
            (new DevisController('gestion',$request,$data,$this->createMock(TemplateService::class)))->insertProduitDevis('1'),
            (new ProduitController('gestion',$request,$data))->updateVatExemptionReason('1','code'),
            (new CompanyController('gestion',$request,$company))->deleteCompany(),
        ];
        foreach ($responses as $response) {
            $this->assertSame(409,$response->getStatus());
            $this->assertNotEmpty($response->getData()['message']);
        }
    }
}
