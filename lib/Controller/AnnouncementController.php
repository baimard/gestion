<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Service\AnnouncementService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\IRequest;

class AnnouncementController extends Controller {
    public function __construct($AppName, IRequest $request, private AnnouncementService $announcementService) {
        parent::__construct($AppName, $request);
    }

    /**
     * @NoAdminRequired
     */
    #[NoAdminRequired]
    public function acknowledge(string $version): DataResponse {
        try {
            $this->announcementService->acknowledge($version);
            return new DataResponse(['acknowledged' => true]);
        } catch (\InvalidArgumentException $e) {
            return new DataResponse(['message' => $e->getMessage()], 400);
        }
    }
}
