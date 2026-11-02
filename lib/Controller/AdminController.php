<?php
namespace OCA\Gestion\Controller;

use OCA\Gestion\Db\Bdd;
use OCA\Gestion\Service\BackupFormat;
use OCP\IRequest;
use OCP\Files\IRootFolder;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;

class AdminController extends Controller {
    public function __construct($AppName, IRequest $request, private Bdd $myDb, private IRootFolder $rootFolder, private $UserId) {
        parent::__construct($AppName, $request);
    }

    /** @NoAdminRequired */
    public function backup(): DataResponse {
        $content = json_encode($this->myDb->exportBackup($this->UserId), JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR);
        $root = $this->rootFolder->getUserFolder($this->UserId);
        foreach (['.gestion', '.gestion/backup'] as $folder) if (!$root->nodeExists($folder)) $root->newFolder($folder);
        $name = '.gestion/backup/backup-' . gmdate('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.json';
        $root->newFile($name)->putContent($content);
        return new DataResponse(['name' => $name, 'backup' => $content]);
    }

    /** @NoAdminRequired */
    public function restore(string $content, bool $confirm = false): DataResponse {
        try {
            $tables = BackupFormat::decode($content);
            if (!$confirm) return new DataResponse(['counts' => array_map('count', $tables), 'companies' => array_column($tables['configuration'], 'entreprise')]);
            return new DataResponse(['companies' => $this->myDb->restoreBackup($tables, $this->UserId)]);
        } catch (\InvalidArgumentException $e) {
            return new DataResponse(['message' => $e->getMessage()], 400);
        }
    }
}
