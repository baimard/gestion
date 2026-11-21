<?php

declare(strict_types=1);

namespace OCA\Gestion\Service;

use OCP\Security\ICrypto;

final class ProviderSecret {
    public static function protect(array $credentials, ICrypto $crypto): array {
        if (($credentials['secret_encrypted'] ?? false) === true || ($credentials['client_secret'] ?? '') === '') {
            return $credentials;
        }
        $credentials['client_secret'] = $crypto->encrypt($credentials['client_secret']);
        $credentials['secret_encrypted'] = true;
        return $credentials;
    }
}
