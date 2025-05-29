<?php
namespace OCA\Gestion\Tests\Unit\js;

use Symfony\Component\Panther\PantherTestCase;
use Symfony\Component\Panther\Client;

class JsTest extends PantherTestCase {

    private string $url;

    public function setUp(): void {
        parent::setUp();
        $this->url = 'http://127.0.0.1';
    }

    public function testClient(): void {
        $client = Client::createFirefoxClient();
        $crawler = $client->request('GET', $this->url . '/index.php/apps/gestion');

        // Authentification
        $form = $crawler->selectButton('Log in')->form();
        $form['user'] = 'nextcloud';
        $form['password'] = 'nextcloud';
        $client->submit($form);

        // Page principale
        $client->request('GET', $this->url . '/index.php/apps/gestion');
        $client->takeScreenshot('tests/Unit/Panther/screens/index_test_first.png');

        // Vérification bouton client visible
        $crawler = $client->waitForVisibility('#newClient');
        $this->assertEquals('Add customer', $crawler->getText());

        // Essai de tri (plus sécurisé)
        $client->executeScript("
            const table = document.getElementById('client');
            if (table && table.tHead && table.tHead.rows[0].cells[0]) {
                table.tHead.rows[0].cells[0].click();
            }
        ");

        // Nombre initial de lignes
        $initLength = $client->executeScript("return document.getElementById('client')?.rows.length || 0");

        // Ajout d’un client
        $client->executeScript("document.getElementById('newClient')?.click()");
        $client->waitFor(function () use ($client, $initLength) {
            return $client->executeScript("return document.getElementById('client')?.rows.length || 0") > $initLength;
        }, 5);
        $this->assertGreaterThan($initLength, $client->executeScript("return document.getElementById('client')?.rows.length || 0"));

        // Suppression du client
        $client->executeScript("
            const table = document.getElementById('client');
            if (table?.rows[1]?.cells[8]?.querySelector('button')) {
                table.rows[1].cells[8].querySelector('button').click();
            }
        ");
        $client->getWebDriver()->switchTo()->alert()->accept();

        // Attente de la suppression
        $client->waitFor(function () use ($client, $initLength) {
            return $client->executeScript("return document.getElementById('client')?.rows.length || 0") === $initLength;
        }, 5);
        $this->assertEquals($initLength, $client->executeScript("return document.getElementById('client')?.rows.length || 0"));
    }
}
