<?php

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

class Version2Date20210707000001 extends SimpleMigrationStep {

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function preSchemaChange(IOutput $output, Closure $schemaClosure, array $options) {
	
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

          if (!$schema->hasTable('gestion_client')) {
              $table = $schema->createTable('gestion_client');
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
          }

          if (!$schema->hasTable('gestion_configuration')) {
            $table = $schema->createTable('gestion_configuration');
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
            $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            $table->setPrimaryKey(['id']);
        }

        if (!$schema->hasTable('gestion_devis')) {
            $table = $schema->createTable('gestion_devis');
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->addColumn('date', 'date', []);
            $table->addColumn('num', 'text', []);
            $table->addColumn('id_client', 'integer', ['length' => 11,]);
            $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            $table->setPrimaryKey(['id']);
        }

        if (!$schema->hasTable('gestion_facture')) {
            $table = $schema->createTable('gestion_facture');
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->addColumn('num', 'text', []);
            $table->addColumn('date', 'string', ['length' => 64,]);
            $table->addColumn('date_paiement', 'date', []);
            $table->addColumn('type_paiement', 'string', ['length' => 64,]);
            $table->addColumn('id_devis', 'integer', ['length' => 11,]);
            $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            $table->setPrimaryKey(['id']);
        }

        if (!$schema->hasTable('gestion_produit')) {
            $table = $schema->createTable('gestion_produit');
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->addColumn('reference', 'text', []);
            $table->addColumn('description', 'text', []);
            $table->addColumn('prix_unitaire', 'float', []);
            $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            $table->setPrimaryKey(['id']);
        }

        if (!$schema->hasTable('gestion_produit_devis')) {
            $table = $schema->createTable('gestion_produit_devis');
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->addColumn('devis_id', 'integer', ['length' => 11,]);
            $table->addColumn('produit_id', 'integer', ['length' => 11,]);
            $table->addColumn('quantite', 'integer', ['length' => 11,]);
            $table->addColumn('id_nextcloud', 'string', ['length' => 64,]);
            $table->setPrimaryKey(['id']);
        }

          return $schema;
	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options) {

	}
}
