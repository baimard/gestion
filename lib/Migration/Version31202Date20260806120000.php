<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version31202Date20260806120000 extends SimpleMigrationStep {
	public function __construct(private IDBConnection $connection) {
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		$schema = $schemaClosure();
		$table = $schema->getTable('gestion_produit');

		if (!$table->hasColumn('vat_category')) {
			$table->addColumn('vat_category', 'string', [
				'length' => 2,
				'notnull' => true,
				'default' => 'S',
			]);
		}

		return $schema;
	}

	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		$query = $this->connection->getQueryBuilder();
		$query->update('gestion_produit')
			->set('vat_category', $query->createNamedParameter('E'))
			->where($query->expr()->eq('vat', $query->createNamedParameter(0)))
			->executeStatement();
	}
}
