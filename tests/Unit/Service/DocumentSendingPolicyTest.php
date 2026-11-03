<?php
namespace OCA\Gestion\Tests\Unit\Service;
use OCA\Gestion\Db\Bdd;
use OCA\Gestion\Service\DataService;
use OCP\ISession;
use PHPUnit\Framework\TestCase;
class DocumentSendingPolicyTest extends TestCase {
    private function service(Bdd $db): DataService {
        $session = $this->createMock(ISession::class);
        $session->method('get')->with('CurrentCompany')->willReturn(3);
        $db->method('getCompaniesList')->with('ordinary-user')->willReturn([['id'=>3]]);
        return new DataService($db, $session, 'ordinary-user');
    }
    public function testSendingQuoteChecksOwnershipWithoutFinalizingIt(): void {
        $db = $this->createMock(Bdd::class);
        $db->expects($this->once())->method('requireRecord')->with('devis', 12, 3)->willReturn(['id'=>12]);
        $db->expects($this->never())->method('lockDocument');
        $db->method('isQuoteLocked')->with(12, 3)->willReturn(false);
        $this->assertFalse($this->service($db)->prepareDocumentForSending('devis', 12));
    }
    public function testSendingInvoiceFinalizesIt(): void {
        $db = $this->createMock(Bdd::class);
        $db->expects($this->once())->method('requireRecord')->with('facture', 12, 3)->willReturn(['id'=>12]);
        $db->expects($this->once())->method('lockDocument')->with('facture', 12, 3);
        $this->assertTrue($this->service($db)->prepareDocumentForSending('facture', 12));
    }
    public function testForeignQuoteCannotBeSent(): void {
        $db = $this->createMock(Bdd::class);
        $db->method('requireRecord')->willThrowException(new \InvalidArgumentException('Record not found in this company.'));
        $db->expects($this->never())->method('lockDocument');
        $this->expectException(\InvalidArgumentException::class);
        $this->service($db)->prepareDocumentForSending('devis', 12);
    }
}
