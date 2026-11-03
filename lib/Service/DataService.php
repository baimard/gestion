<?php
namespace OCA\Gestion\Service;

use OCA\Gestion\Db\Bdd;
use OCP\AppFramework\Http\DataResponse;
use OCP\ISession;

class DataService {
	private Bdd $myDb;
	private ISession $session;
    private $userId;

	public function __construct(Bdd $myDb, ISession $session, $UserId = null) {
        $this->userId = $UserId;
		$this->myDb = $myDb;
		$this->session = $session;
	}

	private function currentCompany() {
		$company = $this->session->get('CurrentCompany');
        if (!$this->userId || !in_array((string)$company, array_map('strval', array_column($this->myDb->getCompaniesList($this->userId), 'id')), true)) throw new \DomainException('Company access denied.');
		return $company;
	}

	public function lockDocument(string $table, int $id): void {
        $this->myDb->lockDocument($table, $id, (int)$this->currentCompany());
    }

    public function prepareDocumentForSending(string $table, int $id): bool {
        if (!in_array($table, ['devis', 'facture'], true)) throw new \InvalidArgumentException('Invalid document type.');
        $company = (int)$this->currentCompany();
        $this->myDb->requireRecord($table, $id, $company);
        if ($table === 'facture') {
            $this->myDb->lockDocument('facture', $id, $company);
            return true;
        }
        return $this->myDb->isQuoteLocked($id, $company);
    }

    public function history(int $before = 0): array {
        return $this->myDb->history((int)$this->currentCompany(), $before);
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

	public function insertContactClient(array $client) {
		$fields = ['nom', 'prenom', 'entreprise', 'telephone', 'mail', 'adresse', 'zip_code', 'city_name', 'country_code'];
		$normalized = [];
		foreach ($fields as $field) {
			$value = $client[$field] ?? '';
			$normalized[$field] = is_scalar($value) ? mb_substr(trim((string)$value), 0, 500) : '';
		}
		return $this->myDb->importContact((int)$this->currentCompany(), $normalized);
	}

	public function insertDevis() {
		return $this->myDb->insertDevis($this->currentCompany());
	}

	public function insertFacture(int $devisId, $datePaiement = null): array {
		return $this->myDb->insertFacture($this->currentCompany(), $devisId, $datePaiement);
	}

	public function insertProduit() {
		return $this->myDb->insertProduit($this->currentCompany());
	}

	public function insertProduitDevis($id) {
		return $this->myDb->insertProduitDevis($id, $this->currentCompany());
	}

	/**
	 * @return array{defaultCode: string, reasons: array<int, array{code: string, reason: string}>}
	 */
	public function getVatExemptionReasons(): array {
		return [
			'defaultCode' => VatExemptionReasonCatalog::DEFAULT_CODE,
			'reasons' => VatExemptionReasonCatalog::all(),
		];
	}

	/**
	 * @return array{code: string, reason: string}
	 */
	public function updateProductVatExemptionReason($id, string $code): array {
		$reason = VatExemptionReasonCatalog::reasonFor($code);
		if ($reason === null) {
			throw new \InvalidArgumentException('Unknown VAT exemption reason code.');
		}

		if (!$this->myDb->updateProductVatExemptionReason(
			$id,
			$code,
			$this->currentCompany()
		)) {
			throw new \RuntimeException('The product must use VAT category E.');
		}

		return [
			'code' => $code,
			'reason' => $reason,
		];
	}

	public function update($table, $column, $data, $id) {
		if ($table === 'facture' && !in_array($column, ['date_paiement', 'type_paiement', 'status_paiement'], true)) {
			return false;
		}
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
		if ($table === 'facture') {
			return new DataResponse('', 403, ['Content-Type' => 'application/json']);
		}
		if ($this->myDb->gestion_duplicate($table, $id, $this->currentCompany())) {
			return new DataResponse("", 200, ['Content-Type' => 'application/json']);
		}

		return new DataResponse("", 500, ['Content-Type' => 'application/json']);
	}

	public function drop($id, $value) {
		return $this->myDb->gestion_drop($id, $value, $this->currentCompany());
	}

	public function reorderProducts(int $devisId, array $productQuoteIds): void {
		$this->myDb->reorderProductQuoteRows($devisId, $productQuoteIds, $this->currentCompany());
	}

	public function delete($table, $id) {
		return $this->myDb->gestion_delete($table, $id, $this->currentCompany());
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
