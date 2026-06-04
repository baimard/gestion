<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\DataService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class CrudController extends Controller {
	private DataService $dataService;

	public function __construct($AppName, IRequest $request, DataService $dataService) {
		parent::__construct($AppName, $request);
		$this->dataService = $dataService;
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
		return $this->dataService->update($table, $column, $data, $id);
	}

	/**
	 * @NoAdminRequired
	 * @param string $table
	 * @param string $id
	 * @UseSession
	 */
	#[UseSession]
	public function duplicate($table, $id) {
		return $this->dataService->duplicate($table, $id);
	}

	/**
	 * @NoAdminRequired
	 * @param string $id
	 * @param string $value
	 * @UseSession
	 */
	#[UseSession]
	public function drop($id, $value) {
		return $this->dataService->drop($id, $value);
	}

	/**
	 * @NoAdminRequired
	 * @param string $table
	 * @param string $id
	 * @UseSession
	 */
	#[UseSession]
	public function delete($table, $id) {
		return $this->dataService->delete($table, $id);
	}
}
