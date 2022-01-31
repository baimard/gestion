<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\IDBConnection;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version7Date20220125174818 extends SimpleMigrationStep {

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
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
          $schema = $schemaClosure();
          $tableprefix = "gestion_";

        /**Client**/
        if (!$schema->hasTable($tableprefix.'client')) {
            $table = $schema->createTable($tableprefix.'client');
        }
        $table = $schema->getTable($tableprefix.'client');
        if (!$table->hasColumn('id')) {
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->setPrimaryKey(['id']);
        }
        if (!$table->hasColumn('nom')) {
            $table->addColumn('nom', 'text', []);            
        }
        if (!$table->hasColumn('prenom')) {
            $table->addColumn('prenom', 'text', []);
        }
        if (!$table->hasColumn('siret')) {
        }else{
            $stmt = $this->db->prepare("ALTER TABLE `".'*PREFIX*'."gestion_client` CHANGE `siret` `legal_one` LONGTEXT");
            $stmt->execute();
        }

        if (!$table->hasColumn('legal_one')) {
            $table->addColumn('legal_one', 'text', []);
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
            $table->addColumn('id_nextcloud', 'string', ['length' => 64]);
        }

        /**Configuration**/
        if (!$schema->hasTable($tableprefix.'configuration')) {
            $table = $schema->createTable($tableprefix.'configuration');
        }
        $table = $schema->getTable($tableprefix.'configuration');
        if (!$table->hasColumn('id')) {
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->setPrimaryKey(['id']);
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
        }else{
            $stmt = $this->db->prepare("ALTER TABLE `".'*PREFIX*'."gestion_configuration` CHANGE `siret` `legal_one` LONGTEXT");
            $stmt->execute();
        }

        if (!$table->hasColumn('siren')) {
        }else{
            $stmt = $this->db->prepare("ALTER TABLE `".'*PREFIX*'."gestion_configuration` CHANGE `siren` `legal_two` LONGTEXT");
            $stmt->execute();
        }

        if (!$table->hasColumn('legal_one')) {
            $table->addColumn('legal_one', 'text', []);
        }

        if (!$table->hasColumn('legal_two')) {
            $table->addColumn('legal_two', 'text', []);
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
            $table->addColumn('mentions_default', 'string', ['default'=>'Legales mentions']);
        }else{
            $column = $table->getColumn('mentions_default');
            $column->setOptions(['default'=>'Legales mentions']);
        }

        if (!$table->hasColumn('tva_default')) {
            $table->addColumn('tva_default', 'float', ['default' => 0]);
        }else{
            $column = $table->getColumn('tva_default');
            $column->setOptions(['default' => 0]);
        }

        if (!$table->hasColumn('changelog')) {
            $table->addColumn('changelog', 'string', ['default' => '0']);
        }else{
            $column = $table->getColumn('changelog');
            $column->setOptions(['default' => '0']);
        }

		if (!$table->hasColumn('devise')) {
            $table->addColumn('devise', 'string', ['default' => 'EUR']);
        }else{
            $column = $table->getColumn('devise');
            $column->setOptions(['default' => 'EUR']);
        }

        if (!$table->hasColumn('auto_invoice_number')) {
            $table->addColumn('auto_invoice_number', 'integer', ['default' => 1 ]);
        }

        if (!$table->hasColumn('id_nextcloud')) {
            $table->addColumn('id_nextcloud', 'string', ['length' => 64]);
        }
        
        /**DEVIS**/
        if (!$schema->hasTable($tableprefix.'devis')) {
            $table = $schema->createTable($tableprefix.'devis');
        }

        $table = $schema->getTable($tableprefix.'devis');
        if (!$table->hasColumn('id')) {
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true]);
            $table->setPrimaryKey(['id']);
        }
        
        if (!$table->hasColumn('date')) {
            $table->addColumn('date', 'date', []);
        }

        if (!$table->hasColumn('num')) {
            $table->addColumn('num', 'text', []);
        }

        if (!$table->hasColumn('comment')) {
            $table->addColumn('comment', 'string', ['default' => "comment"]);
        }else{
            $column = $table->getColumn('comment');
            $column->setOptions(['default' => 'comment']);
        }

        if (!$table->hasColumn('version')) {
            $table->addColumn('version', 'string', ['length' => 64, 'default' => "1.0"]);
        }else{
            $column = $table->getColumn('version');
            $column->setOptions(['default' => '1.0']);
        }

        if (!$table->hasColumn('mentions')) {
            $table->addColumn('mentions', 'string', ['default' => "New"]);
        }else{
            $column = $table->getColumn('mentions');
            $column->setOptions(['default' => 'New']);
        }

        if (!$table->hasColumn('id_client')) {
            $table->addColumn('id_client', 'integer', ['length' => 11]);
        }

        if (!$table->hasColumn('id_nextcloud')) {
            $table->addColumn('id_nextcloud', 'string', ['length' => 64]);
        }

        /**FACTURE**/
        if (!$schema->hasTable($tableprefix.'facture')) {
            $table = $schema->createTable($tableprefix.'facture');            
        }

        $table = $schema->getTable($tableprefix.'facture');

        if (!$table->hasColumn('id')) {
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->setPrimaryKey(['id']);
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
            $table->addColumn('type_paiement', 'string', ['length' => 64]);
        }
        
        if (!$table->hasColumn('status_paiement')) {
            $table->addColumn('status_paiement', 'string', ['length' => 64, 'default' => 'NC']);
        }else{
            $column = $table->getColumn('status_paiement');
            $column->setOptions(['default' => 'NC']);
        }
        
        if (!$table->hasColumn('version')) {
            $table->addColumn('version', 'string', ['length' => 64, 'default' => '1.0']);
        }else{
            $column = $table->getColumn('version');
            $column->setOptions(['default' => '1.0']);
        }
        if (!$table->hasColumn('id_devis')) {
            $table->addColumn('id_devis', 'integer', ['length' => 11]);
        }

        if (!$table->hasColumn('id_nextcloud')) {
            $table->addColumn('id_nextcloud', 'string', ['length' => 64]);
        }

        /** PRODUIT **/
        if (!$schema->hasTable($tableprefix.'produit')) {
            $table = $schema->createTable($tableprefix.'produit');
        }

        $table = $schema->getTable($tableprefix.'produit');
        if (!$table->hasColumn('id')) {
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->setPrimaryKey(['id']);
        }

        if (!$table->hasColumn('reference')) {
            $table->addColumn('reference', 'text', []);
        }

        if (!$table->hasColumn('description')) {
            $table->addColumn('description', 'text', []);
        }

        if (!$table->hasColumn('prix_unitaire')) {
            $table->addColumn('prix_unitaire', 'float', ['default' => 0]);
        }else{
            $column = $table->getColumn('prix_unitaire');
            $column->setOptions(['default' => 0]);
        }

        if (!$table->hasColumn('vat')) {
            $table->addColumn('vat', 'float', ['default' => 0]);
        }else{
            $column = $table->getColumn('vat');
            $column->setOptions(['default' => 0]);
        }

        if (!$table->hasColumn('id_nextcloud')) {
            $table->addColumn('id_nextcloud', 'string', ['length' => 64]);
        }

        /** PRODUIT_DEVIS **/
        if (!$schema->hasTable($tableprefix.'produit_devis')) {
            $table = $schema->createTable($tableprefix.'produit_devis');
        }

        $table = $schema->getTable($tableprefix.'produit_devis');
        if (!$table->hasColumn('id')) {
            $table->addColumn('id', 'integer', ['autoincrement' => true,'notnull' => true,]);
            $table->setPrimaryKey(['id']);
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

        if (!$table->hasColumn('discount')) {
            $table->addColumn('discount', 'integer', ['length' => 11, 'default' => 0]);
        }else{
            $column = $table->getColumn('discount');
            $column->setOptions(['default' => 0]);
        }

        if (!$table->hasColumn('id_nextcloud')) {
            $table->addColumn('id_nextcloud', 'string', ['length' => 64]);
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
