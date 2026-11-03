<?php
namespace OCA\Gestion\Tests\Unit\Controller;

use OC\AppFramework\Middleware\Security\SecurityMiddleware;
use OC\AppFramework\Middleware\Security\Exceptions\NotLoggedInException;
use OC\AppFramework\Middleware\Security\Exceptions\CrossSiteRequestForgeryException;
use OC\AppFramework\Utility\ControllerMethodReflector;
use OCP\AppFramework\Controller;
use OCP\App\IAppManager;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\TestCase;

class NonAdminMiddlewareTest extends TestCase {
    public function businessRoutes(): array {
        $routes = require __DIR__ . '/../../../appinfo/routes.php';
        $cases = [];
        foreach ($routes['routes'] as $route) {
            [$controller, $method] = explode('#', $route['name']);
            $cases[$route['name']] = ['OCA\\Gestion\\Controller\\' . ucfirst($controller) . 'Controller', $method];
        }
        return $cases;
    }

    private function check(string $controller, string $method, bool $loggedIn = true, bool $validCsrf = true): void {
        $request = $this->createMock(IRequest::class);
        $request->method('passesStrictCookieCheck')->willReturn(true);
        $request->method('passesCSRFCheck')->willReturn($validCsrf);
        $reflector = \OCP\Server::get(ControllerMethodReflector::class);
        $reflector->reflect($controller, $method);
        $user = $this->createMock(IUser::class);
        $user->method('getUID')->willReturn('ordinary-company-user');
        $userSession = $this->createMock(IUserSession::class);
        $userSession->method('getUser')->willReturn($loggedIn ? $user : null);
        $appManager = $this->createMock(IAppManager::class);
        $appManager->method('getAppPath')->willReturn(dirname(__DIR__, 3));
        $appManager->method('isEnabledForUser')->willReturn(true);
        $overrides = ['request' => $request, 'reflector' => $reflector, 'appName' => 'gestion', 'isLoggedIn' => $loggedIn, 'userSession' => $userSession, 'appManager' => $appManager];
        $middlewareClass = new \ReflectionClass(SecurityMiddleware::class);
        $arguments = [];
        foreach ($middlewareClass->getConstructor()->getParameters() as $parameter) {
            if (array_key_exists($parameter->getName(), $overrides)) {
                $arguments[] = $overrides[$parameter->getName()];
            } elseif ($parameter->getName() === 'middlewareUtils') {
                // Nextcloud 34 delegates annotation/attribute checks to this real helper.
                $arguments[] = \OCP\Server::get($parameter->getType()->getName());
            } else {
                // Use the installed Nextcloud version's dependencies. Group mocks deny all admin rights.
                $arguments[] = $this->createMock($parameter->getType()->getName());
            }
        }
        $middleware = $middlewareClass->newInstanceArgs($arguments);
        $instance = (new \ReflectionClass($controller))->newInstanceWithoutConstructor();
        (new \ReflectionMethod(Controller::class, '__construct'))->invoke($instance, 'gestion', $request);
        $middleware->beforeController($instance, $method);
    }

    /** @dataProvider businessRoutes */
    public function testNextcloudAcceptsStandardUserOnEveryBusinessRoute(string $controller, string $method): void {
        $this->check($controller, $method);
        $this->addToAssertionCount(1);
    }

    public function testHistoryStillRequiresLogin(): void {
        $this->expectException(NotLoggedInException::class);
        $this->check(\OCA\Gestion\Controller\CrudController::class, 'history', false);
    }

    public function testHistoryStillRequiresCsrf(): void {
        $this->expectException(CrossSiteRequestForgeryException::class);
        $this->check(\OCA\Gestion\Controller\CrudController::class, 'history', true, false);
    }
}
