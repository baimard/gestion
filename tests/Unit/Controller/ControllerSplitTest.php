<?php
namespace OCA\Gestion\Tests\Unit\Controller;

use OCA\Gestion\Controller\ClientController;
use OCA\Gestion\Controller\ConfigurationController;
use OCA\Gestion\Controller\CrudController;
use OCA\Gestion\Controller\FactureController;
use OCA\Gestion\Controller\ProduitController;
use OCA\Gestion\Controller\StatsController;
use OCA\Gestion\Controller\ViewController;
use OCA\Gestion\Service\CompanyService;
use OCA\Gestion\Service\ContactImportService;
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

		$contactImportService = $this->createMock(ContactImportService::class);
		$controller = new ClientController('gestion', $this->request, $dataService, $contactImportService);

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

	public function testGetVatExemptionReasonsDelegatesToDataService(): void {
		$catalog = [
			'defaultCode' => 'VATEX-FR-FRANCHISE',
			'reasons' => [
				[
					'code' => 'VATEX-FR-FRANCHISE',
					'reason' => 'TVA non applicable, art. 293 B du CGI',
				],
			],
		];
		$dataService = $this->createMock(DataService::class);
		$dataService->expects($this->once())
			->method('getVatExemptionReasons')
			->willReturn($catalog);

		$controller = new ProduitController('gestion', $this->request, $dataService);
		$response = $controller->getVatExemptionReasons();

		$this->assertSame($catalog, $response->getData());
	}

	public function testUpdateVatExemptionReasonDelegatesToDataService(): void {
		$updatedReason = [
			'code' => 'VATEX-FR-CGI261-4',
			'reason' => 'Exonération de TVA, art. 261, 4 du CGI',
		];
		$dataService = $this->createMock(DataService::class);
		$dataService->expects($this->once())
			->method('updateProductVatExemptionReason')
			->with('42', 'VATEX-FR-CGI261-4')
			->willReturn($updatedReason);

		$controller = new ProduitController('gestion', $this->request, $dataService);
		$response = $controller->updateVatExemptionReason('42', 'VATEX-FR-CGI261-4');

		$this->assertSame($updatedReason, $response->getData());
	}

	public function testReorderProductsDelegatesToDataService(): void {
		$dataService = $this->createMock(DataService::class);
		$dataService->expects($this->once())
			->method('reorderProducts')
			->with(12, [8, 3, 5]);

		$controller = new CrudController('gestion', $this->request, $dataService);
		$response = $controller->reorderProducts(12, [8, 3, 5]);

		$this->assertSame(200, $response->getStatus());
		$this->assertSame(['status' => 'success'], $response->getData());
	}

	public function testReorderProductsRejectsAnInvalidOrder(): void {
		$dataService = $this->createMock(DataService::class);
		$dataService->expects($this->once())
			->method('reorderProducts')
			->willThrowException(new \InvalidArgumentException('Invalid order'));

		$controller = new CrudController('gestion', $this->request, $dataService);
		$response = $controller->reorderProducts(12, [8, 8]);

		$this->assertSame(400, $response->getStatus());
		$this->assertSame(['status' => 'error', 'message' => 'Invalid order'], $response->getData());
	}

	public function testCreateInvoiceFromQuoteDelegatesToDataService(): void {
		$dataService = $this->createMock(DataService::class);
		$dataService->expects($this->once())
			->method('insertFacture')
			->with(42)
			->willReturn(['id' => 7, 'created' => true]);

		$controller = new FactureController(
			'gestion',
			$this->request,
			$dataService,
			$this->createMock(TemplateService::class)
		);
		$response = $controller->insertFacture(42);

		$this->assertSame(200, $response->getStatus());
		$this->assertSame(['id' => 7, 'created' => true], $response->getData());
	}

	public function testCreateInvoiceRejectsAnUnknownQuote(): void {
		$dataService = $this->createMock(DataService::class);
		$dataService->method('insertFacture')
			->willThrowException(new \InvalidArgumentException('The quote does not exist.'));

		$controller = new FactureController(
			'gestion',
			$this->request,
			$dataService,
			$this->createMock(TemplateService::class)
		);
		$response = $controller->insertFacture(999);

		$this->assertSame(404, $response->getStatus());
	}
}
