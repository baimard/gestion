<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

class Version20003Date20260527145456 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {

		$schema = $schemaClosure();

		$tableName = 'gestion_configuration';

		if ($schema->hasTable($tableName)) {

			$table = $schema->getTable($tableName);

			// VAT NUMBER
			if (!$table->hasColumn('vat_number')) {
				$table->addColumn('vat_number', 'string', [
					'notnull' => false,
					'length' => 64,
					'default' => null,
				]);
			}

			// ZIP CODE
			if (!$table->hasColumn('zip_code')) {
				$table->addColumn('zip_code', 'string', [
					'notnull' => false,
					'length' => 20,
					'default' => null,
				]);
			}

			// CITY NAME
			if (!$table->hasColumn('city_name')) {
				$table->addColumn('city_name', 'string', [
					'notnull' => false,
					'length' => 255,
					'default' => null,
				]);
			}
		}

		return $schema;
	}
}