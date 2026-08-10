<?php

declare(strict_types=1);

namespace OCA\Gestion\Service;

use OCP\App\IAppManager;
use OCP\Mail\Provider\Address;
use OCP\Mail\Provider\Attachment;
use OCP\Mail\Provider\IManager;
use OCP\Mail\Provider\IMessageSend;
use OCP\Mail\Provider\IService;

class PersonalMailService {
	private const PROVIDER_ID = 'mail-application';

	public function __construct(
		private IAppManager $appManager,
		private IManager $mailManager,
		private string $UserId,
	) {
	}

	public function getStatus(): array {
		try {
			$service = $this->findSendService();
			if ($service === null) {
				return ['available' => false];
			}

			return [
				'available' => true,
				'account' => [
					'id' => $service->id(),
					'label' => $service->getLabel(),
					'address' => $service->getPrimaryAddress()->getAddress(),
				],
			];
		} catch (\Throwable $e) {
			return ['available' => false];
		}
	}

	public function sendPdf(string $pdf, string $name, string $subject, string $body, string $to): void {
		$service = $this->findSendService();
		if ($service === null) {
			throw new \RuntimeException('No personal Mail account is available.');
		}

		$recipient = filter_var(trim($to), FILTER_VALIDATE_EMAIL);
		if ($recipient === false) {
			throw new \InvalidArgumentException('The customer email address is missing or invalid.');
		}

		$message = $service->initiateMessage();
		$message->setFrom($service->getPrimaryAddress());
		$message->setTo(new Address($recipient));
		$message->setSubject($subject);
		$message->setBody($body, false);
		$message->setAttachments(new Attachment($pdf, html_entity_decode($name), 'application/pdf'));

		$service->sendMessage($message);
	}

	private function findSendService(): ?IService {
		if (!$this->appManager->isEnabledForUser('mail')) {
			return null;
		}

		$provider = $this->mailManager->findProviderById(self::PROVIDER_ID);
		if ($provider === null) {
			return null;
		}

		foreach ($provider->listServices($this->UserId) as $service) {
			if ($service instanceof IMessageSend && $service->capable('MessageSend')) {
				return $service;
			}
		}

		return null;
	}
}
