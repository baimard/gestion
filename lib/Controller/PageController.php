<?php
namespace OCA\Gestion\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;
use OCA\Gestion\Db\Bdd;

class PageController extends Controller {
	private $userId;
	private $myDb;

	public function __construct($AppName, IRequest $request, $UserId, Bdd $myDb){
		parent::__construct($AppName, $request);
		$this->userId = $UserId;
		$this->myDb = $myDb;
		\OCP\Util::addScript('gestion', 'bundle');
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
    */
	public function index() {
		return new TemplateResponse('gestion', 'index');  // templates/index.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
    */
	public function devis() {
		return new TemplateResponse('gestion', 'devis');  // templates/index.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
    */
	public function facture() {
		return new TemplateResponse('gestion', 'facture');  // templates/index.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
    */
	public function produit() {
		return new TemplateResponse('gestion', 'produit');  // templates/index.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
    */
	public function clientcreate() {
		return new TemplateResponse('gestion', 'clientcreate');  // templates/index.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
    */
	public function devisshow($numdevis) {
		$devis = $this->myDb->getOneDevis($numdevis);
		$produits = $this->myDb->getListProduit($numdevis);
		return new TemplateResponse('gestion', 'devisshow', array('devis'=>json_decode($devis), 'produit'=>json_decode($produits)));  // templates/index.php
	}

	/**
	 * @NoCSRFRequired
    */
	public function getClients() {
		
		return $this->myDb->getClients();
	}

	/**
	 * @NoCSRFRequired
    */
	public function getDevis() {
		
		return $this->myDb->getDevis();
	}

	/**
	 * @NoCSRFRequired
    */
	public function getProduits() {
		
		return $this->myDb->getProduits();
	}

	/**
	 * @NoCSRFRequired
	 * @param string $numdevis
    */
	public function getProduitsById($numdevis) {
		// var_dump($numdevis);
		return $this->myDb->getListProduit($numdevis);
	}

	/**
	 * @NoCSRFRequired
    */
	public function getFactures() {
		
		return $this->myDb->getFactures();
	}

	/**
	 * @NoCSRFRequired
	 * @param string $id
    */
	public function getClient($id) {
		
		return $this->myDb->getClient($id);
	}

	/**
	 * @NoCSRFRequired
	 * @param string $nom
	 * @param string $prenom
	 * @param string $siret
	 * @param string $entreprise
	 * @param string $telephone
	 * @param string $mail
	 * @param string $adresse
	 */
	public function insertClient($nom, $prenom, $siret, $entreprise, $telephone, $mail, $adresse) {
		return $this->myDb->insertClient($nom, $prenom, $siret, $entreprise, $telephone, $mail, $adresse);
	}

	/**
	 * @NoCSRFRequired
	 * 
	 */
	public function insertDevis(){
		return $this->myDb->insertDevis();
	}

	/**
	 * @NoCSRFRequired
	 * @param string $id
	 */
	public function insertProduitDevis($id){
		return $this->myDb->insertProduitDevis($id);
	}

	/**
	 * @NoCSRFRequired
	 * @param string $table
	 * @param string $column
	 * @param string $data
	 * @param string $id
	 */
	public function updateClient($table, $column, $data, $id) {
		return $this->myDb->updateClient($table, $column, $data, $id);
	}
}
