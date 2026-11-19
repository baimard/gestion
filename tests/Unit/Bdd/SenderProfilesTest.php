<?php

declare(strict_types=1);

namespace OCA\Gestion\Tests\Unit\Bdd;

use OCA\Gestion\Db\Bdd;
use OCA\Gestion\Service\BackupFormat;
use OCP\IDBConnection;
use OCP\IL10N;
use OCP\Server;
use PHPUnit\Framework\TestCase;

class SenderProfilesTest extends TestCase {
    private IDBConnection $connection;
    private Bdd $db;
    private string $owner;
    private int $company;

    protected function setUp(): void {
        $this->connection = Server::get(IDBConnection::class);
        $this->connection->beginTransaction();
        $l = $this->createMock(IL10N::class);
        $l->method('t')->willReturnCallback(static fn ($text) => $text);
        $this->owner = 'sender-profile-test-' . bin2hex(random_bytes(6));
        $this->db = new Bdd($this->connection, $l, $this->owner);
        $this->db->createCompany($this->owner);
        $this->company = (int)$this->db->getCompaniesOwner($this->owner)[0]['id'];
    }

    protected function tearDown(): void {
        $this->connection->rollBack();
    }

    public function testProfileFollowsInvoiceAndRestoredQuoteAndIsProtectedAfterFinalization(): void {
        $this->db->saveSenderProfile($this->company, $this->owner, '', ['label' => 'Expert', 'contact' => 'Jane Doe']);
        $profile = array_key_first($this->db->getSenderProfiles($this->company));
        $this->db->insertDevis($this->company);
        $quote = (int)json_decode($this->db->getDevis($this->company))[0]->id;
        $this->db->setQuoteSenderProfile($this->company, $quote, $profile);
        $invoice = $this->db->insertFacture($this->company, $quote)['id'];
        $this->assertSame($profile, json_decode($this->db->getOneFacture($invoice, $this->company))[0]->sender_profile);

        $this->db->gestion_duplicate('devis', $quote, $this->company);
        foreach (json_decode($this->db->getDevis($this->company)) as $entry) {
            $this->assertSame($profile, json_decode($this->db->getOneDevis($entry->id, $this->company))[0]->sender_profile);
        }

        $tables = BackupFormat::decode(json_encode($this->db->exportBackup($this->owner), JSON_THROW_ON_ERROR));
        $restored = (int)$this->db->restoreBackup($tables, $this->owner)[0];
        $restoredQuote = json_decode($this->db->getDevis($restored))[0]->id;
        $this->assertSame($profile, json_decode($this->db->getOneDevis($restoredQuote, $restored))[0]->sender_profile);
        $this->assertSame('Jane Doe', $this->db->getSenderProfiles($restored)[$profile]['contact']);

        $this->db->lockDocument('facture', $invoice, $this->company);
        foreach ([
            fn () => $this->db->setQuoteSenderProfile($this->company, $quote, ''),
            fn () => $this->db->saveSenderProfile($this->company, $this->owner, $profile, ['label' => 'Changed']),
            fn () => $this->db->saveSenderProfile($this->company, $this->owner, $profile, null),
        ] as $operation) {
            try {
                $operation();
                $this->fail('A finalized document must protect its quote and profile.');
            } catch (\DomainException $e) {
                $this->assertNotSame('', $e->getMessage());
            }
        }
    }

    public function testCannotAssignProfileFromAnotherCompany(): void {
        $this->db->saveSenderProfile($this->company, $this->owner, '', ['label' => 'Private']);
        $profile = array_key_first($this->db->getSenderProfiles($this->company));
        $this->db->createCompany($this->owner);
        $otherCompany = (int)$this->db->getCompaniesOwner($this->owner)[1]['id'];
        $this->db->insertDevis($otherCompany);
        $quote = (int)json_decode($this->db->getDevis($otherCompany))[0]->id;
        $this->expectException(\InvalidArgumentException::class);
        $this->db->setQuoteSenderProfile($otherCompany, $quote, $profile);
    }
}
