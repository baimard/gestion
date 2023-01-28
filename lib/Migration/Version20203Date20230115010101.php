<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use OCP\IDBConnection;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version20203Date20230115010101 extends SimpleMigrationStep {

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
		$table = $schema->getTable($tableprefix.'facture');
		if (!$table->hasColumn('user_id')) {
			$table->addColumn('user_id', 'integer', []);
		}

		$table = $schema->getTable($tableprefix.'devis');
		if (!$table->hasColumn('user_id')) {
			$table->addColumn('user_id', 'integer', []);
		}

		$table = $schema->getTable($tableprefix.'configuration');
		if (!$table->hasColumn('facture_prefixe')) {
			$table->addColumn('facture_prefixe', 'string', ['notnull' => false, 'default' => "BILL-"]);
		}else if ($table->hasColumn('facture_prefixe')) {
            $column = $table->getColumn('facture_prefixe');
			$column->setOptions(['type' => \Doctrine\DBAL\Types\Type::getType('string'), 'notnull' => false, 'default' => "BILL-"]);
        }

		return $schema;
	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		$tableprefix = "gestion_";

		$query = $this->db->getQueryBuilder();
		$query	->select('id_nextcloud')->groupBy('id_nextcloud')->from($tableprefix.'facture');
		$users = $query->execute()->fetchAll();

	
		foreach ($users as $user) {
			$qb2 = $this->db->getQueryBuilder();
			$qb2	->select('id')->from($tableprefix.'facture')
					->where($qb2->expr()->eq('id_nextcloud', $qb2->createNamedParameter($user['id_nextcloud'])))
					->orderBy('id', 'asc');
			$facture_rows = $qb2->execute()->fetchAll();
			$i = 1;
			foreach ($facture_rows as $fr){
				$qb = $this->db->getQueryBuilder();
				$qb->update($tableprefix.'facture')
					->set('user_id', $qb->createNamedParameter($i))
					->where($qb->expr()->eq('id', $qb->createNamedParameter($fr['id'])))
					->execute();
					$i++;
			}
		}

		$query = $this->db->getQueryBuilder();
		$query	->select('id_nextcloud')->groupBy('id_nextcloud')->from($tableprefix.'devis');
		$users = $query->execute()->fetchAll();

	
		foreach ($users as $user) {
			$qb2 = $this->db->getQueryBuilder();
			$qb2	->select('id')->from($tableprefix.'devis')
					->where($qb2->expr()->eq('id_nextcloud', $qb2->createNamedParameter($user['id_nextcloud'])))
					->orderBy('id', 'asc');
			$facture_rows = $qb2->execute()->fetchAll();
			$i = 1;
			foreach ($facture_rows as $fr){
				$qb = $this->db->getQueryBuilder();
				$qb->update($tableprefix.'devis')
					->set('user_id', $qb->createNamedParameter($i))
					->where($qb->expr()->eq('id', $qb->createNamedParameter($fr['id'])))
					->execute();
					$i++;
			}
		}
	}
}
