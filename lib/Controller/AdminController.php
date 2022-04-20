<?php
namespace OCA\Gestion\Controller;

use OCP\IRequest;
use OCP\Mail\IMailer;
use OCP\Files\IRootFolder;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;
use OCA\Gestion\Db\Bdd;
use OCP\IURLGenerator;
use OCP\IConfig;

class AdminController extends Controller {
	private $idNextcloud;
	
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
	 * @NoCSRFRequired
	 */
	public function dump(){
		$total = "";
		foreach($this->myDb->dump() as $c){
			$total .= implode(";",$c) . "\n";
		} 

		$ff = "dump.txt";
		$this->storage->newFile($ff);
		$file = $this->storage->get($ff);
		$file->putContent($total);
		return new DataResponse("", 200);
	}

}
