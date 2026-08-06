<?php
namespace OCA\Gestion\Service;

use OCA\Gestion\Db\Bdd;
use OCP\AppFramework\Http\DataResponse;
use OCP\Contacts\IManager as ContactsManager;
use OCP\IConfig;
use OCP\ISession;

class DataService {
	private Bdd $myDb;
	private IConfig $config;
	private ISession $session;
	private ContactsManager $contactsManager;

	public function __construct(Bdd $myDb, IConfig $config, ISession $session, ContactsManager $contactsManager) {
		$this->myDb = $myDb;
		$this->config = $config;
		$this->session = $session;
		$this->contactsManager = $contactsManager;
	}

	private function currentCompany() {
		return $this->session->get('CurrentCompany');
	}

	public function getClients() {
		return $this->myDb->getClients($this->currentCompany());
	}

	public function getClient($id) {
		return $this->myDb->getClient($id, $this->currentCompany());
	}

	public function getClientbyiddevis($id) {
		return $this->myDb->getClientbyiddevis($id, $this->currentCompany());
	}

	public function getConfiguration() {
		return $this->myDb->getConfiguration($this->currentCompany());
	}

	public function getDevis() {
		return $this->myDb->getDevis($this->currentCompany());
	}

	public function getFactures() {
		return $this->myDb->getFactures($this->currentCompany());
	}

	public function getProduits() {
		return $this->myDb->getProduits($this->currentCompany());
	}

	public function getProduitsById($numdevis) {
		return $this->myDb->getListProduit($numdevis, $this->currentCompany());
	}

	public function getOneDevis($numdevis) {
		return $this->myDb->getOneDevis($numdevis, $this->currentCompany());
	}

	public function getOneFacture($numfacture) {
		return $this->myDb->getOneFacture($numfacture, $this->currentCompany());
	}

	public function insertClient() {
		return $this->myDb->insertClient($this->currentCompany());
	}

	public function getContacts(string $search = ''): DataResponse {
		if (!$this->contactsManager->isEnabled()) {
			return new DataResponse([], 200, ['Content-Type' => 'application/json']);
		}

		$contacts = $this->contactsManager->search($search, ['FN', 'N', 'ORG', 'EMAIL', 'TEL', 'ADR'], ['limit' => 100]);
		$mappedContacts = array_map([$this, 'mapContactToClient'], $contacts);
		$mappedContacts = array_values(array_filter($mappedContacts, static function ($contact) {
			return $contact['label'] !== '';
		}));

		return new DataResponse($mappedContacts, 200, ['Content-Type' => 'application/json']);
	}

	public function insertClientFromContact(array $client): DataResponse {
		$this->myDb->insertClientFromData($this->currentCompany(), $client);
		return new DataResponse('', 200, ['Content-Type' => 'application/json']);
	}

	private function mapContactToClient(array $contact): array {
		$name = $this->firstValue($contact['N'] ?? '');
		$fullName = $this->firstString($contact['FN'] ?? '');
		$nameParts = is_array($name) ? array_values($name) : explode(';', $name);
		$lastName = trim((string)($nameParts[0] ?? ''));
		$firstName = trim((string)($nameParts[1] ?? ''));

		if ($firstName === '' && $lastName === '' && $fullName !== '') {
			$parts = preg_split('/\s+/', $fullName, 2);
			$firstName = $parts[0] ?? '';
			$lastName = $parts[1] ?? '';
		}

		$address = $this->firstValue($contact['ADR'] ?? '');
		$addressParts = is_array($address) ? array_values($address) : explode(';', $address);
		$street = trim((string)($addressParts[2] ?? ''));
		$city = trim((string)($addressParts[3] ?? ''));
		$zipCode = trim((string)($addressParts[5] ?? ''));
		$country = strtoupper(trim((string)($addressParts[6] ?? '')));
		$countryCode = preg_match('/^[A-Z]{2}$/', $country) ? $country : '';

		$company = $this->firstString($contact['ORG'] ?? '');
		$label = trim($company ?: $fullName ?: trim($firstName . ' ' . $lastName));

		return [
			'label' => $label,
			'Company' => $company,
			'First name' => $firstName,
			'Last name' => $lastName,
			'Legal information' => '',
			'Phone number' => $this->firstString($contact['TEL'] ?? ''),
			'Email' => $this->firstString($contact['EMAIL'] ?? ''),
			'Address' => $street,
			'Zip code' => $zipCode,
			'City name' => $city,
			'Country code' => $countryCode,
		];
	}

	private function firstValue($value) {
		if (is_array($value)) {
			$value = reset($value);
		}

		if (is_array($value) && array_key_exists('value', $value)) {
			$value = $value['value'];
		}

		return $value;
	}

	private function firstString($value): string {
		$value = $this->firstValue($value);

		if (is_array($value)) {
			$value = reset($value);
		}

		return trim((string)$value);
	}

	public function insertDevis() {
		return $this->myDb->insertDevis($this->currentCompany());
	}

	public function insertFacture($datePaiement = null) {
		return $this->myDb->insertFacture($this->currentCompany(), $datePaiement);
	}

	public function insertProduit() {
		return $this->myDb->insertProduit($this->currentCompany());
	}

	public function insertProduitDevis($id) {
		return $this->myDb->insertProduitDevis($id, $this->currentCompany());
	}

	public function update($table, $column, $data, $id) {
		return $this->myDb->gestion_update($table, $column, $data, $id, $this->currentCompany());
	}

	public function updateConfiguration($column, $data) {
		return $this->myDb->gestion_updateConfiguration(
			$column,
			$data,
			$this->currentCompany()
		);
	}

	public function duplicate($table, $id): DataResponse {
		if ($this->myDb->gestion_duplicate($table, $id, $this->currentCompany())) {
			return new DataResponse("", 200, ['Content-Type' => 'application/json']);
		}

		return new DataResponse("", 500, ['Content-Type' => 'application/json']);
	}

	public function drop($id, $value) {
		return $this->myDb->gestion_drop($id, $value, $this->currentCompany());
	}

	public function delete($table, $id) {
		return $this->myDb->gestion_delete($table, $id, $this->currentCompany());
	}

	public function getServerFromMail(): DataResponse {
		return new DataResponse(['mail' => $this->config->getSystemValue('mail_from_address') . '@' . $this->config->getSystemValue('mail_domain')], 200, ['Content-Type' => 'application/json']);
	}

	public function getStats() {
		$res = [];
		$res['client'] = json_decode($this->myDb->numberClient($this->currentCompany()))[0]->c;
		$res['devis'] = json_decode($this->myDb->numberDevis($this->currentCompany()))[0]->c;
		$res['facture'] = json_decode($this->myDb->numberFacture($this->currentCompany()))[0]->c;
		$res['produit'] = json_decode($this->myDb->numberProduit($this->currentCompany()))[0]->c;
		return json_encode($res);
	}

	public function getAnnualTurnoverPerMonthNoVat() {
		return $this->myDb->getAnnualTurnoverPerMonthNoVat($this->currentCompany());
	}
}
