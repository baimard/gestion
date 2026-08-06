<?php

namespace OCA\Gestion\Service;

use OCP\IDBConnection;
use OCP\ISession;

class ElectronicInvoiceProviderService {
	private const TABLE = 'gestion_configuration';

	private const PROVIDERS = [
		'iopole' => [
			'label' => 'Iopole',
			'required' => [
				'client_id',
				'client_secret',
				'customer_id',
				'base_url',
				'auth_url',
			],
		],
	];

	public function __construct(
		private IDBConnection $db,
		private ISession $session,
	) {
	}

	public function getProviders(): array {
		return self::PROVIDERS;
	}

	public function getCurrentConfiguration(): array {
		$companyId = (int)$this->session->get('CurrentCompany');
		if ($companyId <= 0) {
			return ['provider' => '', 'credentials' => [], 'configured' => false];
		}

		$qb = $this->db->getQueryBuilder();
		$row = $qb->select('einvoice_provider', 'einvoice_provider_config')
			->from(self::TABLE)
			->where($qb->expr()->eq('id', $qb->createNamedParameter($companyId)))
			->executeQuery()
			->fetch();

		$provider = trim((string)($row['einvoice_provider'] ?? ''));
		$credentials = json_decode((string)($row['einvoice_provider_config'] ?? ''), true);
		if (!is_array($credentials)) {
			$credentials = [];
		}

		return [
			'provider' => $provider,
			'credentials' => $credentials,
			'configured' => $this->isComplete($provider, $credentials),
		];
	}

	public function saveCurrentConfiguration(string $provider, array $credentials): array {
		$companyId = (int)$this->session->get('CurrentCompany');
		if ($companyId <= 0) {
			throw new \RuntimeException('No current company selected.');
		}

		$provider = strtolower(trim($provider));
		if ($provider !== '' && !isset(self::PROVIDERS[$provider])) {
			throw new \InvalidArgumentException('Unsupported electronic invoice provider.');
		}

		$sanitized = [];
		if ($provider !== '') {
			foreach (self::PROVIDERS[$provider]['required'] as $key) {
				$sanitized[$key] = trim((string)($credentials[$key] ?? ''));
			}
		}

		$qb = $this->db->getQueryBuilder();
		$qb->update(self::TABLE)
			->set('einvoice_provider', $qb->createNamedParameter($provider))
			->set('einvoice_provider_config', $qb->createNamedParameter(json_encode($sanitized, JSON_UNESCAPED_SLASHES)))
			->where($qb->expr()->eq('id', $qb->createNamedParameter($companyId)))
			->executeStatement();

		return [
			'provider' => $provider,
			'credentials' => $sanitized,
			'configured' => $this->isComplete($provider, $sanitized),
		];
	}

	public function requireProvider(string $provider): array {
		$config = $this->getCurrentConfiguration();
		if ($config['provider'] !== $provider || !$config['configured']) {
			throw new \RuntimeException('The electronic invoice provider ' . $provider . ' is not configured for the current company.');
		}

		return $config['credentials'];
	}

	private function isComplete(string $provider, array $credentials): bool {
		if ($provider === '' || !isset(self::PROVIDERS[$provider])) {
			return false;
		}

		foreach (self::PROVIDERS[$provider]['required'] as $key) {
			if (trim((string)($credentials[$key] ?? '')) === '') {
				return false;
			}
		}

		return true;
	}
}
