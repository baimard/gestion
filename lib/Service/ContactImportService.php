<?php

declare(strict_types=1);

namespace OCA\Gestion\Service;

use OCP\Contacts\IManager;

class ContactImportService {
	private const PROPERTIES = ['FN', 'N', 'ORG', 'EMAIL', 'TEL', 'ADR'];

	public function __construct(private IManager $contacts) {
	}

	public function list(): array {
		if (!$this->contacts->isEnabled()) {
			return [];
		}

		return array_values(array_map(
			fn (array $contact): array => $this->normalize($contact),
			$this->contacts->search('', self::PROPERTIES, ['types' => true, 'limit' => 500])
		));
	}

	public function find(string $id): ?array {
		foreach ($this->list() as $contact) {
			if ((string)$contact['id'] === $id) {
				return $contact;
			}
		}
		return null;
	}

	private function normalize(array $contact): array {
		$name = $this->values($contact['N'] ?? []);
		$address = $this->firstPropertyValue($contact['ADR'] ?? []);
		$addressParts = is_array($address) ? $address : explode(';', (string)$address);
		$country = strtoupper((string)($addressParts[6] ?? ''));

		return [
			'id' => (string)($contact['id'] ?? ''),
			'displayName' => (string)($contact['FN'] ?? trim(($name[1] ?? '') . ' ' . ($name[0] ?? ''))),
			'nom' => (string)($name[0] ?? ''),
			'prenom' => (string)($name[1] ?? ''),
			'entreprise' => implode(' ', $this->values($contact['ORG'] ?? [])),
			'telephone' => (string)$this->first($contact['TEL'] ?? ''),
			'mail' => (string)$this->first($contact['EMAIL'] ?? ''),
			'adresse' => trim(implode(' ', array_filter([$addressParts[1] ?? '', $addressParts[2] ?? '']))),
			'zip_code' => (string)($addressParts[5] ?? ''),
			'city_name' => (string)($addressParts[3] ?? ''),
			'country_code' => strlen($country) === 2 ? $country : '',
		];
	}

	private function first(mixed $value): mixed {
		$values = $this->values($value);
		return $values[0] ?? '';
	}

	private function firstPropertyValue(mixed $value): mixed {
		if (!is_array($value)) {
			return $value;
		}
		if (array_key_exists('value', $value)) {
			return $value['value'];
		}
		$first = reset($value);
		return is_array($first) && array_key_exists('value', $first) ? $first['value'] : $first;
	}

	private function values(mixed $value): array {
		if (!is_array($value)) {
			return $value === null || $value === '' ? [] : [$value];
		}
		if (array_key_exists('value', $value)) {
			return is_array($value['value']) ? $value['value'] : [$value['value']];
		}

		$result = [];
		foreach ($value as $item) {
			foreach ($this->values($item) as $entry) {
				$result[] = $entry;
			}
		}
		return $result;
	}
}
