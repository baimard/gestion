<?php

namespace OCA\Gestion\Service;

use OCP\Http\Client\IClientService;

class IopoleService {
    public function __construct(
        private ElectronicInvoiceProviderService $providerService,
        private IClientService $httpClient,
    ) {
    }

    public function sendInvoice(string $pdfContent, string $filename): array {
        $config = $this->providerService->requireProvider('iopole');
        $baseUrl = rtrim($config['base_url'], '/');
        $authUrl = $config['auth_url'];
        ProviderUrlPolicy::validate($baseUrl);
        ProviderUrlPolicy::validate($authUrl);
        $tokenResponse = $this->request($authUrl, [
            'Content-Type' => 'application/x-www-form-urlencoded',
        ], ['body' => http_build_query([
            'grant_type' => 'client_credentials',
            'client_id' => $config['client_id'],
            'client_secret' => $config['client_secret'],
        ])]);
        if ($tokenResponse['status'] !== 200) {
            throw new \RuntimeException('Iopole authentication failed. HTTP ' . $tokenResponse['status'] . '.');
        }
        $tokenPayload = json_decode($tokenResponse['body'], true);
        if (!is_string($tokenPayload['access_token'] ?? null) || $tokenPayload['access_token'] === '') {
            throw new \RuntimeException('Iopole authentication response does not contain an access token.');
        }
        $response = $this->request($baseUrl . '/v1/invoice', [
            'customer-id' => $config['customer_id'],
            'Authorization' => 'Bearer ' . $tokenPayload['access_token'],
            'Accept' => 'application/json',
        ], ['multipart' => [[
            'name' => 'file',
            'contents' => $pdfContent,
            'filename' => $filename,
            'headers' => ['Content-Type' => 'application/pdf'],
        ]]]);
        if ($response['status'] < 200 || $response['status'] >= 300) {
            throw new \RuntimeException('The invoice was not sent to Iopole. HTTP ' . $response['status'] . '.');
        }
        $payload = json_decode($response['body'], true);
        if (!is_array($payload) || empty($payload['id'])) {
            throw new \RuntimeException('Iopole response does not contain an invoice id.');
        }
        return $payload;
    }

    private function request(string $url, array $headers, array $payload): array {
        ProviderUrlPolicy::validate($url);
        try {
            $response = $this->httpClient->newClient()->post($url, $payload + [
                'headers' => $headers,
                'timeout' => 60,
                'allow_redirects' => false,
                'http_errors' => false,
                'nextcloud' => ['allow_local_address' => false],
            ]);
        } catch (\Throwable $e) {
            // Transport errors can contain credential-bearing URLs, headers or request bodies.
            throw new \RuntimeException('The platform request could not be completed. Check the public HTTPS endpoint and Nextcloud network policy.');
        }
        return ['status' => $response->getStatusCode(), 'body' => (string)$response->getBody()];
    }
}
