<?php
namespace OCA\Gestion\Service;

use OCP\App\IAppManager;
use OCP\IConfig;

class AnnouncementService {
    // Change this version only when a new announcement must be shown to everyone.
    public const VERSION = '3.4.8';
    private const SEEN_KEY = 'announcement_seen';

    public function __construct(private IConfig $config, private IAppManager $appManager, private $UserId) {
    }

    public function pendingVersion(): string {
        if (!$this->UserId || version_compare($this->appManager->getAppVersion('gestion'), self::VERSION, '<')) {
            return '';
        }
        $seen = $this->config->getUserValue($this->UserId, 'gestion', self::SEEN_KEY, '');
        return $seen !== '' && version_compare($seen, self::VERSION, '>=') ? '' : self::VERSION;
    }

    public function acknowledge(string $version): void {
        if (!$this->UserId || $version !== self::VERSION || version_compare($this->appManager->getAppVersion('gestion'), self::VERSION, '<')) {
            throw new \InvalidArgumentException('Invalid announcement version.');
        }
        $seen = $this->config->getUserValue($this->UserId, 'gestion', self::SEEN_KEY, '');
        if ($seen === '' || version_compare($seen, $version, '<')) {
            $this->config->setUserValue($this->UserId, 'gestion', self::SEEN_KEY, $version);
        }
    }
}
