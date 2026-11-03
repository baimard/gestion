<?php

namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\ElectronicInvoiceProviderService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\UseSession;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

class ElectronicInvoiceProviderController extends Controller {
	public function __construct(
		string $AppName,
		IRequest $request,
		private ElectronicInvoiceProviderService $providerService,
	) {
		parent::__construct($AppName, $request);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @UseSession
	 */
	#[NoCSRFRequired]
	#[UseSession]
	public function getConfiguration(): DataResponse {
        try {
            return new DataResponse([
                'providers' => $this->providerService->getProviders(),
                'configuration' => $this->providerService->getCurrentConfiguration(),
            ]);
        } catch (\DomainException $e) {
            return new DataResponse(['message' => $e->getMessage()], 403);
        }
	}

	/**
	 * @NoAdminRequired
	 * @UseSession
	 */
	#[UseSession]
	public function saveConfiguration(string $provider = '', array $credentials = []): DataResponse {
		try {
			return new DataResponse(
				$this->providerService->saveCurrentConfiguration($provider, $credentials)
			);
		} catch (\DomainException $e) {
            return new DataResponse(['message' => $e->getMessage()], 403);
        } catch (\InvalidArgumentException $e) {
			return new DataResponse(['message' => $e->getMessage()], 400);
		} catch (\Throwable $e) {
			return new DataResponse(['message' => 'Unable to save platform configuration.'], 500);
		}
	}
}
