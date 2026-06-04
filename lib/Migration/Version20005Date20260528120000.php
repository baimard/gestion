<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;
use OCP\IDBConnection;

class Version20005Date20260528120000 extends SimpleMigrationStep {

	private IDBConnection $connection;

	public function __construct(IDBConnection $connection) {
		$this->connection = $connection;
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		return $schemaClosure();
	}

	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {

		$qb = $this->connection->getQueryBuilder();

		// ZIP CODE : NULL -> ''
		$qb->update('gestion_client')
			->set('zip_code', $qb->createNamedParameter(''))
			->where($qb->expr()->isNull('zip_code'))
			->executeStatement();

		// CITY NAME : NULL -> ''
		$qb = $this->connection->getQueryBuilder();

		$qb->update('gestion_client')
			->set('city_name', $qb->createNamedParameter(''))
			->where($qb->expr()->isNull('city_name'))
			->executeStatement();

		// COUNTRY CODE : NULL -> 'FR'
		$qb = $this->connection->getQueryBuilder();

		$qb->update('gestion_client')
			->set('country_code', $qb->createNamedParameter('FR'))
			->where($qb->expr()->isNull('country_code'))
			->executeStatement();

		$output->info('Client data successfully normalized (NULL values fixed).');
	}
}