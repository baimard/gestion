<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version33600Date20260828120000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		$schema = $schemaClosure();
		$table = $schema->getTable('gestion_configuration');

		if (!$table->hasColumn('logo_width')) {
			$table->addColumn('logo_width', 'integer', [
				'notnull' => true,
				'default' => 160,
				'unsigned' => true,
			]);
		}

		return $schema;
	}
}
