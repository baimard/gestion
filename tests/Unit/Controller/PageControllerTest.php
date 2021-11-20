<?php
namespace OCA\Gestion\Tests\Unit\Controller;

use Exception;
use PHPUnit\Framework\TestCase;
use OCP\AppFramework\Http\TemplateResponse;
use OCA\Gestion\Controller\PageController;
use PHPUnit\Framework\MockObject\MockObject;
use OCA\Gestion\Db\Bdd;
use OCP\IDBConnection;

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

	public function testGetNavigationLink() {
		$result = $this->controller->getNavigationLink();
		$this->assertIsArray($result);
	}

	public function testGetClients() {
		$result = $this->controller->getClients();
		$this->assertIsArray($result);
	}

	public function testGetConfiguation() {
		$result = $this->controller->getConfiguration();
		$this->assertIsArray($result);
	}

	public function testGetDevis() {
		$result = $this->controller->getDevis();
		$this->assertIsArray($result);
	}

	public function testGetFactures() {
		$result = $this->controller->getFactures();
		$this->assertIsArray($result);
	}

	public function testGetProduits() {
		$result = $this->controller->getProduits();
		$this->assertIsArray($result);
	}

	public function testGetClient() {
		$result = $this->controller->getClient($this->controller->getClients()[0]["id
		"]);
		$this->assertIsArray($result);
		$this->assertCount(1, $result);
	}


}