<?php
namespace OCA\Gestion\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\IL10N;
use OCP\Settings\ISettings;
use OCA\Gestion\Db\Bdd;
use OCP\IURLGenerator;

class GestionAdmin implements ISettings {

    /** @var IL10N */
    private $l;

    /** @var IURLGenerator */
    private $urlGenerator;

    /** @var IConfig */
    private $config;

    public function __construct($UserId, 
                                Bdd $myDb,
                                IURLGenerator $urlGenerator,
                                IL10N $l) {

        $this->idNextcloud = $UserId;
        $this->myDb = $myDb;
        $this->urlGenerator = $urlGenerator;
        $this->l = $l;



    }

    /**
     * @return TemplateResponse
     */
    public function getForm() {
        return new TemplateResponse('gestion', 'settings/admin', array("url" => $this->urlGenerator->linkToRouteAbsolute("gestion.admin.dump")));
    }

    public function getSection() {
        return 'gestion';
    }

    /**
     * @return int whether the form should be rather on the top or bottom of
     * the admin section. The forms are arranged in ascending order of the
     * priority values. It is required to return a value between 0 and 100.
     *
     * E.g.: 70
     */
    public function getPriority() {
        return 55;
    }

}