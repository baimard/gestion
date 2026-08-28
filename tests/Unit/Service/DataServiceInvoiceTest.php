<?php
namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Db\Bdd;
use OCA\Gestion\Service\DataService;
use OCP\ISession;
use PHPUnit\Framework\TestCase;

class DataServiceInvoiceTest extends TestCase {
	private function service(Bdd $database): DataService {
		$session = $this->createMock(ISession::class);
		$session->method('get')->with('CurrentCompany')->willReturn(3);
		return new DataService($database, $session);
	}

	public function testInvoicePaymentConfigurationRemainsEditable(): void {
		$database = $this->createMock(Bdd::class);
		$database->expects($this->once())
			->method('gestion_update')
			->with('facture', 'type_paiement', '58', 9, 3)
			->willReturn(true);

		$this->assertTrue($this->service($database)->update('facture', 'type_paiement', '58', 9));
	}

	public function testInvoiceDocumentFieldsCannotBeEdited(): void {
		$database = $this->createMock(Bdd::class);
		$database->expects($this->never())->method('gestion_update');

		$this->assertFalse($this->service($database)->update('facture', 'num', 'Changed', 9));
		$this->assertFalse($this->service($database)->update('facture', 'id_devis', '12', 9));
	}

	public function testInvoiceCannotBeDuplicated(): void {
		$database = $this->createMock(Bdd::class);
		$database->expects($this->never())->method('gestion_duplicate');

		$response = $this->service($database)->duplicate('facture', 9);
		$this->assertSame(403, $response->getStatus());
	}
}
