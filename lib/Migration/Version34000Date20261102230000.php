<?php

declare(strict_types=1);
namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version34000Date20261102230000 extends SimpleMigrationStep {
    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        $schema = $schemaClosure();
        foreach (['devis', 'facture'] as $name) {
            $table = $schema->getTable('gestion_' . $name);
            if (!$table->hasColumn('locked')) $table->addColumn('locked', 'integer', ['default' => 0, 'notnull' => true]);
        }
        $table = $schema->getTable('gestion_configuration');
        foreach (['price_decimals' => 2, 'quantity_decimals' => 2] as $name => $default) {
            if (!$table->hasColumn($name)) $table->addColumn($name, 'integer', ['default' => $default, 'notnull' => true]);
        }
        if (!$schema->hasTable('gestion_history')) {
            $table = $schema->createTable('gestion_history');
            $table->addColumn('id', 'bigint', ['autoincrement' => true, 'notnull' => true]);
            $table->addColumn('id_configuration', 'bigint', ['notnull' => true]);
            $table->addColumn('actor', 'string', ['length' => 64, 'notnull' => true]);
            $table->addColumn('occurred_at', 'string', ['length' => 32, 'notnull' => true]);
            $table->addColumn('action', 'string', ['length' => 32, 'notnull' => true]);
            $table->addColumn('entity', 'string', ['length' => 32, 'notnull' => true]);
            $table->addColumn('entity_id', 'bigint', ['notnull' => true]);
            $table->addColumn('changes', 'text', ['notnull' => true]);
            $table->setPrimaryKey(['id']);
            $table->addIndex(['id_configuration', 'id'], 'gestion_hist_company');
        }
        return $schema;
    }
}
