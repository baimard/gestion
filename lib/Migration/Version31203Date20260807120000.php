<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCA\Gestion\Service\VatExemptionReasonCatalog;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version31203Date20260807120000 extends SimpleMigrationStep {
	public function __construct(private IDBConnection $connection) {
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		$schema = $schemaClosure();
		$table = $schema->getTable('gestion_produit');

		if (!$table->hasColumn('vat_exemption_reason_code')) {
			$table->addColumn('vat_exemption_reason_code', 'string', [
				'length' => 64,
				'notnull' => false,
			]);
		}

		if (!$table->hasColumn('vat_exemption_reason')) {
			$table->addColumn('vat_exemption_reason', 'string', [
				'length' => 255,
				'notnull' => false,
			]);
		}

		return $schema;
	}

	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		$query = $this->connection->getQueryBuilder();
		$query->update('gestion_produit')
			->set(
				'vat_exemption_reason_code',
				$query->createNamedParameter(VatExemptionReasonCatalog::DEFAULT_CODE)
			)
			->set(
				'vat_exemption_reason',
				$query->createNamedParameter(VatExemptionReasonCatalog::DEFAULT_REASON)
			)
			->where($query->expr()->eq('vat_category', $query->createNamedParameter('E')))
			->executeStatement();
	}
}
