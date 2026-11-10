<?php
namespace OCA\Gestion\Tests\Unit\Controller;

use OC\AppFramework\Utility\ControllerMethodReflector;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use PHPUnit\Framework\TestCase;

class RoutePermissionsTest extends TestCase {
    public function businessRoutes(): array {
        $routes = require __DIR__ . '/../../../appinfo/routes.php';
        $cases = [];
        foreach ($routes['routes'] as $route) {
            [$controller, $method] = explode('#', $route['name']);
            $cases[$route['name']] = ['OCA\\Gestion\\Controller\\' . ucfirst($controller) . 'Controller', $method];
        }
        return $cases;
    }

    /** @dataProvider businessRoutes */
    public function testBusinessRouteAllowsAuthenticatedNonAdministrators(string $controller, string $method): void {
        // Use Nextcloud's parser: a literal search for @NoAdminRequired misses malformed annotations.
        $reflector = \OCP\Server::get(ControllerMethodReflector::class);
        $reflector->reflect($controller, $method);
        $reflection = new \ReflectionMethod($controller, $method);
        $this->assertTrue($reflector->hasAnnotation('NoAdminRequired') || $reflection->getAttributes(NoAdminRequired::class) !== [], $controller . '::' . $method . ' unexpectedly requires an administrator.');
        $this->assertFalse($reflector->hasAnnotation('PublicPage') || $reflection->getAttributes(PublicPage::class) !== [], 'Business routes must still require authentication.');
    }

    /** @dataProvider sessionRoutes */
    public function testRecentlyAddedSessionRoutesStillRequireCsrf(string $controller, string $method): void {
        $reflector = \OCP\Server::get(ControllerMethodReflector::class);
        $reflector->reflect($controller, $method);
        $reflection = new \ReflectionMethod($controller, $method);
        $this->assertFalse($reflector->hasAnnotation('NoCSRFRequired') || $reflection->getAttributes(NoCSRFRequired::class) !== []);
    }

    public function sessionRoutes(): array {
        $cases = [];
        foreach (['Client' => ['contacts', 'importContact'], 'Admin' => ['backup', 'restore'], 'Crud' => ['lockDocument', 'history', 'reorderProducts'], 'Pdf' => ['personalMailStatus', 'sendPersonalMail'], 'Announcement' => ['acknowledge']] as $controller => $methods) {
            foreach ($methods as $method) $cases[$controller . '::' . $method] = ['OCA\\Gestion\\Controller\\' . $controller . 'Controller', $method];
        }
        return $cases;
    }
}
