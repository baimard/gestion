<?php
namespace OCA\Gestion\Tests\Unit\js;

use Symfony\Component\Panther\PantherTestCase;
use Symfony\Component\Panther\Client;

class JsTest extends PantherTestCase {

    private string $url;
    private string $username;
    private string $password;

    public function setUp(): void {
        parent::setUp();
        $this->url = rtrim(
            getenv('NEXTCLOUD_BASE_URL') ?: 'http://dev.cybercorp.fr',
            '/'
        );
        $this->username = getenv('NEXTCLOUD_TEST_USER') ?: 'nextcloud';
        $this->password = getenv('NEXTCLOUD_TEST_PASSWORD') ?: 'Gestion-Panther-2026!';
    }

    public function testClient(): void {
        $client = Client::createFirefoxClient();
        $client->request('GET', $this->url . '/login');
        $client->waitFor('#user');

        // Authentification
        $form = $client->getCrawler()->filter('form')->form();
        $form['user'] = $this->username;
        $form['password'] = $this->password;
        $client->submit($form);

        // Page principale
        $client->request('GET', $this->url . '/index.php/apps/gestion');
        $client->takeScreenshot('tests/Unit/Panther/screens/index_test_first.png');

        // Vérification bouton client visible
        $crawler = $client->waitForVisibility('#newClient');
        $this->assertNotSame('', trim($crawler->getText()));

        // Essai de tri (plus sécurisé)
        $client->executeScript("
            const table = document.getElementById('client');
            if (table && table.tHead && table.tHead.rows[0].cells[0]) {
                table.tHead.rows[0].cells[0].click();
            }
        ");

        // Nombre initial de lignes
        $initLength = $client->executeScript("return document.getElementById('client')?.rows.length || 0");
        $initialClientIds = $client->executeScript("
            return Array.from(document.querySelectorAll('#client tbody .deleteItem'))
                .map((element) => element.dataset.id);
        ");

        // Ajout d’un client
        $client->executeScript("document.getElementById('newClient')?.click()");
        $client->getWebDriver()->wait(5)->until(function () use ($client, $initLength) {
            return $client->executeScript("return document.getElementById('client')?.rows.length || 0") > $initLength;
        });
        $this->assertGreaterThan($initLength, $client->executeScript("return document.getElementById('client')?.rows.length || 0"));

        // Suppression du client
        $createdClientId = $client->executeScript(
            "return Array.from(document.querySelectorAll('#client tbody .deleteItem'))
                .map((element) => element.dataset.id)
                .find((id) => !arguments[0].includes(id));",
            [$initialClientIds]
        );
        $this->assertNotEmpty($createdClientId);
        $client->executeScript(
            "document.querySelector('#client tbody .deleteItem[data-id=\"' + arguments[0] + '\"]')?.click();",
            [$createdClientId]
        );
        $client->getWebDriver()->switchTo()->alert()->accept();

        // Attente de la suppression
        $client->getWebDriver()->wait(5)->until(function () use ($client, $initLength) {
            return $client->executeScript("return document.getElementById('client')?.rows.length || 0") === $initLength;
        });
        $this->assertEquals($initLength, $client->executeScript("return document.getElementById('client')?.rows.length || 0"));
    }
}
