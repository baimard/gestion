<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2023 Your name <your@email.com>
 *
 * @author Your name <your@email.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use OCP\IDBConnection;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version20300Date20230714134445 extends SimpleMigrationStep {
	private $rows_client = [];
	private $rows_devis = [];
	private $rows_facture = [];
	private $rows_produit = [];
	private $rows_produit_devis = [];
    private IDbConnection $db;

	public function __construct(IDbConnection $db){
        $this->db = $db;
    }

	/**
	 * @param IOutput $output
	 * @param Closure(): ISchemaWrapper $schemaClosure
	 * @param array $options
	 */
	public function preSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		$schema = $schemaClosure();
		$tableprefix = "gestion_";

		//Client
		if($schema->getTable($tableprefix.'client')->hasColumn('id_nextcloud')) {
			$query = $this->db->getQueryBuilder();
			$query	->select('id', 'id_nextcloud')
					->from($tableprefix.'client');
			$this->rows_client = $query->execute()->fetchAll();
		}

		if($schema->getTable($tableprefix.'devis')->hasColumn('id_nextcloud')) {
			$query = $this->db->getQueryBuilder();
			$query	->select('id', 'id_nextcloud')
					->from($tableprefix.'devis');
			$this->rows_devis = $query->execute()->fetchAll();
		}

		if($schema->getTable($tableprefix.'facture')->hasColumn('id_nextcloud')) {
			$query = $this->db->getQueryBuilder();
			$query	->select('id', 'id_nextcloud')
					->from($tableprefix.'facture');
			$this->rows_facture = $query->execute()->fetchAll();
		}

		if($schema->getTable($tableprefix.'produit')->hasColumn('id_nextcloud')) {
			$query = $this->db->getQueryBuilder();
			$query	->select('id', 'id_nextcloud')
					->from($tableprefix.'produit');
			$this->rows_produit = $query->execute()->fetchAll();
		}

		if($schema->getTable($tableprefix.'produit_devis')->hasColumn('id_nextcloud')) {
			$query = $this->db->getQueryBuilder();
			$query	->select('id', 'id_nextcloud')
					->from($tableprefix.'produit_devis');
			$this->rows_produit_devis = $query->execute()->fetchAll();
		}

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


		foreach(["client", "devis", "facture", "produit", "produit_devis"] as $nameTable){
			$table = $schema->getTable($tableprefix.$nameTable);

			if ($table->hasColumn('id_nextcloud')) {
				$table->dropColumn('id_nextcloud');
			}

			if (!$table->hasColumn('id_configuration')) {
				$table->addColumn('id_configuration', 'integer', ['length' => 11]);
			}
		}
		
		if (!$schema->hasTable($tableprefix.'conf_share')) {
            $table = $schema->createTable($tableprefix.'conf_share');
        }

        $table = $schema->getTable($tableprefix.'conf_share');

        if (!$table->hasColumn('id')) {
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true]);
            $table->setPrimaryKey(['id']);
        }
        
        if (!$table->hasColumn('id_nextcloud')) {
            $table->addColumn('id_nextcloud', 'text', []);
        }

        if (!$table->hasColumn('id_configuration')) {
            $table->addColumn('id_configuration', 'integer', ['length' => 11]);
        }


		return $schema;
	}


	/**
	 * @param $table
	 * Table transformation to change id in database for all elements
	 */
	private function changeId($nameTable,$table){
		$tableprefix = "gestion_";

		foreach ($nameTable as $t) {
			
			$qb2 = $this->db->getQueryBuilder();
			$qb2	->select('id')->from($tableprefix.'configuration')
					->where($qb2->expr()->eq('id_nextcloud', $qb2->createNamedParameter($t['id_nextcloud'])))
					->orderBy('id', 'asc');
			$configuration = $qb2->execute()->fetchAll();

			if(count($configuration) > 0 ){
				$qb3 = $this->db->getQueryBuilder();
				$qb3->update($tableprefix.$table)
					->set('id_configuration', $qb3->createNamedParameter($configuration[0]['id']))
					->where($qb3->expr()->eq('id', $qb3->createNamedParameter($t['id'])))
					->execute();
			}
			
		}
	}

	/**
	 * @param IOutput $output
	 * @param Closure(): ISchemaWrapper $schemaClosure
	 * @param array $options
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		$this->changeId($this->rows_client,"client");
		$this->changeId($this->rows_devis,"devis");
		$this->changeId($this->rows_facture,"facture");
		$this->changeId($this->rows_produit,"produit");
		$this->changeId($this->rows_produit_devis,"produit_devis");
	}
}

// ALTER TABLE `oc_gestion_client` CHANGE `id_configuration` `id_nextcloud` VARCHAR(64) NOT NULL; 
// ALTER TABLE `oc_gestion_devis` CHANGE `id_configuration` `id_nextcloud` VARCHAR(64) NOT NULL; 
// ALTER TABLE `oc_gestion_facture` CHANGE `id_configuration` `id_nextcloud` VARCHAR(64) NOT NULL; 
// ALTER TABLE `oc_gestion_produit` CHANGE `id_configuration` `id_nextcloud` VARCHAR(64) NOT NULL; 
// ALTER TABLE `oc_gestion_produit_devis` CHANGE `id_configuration` `id_nextcloud` VARCHAR(64) NOT NULL; 


// UPDATE `oc_gestion_client` SET `id_nextcloud` = 'nextcloud' WHERE `oc_gestion_client`.`id` = 1; 
// UPDATE `oc_gestion_client` SET `id_nextcloud` = 'nextcloud' WHERE `oc_gestion_client`.`id` = 2; 
// UPDATE `oc_gestion_client` SET `id_nextcloud` = 'test' WHERE `oc_gestion_client`.`id` = 3;

// UPDATE `oc_gestion_produit` SET `id_nextcloud` = 'nextcloud' WHERE `oc_gestion_produit`.`id` = 1; 
// UPDATE `oc_gestion_produit` SET `id_nextcloud` = 'test' WHERE `oc_gestion_produit`.`id` = 2; 

// UPDATE `oc_gestion_devis` SET `id_nextcloud` = 'nextcloud' WHERE `oc_gestion_devis`.`id` = 1; 

// UPDATE `oc_gestion_produit_devis` SET `id_nextcloud` = 'nextcloud' WHERE `oc_gestion_produit_devis`.`id` = 1; 

