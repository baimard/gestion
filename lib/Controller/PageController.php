<?php
namespace OCA\Gestion\Controller;

use OCP\IRequest;
use OCP\Mail\IMailer;
use OCP\Files\IRootFolder;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;
use OCA\Gestion\Db\Bdd;
use OCP\IURLGenerator;
use OCP\IConfig;

class PageController extends Controller {
	private $idNextcloud;
	private $myDb;
	private $urlGenerator;
	private $mailer;
	private $config;

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
								Iconfig $config){

		parent::__construct($AppName, $request);

		$this->idNextcloud = $UserId;
		$this->myDb = $myDb;
		$this->urlGenerator = $urlGenerator;
		$this->mailer = $mailer;
		$this->config = $config;
		try{
			$this->storage = $rootFolder->getUserFolder($this->idNextcloud);
		}catch(\OC\User\NoUserException $e){

		}
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
     */
	public function index() {
		return new TemplateResponse('gestion', 'index', array('path' => $this->idNextcloud, 'url' => $this->getNavigationLink()));  // templates/index.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
     */
	public function devis() {
		return new TemplateResponse('gestion', 'devis', array('path' => $this->idNextcloud, 'url' => $this->getNavigationLink()));  // templates/devis.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
     */
	public function facture() {
		return new TemplateResponse('gestion', 'facture', array('path' => $this->idNextcloud, 'url' => $this->getNavigationLink()));  // templates/facture.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
     */
	public function produit() {
		return new TemplateResponse('gestion', 'produit', array('path' => $this->idNextcloud, 'url' => $this->getNavigationLink()));  // templates/produit.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
     */
	public function statistique() {
		return new TemplateResponse('gestion', 'statistique', array('path' => $this->idNextcloud, 'url' => $this->getNavigationLink()));  // templates/statistique.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
     */
	public function legalnotice() {
		return new TemplateResponse('gestion', 'legalnotice', array('path' => $this->idNextcloud, 'url' => $this->getNavigationLink()));  // templates/statistique.php
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
     */
	public function config() {
		$this->myDb->checkConfig($this->idNextcloud);
		return new TemplateResponse('gestion', 'configuration', array('path' => $this->idNextcloud, 'url' => $this->getNavigationLink()));  // templates/configuration.php
	}
	
	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $numdevis
     */
	public function devisshow($numdevis) {
		$devis = $this->myDb->getOneDevis($numdevis,$this->idNextcloud);
		$produits = $this->myDb->getListProduit($numdevis, $this->idNextcloud);
		return new TemplateResponse('gestion', 'devisshow', array(	'configuration'=> $this->getConfiguration(), 
																	'devis'=>json_decode($devis), 
																	'produit'=>json_decode($produits), 
																	'path' => $this->idNextcloud, 
																	'url' => $this->getNavigationLink(),
																	'logo' => $this->getLogo()
																));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $numfacture
	 */
	public function factureshow($numfacture) {
		$facture = $this->myDb->getOneFacture($numfacture,$this->idNextcloud);
		// $produits = $this->myDb->getListProduit($numdevis);
		return new TemplateResponse('gestion', 'factureshow', array(	'path' => $this->idNextcloud, 
																		'configuration'=> $this->getConfiguration(), 
																		'facture'=>json_decode($facture), 
																		'url' => $this->getNavigationLink(),
																		'logo' => $this->getLogo()
																	));
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
     */
	public function isConfig() {
		return $this->myDb->isConfig($this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function getNavigationLink(){
		return array(	"index" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.index"),
						"devis" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.devis"),
						"facture" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.facture"),
						"produit" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.produit"),
						"config" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.config"),
						"isConfig" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.isConfig"),
						"statistique" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.statistique"),
						"legalnotice" => $this->urlGenerator->linkToRouteAbsolute("gestion.page.legalnotice"),
					);
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
	public function getConfiguration() {
		return $this->myDb->getConfiguration($this->idNextcloud);
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
     */
	public function getServerFromMail(){
		return new DataResponse(['mail' => $this->config->getSystemValue('mail_from_address').'@'.$this->config->getSystemValue('mail_domain')],200, ['Content-Type' => 'application/json']);
	}
	
	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function insertClient() {
		// try {
		// 	return new DataResponse($this->myDb->insertClient($this->idNextcloud), Http::STATUS_OK, ['Content-Type' => 'application/json']);
		// }
		// catch( PDOException $Exception ) {
		// 	return new DataResponse($Exception, 500, ['Content-Type' => 'application/json']);
		// }
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
		return $this->myDb->gestion_update($table, $column, $data, $id, $this->idNextcloud);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @param string $table
	 * @param string $id
	 */
	public function delete($table, $id) {
		return $this->myDb->gestion_delete($table, $id, $this->idNextcloud);
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
	 */
	public function sendPDF($content, $name, $subject, $body, $to, $Cc){
		$clean_name = html_entity_decode($name);
		try {
			$data = base64_decode($content);
			$message = $this->mailer->createMessage();
			$message->setSubject($subject);
			$message->setTo((array) json_decode($to));
			$myrrCc = (array) json_decode($Cc);
			// return var_dump($myrrCc);
			if($myrrCc[0] != ""){
				$message->setCc($myrrCc);
			}
			$message->setHtmlBody($body);
			$content = $this->mailer->createAttachment($data,$clean_name.".pdf","x-pdf");
			$message->attach($content);
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
	 */
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
	 */
	public function getStats(){
		$res = array();
		$res['client'] = json_decode($this->myDb->numberClient($this->idNextcloud))[0]->c;
		$res['devis'] = json_decode($this->myDb->numberDevis($this->idNextcloud))[0]->c;
		$res['facture'] = json_decode($this->myDb->numberFacture($this->idNextcloud))[0]->c;
		$res['produit'] = json_decode($this->myDb->numberProduit($this->idNextcloud))[0]->c;
		return json_encode($res);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function getAnnualTurnoverPerMonthNoVat(){
		return $this->myDb->getAnnualTurnoverPerMonthNoVat($this->idNextcloud);
	}

}
