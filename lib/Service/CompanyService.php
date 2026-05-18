<?php
namespace OCA\Gestion\Service;

use OCA\Gestion\Db\Bdd;
use OCP\AppFramework\Http\DataResponse;
use OCP\ISession;
use OCP\IUserManager;

class CompanyService {
	private Bdd $myDb;
	private $userId;
	private ISession $session;
	private IUserManager $userManager;

	public function __construct(Bdd $myDb, $UserId, ISession $session, IUserManager $userManager) {
		$this->myDb = $myDb;
		$this->userId = $UserId;
		$this->session = $session;
		$this->userManager = $userManager;
	}

	public function getCurrentCompany() {
		return $this->session->get('CurrentCompany');
	}

	public function getCompaniesList() {
		$companiesList = $this->myDb->getCompaniesList($this->userId);

		if (empty($this->session->get('CurrentCompany')) || $this->session->get('CurrentCompany') == '') {
			$this->setCurrentCompany($companiesList[0]['id']);
		}

		return $companiesList;
	}

	public function setCurrentCompany($companyID): void {
		$this->session->set('CurrentCompany', $companyID);
	}

	public function createCompany(): void {
		$this->myDb->createCompany($this->userId);
	}

	public function deleteCompany(): DataResponse {
		if ($this->myDb->deleteCompany($this->session->get('CurrentCompany'), $this->userId)) {
			$this->session->set('CurrentCompany', '');
			return new DataResponse("", 200, ['Content-Type' => 'application/json']);
		}

		return new DataResponse([$this->session->get('CurrentCompany'), $this->userId], 401, ['Content-Type' => 'application/json']);
	}

	public function isConfig() {
		return $this->myDb->isConfig($this->session->get('CurrentCompany'), $this->userId);
	}

	public function getShareUsers(): array {
		$shareUsers = [];

		if ($this->session->get('CurrentCompany') != '') {
			foreach ($this->myDb->getUsersShared($this->session->get('CurrentCompany')) as $user) {
				$shareUsers[] = $this->userManager->get($user['id_nextcloud']);
			}
		}

		return $shareUsers;
	}

	public function ensureConfigExists(): void {
		$res = $this->myDb->checkConfig($this->session->get('CurrentCompany'), $this->userId);
		if ($res < 1) {
			$this->session->set('CurrentCompany', '');
		}
	}

	public function addShareUser($email): DataResponse {
		$found = false;
		$ownedCompanies = $this->myDb->getCompaniesOwner($this->userId);
		foreach ($ownedCompanies as $company) {
			if ($company['id'] == $this->session->get('CurrentCompany')) {
				$found = true;
			}
		}

		if ($found) {
			$users = $this->userManager->search('');
			foreach ($users as $user) {
				if ($user->getEMailAddress() === $email) {
					$this->myDb->addShareUser($this->session->get('CurrentCompany'), $user->getUID());
					return new DataResponse(['status' => 'success', 'data' => $user->getDisplayName()]);
				}
			}
			return new DataResponse(['status' => 'not found', 'data'=> 'User not found']);
		}

		return new DataResponse(['status' => 'Not owner', 'data'=> 'You are not the owner of this company']);
	}

	public function delShareUser($uid): DataResponse {
		$found = false;
		$ownedCompanies = $this->myDb->getCompaniesOwner($this->userId);
		foreach ($ownedCompanies as $company) {
			if ($company['id'] == $this->session->get('CurrentCompany')) {
				$found = true;
			}
		}

		if ($found) {
			$this->myDb->delShareUser($this->session->get('CurrentCompany'), $uid);
			return new DataResponse(['status' => 'success', 'data' => 'User deleted']);
		}

		return new DataResponse(['status' => 'Not owner', 'data'=> 'You are not the owner of this company'], 401);
	}
}
