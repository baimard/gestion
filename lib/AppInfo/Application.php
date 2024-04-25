<?php

//declare(strict_types=1);

namespace OCA\Gestion\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Bootstrap\IBootContext;

use OCP\EventDispatcher\IEventDispatcher;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;
// use OCP\Notification\IManager;

class Application extends App implements IBootstrap {
    public const APP_ID = 'gestion';

    public function __construct() {
        parent::__construct(self::APP_ID);
        
        $dispatcher = $this->getContainer()->query(IEventDispatcher::class);
        $dispatcher->addListener(
            AddContentSecurityPolicyEvent::class,
            function(AddContentSecurityPolicyEvent $event) {
                $csp = new ContentSecurityPolicy();
                $csp->addAllowedStyleDomain('https://fonts.googleapis.com');
                $csp->addAllowedFontDomain('https://fonts.gstatic.com');
                $event->addPolicy($csp);
            }
        );

    }

    public function register(IRegistrationContext $context): void {

    }

    public function boot(IBootContext $context): void {
        //require_once '/var/www/html/apps/gestion/vendor/autoload.php';
    }

}