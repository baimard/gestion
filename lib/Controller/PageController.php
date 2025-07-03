<?php
namespace OCA\Gestion\Controller;

require_once __DIR__ . '/../../vendor/autoload.php';

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

use Dompdf\Dompdf;
use Dompdf\Options;

use Mpdf\Mpdf;

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
		$response = new TemplateResponse(	'gestion', 'index', array(	'path' => $this->myID, 
											'url' => $this->getNavigationLink(),
											'CompaniesList' => $this->getCompaniesList(),
											'CurrentCompany' => $this->session->get('CurrentCompany')
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
																'CurrentCompany' => $this->session->get('CurrentCompany')
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
																	'CurrentCompany' => $this->session->get('CurrentCompany')
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
																	'CurrentCompany' => $this->session->get('CurrentCompany')
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
																		'CurrentCompany' => $this->session->get('CurrentCompany')
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
																		'CurrentCompany' => $this->session->get('CurrentCompany')
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
																	'CurrentCompany' => $this->session->get('CurrentCompany')
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
		$res = $this->myDb->checkConfig($this->session->get('CurrentCompany'), $this->myID);
		if($res < 1 ){
			$this->session->set('CurrentCompany','');
		}
		
		if($this->session->get('CurrentCompany') != ''){
			foreach($this->myDb->getUsersShared($this->session->get('CurrentCompany')) as $user) {
				$shareUsers[] = $this->userManager->get($user['id_nextcloud']);
			}
		}

		$response = new TemplateResponse(	'gestion', 'configuration', array(	'path' => $this->myID, 
											'url' => $this->getNavigationLink(),
											'CompaniesList' => $this->getCompaniesList(),
											'CurrentCompany' => $this->session->get('CurrentCompany'),
											'shareUsers' => $shareUsers,
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
		$devis = $this->myDb->getOneDevis($numdevis,$this->session->get('CurrentCompany'));
		$produits = $this->myDb->getListProduit($numdevis, $this->session->get('CurrentCompany'));
		return new TemplateResponse('gestion', 'devisshow', array(	'configuration'=> $this->getConfiguration(), 
																	'devis'=>json_decode($devis), 
																	'produit'=>json_decode($produits), 
																	'path' => $this->myID, 
																	'url' => $this->getNavigationLink(),
																	'logo' => $this->getLogo($this->session->get('CurrentCompany').'logo.png'),
																	'logo_header' => $this->getLogo($this->session->get('CurrentCompany').'logo_header.png'),
																	'logo_footer' => $this->getLogo($this->session->get('CurrentCompany').'logo_footer.png'),
																	'CompaniesList' => $this->getCompaniesList(),
																	'CurrentCompany' => $this->session->get('CurrentCompany')
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
		$facture = $this->myDb->getOneFacture($numfacture,$this->session->get('CurrentCompany'));
		// $produits = $this->myDb->getListProduit($numdevis);
		return new TemplateResponse('gestion', 'factureshow', array(	'path' => $this->myID, 
																		'configuration'=> $this->getConfiguration(), 
																		'facture'=>json_decode($facture), 
																		'url' => $this->getNavigationLink(),
																		'logo' => $this->getLogo($this->session->get('CurrentCompany').'logo.png'),
																		'logo_header' => $this->getLogo($this->session->get('CurrentCompany').'logo_header.png'),
																		'logo_footer' => $this->getLogo($this->session->get('CurrentCompany').'logo_footer.png'),
																		'CompaniesList' => $this->getCompaniesList(),
																		'CurrentCompany' => $this->session->get('CurrentCompany')
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
		

		return $this->myDb->isConfig($this->session->get('CurrentCompany'),$this->myID);
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
	* @NoAdminRequired
	* @NoCSRFRequired
	* @UseSession
	*/
	#[UseSession]
	private function getCompaniesList(){
		$CompaniesList = $this->myDb->getCompaniesList($this->myID);

		if(empty($this->session->get('CurrentCompany')) || $this->session->get('CurrentCompany') == ''){
			$this->setCurrentCompany($CompaniesList[0]['id']);

		}
		
		return $CompaniesList;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 * 
	 * @param string $companyID
	 */
	#[UseSession]
	public function setCurrentCompany($companyID){
		$this->session->set('CurrentCompany', $companyID);
	}


	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function createCompany(){
		$this->myDb->createCompany($this->myID);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[UseSession]
	public function deleteCompany(){
		if($this->myDb->deleteCompany($this->session->get('CurrentCompany'), $this->myID)){
			$this->session->set('CurrentCompany', '');
			return new DataResponse("", 200, ['Content-Type' => 'application/json']);
		}else{
			return new DataResponse([$this->session->get('CurrentCompany'),$this->myID], 401, ['Content-Type' => 'application/json']);
		}
	}

	/**
	 * @NoAdminRequired
	 * @param string $email
	 * @UseSession
	*/
	#[UseSession]
	public function addShareUser($email){
		$found = false;
		$ownedCompanies = $this->myDb->getCompaniesOwner($this->myID);
		foreach ($ownedCompanies as $company) {
			if ($company['id'] == $this->session->get('CurrentCompany')) {
				$found = true;
			}
		}	

		if($found){
			$users = $this->userManager->search('');
			foreach ($users as $user) {
				if ($user->getEMailAddress() === $email) {
					$this->myDb->addShareUser($this->session->get('CurrentCompany'),$user->getUID());
					return new DataResponse(['status' => 'success', 'data' => $user->getDisplayName()]);
				}
			}
			return new Dataresponse(['status' => 'not found','data'=> 'User not found']);
		}

		return new Dataresponse(['status' => 'Not owner','data'=> 'You are not the owner of this company']);
	}

	/**
	 * @NoAdminRequired
	 * @param string $uid
	 * @UseSession
	*/
	#[UseSession]
	public function delShareUser($uid){
		$found = false;
		$ownedCompanies = $this->myDb->getCompaniesOwner($this->myID);
		foreach ($ownedCompanies as $company) {
			if ($company['id'] == $this->session->get('CurrentCompany')) {
				$found = true;
			}
		}	

		if($found){
			$this->myDb->delShareUser($this->session->get('CurrentCompany'),$uid);
			return new DataResponse(['status' => 'success', 'data' => 'User deleted']);
		}

		return new Dataresponse(['status' => 'Not owner','data'=> 'You are not the owner of this company'], 401);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getClients() {
		return $this->myDb->getClients($this->session->get('CurrentCompany'));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getConfiguration() {
		return $this->myDb->getConfiguration($this->session->get('CurrentCompany'));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getDevis() {
		return $this->myDb->getDevis($this->session->get('CurrentCompany'));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getFactures() {
		
		return $this->myDb->getFactures($this->session->get('CurrentCompany'));
	}
	
	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getProduits() {
		
		return $this->myDb->getProduits($this->session->get('CurrentCompany'));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $numdevis
	 * @UseSession
	*/
	#[UseSession]
	public function getProduitsById($numdevis) {
		return $this->myDb->getListProduit($numdevis, $this->session->get('CurrentCompany'));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $id
	 * @UseSession
	*/
	#[UseSession]
	public function getClient($id) {
		return $this->myDb->getClient($id, $this->session->get('CurrentCompany'));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $id
	 * @UseSession
	*/
	#[UseSession]
	public function getClientbyiddevis($id) {
		return $this->myDb->getClientbyiddevis($id, $this->session->get('CurrentCompany'));
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
		// 	return new DataResponse($this->myDb->insertClient($this->session->get('CurrentCompany')), Http::STATUS_OK, ['Content-Type' => 'application/json']);
		// }
		// catch( PDOException $Exception ) {
		// 	return new DataResponse($Exception, 500, ['Content-Type' => 'application/json']);
		// }
		return $this->myDb->insertClient($this->session->get('CurrentCompany'));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function insertDevis(){
		return $this->myDb->insertDevis($this->session->get('CurrentCompany'));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function insertFacture(){
		return $this->myDb->insertFacture($this->session->get('CurrentCompany'));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function insertProduit(){
		return $this->myDb->insertProduit($this->session->get('CurrentCompany'));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $id
	 * @UseSession
	*/
	#[UseSession]
	public function insertProduitDevis($id){
		return $this->myDb->insertProduitDevis($id, $this->session->get('CurrentCompany'));
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
		return $this->myDb->gestion_update($table, $column, $data, $id, $this->session->get('CurrentCompany'));
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
	 * @param string $table
	 * @param string $id
	 * @UseSession
	*/
	#[UseSession]
	public function duplicate($table, $id) {
		if($this->myDb->gestion_duplicate($table, $id, $this->session->get('CurrentCompany'))){
			return new DataResponse("", 200, ['Content-Type' => 'application/json']);
		}else{
			return new DataResponse("", 500, ['Content-Type' => 'application/json']);
		}
	}

	/**
	 * @NoAdminRequired
	 * @param string $id
	 * @param string $value
	 * @UseSession
	*/
	#[UseSession]
	public function drop($id, $value) {
		return $this->myDb->gestion_drop($id, $value, $this->session->get('CurrentCompany'));
	}

	/**
	 * @NoAdminRequired
	 * @param string $table
	 * @param string $id
	 * @UseSession
	*/
	#[UseSession]
	public function delete($table, $id) {
		return $this->myDb->gestion_delete($table, $id, $this->session->get('CurrentCompany'));
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
				$ff = $clean_folder . $clean_name;
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


	private function getLogo($name){
		try {
			if(isset($this->storage)){
				$file = $this->storage->get('/.gestion/'.$name);
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
		$res['client'] = json_decode($this->myDb->numberClient($this->session->get('CurrentCompany')))[0]->c;
		$res['devis'] = json_decode($this->myDb->numberDevis($this->session->get('CurrentCompany')))[0]->c;
		$res['facture'] = json_decode($this->myDb->numberFacture($this->session->get('CurrentCompany')))[0]->c;
		$res['produit'] = json_decode($this->myDb->numberProduit($this->session->get('CurrentCompany')))[0]->c;
		return json_encode($res);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	*/
	#[UseSession]
	public function getAnnualTurnoverPerMonthNoVat(){
		return $this->myDb->getAnnualTurnoverPerMonthNoVat($this->session->get('CurrentCompany'));
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 * @param string $html
	 * @param string $name
	 * @param string $folder
	 * @return void	
	*/
	#[UseSession]
	public function generatePDF($html, $name, $folder) {
		try {
			$mpdf = new Mpdf([
				'mode' => 'utf-8',
				'format' => 'A4',
				'margin_top' => 10,
				'margin_bottom' => 10,
				'margin_left' => 10,
				'margin_right' => 10,
			]);


			$css = file_get_contents(__DIR__ . '/../../css/style.css');

    		$mpdf->WriteHTML($css, \Mpdf\HTMLParserMode::HEADER_CSS);
			$mpdf->WriteHTML($html, \Mpdf\HTMLParserMode::HTML_BODY);

			$pdfContent = $mpdf->Output('', \Mpdf\Output\Destination::STRING_RETURN);
			$encoded = base64_encode($pdfContent);
			$this->savePDF($encoded, $folder, $name);

			// Envoi du PDF dans la réponse HTTP
			header('Content-Type: application/pdf');
			header('Content-Disposition: attachment; filename="' . $name . '.pdf"');
			echo $pdfContent;
		} catch (\Mpdf\MpdfException $e) {
			http_response_code(500);
			echo "Erreur lors de la génération du PDF : " . $e->getMessage();
		}

	}
}
