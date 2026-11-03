<?php
namespace OCA\Gestion\Tests\Unit\Service;
use OCA\Gestion\Service\ElectronicInvoiceProviderService;
use OCA\Gestion\Service\IopoleService;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\Http\Client\IResponse;
use PHPUnit\Framework\TestCase;
class IopoleSecurityTest extends TestCase {
    private function service(IClient $client): IopoleService {
        $provider = $this->createMock(ElectronicInvoiceProviderService::class);
        $provider->method('requireProvider')->with('iopole')->willReturn(['client_id'=>'id','client_secret'=>'secret-fixture','customer_id'=>'customer','base_url'=>'https://api.example.com','auth_url'=>'https://auth.example.com/token']);
        $factory = $this->createMock(IClientService::class);
        $factory->method('newClient')->willReturn($client);
        return new IopoleService($provider, $factory);
    }
    private function response(int $status, string $body): IResponse {
        $response = $this->createMock(IResponse::class);
        $response->method('getStatusCode')->willReturn($status);
        $response->method('getBody')->willReturn($body);
        return $response;
    }
    public function testDeliveryUsesNextcloudClientWithNoRedirectsAndLocalAddressProtection(): void {
        $client = $this->createMock(IClient::class);
        $calls = 0;
        $client->expects($this->exactly(2))->method('post')->willReturnCallback(function($url, $options) use (&$calls) {
            $this->assertFalse($options['allow_redirects']);
            $this->assertFalse($options['nextcloud']['allow_local_address']);
            $this->assertFalse($options['http_errors']);
            $this->assertArrayNotHasKey('verify', $options); // Preserve Nextcloud's trusted CA configuration.
            if ($calls++ === 0) {
                $this->assertSame('https://auth.example.com/token', $url);
                parse_str($options['body'], $form);
                $this->assertSame('secret-fixture', $form['client_secret']);
                return $this->response(200, '{"access_token":"fixture-token"}');
            }
            $this->assertSame('https://api.example.com/v1/invoice', $url);
            $this->assertSame('Bearer fixture-token', $options['headers']['Authorization']);
            $this->assertSame('%PDF-fixture', $options['multipart'][0]['contents']);
            return $this->response(201, '{"id":"invoice-fixture"}');
        });
        $this->assertSame(['id'=>'invoice-fixture'], $this->service($client)->sendInvoice('%PDF-fixture','invoice.pdf'));
    }
    public function testUpstreamErrorDoesNotDiscloseResponseBody(): void {
        $client = $this->createMock(IClient::class);
        $client->method('post')->willReturn($this->response(401, 'secret-fixture fixture-token'));
        $this->expectExceptionMessage('Iopole authentication failed. HTTP 401.');
        $this->service($client)->sendInvoice('%PDF-fixture','invoice.pdf');
    }
    public function testTransportErrorDoesNotDiscloseCredentials(): void {
        $client = $this->createMock(IClient::class);
        $client->method('post')->willThrowException(new \RuntimeException('secret-fixture fixture-token'));
        try { $this->service($client)->sendInvoice('%PDF-fixture','invoice.pdf'); $this->fail('Expected a transport error.'); }
        catch (\RuntimeException $e) {
            $this->assertStringNotContainsString('secret-fixture', $e->getMessage());
            $this->assertStringNotContainsString('fixture-token', $e->getMessage());
        }
    }
}
