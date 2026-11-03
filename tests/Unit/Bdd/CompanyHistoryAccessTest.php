<?php
namespace OCA\Gestion\Tests\Unit\Bdd;

use OCA\Gestion\Db\Bdd;
use OCA\Gestion\Service\DataService;
use OCP\IL10N;
use OCP\ISession;
use PHPUnit\Framework\TestCase;

class CompanyHistoryAccessTest extends TestCase {
    private $connection;
    private Bdd $db;
    private string $owner;
    private string $other;
    private int $company;
    private int $foreignCompany;

    protected function setUp(): void {
        $this->connection = \OC::$server->getDatabaseConnection();
        $this->connection->beginTransaction();
        $this->owner = 'history-owner-' . bin2hex(random_bytes(6));
        $this->other = 'history-other-' . bin2hex(random_bytes(6));
        $this->db = new Bdd($this->connection, $this->createMock(IL10N::class), $this->owner);
        foreach ([$this->owner, $this->other] as $user) $this->db->createCompany($user);
        $this->company = (int)$this->db->getCompaniesOwner($this->owner)[0]['id'];
        $this->foreignCompany = (int)$this->db->getCompaniesOwner($this->other)[0]['id'];
        $this->db->recordHistory($this->company, 'test', 'client', 1, ['marker' => 'own-company']);
        $this->db->recordHistory($this->foreignCompany, 'test', 'client', 2, ['marker' => 'foreign-company']);
    }
    protected function tearDown(): void { $this->connection->rollBack(); }
    private function service(string $user, int $company): DataService {
        $session = $this->createMock(ISession::class);
        $session->method('get')->with('CurrentCompany')->willReturn($company);
        return new DataService($this->db, $session, $user);
    }
    public function testHistoryContainsOnlyTheCurrentAuthorizedCompany(): void {
        $history = $this->service($this->owner, $this->company)->history();
        $this->assertNotEmpty($history);
        foreach ($history as $row) $this->assertSame($this->company, (int)$row['id_configuration']);
        $this->assertStringNotContainsString('foreign-company', json_encode($history));
    }
    public function testForgedCompanyInSessionCannotExposeAnotherCompanyHistory(): void {
        $this->expectException(\DomainException::class);
        $this->service($this->owner, $this->foreignCompany)->history();
    }
    public function testSharedCompanyHistoryWorksUntilAccessIsRevoked(): void {
        $this->db->addShareUser($this->company, $this->other);
        $service = $this->service($this->other, $this->company);
        $this->assertNotEmpty($service->history());
        $this->db->delShareUser($this->company, $this->other);
        $this->expectException(\DomainException::class);
        $service->history();
    }
}
