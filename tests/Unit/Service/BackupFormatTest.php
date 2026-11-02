<?php
namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Service\BackupFormat;
use PHPUnit\Framework\TestCase;

class BackupFormatTest extends TestCase {
    public function testCrossCompanyRelationshipsAreRejected(): void {
        $tables = array_fill_keys(BackupFormat::TABLES, []);
        $tables['configuration'] = [['id' => 1], ['id' => 2]];
        $tables['client'] = [['id' => 10, 'id_configuration' => 2]];
        $tables['devis'] = [['id' => 20, 'id_configuration' => 1, 'id_client' => 10]];
        $this->expectException(\InvalidArgumentException::class);
        BackupFormat::decode(json_encode(['format' => 'gestion-backup', 'version' => 1, 'tables' => $tables]));
    }
    public function testLegacyBackupIsRejectedInsteadOfExecutingText(): void {
        $this->expectException(\InvalidArgumentException::class);
        BackupFormat::decode("===client===\n1;2;Company");
    }
    public function testDuplicateIdentifiersAreRejected(): void {
        $tables = array_fill_keys(BackupFormat::TABLES, []);
        $tables['configuration'] = [['id' => 1], ['id' => 1]];
        $this->expectException(\InvalidArgumentException::class);
        BackupFormat::decode(json_encode(['format' => 'gestion-backup', 'version' => 1, 'tables' => $tables]));
    }
}
