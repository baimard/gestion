<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * FIXME Auto-generated migration step: Please modify to your needs!
 */
class Version20600Date20250326154440 extends SimpleMigrationStep {

	/**
	 * @param IOutput $output
	 * @param Closure(): ISchemaWrapper $schemaClosure
	 * @param array $options
	 */
	public function preSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
	}

	/**
	 * @param IOutput $output
	 * @param Closure(): ISchemaWrapper $schemaClosure
	 * @param array $options
	 * @return null|ISchemaWrapper
	 */
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		$schema = $schemaClosure();
		$tableprefix = "gestion_";

		$table = $schema->getTable($tableprefix.'devis');

		if (!$table->hasColumn('delay')) {
			$table->addColumn('delay', 'text', ['default' => 'Offer valid for 1 month']);
		}

		$table = $schema->getTable($tableprefix.'produit_devis');

		if (!$table->hasColumn('order')) {
			$table->addColumn('order', 'integer', ['length' => 3, 'default' => 0]);
		}


		$table = $schema->getTable($tableprefix.'produit');
		
		if (!$table->hasColumn('header')) {
			$table->addColumn('header', 'integer', ['length' => 1, 'default' => 0]);
		}

		return $schema;
	}

	/**
	 * @param IOutput $output
	 * @param Closure(): ISchemaWrapper $schemaClosure
	 * @param array $options
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
	}
}
