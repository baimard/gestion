<?php
namespace OCA\Gestion\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;
use OCA\Gestion\Db\Bdd;

class PageController extends Controller {
	private $idNextcloud;
	private $myDb;

	public function __construct($AppName, IRequest $request, $UserId, Bdd $myDb){
		parent::__construct($AppName, $request);
		$this->idNextcloud = $UserId;
		$this->myDb = $myDb;
		\OCP\Util::addScript('gestion', 'bundle');
		\OCP\Util::addScript('gestion', '120.bundle');
		\OCP\Util::addScript('gestion', '513.bundle');
		\OCP\Util::addScript('gestion', '856.bundle');
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
		return new TemplateResponse('gestion', 'clientcreate');
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
    */
	public function devisshow($numdevis) {
		$devis = $this->myDb->getOneDevis($numdevis,$this->idNextcloud);
		$produits = $this->myDb->getListProduit($numdevis, $this->idNextcloud);
		return new TemplateResponse('gestion', 'devisshow', array('devis'=>json_decode($devis), 'produit'=>json_decode($produits)));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
    */
	public function factureshow($numfacture) {
		$facture = $this->myDb->getOneFacture($numfacture,$this->idNextcloud);
		// $produits = $this->myDb->getListProduit($numdevis);
		return new TemplateResponse('gestion', 'factureshow', array('facture'=>json_decode($facture)));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
    */
	public function getClients() {
		
		return $this->myDb->getClients($this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
    */
	public function getDevis() {
		
		return $this->myDb->getDevis($this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
    */
	public function getFactures() {
		
		return $this->myDb->getFactures($this->idNextcloud);
	}
	
	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
    */
	public function getProduits() {
		
		return $this->myDb->getProduits($this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $numdevis
    */
	public function getProduitsById($numdevis) {
		return $this->myDb->getListProduit($numdevis, $this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $id
    */
	public function getClient($id) {
		
		return $this->myDb->getClient($id, $this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $id
    */
	public function getClientbyiddevis($id) {
		
		return $this->myDb->getClientbyiddevis($id, $this->idNextcloud);
	}
	
	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function insertClient() {
		return $this->myDb->insertClient($this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * 
	 */
	public function insertDevis(){
		return $this->myDb->insertDevis($this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * 
	 */
	public function insertFacture(){
		return $this->myDb->insertFacture($this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * 
	 */
	public function insertProduit(){
		return $this->myDb->insertProduit($this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $id
	 */
	public function insertProduitDevis($id){
		return $this->myDb->insertProduitDevis($id, $this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $table
	 * @param string $column
	 * @param string $data
	 * @param string $id
	 */
	public function update($table, $column, $data, $id) {
		return $this->myDb->update($table, $column, $data, $id, $this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $table
	 * @param string $id
	 */
	public function delete($table, $id) {
		return $this->myDb->delete($table, $id, $this->idNextcloud);
	}

}
