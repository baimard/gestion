<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version35000Date20261119090000 extends SimpleMigrationStep {
    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        $schema = $schemaClosure();
        $company = $schema->getTable('gestion_configuration');
        if (!$company->hasColumn('sender_profiles')) {
            $company->addColumn('sender_profiles', 'text', ['notnull' => false, 'length' => 16777215]);
        }
        $quote = $schema->getTable('gestion_devis');
        if (!$quote->hasColumn('sender_profile')) {
            $quote->addColumn('sender_profile', 'string', ['notnull' => false, 'length' => 32]);
        }
        return $schema;
    }
}
