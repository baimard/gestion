<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

class Version20004Date20260527233906 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {

		$schema = $schemaClosure();

		$tableName = 'gestion_client';

		if ($schema->hasTable($tableName)) {

			$table = $schema->getTable($tableName);

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

			// COUNTRY CODE
			if (!$table->hasColumn('country_code')) {
				$table->addColumn('country_code', 'string', [
					'notnull' => false,
					'length' => 5,
					'default' => 'FR',
				]);
			}
		}

		return $schema;
	}
}