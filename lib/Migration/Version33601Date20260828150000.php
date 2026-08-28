<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version33601Date20260828150000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		$schema = $schemaClosure();
		$table = $schema->getTable('gestion_configuration');

		foreach (['logo_header_width', 'logo_footer_width'] as $column) {
			if (!$table->hasColumn($column)) {
				$table->addColumn($column, 'integer', [
					'notnull' => true,
					'default' => 320,
					'unsigned' => true,
				]);
			}
		}

		return $schema;
	}
}
