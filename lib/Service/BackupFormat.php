<?php

declare(strict_types=1);
namespace OCA\Gestion\Service;

final class BackupFormat {
    public const TABLES = ['configuration', 'client', 'produit', 'devis', 'facture', 'produit_devis'];
    public static function decode(string $content): array {
        if (strlen($content) > 20 * 1024 * 1024) throw new \InvalidArgumentException('Backup exceeds 20 MB.');
        try { $data = json_decode($content, true, 64, JSON_THROW_ON_ERROR); }
        catch (\JsonException $e) { throw new \InvalidArgumentException('Invalid JSON backup. Legacy text backups cannot be restored safely.'); }
        if (($data['format'] ?? '') !== 'gestion-backup' || ($data['version'] ?? null) !== 1 || !is_array($data['tables'] ?? null)) {
            throw new \InvalidArgumentException('Unsupported backup format.');
        }
        foreach (self::TABLES as $table) {
            if (!isset($data['tables'][$table]) || !is_array($data['tables'][$table]) || array_values($data['tables'][$table]) !== $data['tables'][$table]) throw new \InvalidArgumentException('Missing backup table: ' . $table);
            $ids = [];
            foreach ($data['tables'][$table] as $row) {
                if (!is_array($row) || !isset($row['id']) || !ctype_digit((string)$row['id']) || (int)$row['id'] < 1 || isset($ids[$row['id']])) throw new \InvalidArgumentException('Invalid or duplicate record identifier.');
                foreach ($row as $value) if (!is_scalar($value) && $value !== null) throw new \InvalidArgumentException('Invalid backup value.');
                $ids[$row['id']] = true;
            }
        }
        $tables = $data['tables'];
        $indices = [];
        foreach ($tables as $name => $rows) {
            if (!in_array($name, self::TABLES, true)) throw new \InvalidArgumentException('Unknown backup table.');
            $indices[$name] = array_column($rows, null, 'id');
        }
        foreach (self::TABLES as $name) foreach ($tables[$name] as $row) {
            if ($name === 'configuration') continue;
            $company = $row['id_configuration'] ?? 0;
            if (!isset($indices['configuration'][$company])) throw new \InvalidArgumentException('Missing company.');
            $refs = ['devis' => ['id_client' => 'client'], 'facture' => ['id_devis' => 'devis'], 'produit_devis' => ['devis_id' => 'devis', 'produit_id' => 'produit']][$name] ?? [];
            foreach ($refs as $field => $target) {
                if ($name === 'devis' && (int)($row[$field] ?? 0) === 0) continue;
                if (!isset($indices[$target][$row[$field] ?? 0]) || (int)$indices[$target][$row[$field]]['id_configuration'] !== (int)$company) throw new \InvalidArgumentException('Invalid cross-company reference.');
            }
            if (isset($row['discount'])) CommercialMath::discount($row['discount']);
        }
        foreach ($tables['configuration'] as $row) {
            foreach (['logo_height', 'logo_header_height', 'logo_footer_height'] as $field) {
                if (array_key_exists($field, $row) && (!ctype_digit((string)$row[$field]) || (int)$row[$field] > 600)) {
                    throw new \InvalidArgumentException('Logo maximum height must be between 0 and 600.');
                }
            }
        }
        return $tables;
    }
}
