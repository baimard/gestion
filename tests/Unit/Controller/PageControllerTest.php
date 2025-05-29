<?php
namespace OCA\Gestion\Tests\Unit\Controller;

use PHPUnit\Framework\TestCase;
use OCA\Gestion\Controller\PageController;
use OCA\Gestion\Db\Bdd;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\DataResponse;

class PageControllerTest extends TestCase {
    private $controller;

    protected function setUp(): void {
        parent::setUp();

        $request = $this->createMock('OCP\IRequest');
        $rootFolder = $this->createMock('OCP\Files\IRootFolder');
        $urlGenerator = $this->createMock('OCP\IURLGenerator');
        $config = $this->createMock('OCP\IConfig');
        $mailer = $this->createMock('OCP\Mail\IMailer');
        $userManager = $this->createMock('OCP\IUserManager');
        $accountManager = $this->createMock('OCP\Accounts\IAccountManager');
        $session = $this->createMock('OCP\ISession');
        $csp = $this->createMock('OCP\AppFramework\Http\ContentSecurityPolicy');
        $l10n = $this->createMock('OCP\IL10N');
        $dbConnection = $this->createMock('OCP\IDBConnection');

        $session->method('get')->willReturnMap([
            ['CurrentCompany', 'company_123']
        ]);

        $rootFolder->method('getUserFolder')->willReturn($this->createMock('OCP\Files\Folder'));

        $db = new Bdd($dbConnection, $l10n);

        $this->controller = new PageController(
            'gestion',
            $request,
            'nextcloud',
            $db,
            $rootFolder,
            $urlGenerator,
            $mailer,
            $config,
            $userManager,
            $accountManager,
            $session,
            $csp
        );
    }

    public function testIndexReturnsTemplateResponse() {
        $result = $this->controller->index();
        $this->assertInstanceOf(TemplateResponse::class, $result);
        $this->assertEquals('index', $result->getTemplateName());
    }

    public function testDevisReturnsTemplateResponse() {
        $result = $this->controller->devis();
        $this->assertInstanceOf(TemplateResponse::class, $result);
        $this->assertEquals('devis', $result->getTemplateName());
    }

    public function testFactureReturnsTemplateResponse() {
        $result = $this->controller->facture();
        $this->assertInstanceOf(TemplateResponse::class, $result);
        $this->assertEquals('facture', $result->getTemplateName());
    }

    public function testProduitReturnsTemplateResponse() {
        $result = $this->controller->produit();
        $this->assertInstanceOf(TemplateResponse::class, $result);
        $this->assertEquals('produit', $result->getTemplateName());
    }

    public function testStatistiqueReturnsTemplateResponse() {
        $result = $this->controller->statistique();
        $this->assertInstanceOf(TemplateResponse::class, $result);
        $this->assertEquals('statistique', $result->getTemplateName());
    }

    public function testNavigationLinkIsArray() {
        $result = $this->controller->getNavigationLink();
        $this->assertIsArray($result);
        $this->assertArrayHasKey('index', $result);
    }

    public function testIsConfigReturnsBoolean() {
        $this->assertIsBool($this->controller->isConfig());
    }

    public function testGetClientsReturnsString() {
        $result = $this->controller->getClients();
        $this->assertIsString($result); // JSON from DB class
    }

    public function testGetStatsReturnsExpectedKeys() {
        $json = $this->controller->getStats();
        $data = json_decode($json, true);
        $this->assertArrayHasKey('client', $data);
        $this->assertArrayHasKey('devis', $data);
        $this->assertArrayHasKey('facture', $data);
        $this->assertArrayHasKey('produit', $data);
    }

    public function testGetAnnualTurnoverReturnsValidJson() {
        $json = $this->controller->getAnnualTurnoverPerMonthNoVat();
        $this->assertIsString($json);
        $decoded = json_decode($json, true);
        $this->assertIsArray($decoded);
    }

    public function testSetCurrentCompanySetsValueInSession() {
        $session = $this->createMock('OCP\ISession');
        $session->expects($this->once())
                ->method('set')
                ->with('CurrentCompany', 'company_456');
    }
}
