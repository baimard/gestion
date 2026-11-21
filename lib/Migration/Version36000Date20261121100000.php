<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version36000Date20261121100000 extends SimpleMigrationStep {
    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        $schema = $schemaClosure();
        $configuration = $schema->getTable('gestion_configuration');
        foreach (['quote_template_layout', 'invoice_template_layout', 'quote_template_css', 'invoice_template_css'] as $column) {
            if (!$configuration->hasColumn($column)) {
                $configuration->addColumn($column, 'text', ['notnull' => false, 'length' => 65535]);
            }
        }
        return $schema;
    }
}
