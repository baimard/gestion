<?php
namespace OCA\Gestion\Tests\Unit\Controller;

use Exception;
use PHPUnit\Framework\TestCase;
use OCP\AppFramework\Http\TemplateResponse;
use OCA\Gestion\Controller\PageController;
use PHPUnit\Framework\MockObject\MockObject;
use OCA\Gestion\Db\Bdd;
use OCP\IDBConnection;


/**
 * @covers Controller::
 */
class PageControllerTest extends TestCase {
	private $controller;
	private $userId = 'baimard';
	private $db;

	public function setUp(): void{
		parent::setUp();
		$request = $this->createMock('OCP\IRequest');
		$myDb = \OC::$server->getDatabaseConnection();
		$rootFolder = $this->createMock('OCP\Files\IRootFolder');
		$l =  $this->createMock('OCP\IL10N');
		$urlGenerator = $this->createMock('OCP\IURLGenerator');
		
		$this->db = new Bdd($myDb,$l);
		$this->controller = new PageController('gestion', 
												$request, 
												$this->userId,
												$this->db,
												$rootFolder,
												$l,
												$urlGenerator);

	}
	
	public function testIndex() {
		$result = $this->controller->index();
		$this->assertEquals('index', $result->getTemplateName());
		$this->assertTrue($result instanceof TemplateResponse);
	}

	public function testDevis() {
		$result = $this->controller->devis();
		$this->assertEquals('devis', $result->getTemplateName());
		$this->assertTrue($result instanceof TemplateResponse);
	}

	public function testFacture() {
		$result = $this->controller->facture();
		$this->assertEquals('facture', $result->getTemplateName());
		$this->assertTrue($result instanceof TemplateResponse);
	}

	public function testProduit() {
		$result = $this->controller->produit();
		$this->assertEquals('produit', $result->getTemplateName());
		$this->assertTrue($result instanceof TemplateResponse);
	}

	public function testConfig() {
		$result = $this->controller->config();
		$this->assertEquals('configuration', $result->getTemplateName());
		$this->assertTrue($result instanceof TemplateResponse);
	}

	public function testDevisShow() {
		$r = json_decode($this->controller->getDevis())[0]->{"id"};
		$result = $this->controller->devisshow($r);
		$this->assertEquals('devisshow', $result->getTemplateName());
		$this->assertTrue($result instanceof TemplateResponse);
	}

	public function testfactureshow() {
		$r = json_decode($this->controller->getFactures())[0]->{"id"};
		$result = $this->controller->factureshow($r);
		$this->assertEquals('factureshow', $result->getTemplateName());
		$this->assertTrue($result instanceof TemplateResponse);
	}

	/**
	 * After testConfig
	 */
	public function testIsConfig() {
		$result = $this->controller->isConfig();
		$this->assertTrue($result);
	}

	/**
	 * After testConfig
	 */
	public function testGetConfiguation() {
		$result = json_decode($this->controller->getConfiguration());
		$this->assertIsArray($result);
	}

	public function testGetNavigationLink() {
		$result = $this->controller->getNavigationLink();
		$this->assertIsArray($result);
	}

	public function testGetClients() {
		$result = json_decode($this->controller->getClients());
		$this->assertIsArray($result);
	}

	public function testGetDevis() {
		$result = json_decode($this->controller->getDevis());
		$this->assertIsArray($result);
	}

	public function testGetFactures() {
		$result = json_decode($this->controller->getFactures());
		$this->assertIsArray($result);
	}

	public function testGetProduits() {
		$result = json_decode($this->controller->getProduits());		
		$this->assertIsArray($result);
	}

	public function testGetProduitsById() {
		$r = json_decode($this->controller->getProduits())[0]->{"id"};
		$result = json_decode($this->controller->getProduitsById($r));		
		$this->assertIsArray($result);
	}

	public function testGetClient() {
		$r = json_decode($this->controller->getClients())[0]->{"id"};
		$result = json_decode($this->controller->getClient($r));
		$this->assertIsArray($result);
		$this->assertCount(1, $result);
	}

	public function testInsertClient() {
		$result = $this->controller->insertClient();
		$this->assertTrue($result);
	}

	/** 
	 * need to be right after testInsertClient()
	 * 
	 */
	public function testDeleteClient() {
		$id = $this->db->lastinsertid();
		$table = "client";
		$result = $this->controller->delete($table,$id);
		$this->assertTrue($result);
	}


	public function testManagementDevis() {
		$result = $this->controller->insertDevis();
		$this->assertTrue($result);

		$r = json_decode($this->controller->getDevis())[0]->{"id"};
		$id_client = json_decode($this->controller->getClients())[0]->{"id"};
		
		$resultInterUpdate = $this->controller->update('devis', 'id_client', $id_client, $r);
		$this->assertTrue($resultInterUpdate);

		$result = json_decode($this->controller->getClientbyiddevis($r));
		$this->assertIsArray($result);
		$this->assertCount(1, $result);
	}

	/** 
	 * need to be right after testInsertClient()
	 * 
	 */
	public function testDeleteDevis() {
		$id = $this->db->lastinsertid();
		$table = "devis";
		$result = $this->controller->delete($table,$id);
		$this->assertTrue($result);
	}

	public function testInsertFacture() {
		$result = $this->controller->insertFacture();
		$this->assertTrue($result);
	}

	/** 
	 * need to be right after testInsertClient()
	 * 
	 */
	public function testDeleteFacture() {
		$id = $this->db->lastinsertid();
		$table = "facture";
		$result = $this->controller->delete($table,$id);
		$this->assertTrue($result);
	}

	public function testInsertProduit() {
		$result = $this->controller->insertProduit();
		$this->assertTrue($result);
	}

	public function testInsertProduitDevis(){
		$r = json_decode($this->controller->getDevis())[0]->{"id"};
		$result = $this->controller->insertProduitDevis($r);
		$this->assertTrue($result);
	}

	public function testDeleteProduitDevis(){
		$id = $this->db->lastinsertid();
		$table = "produit_devis";
		$result = $this->controller->delete($table,$id);
		$this->assertTrue($result);
	}

	/** 
	 * need to be right after testInsertClient()
	 * 
	 */
	public function testDeleteProduit() {
		$id = $this->db->lastinsertid();
		$table = "produit";
		$result = $this->controller->delete($table,$id);
		$this->assertTrue($result);
	}

	public function testGetStats(){
		$result = (array) json_decode($this->controller->getStats());
		$this->assertArrayHasKey('client', $result);
		$this->assertArrayHasKey('devis', $result);
		$this->assertArrayHasKey('facture', $result);
		$this->assertArrayHasKey('produit', $result);
	}

	public function testGetAnnualTurnoverPerMonthNoVat(){
		$result = (array) json_decode($this->controller->getAnnualTurnoverPerMonthNoVat());
		$this->assertIsArray($result);
	}
}