<?php
namespace OCA\Gestion\Tests\Unit\Bdd;

use OCA\Gestion\Db\Bdd;
use OCA\Gestion\Service\BackupFormat;
use PHPUnit\Framework\TestCase;
use OCP\IL10N;

class WorkspaceTest extends TestCase {
    private $connection;
    private Bdd $db;
    private int $company;
    private string $owner;

    protected function setUp(): void {
        $this->connection = \OC::$server->getDatabaseConnection();
        $this->connection->beginTransaction();
        $l = $this->createMock(IL10N::class);
        $l->method('t')->willReturnCallback(fn ($text) => $text);
        $this->owner = 'workspace-test-' . bin2hex(random_bytes(6));
        $this->db = new Bdd($this->connection, $l, $this->owner);
        $this->db->createCompany($this->owner);
        $this->company = (int)$this->db->getCompaniesOwner($this->owner)[0]['id'];
    }
    protected function tearDown(): void { $this->connection->rollBack(); }

    private function fixture(): array {
        $this->db->insertClient($this->company, ['nom' => 'Test;new\nline', 'prenom' => 'Ada', 'mail' => 'ada@example.test']);
        $client = json_decode($this->db->getClients($this->company), true)[0]['id'];
        $this->db->insertProduit($this->company);
        $product = json_decode($this->db->getProduits($this->company), true)[0]['id'];
        $this->db->insertDevis($this->company);
        $quote = json_decode($this->db->getDevis($this->company), true)[0]['id'];
        $this->db->gestion_update('devis', 'id_client', $client, $quote, $this->company);
        $this->db->insertProduitDevis($quote, $this->company);
        $line = json_decode($this->db->getListProduit($quote, $this->company), true)[0]['pdid'];
        return compact('client', 'product', 'quote', 'line');
    }

    public function testLogoDimensionsPersistAndSurviveBackupRestoration(): void {
        foreach (['logo_height', 'logo_header_height', 'logo_footer_height'] as $field) {
            $this->assertSame(0, (int)json_decode($this->db->getConfiguration($this->company), true)[0][$field]);
            $this->assertTrue($this->db->gestion_updateConfiguration($field, '180', $this->company));
        }
        $this->db->gestion_updateConfiguration('logo_width', '320', $this->company);
        $backup = $this->db->exportBackup($this->owner);
        $restored = $this->db->restoreBackup(BackupFormat::decode(json_encode($backup)), $this->owner);
        $config = json_decode($this->db->getConfiguration($restored[0]), true)[0];
        $this->assertSame(320, (int)$config['logo_width']);
        foreach (['logo_height', 'logo_header_height', 'logo_footer_height'] as $field) $this->assertSame(180, (int)$config[$field]);
        foreach ($backup['tables']['configuration'] as &$row) {
            unset($row['logo_height'], $row['logo_header_height'], $row['logo_footer_height']);
        }
        unset($row);
        $legacy = $this->db->restoreBackup(BackupFormat::decode(json_encode($backup)), $this->owner);
        $this->assertSame(0, (int)json_decode($this->db->getConfiguration($legacy[0]), true)[0]['logo_height']);
    }

    public function testInvalidLogoMaximumHeightIsRejected(): void {
        $this->expectException(\InvalidArgumentException::class);
        $this->db->gestion_updateConfiguration('logo_height', '601', $this->company);
    }

    public function testBackupRejectsInvalidLogoMaximumHeight(): void {
        $backup = $this->db->exportBackup($this->owner);
        $backup['tables']['configuration'][0]['logo_height'] = -1;
        $this->expectException(\InvalidArgumentException::class);
        BackupFormat::decode(json_encode($backup));
    }

    public function testRestoreRemapsEveryRelationWithoutReplacingOriginals(): void {
        $fixture = $this->fixture();
        $this->db->gestion_update('produit_devis', 'discount', '15', $fixture['line'], $this->company);
        $invoice = $this->db->insertFacture($this->company, $fixture['quote']);
        $backup = $this->db->exportBackup($this->owner);
        $tables = BackupFormat::decode(json_encode($backup));
        $restored = $this->db->restoreBackup($tables, $this->owner);
        $this->assertCount(1, $restored);
        $this->assertNotEquals($this->company, $restored[0]);
        $quotes = json_decode($this->db->getDevis($restored[0]), true);
        $this->assertCount(1, $quotes);
        $lines = json_decode($this->db->getListProduit($quotes[0]['id'], $restored[0]), true);
        $this->assertSame(15.0, (float)$lines[0]['discount']);
        $this->assertNotEquals($fixture['product'], $lines[0]['pid']);
        $this->assertCount(1, json_decode($this->db->getClients($this->company), true));
        $this->assertCount(1, json_decode($this->db->getFactures($restored[0]), true));
        $this->assertNotEquals($invoice['id'], json_decode($this->db->getFactures($restored[0]), true)[0]['id']);
    }

    public function testDuplicatedLockedQuoteIsEditableAndKeepsOrderedLines(): void {
        $f = $this->fixture();
        $this->db->gestion_update('produit_devis', 'discount', '10', $f['line'], $this->company);
        $invoice = $this->db->insertFacture($this->company, $f['quote']);
        $this->db->lockDocument('facture', $invoice['id'], $this->company);
        $this->assertTrue($this->db->gestion_duplicate('devis', $f['quote'], $this->company));
        $quotes = json_decode($this->db->getDevis($this->company), true);
        $copy = array_values(array_filter($quotes, fn ($q) => $q['id'] != $f['quote']))[0];
        $this->assertSame(0, (int)$copy['locked']);
        $lines = json_decode($this->db->getListProduit($copy['id'], $this->company), true);
        $this->assertCount(1, $lines);
        $this->assertSame(10.0, (float)$lines[0]['discount']);
        $this->assertTrue($this->db->gestion_update('produit_devis','quantite','5',$lines[0]['pdid'],$this->company));
    }

