<?php
namespace OCA\Gestion\Controller;

use Exception;
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
	public function backup(){

		try {
			$total = "";

			foreach($this->myDb->backup() as $c){
				$total .= implode(";",$c) . "\n";
			}

			try {
				$this->storage->newFolder('/.gestion/backup');
			} catch(\OCP\Files\NotPermittedException $e) {
			
			}

			$ff = "/.gestion/backup/backup-".date("YmdhHi").".txt";
			$this->storage->newFile($ff);
			$file = $this->storage->get($ff);
			$file->putContent($total);
			
			return new DataResponse(array('name' => $ff), 200);
		} catch (Exception $e) {
			
			return new DataResponse($e->getMessage(), 500);
		}

	}

}
