<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use OCP\IDBConnection;

class Version20002Date20220201085856 extends SimpleMigrationStep {
	/**
	 * IDB
	 */
	private $rows = [];
    private IDbConnection $db;

    public function __construct(IDbConnection $db){
        $this->db = $db;
    }

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function preSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		$schema = $schemaClosure();
		$tableprefix = "gestion_";
		if($schema->getTable($tableprefix.'client')->hasColumn('siret')) {
			$query = $this->db->getQueryBuilder();
			$query	->select('id', 'siret')
					->from($tableprefix.'client');
			$this->rows = $query->execute()->fetchAll();
		}
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

		$table = $schema->getTable($tableprefix.'client');

		if ($table->hasColumn('siret')) {
			$table->dropColumn('siret');
		}

		if (!$table->hasColumn('legal_one')) {
            $table->addColumn('legal_one', 'text', []);
        }

		$table = $schema->getTable($tableprefix.'configuration');
		if (!$table->hasColumn('legal_one')) {
            $table->addColumn('legal_one', 'text', []);
        }
        if (!$table->hasColumn('legal_two')) {
            $table->addColumn('legal_two', 'text', []);
        }

		return $schema;


	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		foreach ($this->rows as $row) {
     		$stmt = $this->db->prepare("UPDATE `".'*PREFIX*'."gestion_client` SET `legal_one` = ? WHERE id = ?;");
        	$stmt->execute(array($row['siret'], $row['id']));
		}
	}
}
