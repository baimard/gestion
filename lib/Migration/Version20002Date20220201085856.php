<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use OCP\IDBConnection;

class Version20002Date20220201085856 extends SimpleMigrationStep {
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
		$schema = $schemaClosure();
		$tableprefix = "gestion_";

		//Client
		if($schema->getTable($tableprefix.'client')->hasColumn('siret')) {
			$query = $this->db->getQueryBuilder();
			$query	->select('id', 'siret')
					->from($tableprefix.'client');
			$this->rows_client = $query->execute()->fetchAll();
			$this->detect_client = true;
		}

		//Configuration
		if($schema->getTable($tableprefix.'configuration')->hasColumn('siret')) {
			$query = $this->db->getQueryBuilder();
			$query	->select('id', 'siret', 'siren')
					->from($tableprefix.'configuration');
			$this->rows_configuration = $query->execute()->fetchAll();
			$this->detect_configuration = true;
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

		if ($table->hasColumn('siret')) {
			$table->dropColumn('siret');
		}
		if ($table->hasColumn('siren')) {
			$table->dropColumn('siren');
		}

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
		$schema = $schemaClosure();
		$tableprefix = "gestion_";

		if($this->detect_client){
			//Client
			foreach ($this->rows_client as $row) {
				$qb = $this->db->getQueryBuilder();
				$qb
					->update('gestion_client')
					->set('legal_one', $qb->createNamedParameter($row['siret']))
					->where($qb->expr()->eq('id', $qb->createNamedParameter($row['id'])))
					->execute();
			}
		}
		if($this->detect_configuration){
			//Configuration
			foreach ($this->rows_configuration as $row) {
				$qb = $this->db->getQueryBuilder();
				$qb
				->update('gestion_configuration')
				->set('legal_one', $qb->createNamedParameter($row['siret']))
				->where($qb->expr()->eq('id', $qb->createNamedParameter($row['id'])))
				->execute();

				$qb
				->update('gestion_configuration')
				->set('legal_two', $qb->createNamedParameter($row['siren']))
				->where($qb->expr()->eq('id', $qb->createNamedParameter($row['id'])))
				->execute();
			}
		}
	}
}
