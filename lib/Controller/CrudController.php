<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\DataService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\IRequest;

class CrudController extends Controller {
	private DataService $dataService;

	public function __construct($AppName, IRequest $request, DataService $dataService) {
		parent::__construct($AppName, $request);
		$this->dataService = $dataService;
	}

    /** @NoAdminRequired */
    #[UseSession]
    public function lockDocument(string $table, int $id): DataResponse {
        return $this->result(function () use ($table, $id) { $this->dataService->lockDocument($table, $id); return new DataResponse(['locked' => true]); });
    }

    /** @NoAdminRequired */
    #[UseSession]
    public function history(int $before = 0): DataResponse {
        return new DataResponse($this->dataService->history($before));
    }

    private function result(callable $action) {
        try { return $action(); }
        catch (\DomainException $e) { return new DataResponse(['message' => $e->getMessage()], 409); }
        catch (\InvalidArgumentException $e) { return new DataResponse(['message' => $e->getMessage()], 400); }
    }

	/**
	 * @NoAdminRequired
	 * @param string $table
	 * @param string $column
	 * @param string $data
	 * @param string $id
	 * @UseSession
	 */
	#[UseSession]
	public function update($table, $column, $data, $id) {
		return $this->result(fn () => $this->dataService->update($table, $column, $data, $id));
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
		return $this->result(fn () => $this->dataService->drop($id, $value));
	}

	/** @NoAdminRequired */
	#[UseSession]
	public function reorderProducts(int $devisId, array $productQuoteIds): DataResponse {
		try {
			$this->dataService->reorderProducts($devisId, $productQuoteIds);
			return new DataResponse(['status' => 'success']);
		} catch (\InvalidArgumentException $e) {
			return new DataResponse(['status' => 'error', 'message' => $e->getMessage()], 400);
		}
	}

	/**
	 * @NoAdminRequired
	 * @param string $table
	 * @param string $id
	 * @UseSession
	 */
	#[UseSession]
	public function delete($table, $id) {
		return $this->result(fn () => $this->dataService->delete($table, $id));
	}
}
