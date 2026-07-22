<?php
namespace OCA\Gestion\Service;

use OCA\Gestion\Db\Bdd;
use OCP\AppFramework\Http\DataResponse;
use OCP\IConfig;
use OCP\ISession;

class DataService {
	private Bdd $myDb;
	private IConfig $config;
	private ISession $session;

	public function __construct(Bdd $myDb, IConfig $config, ISession $session) {
		$this->myDb = $myDb;
		$this->config = $config;
		$this->session = $session;
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

	public function updateConfiguration($table, $column, $data, $id) {
		return $this->myDb->gestion_updateConfiguration($table, $column, $data, $id);
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
