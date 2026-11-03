<?php

declare(strict_types=1);
namespace OCA\Gestion\Service;

final class ProviderUrlPolicy {
    public static function validate(string $url): void {
        $parts = parse_url($url);
        if (!filter_var($url, FILTER_VALIDATE_URL) || !is_array($parts) || ($parts['scheme'] ?? '') !== 'https' || empty($parts['host']) || isset($parts['user']) || isset($parts['pass']) || isset($parts['fragment']) || (($parts['port'] ?? 443) !== 443)) {
            throw new \InvalidArgumentException('The platform URL must use HTTPS on port 443 without embedded credentials or fragments.');
        }
        $host = strtolower(trim($parts['host'], '[]'));
        if ($host === 'localhost' || str_ends_with($host, '.localhost') || str_ends_with($host, '.local') || (filter_var($host, FILTER_VALIDATE_IP) && !filter_var($host, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) || preg_match('/^(?:0x[0-9a-f]+|[0-9.]+)$/i', $host)) {
            // IP literals are unnecessary for the named public Iopole service.
            throw new \InvalidArgumentException('Use a public platform hostname, not a local address.');
        }
        if (filter_var($host, FILTER_VALIDATE_IP) || !str_contains($host, '.')) throw new \InvalidArgumentException('Use a public platform hostname.');
    }
}
