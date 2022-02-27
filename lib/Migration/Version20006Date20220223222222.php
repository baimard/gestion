<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use OCP\IDBConnection;

class Version20006Date20220223222222 extends SimpleMigrationStep {
	private $rows_client = [];
	private $rows_configuration = [];
    private IDbConnection $db;
	private $detect_client = false;
	private $detect_configuration = false;

	public function __construct(IDbConnection $db){
        $this->db = $db;
    }

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function preSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 * @return null|ISchemaWrapper
	 */
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		$schema = $schemaClosure();
		$tableprefix = "gestion_";

		$table = $schema->getTable($tableprefix.'configuration');

		if (!$table->hasColumn('format')) {
            $table->addColumn('format', 'string', ['length' => 10, 'default' => 'en-EN']);
        }

		return $schema;

	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		
	}
}
