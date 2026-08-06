<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version20006Date20260721120000 extends SimpleMigrationStep {

	private IDBConnection $connection;

	public function __construct(IDBConnection $connection) {
		$this->connection = $connection;
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		return $schemaClosure();
	}

	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		$this->normalizeZipCode('gestion_configuration');
		$this->normalizeZipCode('gestion_client');

		$output->info('Zip codes successfully normalized.');
	}

	private function normalizeZipCode(string $table): void {
		$select = $this->connection->getQueryBuilder();
		$select->select('id', 'zip_code')
			->from($table);

		$cursor = $select->executeQuery();
		while ($row = $cursor->fetch()) {
			$currentZipCode = $row['zip_code'];
			$zipCode = substr($currentZipCode ?? '', 0, 20);
			if ($currentZipCode !== null && $zipCode === $currentZipCode) {
				continue;
			}

			$update = $this->connection->getQueryBuilder();
			$update->update($table)
				->set('zip_code', $update->createNamedParameter($zipCode))
				->where($update->expr()->eq('id', $update->createNamedParameter($row['id'])))
				->executeStatement();
		}
		$cursor->closeCursor();
	}
}
