<?php
namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Service\AnnouncementService;
use OCP\App\IAppManager;
use OCP\IConfig;
use PHPUnit\Framework\TestCase;

class AnnouncementServiceTest extends TestCase {
    private function service(IConfig $config, string $installed = '3.4.8', ?string $user = 'alice'): AnnouncementService {
        $apps = $this->createMock(IAppManager::class);
        $apps->method('getAppVersion')->with('gestion')->willReturn($installed);
        return new AnnouncementService($config, $apps, $user);
    }

    public function testReadingTheAnnouncementDoesNotAcknowledgeIt(): void {
        $config = $this->createMock(IConfig::class);
        $config->method('getUserValue')->willReturn('');
        $config->expects($this->never())->method('setUserValue');
        $this->assertSame('3.4.8', $this->service($config)->pendingVersion());
        $this->assertSame('3.4.8', $this->service($config)->pendingVersion());
    }

    public function testEachUserAcknowledgesIndependentlyAcrossVersions(): void {
        $seen = [];
        $config = $this->createMock(IConfig::class);
        $config->method('getUserValue')->willReturnCallback(static function ($user) use (&$seen) { return $seen[$user] ?? ''; });
        $config->method('setUserValue')->willReturnCallback(static function ($user, $app, $key, $version) use (&$seen): void { $seen[$user] = $version; });
        $alice = $this->service($config);
        $alice->acknowledge('3.4.8');
        $this->assertSame('', $alice->pendingVersion());
        $this->assertSame('3.4.8', $this->service($config, '3.4.8', 'bob')->pendingVersion());
        $this->assertSame('', $this->service($config, '3.4.9')->pendingVersion());
    }

    public function testNoDisplayBeforeTheSelectedVersionOrWithoutLogin(): void {
        $config = $this->createMock(IConfig::class);
        $this->assertSame('', $this->service($config, '3.4.7')->pendingVersion());
        $this->assertSame('', $this->service($config, '3.4.8', null)->pendingVersion());
    }

    /** @dataProvider invalidAcknowledgements */
    public function testCannotAcknowledgeAnUnknownOrUnavailableVersion(string $installed, string $version, ?string $user): void {
        $config = $this->createMock(IConfig::class);
        $config->expects($this->never())->method('setUserValue');
        $this->expectException(\InvalidArgumentException::class);
        $this->service($config, $installed, $user)->acknowledge($version);
    }

    public function invalidAcknowledgements(): array {
        return [['3.4.8', '3.4.9', 'alice'], ['3.4.7', '3.4.8', 'alice'], ['3.4.8', '3.4.8', null]];
    }

    public function testAnOldTabCannotDowngradeANewerAcknowledgement(): void {
        $config = $this->createMock(IConfig::class);
        $config->method('getUserValue')->willReturn('3.4.9');
        $config->expects($this->never())->method('setUserValue');
        $service = $this->service($config, '3.4.9');
        $this->assertSame('', $service->pendingVersion());
        $service->acknowledge('3.4.8');
    }
}
