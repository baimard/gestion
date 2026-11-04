<?php
declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version34500Date20261104093000 extends SimpleMigrationStep {
    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        $schema = $schemaClosure();
        $table = $schema->getTable('gestion_configuration');
        foreach (['logo_height', 'logo_header_height', 'logo_footer_height'] as $column) {
            if (!$table->hasColumn($column)) {
                $table->addColumn($column, 'integer', ['default' => 0, 'notnull' => true, 'unsigned' => true]);
            }
        }
        return $schema;
    }
}
