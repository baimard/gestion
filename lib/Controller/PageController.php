<?php
namespace OCA\Gestion\Controller;

use OCP\IRequest;
use OCP\Mail\IMailer;
use OCP\Files\IRootFolder;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;
use OCA\Gestion\Db\Bdd;
use OCP\IURLGenerator;
use OCP\IConfig;
use OCP\ISession;
use OCP\AppFramework\Http\Attribute\UseSession;


use OCP\IUserManager;
use OCP\IUser;
use OCP\Accounts\IAccountManager;

class PageController extends Controller {
	private $myDb;

	private $urlGenerator;
	private $mailer;
	private $config;

	private $myID;

	/** @var  ContentSecurityPolicy */
	private ContentSecurityPolicy $csp;
	
	/** @var ISession */
	private ISession $session;

    /** @var IUserManager */
    private IUserManager $userManager;

    /** @var IAccountManager */
    private IAccountManager $accountManager;

	/** @var IRootStorage */
	private $storage;
	
	/**
	 * Constructor
	 */
	public function __construct($AppName, 
								IRequest $request,
								$UserId, 
								Bdd $myDb, 
								IRootFolder $rootFolder,
								IURLGenerator $urlGenerator,
								IMailer $mailer,
								Iconfig $config,
								IUserManager $userManager,
								IAccountManager $accountManager,
								ISession $session,
								ContentSecurityPolicy $csp){
		parent::__construct($AppName, $request);
		$this->myID = $UserId;
		//TODO Envoyer la valeur en cours
		// $this->idNextcloud = ;
		$this->myDb = $myDb;
		$this->urlGenerator = $urlGenerator;
		$this->mailer = $mailer;
		$this->config = $config;
		$this->userManager = $userManager;
		$this->accountManager = $accountManager;
		$this->csp = $csp;
		$this->session = $session;



		try{
			$this->storage = $rootFolder->getUserFolder($this->myID);
		}catch(\OC\User\NoUserException $e){

		}
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function index() {
		// $res = $this->userManager->get('nextcloud');
		// $myaccount = $this->accountManager->getAccount($res);
		// $prop = [];
		// foreach($myaccount as $key => $value) {
		// 	$prop[$key]= $value;
		// }
		$response = new TemplateResponse(	'gestion', 'index', array(	'test' => $prop, 
											'path' => $this->myID, 
											'url' => $this->getNavigationLink(),
											'CompaniesList' => $this->getCompaniesList(),
											'CurrentCompany' => $this->session['CurrentCompany']
												)
											);  // templates/index.php
		return $response;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @UseSession
	*/
	#[UseSession]
	public function devis() {
		return new TemplateResponse('gestion', 'devis', array(	'path' => $this->myID, 
																'url' => $this->getNavigationLink(),
																'CompaniesList' => $this->getCompaniesList(),
																'CurrentCompany' => $this->session['CurrentCompany']
															)
														);  // templates/devis.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @UseSession
	*/
	#[UseSession]
	public function facture() {
		return new TemplateResponse('gestion', 'facture', array(	'path' => $this->myID, 
																	'url' => $this->getNavigationLink(),
																	'CompaniesList' => $this->getCompaniesList(),
																	'CurrentCompany' => $this->session['CurrentCompany']
																)
															);  // templates/facture.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @UseSession
	*/
	#[UseSession]
	public function produit() {
		return new TemplateResponse('gestion', 'produit', array(	'path' => $this->myID, 
																	'url' => $this->getNavigationLink(),
																	'CompaniesList' => $this->getCompaniesList(),
																	'CurrentCompany' => $this->session['CurrentCompany']
																)
															);  // templates/produit.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @UseSession
	*/
	#[UseSession]
	public function statistique() {
		return new TemplateResponse('gestion', 'statistique', array(	'path' => $this->myID, 
																		'url' => $this->getNavigationLink(),
																		'CompaniesList' => $this->getCompaniesList(),
																		'CurrentCompany' => $this->session['CurrentCompany']
																	)
																);  // templates/statistique.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @UseSession
	*/
	#[UseSession]
	public function legalnotice($page) {
		return new TemplateResponse('gestion', 'legalnotice', array(	'page' => 'content/legalnotice', 
																		'path' => $this->myID, 
																		'url' => $this->getNavigationLink(),
																		'CompaniesList' => $this->getCompaniesList(),
																		'CurrentCompany' => $this->session['CurrentCompany']
																	)
																);  // templates/legalnotice.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @UseSession
	*/
	#[UseSession]
	public function france() {
		return new TemplateResponse('gestion', 'legalnotice', array('page' => 'legalnotice/france', 
																	'path' => $this->myID, 
																	'url' => $this->getNavigationLink(),
																	'CompaniesList' => $this->getCompaniesList(),
																	'CurrentCompany' => $this->session['CurrentCompany']
																)
															);  // templates/legalnotice.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @UseSession
	*/
	#[UseSession]
	public function config() {
		$res = $this->myDb->checkConfig($this->session['CurrentCompany'], $this->myID);
		if($res < 1 ){
			$this->session['CurrentCompany'] = '';
		}
		
		$response = new TemplateResponse(	'gestion', 'configuration', array(	'path' => $this->myID, 
											'url' => $this->getNavigationLink(),
											'CompaniesList' => $this->getCompaniesList(),
											'CurrentCompany' => $this->session['CurrentCompany']
										)
									);  // templates/configuration.php

		$response->setContentSecurityPolicy($this->csp);
		return $response;
	}
	
	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $numdevis
	 * @UseSession
	*/
	#[UseSession]
	public function devisshow($numdevis) {
		$devis = $this->myDb->getOneDevis($numdevis,$this->session['CurrentCompany']);
		$produits = $this->myDb->getListProduit($numdevis, $this->session['CurrentCompany']);
		return new TemplateResponse('gestion', 'devisshow', array(	'configuration'=> $this->getConfiguration(), 
																	'devis'=>json_decode($devis), 
																	'produit'=>json_decode($produits), 
																	'path' => $this->myID, 
																	'url' => $this->getNavigationLink(),
																	'logo' => $this->getLogo(),
																	'CompaniesList' => $this->getCompaniesList(),
																	'CurrentCompany' => $this->session['CurrentCompany']
																)
															);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $numfacture
	 * @UseSession
	*/
	#[UseSession]
	public function factureshow($numfacture) {
		$facture = $this->myDb->getOneFacture($numfacture,$this->session['CurrentCompany']);
		// $produits = $this->myDb->getListProduit($numdevis);
		return new TemplateResponse('gestion', 'factureshow', array(	'path' => $this->myID, 
																		'configuration'=> $this->getConfiguration(), 
																		'facture'=>json_decode($facture), 
																		'url' => $this->getNavigationLink(),
																		'logo' => $this->getLogo(),
																		'CompaniesList' => $this->getCompaniesList(),
																		'CurrentCompany' => $this->session['CurrentCompany']
																)
															);
	}															

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function isConfig() {
		return $this->myDb->isConfig($this->session['CurrentCompany'],$this->myID);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getNavigationLink(){
		return array(	"index" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.index"),
						"devis" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.devis"),
						"facture" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.facture"),
						"produit" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.produit"),
						"config" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.config"),
						"isConfig" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.isConfig"),
						"statistique" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.statistique"),
						"legalnotice" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.legalnotice"),
						"france" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.france"),
					);
	}

	/**
	* @UseSession
	*/
	#[UseSession]
	private function getCompaniesList(){
		$CompaniesList = $this->myDb->getCompaniesList($this->myID);

		if(empty($this->session['CurrentCompany']) || $this->session['CurrentCompany'] == ''){
			$this->setCurrentCompany($CompaniesList[0]['id']);
		}
		
		return $CompaniesList;
	}

	/**
	 * @UseSession
	 * 
	 * @param string $companyID
	 */
	#[UseSession]
	public function setCurrentCompany($companyID){
		$this->session['CurrentCompany'] = $companyID;
	}


	/**
	 * @UseSession
	 */
	#[UseSession]
	public function createCompany(){
		$this->myDb->createCompany($this->myID);
	}

	/**
	 * @UseSession
	 */
	#[UseSession]
	public function deleteCompany(){
		if($this->myDb->deleteCompany($this->session['CurrentCompany'], $this->myID)){
			$this->session['CurrentCompany'] = '';
			return new DataResponse("", 200, ['Content-Type' => 'application/json']);
		}else{
			return new DataResponse([$this->session['CurrentCompany'],$this->myID], 401, ['Content-Type' => 'application/json']);
		}
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getClients() {
		return $this->myDb->getClients($this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getConfiguration() {
		return $this->myDb->getConfiguration($this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getDevis() {
		return $this->myDb->getDevis($this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getFactures() {
		
		return $this->myDb->getFactures($this->session['CurrentCompany']);
	}
	
	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getProduits() {
		
		return $this->myDb->getProduits($this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $numdevis
	 * @UseSession
	*/
	#[UseSession]
	public function getProduitsById($numdevis) {
		return $this->myDb->getListProduit($numdevis, $this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $id
	 * @UseSession
	*/
	#[UseSession]
	public function getClient($id) {
		return $this->myDb->getClient($id, $this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $id
	 * @UseSession
	*/
	#[UseSession]
	public function getClientbyiddevis($id) {
		return $this->myDb->getClientbyiddevis($id, $this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getServerFromMail(){
		return new DataResponse(['mail' => $this->config->getSystemValue('mail_from_address').'@'.$this->config->getSystemValue('mail_domain')],200, ['Content-Type' => 'application/json']);
	}
	
	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function insertClient() {
		// try {
		// 	return new DataResponse($this->myDb->insertClient($this->session['CurrentCompany']), Http::STATUS_OK, ['Content-Type' => 'application/json']);
		// }
		// catch( PDOException $Exception ) {
		// 	return new DataResponse($Exception, 500, ['Content-Type' => 'application/json']);
		// }
		return $this->myDb->insertClient($this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function insertDevis(){
		return $this->myDb->insertDevis($this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function insertFacture(){
		return $this->myDb->insertFacture($this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function insertProduit(){
		return $this->myDb->insertProduit($this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $id
	 * @UseSession
	*/
	#[UseSession]
	public function insertProduitDevis($id){
		return $this->myDb->insertProduitDevis($id, $this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $table
	 * @param string $column
	 * @param string $data
	 * @param string $id
	 * @UseSession
	*/
	#[UseSession]
	public function update($table, $column, $data, $id) {
		return $this->myDb->gestion_update($table, $column, $data, $id, $this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $table
	 * @param string $column
	 * @param string $data
	 * @param string $id
	 * @UseSession
	*/
	#[UseSession]
	public function updateConfiguration($table, $column, $data, $id) {
		return $this->myDb->gestion_updateConfiguration($table, $column, $data, $id);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $table
	 * @param string $id
	 * @UseSession
	*/
	#[UseSession]
	public function delete($table, $id) {
		return $this->myDb->gestion_delete($table, $id, $this->session['CurrentCompany']);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $content
	 * @param string $name
	 * @param string $subject
	 * @param string $body
	 * @param string $to
	 * @param string $Cc
	 * @UseSession
	*/
	#[UseSession]
	public function sendPDF($content, $name, $subject, $body, $to, $Cc){
		$clean_name = html_entity_decode($name);
		
		try {

			$data = base64_decode($content);
			$message = $this->mailer->createMessage();
			$message->setSubject($subject);
			$message->setTo((array) json_decode($to));
			$myrrCc = (array) json_decode($Cc);
			if($myrrCc[0] != ""){
				$message->setCc($myrrCc);
			}
			$message->setBody($body, 'text/html');
			$AttachementPDF = $this->mailer->createAttachment($data,$clean_name.".pdf","application/pdf");
			$message->attach($AttachementPDF);
			
			$this->mailer->send($message);
			return new DataResponse("", 200, ['Content-Type' => 'application/json']);
		} catch (Exception $e) {
			return new DataResponse("Is your global mail server configured in Nextcloud ?", 500, ['Content-Type' => 'application/json']);
		}
		
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $content
	 * @param string $folder
	 * @param string $name
	 * @UseSession
	*/
	#[UseSession]
	public function savePDF($content, $folder, $name){

		$clean_folder = html_entity_decode($folder);
		$clean_name = html_entity_decode($name);
		try {
			$this->storage->newFolder($clean_folder);
        } catch(\OCP\Files\NotPermittedException $e) {
            
        }

		try {
			try {
				$ff = $clean_folder . $clean_name . ".pdf";
				$this->storage->newFile($ff);
				$file = $this->storage->get($ff);
				$data = base64_decode($content);
				$file->putContent($data);
          	} catch(\OCP\Files\NotFoundException $e) {
				
            }

        } catch(\OCP\Files\NotPermittedException $e) {
            
        }

		//work
		// try {
        //     try {
        //         $file = $this->storage->get('/test/myfile2.txt');
        //     } catch(\OCP\Files\NotFoundException $e) {
        //         
        //        	$file = $this->storage->get('/myfile.txt');
        //     }

        //     // the id can be accessed by $file->getId();
        //     $file->putContent('myfile2');

        // } catch(\OCP\Files\NotPermittedException $e) {
        //     // you have to create this exception by yourself ;)
        //     throw new StorageException('Cant write to file');
        // }

		// //
		// $userFolder->touch('/test/myfile2345.txt');
		// $file = $userFolder->get('/test/myfile2345.txt');
		// $file->putContent('test');
		// //$file = $userFolder->get('myfile2.txt');
	}


	private function getLogo(){
		try {
			if(isset($this->storage)){
				$file = $this->storage->get('/.gestion/logo.png');
			}else{
				return "nothing";
			}
		} catch(\OCP\Files\NotFoundException $e) {
			return "nothing";
		}

		return base64_encode($file->getContent());
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getStats(){
		$res = array();
		$res['client'] = json_decode($this->myDb->numberClient($this->session['CurrentCompany']))[0]->c;
		$res['devis'] = json_decode($this->myDb->numberDevis($this->session['CurrentCompany']))[0]->c;
		$res['facture'] = json_decode($this->myDb->numberFacture($this->session['CurrentCompany']))[0]->c;
		$res['produit'] = json_decode($this->myDb->numberProduit($this->session['CurrentCompany']))[0]->c;
		return json_encode($res);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getAnnualTurnoverPerMonthNoVat(){
		return $this->myDb->getAnnualTurnoverPerMonthNoVat($this->session['CurrentCompany']);
	}

}
