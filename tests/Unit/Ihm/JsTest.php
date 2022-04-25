<?php
namespace OCA\Gestion\Tests\Unit\js;

use Symfony\Component\Panther\PantherTestCase;
use Symfony\Component\Panther\Client;

class JsTest extends PantherTestCase {

    private $url;

	public function setUp(): void{
		parent::setUp();
        $this->url = "http://next.cybercorp.fr";
    }

    public function testClient(): void {
        $client = Client::createFirefoxClient();
        $client->request('GET', $this->url.'/index.php/apps/gestion');

        $client->submitForm('submit-form', [
            'user' => 'nextcloud',
            'password' => 'nextcloud' // Not my real pass ...
        ]);

        $client->request('GET', $this->url.'/index.php/apps/gestion');

        //Check page showing
        $crawler = $client->waitForVisibility('#newClient');
        $this->assertEquals('Ajouter client',$crawler->filter('#newClient')->text());

        //Sorting (this is for the screenshot)
        $client->executeScript("document.getElementById('client').childNodes[1].childNodes[1].childNodes[0].click()");

        //Init lenght for datatable
        $initLenght = $client->executeScript("return document.getElementById('client').rows.length");

        //Add client
        $client->executeScript("document.getElementById('newClient').click()");
        sleep(1); //Waiting XHR
        $this->assertTrue($initLenght < $client->executeScript("return document.getElementById('client').rows.length"));

        //Delete client
        $client->executeScript("document.getElementById('client').rows[1].childNodes[8].childNodes[0].childNodes[0].click()");
        $client->getWebDriver()->switchTo()->alert()->accept();
        sleep(1);
        $this->assertTrue($initLenght == $client->executeScript("return document.getElementById('client').rows.length"));

        // $client->takeScreenshot('tests/Unit/Panther/screens/index_test_first.png');
    }

}