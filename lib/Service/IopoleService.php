<?php

namespace OCA\Gestion\Service;

use OCP\IConfig;

class IopoleService {
	private const APP_ID = 'gestion';

	public function __construct(
		private IConfig $config
	) {
	}

	public function sendInvoice(
		string $pdfContent,
		string $filename
	): array {
		$clientId = $this->getRequiredAppValue(
			'iopole_client_id'
		);

		$clientSecret = $this->getRequiredAppValue(
			'iopole_client_secret'
		);

		$customerId = $this->getRequiredAppValue(
			'iopole_customer_id'
		);

		$baseUrl = rtrim(
			$this->getRequiredAppValue('iopole_base_url'),
			'/'
		);

		$authUrl = $this->getRequiredAppValue(
			'iopole_auth_url'
		);

		$this->assertValidUrl(
			$baseUrl,
			'iopole_base_url'
		);

		$this->assertValidUrl(
			$authUrl,
			'iopole_auth_url'
		);

		$token = $this->requestAccessToken(
			$authUrl,
			$clientId,
			$clientSecret
		);

		$tmpFile = tempnam(
			sys_get_temp_dir(),
			'gestion_iopole_'
		);

		if ($tmpFile === false) {
			throw new \RuntimeException(
				'Unable to create temporary invoice file.'
			);
		}

		try {
			file_put_contents($tmpFile, $pdfContent);

			$response = $this->request(
				$baseUrl . '/v1/invoice',
				[
					'customer-id: ' . $customerId,
					'Authorization: Bearer ' . $token,
					'Accept: application/json',
				],
				[
					'file' => curl_file_create(
						$tmpFile,
						'application/pdf',
						$filename
					),
				]
			);
		} finally {
			@unlink($tmpFile);
		}

		if (
			$response['status'] < 200 ||
			$response['status'] >= 300
		) {
			throw new \RuntimeException(
				'The invoice was not sent to Iopole. HTTP ' .
				$response['status'] .
				': ' .
				$response['body']
			);
		}

		$payload = json_decode(
			$response['body'],
			true
		);

		if (
			!is_array($payload) ||
			empty($payload['id'])
		) {
			throw new \RuntimeException(
				'Iopole response does not contain an invoice id.'
			);
		}

		return $payload;
	}

	private function requestAccessToken(
		string $authUrl,
		string $clientId,
		string $clientSecret
	): string {
		$response = $this->request(
			$authUrl,
			[
				'Content-Type: application/x-www-form-urlencoded',
			],
			http_build_query([
				'grant_type' => 'client_credentials',
				'client_id' => $clientId,
				'client_secret' => $clientSecret,
			])
		);

		if ($response['status'] !== 200) {
			throw new \RuntimeException(
				'Iopole authentication failed. HTTP ' .
				$response['status'] .
				': ' .
				$response['body']
			);
		}

		$payload = json_decode(
			$response['body'],
			true
		);

		if (
			!is_array($payload) ||
			empty($payload['access_token'])
		) {
			throw new \RuntimeException(
				'Iopole authentication response does not contain an access token.'
			);
		}

		return (string)$payload['access_token'];
	}

	private function request(
		string $url,
		array $headers,
		string|array $body
	): array {
		if (!function_exists('curl_init')) {
			throw new \RuntimeException(
				'The PHP cURL extension is required to call Iopole.'
			);
		}

		error_log('Iopole request URL: ' . $url);

		$curl = curl_init($url);

		curl_setopt_array($curl, [
			CURLOPT_POST => true,
			CURLOPT_HTTPHEADER => $headers,
			CURLOPT_POSTFIELDS => $body,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_TIMEOUT => 60,
			CURLOPT_SSL_VERIFYPEER => true,
			CURLOPT_SSL_VERIFYHOST => 2,
		]);

		$responseBody = curl_exec($curl);

		$status = curl_getinfo(
			$curl,
			CURLINFO_HTTP_CODE
		);

		$error = curl_error($curl);

		curl_close($curl);

		error_log(
			'Iopole response | HTTP ' .
			$status .
			' | BODY: ' .
			(string)$responseBody
		);

		if ($responseBody === false) {
			throw new \RuntimeException(
				'Iopole request failed: ' . $error
			);
		}

		return [
			'status' => (int)$status,
			'body' => (string)$responseBody,
		];
	}

	private function getRequiredAppValue(
		string $key
	): string {
		$value = trim((string)$this->config->getAppValue(
			self::APP_ID,
			$key,
			''
		));

		if ($value === '') {
			throw new \RuntimeException(
				'Missing Gestion app config value: ' . $key
			);
		}

		return $value;
	}

	private function assertValidUrl(
		string $url,
		string $key
	): void {
		if (!filter_var($url, FILTER_VALIDATE_URL)) {
			throw new \RuntimeException(
				'Invalid URL configured for ' .
				$key .
				': ' .
				$url
			);
		}
	}
}