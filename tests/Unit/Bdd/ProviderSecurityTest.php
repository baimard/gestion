<?php
namespace OCA\Gestion\Tests\Unit\Bdd;
use OCA\Gestion\Db\Bdd;
use OCA\Gestion\Service\ElectronicInvoiceProviderService;
use OCA\Gestion\Service\DataService;
use OCA\Gestion\Service\CompanyService;
use OCP\IL10N;
use OCP\Security\ICrypto;
use OCP\Server;
use OCA\Gestion\Migration\Version36000Date20261121110000;
use OCP\Migration\IOutput;
use OCP\ISession;
use OCP\IUserManager;
use PHPUnit\Framework\TestCase;
class ProviderSecurityTest extends TestCase {
    private $connection;
    private Bdd $db;
    private int $company;
    private string $owner;
    private array $credentials = ['client_id'=>'fixture-id','client_secret'=>'never-return-this-secret','customer_id'=>'fixture-customer','base_url'=>'https://api.example.com','auth_url'=>'https://auth.example.com/token'];
    protected function setUp(): void {
        $this->connection = \OCP\Server::get(\OCP\IDBConnection::class);
        $this->connection->beginTransaction();
        $l = $this->createMock(IL10N::class);
        $this->owner = 'security-test-'.bin2hex(random_bytes(6));
        $this->db = new Bdd($this->connection, $l, $this->owner);
        $this->db->createCompany($this->owner);
        $this->company = (int)$this->db->getCompaniesOwner($this->owner)[0]['id'];
    }
    protected function tearDown(): void { $this->connection->rollBack(); }
    private function session(): ISession {
        $session = $this->createMock(ISession::class);
        $session->method('get')->with('CurrentCompany')->willReturn($this->company);
        return $session;
    }
    private function provider(string $user): ElectronicInvoiceProviderService {
        return new ElectronicInvoiceProviderService($this->connection, $this->session(), $this->db, $user, Server::get(ICrypto::class));
    }
    private function storedConfiguration(): string {
        $q = $this->connection->getQueryBuilder();
        return $q->select('einvoice_provider_config')->from('gestion_configuration')
            ->where($q->expr()->eq('id', $q->createNamedParameter($this->company)))
            ->executeQuery()->fetchOne();
    }

    public function testLegacySecretIsMigratedOnceAndStillWorks(): void {
        $q = $this->connection->getQueryBuilder();
        $q->update('gestion_configuration')
            ->set('einvoice_provider', $q->createNamedParameter('iopole'))
            ->set('einvoice_provider_config', $q->createNamedParameter(json_encode($this->credentials)))
            ->where($q->expr()->eq('id', $q->createNamedParameter($this->company)))->executeStatement();
        $migration = new Version36000Date20261121110000($this->connection, Server::get(ICrypto::class));
        $output = $this->createMock(IOutput::class);
        $migration->postSchemaChange($output, static fn () => null, []);
        $encrypted = $this->storedConfiguration();
        $this->assertStringNotContainsString($this->credentials['client_secret'], $encrypted);
        $migration->postSchemaChange($output, static fn () => null, []);
        $this->assertSame($encrypted, $this->storedConfiguration());
        $this->assertSame($this->credentials, $this->provider($this->owner)->requireProvider('iopole'));
    }

    public function testSecretIsNeverExposedAndEmptyInputPreservesIt(): void {
        $service = $this->provider($this->owner);
        $response = $service->saveCurrentConfiguration('iopole', $this->credentials);
        $this->assertTrue($response['configured']);
        $this->assertTrue($response['secretStored']);
        $this->assertStringNotContainsString($this->credentials['client_secret'], $this->storedConfiguration());
        $this->assertArrayNotHasKey('client_secret', $response['credentials']);
        $this->assertStringNotContainsString('never-return-this-secret', $this->db->getConfiguration($this->company));
        $this->assertArrayNotHasKey('einvoice_provider_config', json_decode($this->db->getConfiguration($this->company), true)[0]);
        $service->saveCurrentConfiguration('iopole', array_merge($this->credentials, ['client_secret'=>'']));
        $this->assertSame($this->credentials, $service->requireProvider('iopole'));
        $service->saveCurrentConfiguration('', []);
        $this->assertFalse($service->getCurrentConfiguration()['secretStored']);
    }
    public function testSharedUserCanSendWithoutReadingCredentialsOrChangingPlatform(): void {
        $this->provider($this->owner)->saveCurrentConfiguration('iopole', $this->credentials);
        $this->db->addShareUser($this->company, 'shared-security-user');
        $service = $this->provider('shared-security-user');
        $response = $service->getCurrentConfiguration();
        $this->assertTrue($response['configured']);
        $this->assertFalse($response['canConfigure']);
        $this->assertSame([], $response['credentials']);
        $this->assertSame($this->credentials, $service->requireProvider('iopole'));
        $this->expectException(\DomainException::class);
        $service->saveCurrentConfiguration('', []);
    }
    public function testRevokedShareCannotUseStaleSessionToReadCredentials(): void {
        $this->db->addShareUser($this->company, 'revoked-security-user');
        $service = $this->provider('revoked-security-user');
        $this->db->delShareUser($this->company, 'revoked-security-user');
        $this->expectException(\DomainException::class);
        $service->requireProvider('iopole');
    }
    public function testDataAccessWithoutIdentityFailsClosed(): void {
        $service = new DataService($this->db, $this->session());
        $this->expectException(\DomainException::class);
        $service->getClients();
    }
    public function testRevokedShareCannotListOtherSharedUsers(): void {
        $service = new CompanyService($this->db, 'revoked-security-user', $this->session(), $this->createMock(IUserManager::class));
        $this->expectException(\DomainException::class);
        $service->getShareUsers();
    }
    public function testUnsafeUrlCannotBeSavedEvenByOwner(): void {
        $this->expectException(\InvalidArgumentException::class);
        $this->provider($this->owner)->saveCurrentConfiguration('iopole', array_merge($this->credentials, ['auth_url'=>'http://127.0.0.1']));
    }
}
