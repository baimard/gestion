<?php
namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Tests\Unit\js\JsTest;
use PHPUnit\Framework\SkippedTestError;
use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../Ihm/JsTest.php';

class BrowserCredentialsTest extends TestCase {
    /** @dataProvider incompleteCredentials */
    public function testMissingCredentialsSkipBeforeAnyBrowserIsOpened(?string $username, ?string $password): void {
        $variables = ['NEXTCLOUD_TEST_USER' => $username, 'NEXTCLOUD_TEST_PASSWORD' => $password];
        $previous = [];
        foreach ($variables as $name => $value) {
            $previous[$name] = getenv($name);
            putenv($value === null ? $name : $name . '=' . $value);
        }

        try {
            $test = new JsTest('testClient');
            try {
                $test->setUp();
                $this->fail('The browser scenario must not use fallback credentials.');
            } catch (SkippedTestError $exception) {
                $this->assertStringContainsString('NEXTCLOUD_TEST_USER', $exception->getMessage());
                $this->assertStringContainsString('NEXTCLOUD_TEST_PASSWORD', $exception->getMessage());
            }
        } finally {
            foreach ($previous as $name => $value) {
                putenv($value === false ? $name : $name . '=' . $value);
            }
        }
    }

    public function incompleteCredentials(): array {
        return [[null, null], ['browser-test-user', null], [null, 'browser-test-password']];
    }
}
