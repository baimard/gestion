<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version31201Date20260805120000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		$schema = $schemaClosure();
		$table = $schema->getTable('gestion_client');

		if (!$table->hasColumn('company_identification')) {
			$table->addColumn('company_identification', 'string', [
				'length' => 64,
				'notnull' => false,
				'default' => null,
			]);
		}

		if (!$table->hasColumn('vat_number')) {
			$table->addColumn('vat_number', 'string', [
				'length' => 64,
				'notnull' => false,
				'default' => null,
			]);
		}

		return $schema;
	}
}
