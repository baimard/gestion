<?php

declare(strict_types=1);

namespace OCA\Gestion\Migration;

use Closure;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version20602Date20260528123000 extends SimpleMigrationStep {

    public function changeSchema(
        IOutput $output,
        Closure $schemaClosure,
        array $options
    ) {

        $schema = $schemaClosure();

        if ($schema->hasTable('gestion_configuration')) {

            $table = $schema->getTable('gestion_configuration');

            if (!$table->hasColumn('iban')) {

                $table->addColumn('iban', 'string', [
                    'notnull' => false,
                    'length' => 255,
                    'default' => '',
                ]);
            }
        }

        return $schema;
    }
}