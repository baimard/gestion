<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version31200Date20260725223000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		$schema = $schemaClosure();
		$table = $schema->getTable('gestion_configuration');

		if (!$table->hasColumn('einvoice_provider')) {
			$table->addColumn('einvoice_provider', 'string', [
				'length' => 64,
				'notnull' => false,
				'default' => null,
			]);
		}

		if (!$table->hasColumn('einvoice_provider_config')) {
			$table->addColumn('einvoice_provider_config', 'text', [
				'notnull' => false,
				'default' => null,
			]);
		}

		return $schema;
	}
}
