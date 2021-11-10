<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version4Date20211110180142 extends SimpleMigrationStep {

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
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
          $schema = $schemaClosure();
          $tableprefix = "gestion_";

          if (!$schema->hasTable($tableprefix.'client')) {
              $table = $schema->createTable($tableprefix.'client');
              $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
              $table->addColumn('nom', 'text', []);
              $table->addColumn('prenom', 'text', []);
              $table->addColumn('siret', 'text', []);
              $table->addColumn('entreprise', 'text', []);
              $table->addColumn('telephone', 'text', []);
              $table->addColumn('mail', 'text', []);
              $table->addColumn('adresse', 'text', []);
              $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
              $table->setPrimaryKey(['id']);
          }else{
            $table = $schema->getTable($tableprefix.'client');
            if (!$table->hasColumn('id')) {
                $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            }
            if (!$table->hasColumn('nom')) {
                $table->addColumn('nom', 'text', []);            
            }
            if (!$table->hasColumn('prenom')) {
                $table->addColumn('prenom', 'text', []);
            }
            if (!$table->hasColumn('siret')) {
                $table->addColumn('siret', 'text', []);
            }
            if (!$table->hasColumn('entreprise')) {
                $table->addColumn('entreprise', 'text', []);
            }
            if (!$table->hasColumn('telephone')) {
                $table->addColumn('telephone', 'text', []);
            }
            if (!$table->hasColumn('mail')) {
                $table->addColumn('mail', 'text', []);
            }
            if (!$table->hasColumn('adresse')) {
                $table->addColumn('adresse', 'text', []);
            }
            if (!$table->hasColumn('id_nextcloud')) {
                $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            }
          }

          if (!$schema->hasTable($tableprefix.'configuration')) {
            $table = $schema->createTable($tableprefix.'configuration');
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->addColumn('entreprise', 'text', []);
            $table->addColumn('nom', 'text', []);
            $table->addColumn('prenom', 'text', []);
            $table->addColumn('siret', 'text', []);
            $table->addColumn('siren', 'text', []);
            $table->addColumn('mail', 'text', []);
            $table->addColumn('telephone', 'text', []);
            $table->addColumn('adresse', 'text', []);
            $table->addColumn('path', 'text', []);
            $table->addColumn('mentions_default', 'text', []);
            $table->addColumn('tva_default', 'float', []);
            $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            $table->setPrimaryKey(['id']);
        }else{
            $table = $schema->getTable($tableprefix.'configuration');
            if (!$table->hasColumn('id')) {
                $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            }
            if (!$table->hasColumn('entreprise')) {
                $table->addColumn('entreprise', 'text', []);
            }
            if (!$table->hasColumn('nom')) {
                $table->addColumn('nom', 'text', []);
            }
            if (!$table->hasColumn('prenom')) {
                $table->addColumn('prenom', 'text', []);
            }
            if (!$table->hasColumn('siret')) {
                $table->addColumn('siret', 'text', []);
            }
            if (!$table->hasColumn('siren')) {
                $table->addColumn('siren', 'text', []);
            }
            if (!$table->hasColumn('mail')) {
                $table->addColumn('mail', 'text', []);
            }
            if (!$table->hasColumn('telephone')) {
                $table->addColumn('telephone', 'text', []);
            }
            if (!$table->hasColumn('adresse')) {
                $table->addColumn('adresse', 'text', []);
            }
            if (!$table->hasColumn('path')) {
                $table->addColumn('path', 'text', []);
            }
            if (!$table->hasColumn('mentions_default')) {
                $table->addColumn('mentions_default', 'text', []);
            }
            if (!$table->hasColumn('tva_default')) {
                $table->addColumn('tva_default', 'float', []);
            }
            if (!$table->hasColumn('id_nextcloud')) {
                $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            }
        }

        if (!$schema->hasTable($tableprefix.'devis')) {
            $table = $schema->createTable($tableprefix.'devis');
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->addColumn('date', 'date', []);
            $table->addColumn('num', 'text', []);
            $table->addColumn('comment', 'text', []);
            $table->addColumn('version', 'string', ['length' => 64,]);
            $table->addColumn('mentions', 'text', []);
            $table->addColumn('id_client', 'integer', ['length' => 11,]);
            $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            $table->setPrimaryKey(['id']);
        }else{
            $table = $schema->getTable($tableprefix.'devis');
            if (!$table->hasColumn('id')) {
                $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            }
            if (!$table->hasColumn('date')) {
                $table->addColumn('date', 'date', []);
            }
            if (!$table->hasColumn('num')) {
                $table->addColumn('num', 'text', []);
            }
            if (!$table->hasColumn('comment')) {
                $table->addColumn('comment', 'string', ['default' => "commentaire"]);
            }
            if (!$table->hasColumn('version')) {
                $table->addColumn('version', 'string', ['length' => 64, 'default' => "1.0"]);
            }
            if (!$table->hasColumn('mentions')) {
                $table->addColumn('mentions', 'string', ['default' => "création"]);
            }
            if (!$table->hasColumn('id_client')) {
                $table->addColumn('id_client', 'integer', ['length' => 11,]);
            }
            if (!$table->hasColumn('id_nextcloud')) {
                $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            }
        }

        if (!$schema->hasTable($tableprefix.'facture')) {
            $table = $schema->createTable($tableprefix.'facture');
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->addColumn('num', 'text', []);
            $table->addColumn('date', 'string', ['length' => 64,]);
            $table->addColumn('date_paiement', 'date', []);
            $table->addColumn('type_paiement', 'string', ['length' => 64,]);
            $table->addColumn('status_paiement', 'string', ['length' => 64,]);
            $table->addColumn('version', 'string', ['length' => 64,]);
            $table->addColumn('id_devis', 'integer', ['length' => 11,]);
            $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            $table->setPrimaryKey(['id']);
        }else{
            $table = $schema->getTable($tableprefix.'facture');
            if (!$table->hasColumn('id')) {
                $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            }
            if (!$table->hasColumn('num')) {
                $table->addColumn('num', 'text', []);
            }
            if (!$table->hasColumn('date')) {
                $table->addColumn('date', 'string', ['length' => 64,]);
            }
            if (!$table->hasColumn('date_paiement')) {
                $table->addColumn('date_paiement', 'date', []);
            }
            if (!$table->hasColumn('type_paiement')) {
                $table->addColumn('type_paiement', 'string', ['length' => 64,]);
            }
            if (!$table->hasColumn('status_paiement')) {
                $table->addColumn('status_paiement', 'string', ['length' => 64,]);
            }
            if (!$table->hasColumn('version')) {
                $table->addColumn('version', 'string', ['length' => 64,]);
            }
            if (!$table->hasColumn('id_client')) {
                $table->addColumn('id_client', 'integer', ['length' => 11,]);
            }
            if (!$table->hasColumn('id_nextcloud')) {
                $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            }

			$column = $table->getColumn('version');
			$column->setOptions(['default' => '1.0',]);
        }

        if (!$schema->hasTable($tableprefix.'produit')) {
            $table = $schema->createTable($tableprefix.'produit');
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->addColumn('reference', 'text', []);
            $table->addColumn('description', 'text', []);
            $table->addColumn('prix_unitaire', 'float', []);
            $table->addColumn('vat', 'float', []);
            $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            $table->setPrimaryKey(['id']);
        }else{
            $table = $schema->getTable($tableprefix.'produit');
            if (!$table->hasColumn('id')) {
                $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            }
            if (!$table->hasColumn('reference')) {
                $table->addColumn('reference', 'text', []);
            }
            if (!$table->hasColumn('description')) {
                $table->addColumn('description', 'text', []);
            }
            if (!$table->hasColumn('prix_unitaire')) {
                $table->addColumn('prix_unitaire', 'float', []);
            }
            if (!$table->hasColumn('vat')) {
                $table->addColumn('vat', 'float', []);
            }
            if (!$table->hasColumn('id_nextcloud')) {
                $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            }
        }

        if (!$schema->hasTable($tableprefix.'produit_devis')) {
            $table = $schema->createTable($tableprefix.'produit_devis');
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->addColumn('devis_id', 'integer', ['length' => 11,]);
            $table->addColumn('produit_id', 'integer', ['length' => 11,]);
            $table->addColumn('quantite', 'integer', ['length' => 11,]);
            $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            $table->setPrimaryKey(['id']);
        }else{
            $table = $schema->getTable($tableprefix.'produit_devis');
            if (!$table->hasColumn('id')) {
                $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            }
            if (!$table->hasColumn('devis_id')) {
                $table->addColumn('devis_id', 'integer', ['length' => 11,]);
            }
            if (!$table->hasColumn('produit_id')) {
                $table->addColumn('produit_id', 'integer', ['length' => 11,]);
            }
            if (!$table->hasColumn('quantite')) {
                $table->addColumn('quantite', 'integer', ['length' => 11,]);
            }
            if (!$table->hasColumn('id_nextcloud')) {
                $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            }
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
