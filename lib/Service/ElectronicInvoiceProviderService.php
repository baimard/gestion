<?php

namespace OCA\Gestion\Service;

use OCP\IDBConnection;
use OCP\ISession;
use OCA\Gestion\Db\Bdd;

class ElectronicInvoiceProviderService {
    private const TABLE = 'gestion_configuration';
    private const PROVIDERS = [
        'iopole' => [
            'label' => 'Iopole',
            'required' => ['client_id', 'client_secret', 'customer_id', 'base_url', 'auth_url'],
        ],
    ];

    public function __construct(
        private IDBConnection $db,
        private ISession $session,
        private Bdd $myDb,
        private $UserId,
    ) {
    }

    public function getProviders(): array {
        return self::PROVIDERS;
    }

    private function currentCompany(): int {
        $companyId = (int)$this->session->get('CurrentCompany');
        if (!$this->UserId || $companyId <= 0 || !in_array((string)$companyId, array_map('strval', array_column($this->myDb->getCompaniesList($this->UserId), 'id')), true)) {
            throw new \DomainException('Company access denied.');
        }
        return $companyId;
    }

    private function canConfigure(int $companyId): bool {
        return in_array((string)$companyId, array_map('strval', array_column($this->myDb->getCompaniesOwner($this->UserId), 'id')), true);
    }

    /** Only server-side delivery may read the stored secret. */
    private function readConfiguration(int $companyId): array {
        $qb = $this->db->getQueryBuilder();
        $row = $qb->select('einvoice_provider', 'einvoice_provider_config')
            ->from(self::TABLE)
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($companyId)))
            ->executeQuery()->fetch();
        $provider = trim((string)($row['einvoice_provider'] ?? ''));
        $credentials = json_decode((string)($row['einvoice_provider_config'] ?? ''), true);
        if (!is_array($credentials)) $credentials = [];
        return ['provider' => $provider, 'credentials' => $credentials, 'configured' => $this->isComplete($provider, $credentials)];
    }

    public function getCurrentConfiguration(): array {
        $companyId = $this->currentCompany();
        $config = $this->readConfiguration($companyId);
        $config['canConfigure'] = $this->canConfigure($companyId);
        $config['secretStored'] = $config['canConfigure'] && !empty($config['credentials']['client_secret']);
        if (!$config['canConfigure']) $config['credentials'] = [];
        unset($config['credentials']['client_secret']);
        return $config;
    }

    public function saveCurrentConfiguration(string $provider, array $credentials): array {
        $companyId = $this->currentCompany();
        if (!$this->canConfigure($companyId)) throw new \DomainException('Only the company owner can configure the electronic invoice platform.');
        $provider = strtolower(trim($provider));
        if ($provider !== '' && !isset(self::PROVIDERS[$provider])) throw new \InvalidArgumentException('Unsupported electronic invoice provider.');
        $previous = $this->readConfiguration($companyId);
        $sanitized = [];
        if ($provider !== '') {
            foreach (self::PROVIDERS[$provider]['required'] as $key) {
                if (isset($credentials[$key]) && !is_string($credentials[$key])) throw new \InvalidArgumentException('Invalid platform credential.');
                $sanitized[$key] = trim($credentials[$key] ?? '');
                if (strlen($sanitized[$key]) > 4096) throw new \InvalidArgumentException('Platform credential is too long.');
            }
            // An empty password input means keep the stored secret; disabling the provider clears it.
            if ($sanitized['client_secret'] === '' && $previous['provider'] === $provider) {
                $sanitized['client_secret'] = $previous['credentials']['client_secret'] ?? '';
            }
            foreach (['base_url', 'auth_url'] as $key) {
                if ($sanitized[$key] !== '') ProviderUrlPolicy::validate($sanitized[$key]);
            }
        }
        $qb = $this->db->getQueryBuilder();
        $qb->update(self::TABLE)
            ->set('einvoice_provider', $qb->createNamedParameter($provider))
            ->set('einvoice_provider_config', $qb->createNamedParameter(json_encode($sanitized, JSON_UNESCAPED_SLASHES)))
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($companyId)))
            ->executeStatement();
        $this->myDb->recordHistory($companyId, 'provider', 'configuration', $companyId, ['provider' => $provider]);
        return $this->getCurrentConfiguration();
    }

    public function requireProvider(string $provider): array {
        $config = $this->readConfiguration($this->currentCompany());
        if ($config['provider'] !== $provider || !$config['configured']) {
            throw new \RuntimeException('The electronic invoice provider ' . $provider . ' is not configured for the current company.');
        }
        return $config['credentials'];
    }

    private function isComplete(string $provider, array $credentials): bool {
        if ($provider === '' || !isset(self::PROVIDERS[$provider])) return false;
        foreach (self::PROVIDERS[$provider]['required'] as $key) {
            if (!isset($credentials[$key]) || !is_string($credentials[$key]) || trim($credentials[$key]) === '') return false;
        }
        return true;
    }
}
