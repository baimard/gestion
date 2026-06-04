<?php
namespace OCA\Gestion\Tests\Unit\Controller;

use OCA\Gestion\Controller\ClientController;
use OCA\Gestion\Controller\ConfigurationController;
use OCA\Gestion\Controller\StatsController;
use OCA\Gestion\Controller\ViewController;
use OCA\Gestion\Service\CompanyService;
use OCA\Gestion\Service\DataService;
use OCA\Gestion\Service\TemplateService;
use OCP\AppFramework\Http\TemplateResponse;
use PHPUnit\Framework\TestCase;

class ControllerSplitTest extends TestCase {
	private $request;

	protected function setUp(): void {
		parent::setUp();
		$this->request = $this->createMock('OCP\IRequest');
	}

	public function testIndexReturnsTemplateResponse(): void {
		$templateResponse = new TemplateResponse('gestion', 'index', []);
		$templateService = $this->createMock(TemplateService::class);
		$templateService->expects($this->once())
			->method('page')
			->with('index')
			->willReturn($templateResponse);

		$controller = new ViewController('gestion', $this->request, $templateService);

		$result = $controller->index();
		$this->assertSame($templateResponse, $result);
		$this->assertEquals('index', $result->getTemplateName());
	}

	public function testIsConfigDelegatesToCompanyService(): void {
		$templateService = $this->createMock(TemplateService::class);
		$dataService = $this->createMock(DataService::class);
		$companyService = $this->createMock(CompanyService::class);
		$companyService->expects($this->once())
			->method('isConfig')
			->willReturn(true);

		$controller = new ConfigurationController('gestion', $this->request, $templateService, $dataService, $companyService);

		$this->assertTrue($controller->isConfig());
	}

	public function testGetClientsDelegatesToDataService(): void {
		$dataService = $this->createMock(DataService::class);
		$dataService->expects($this->once())
			->method('getClients')
			->willReturn('[]');

		$controller = new ClientController('gestion', $this->request, $dataService);

		$this->assertSame('[]', $controller->getClients());
	}

	public function testGetStatsDelegatesToDataService(): void {
		$dataService = $this->createMock(DataService::class);
		$dataService->expects($this->once())
			->method('getStats')
			->willReturn('{"client":0,"devis":0,"facture":0,"produit":0}');

		$controller = new StatsController('gestion', $this->request, $dataService);

		$data = json_decode($controller->getStats(), true);
		$this->assertArrayHasKey('client', $data);
		$this->assertArrayHasKey('devis', $data);
		$this->assertArrayHasKey('facture', $data);
		$this->assertArrayHasKey('produit', $data);
	}
}