    public function testQuoteStaysEditableWithADraftInvoiceAndLegacyStandaloneLock(): void {
        $f = $this->fixture();
        $this->db->insertFacture($this->company, $f['quote']);
        $this->connection->executeStatement('UPDATE *PREFIX*gestion_devis SET locked = 1 WHERE id = ?', [$f['quote']]);
        $this->assertFalse($this->db->isQuoteLocked($f['quote'], $this->company));
        $this->assertSame(0, (int)json_decode($this->db->getDevis($this->company), true)[0]['locked']);
        $this->assertSame(0, (int)json_decode($this->db->getOneDevis($f['quote'], $this->company), true)[0]['locked']);
        $this->assertTrue($this->db->gestion_update('devis', 'comment', 'Still editable', $f['quote'], $this->company));
        $this->assertTrue($this->db->gestion_update('client', 'nom', 'Updated', $f['client'], $this->company));
        $this->assertTrue($this->db->gestion_updateConfiguration('entreprise', 'Updated company', $this->company));
    }

    public function testQuoteCannotBeLockedIndependently(): void {
        $f = $this->fixture();
        $this->expectException(\InvalidArgumentException::class);
        $this->db->lockDocument('devis', $f['quote'], $this->company);
    }

    public function testLockedInvoiceProtectsQuoteEvenIfItsStoredFlagIsReset(): void {
        $f = $this->fixture();
        $invoice = $this->db->insertFacture($this->company, $f['quote']);
        $this->db->lockDocument('facture', $invoice['id'], $this->company);
        $this->connection->executeStatement('UPDATE *PREFIX*gestion_devis SET locked = 0 WHERE id = ?', [$f['quote']]);
        $this->assertSame(1, (int)json_decode($this->db->getDevis($this->company), true)[0]['locked']);
        $this->assertSame(1, (int)json_decode($this->db->getOneDevis($f['quote'], $this->company), true)[0]['locked']);
        $this->expectException(\DomainException::class);
        $this->db->gestion_update('devis', 'comment', 'Blocked', $f['quote'], $this->company);
    }

    public function testDeletingDraftQuoteDoesNotLeaveOrphanLinesInBackup(): void {
        $f = $this->fixture();
        $this->db->gestion_delete('devis', $f['quote'], $this->company);
        $backup = BackupFormat::decode(json_encode($this->db->exportBackup($this->owner)));
        $this->assertSame([], $backup['produit_devis']);
    }

    public function testLockedInvoiceProtectsQuoteAndLinkedCatalogData(): void {
        $f = $this->fixture();
        $invoice = $this->db->insertFacture($this->company, $f['quote']);
        $this->db->lockDocument('facture', $invoice['id'], $this->company);
        $this->assertSame(1, (int)json_decode($this->db->getDevis($this->company), true)[0]['locked']);
        foreach ([['devis','num',$f['quote']], ['produit_devis','quantite',$f['line']], ['produit','prix_unitaire',$f['product']], ['client','nom',$f['client']]] as [$table,$column,$id]) {
            try { $this->db->gestion_update($table,$column,'2',$id,$this->company); $this->fail('Locked mutation accepted: ' . $table); }
            catch (\DomainException $e) { $this->assertNotEmpty($e->getMessage()); }
        }
        try { $this->db->gestion_update('facture','status_paiement','1',$invoice['id'],$this->company); $this->fail('Locked payment status accepted.'); } catch (\DomainException $e) { $this->addToAssertionCount(1); }
    }

    public function testReferencedProductCannotBeDeleted(): void {
        $f = $this->fixture();
        $this->expectException(\DomainException::class);
        $this->db->gestion_delete('produit',$f['product'],$this->company);
    }

    public function testChangesAreAttributedAndContainOldAndNewValue(): void {
        $f = $this->fixture();
        $this->db->gestion_update('produit', 'prix_unitaire', '12.50', $f['product'], $this->company);
        $history = $this->db->history($this->company);
        $this->assertNotEmpty($history);
        $this->assertSame($this->owner, $history[0]['actor']);
        $changes = json_decode($history[0]['changes'], true);
        $this->assertSame('prix_unitaire', $changes['field']);
        $this->assertSame('12.50', $changes['after']);
        $this->assertSame(0.0, (float)$changes['before']);
    }

    public function testRestoreFailureRollsBackPreviouslyInsertedCompany(): void {
        $this->fixture();
        $tables = $this->db->exportBackup($this->owner)['tables'];
        // Force a schema constraint violation after the new company was inserted.
        $tables['devis'][0]['locked'] = null;
        $before = $this->db->getCompaniesOwner($this->owner);
        try { $this->db->restoreBackup($tables, $this->owner); $this->fail('Restore should fail.'); }
        catch (\Throwable $e) { $this->assertSame($before, $this->db->getCompaniesOwner($this->owner)); }
    }

    public function testBackupDoesNotExportProviderCredentials(): void {
        $this->connection->executeStatement('UPDATE *PREFIX*gestion_configuration SET einvoice_provider_config = ? WHERE id = ?', ['{"client_secret":"do-not-export"}', $this->company]);
        $backup = $this->db->exportBackup($this->owner);
        $this->assertStringNotContainsString('do-not-export', json_encode($backup));
        $this->assertArrayNotHasKey('einvoice_provider_config', $backup['tables']['configuration'][0]);
    }

    public function testExportDoesNotIncludeAnotherOwner(): void {
        $this->db->createCompany('other-test-owner');
        $this->assertCount(1, $this->db->exportBackup($this->owner)['tables']['configuration']);
    }
}
