<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCA\Gestion\Service\ProviderSecret;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use OCP\Security\ICrypto;

class Version36000Date20261121110000 extends SimpleMigrationStep {
    public function __construct(private IDBConnection $db, private ICrypto $crypto) {
    }

    public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
        $lastId = 0;
        do {
            $query = $this->db->getQueryBuilder();
            $result = $query->select('id', 'einvoice_provider_config')->from('gestion_configuration')
                ->where($query->expr()->gt('id', $query->createNamedParameter($lastId)))
                ->andWhere($query->expr()->isNotNull('einvoice_provider_config'))
                ->orderBy('id', 'ASC')->setMaxResults(100)->executeQuery();
            $rows = $result->fetchAll();
            $result->closeCursor();
            foreach ($rows as $row) {
                $lastId = (int)$row['id'];
                if ($row['einvoice_provider_config'] === '') {
                    continue;
                }
                $credentials = json_decode($row['einvoice_provider_config'], true, 512, JSON_THROW_ON_ERROR);
                $protected = ProviderSecret::protect($credentials, $this->crypto);
                if ($protected !== $credentials) {
                    $update = $this->db->getQueryBuilder();
                    $update->update('gestion_configuration')
                        ->set('einvoice_provider_config', $update->createNamedParameter(json_encode($protected, JSON_THROW_ON_ERROR)))
                        ->where($update->expr()->eq('id', $update->createNamedParameter($lastId)))
                        ->executeStatement();
                }
            }
        } while (count($rows) === 100);
    }
}
