<?php
namespace OCA\Gestion\Tests\Unit\Service;
use OCA\Gestion\Service\ProviderUrlPolicy;
use PHPUnit\Framework\TestCase;
class ProviderUrlPolicyTest extends TestCase {
    /** @dataProvider unsafeUrls */
    public function testRejectsUnsafeEndpoint(string $url): void {
        $this->expectException(\InvalidArgumentException::class);
        ProviderUrlPolicy::validate($url);
    }
    public function unsafeUrls(): array {
        return array_map(fn($url) => [$url], ['http://api.example.com', 'file:///etc/passwd', 'gopher://example.com', 'https://127.0.0.1', 'https://[::1]', 'https://2130706433', 'https://0x7f000001', 'https://localhost', 'https://a.local', 'https://a.localhost', 'https://intranet', 'https://api.example.com:8443', 'https://user:password@api.example.com', 'https://api.example.com/#fragment']);
    }
    public function testAcceptsPublicHttpsEndpoint(): void {
        ProviderUrlPolicy::validate('https://api.example.com/v1?tenant=test');
        $this->addToAssertionCount(1);
    }
}
