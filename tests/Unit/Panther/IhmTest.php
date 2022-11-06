<?php

use Symfony\Component\Panther\Client;
require __DIR__.'/../../../vendor/autoload.php';

$client = Client::createFirefoxClient();

$crawler = $client->request('GET', $this->url.'/index.php/apps/gestion');

$form = $crawler->selectButton('Log in')->form();
$form['user'] = 'nextcloud';
$form['password'] = 'nextcloud';
$client->submit($form);

$client->request('GET', 'http://127.0.0.1/index.php/apps/gestion/config');
$client->takeScreenshot('tests/Unit/Panther/screens/config.png');

$client->request('GET', 'http://127.0.0.1/index.php/apps/gestion');
$client->takeScreenshot('tests/Unit/Panther/screens/index.png');

$client->request('GET', 'http://127.0.0.1/index.php/apps/gestion/devis');
$client->takeScreenshot('tests/Unit/Panther/screens/devis.png');

$client->request('GET', 'http://127.0.0.1/index.php/apps/gestion/facture');
$client->takeScreenshot('tests/Unit/Panther/screens/facture.png');

$client->request('GET', 'http://127.0.0.1/index.php/apps/gestion/produit');
$client->takeScreenshot('tests/Unit/Panther/screens/produit.png');

$client->request('GET', 'http://127.0.0.1/index.php/apps/gestion/statistique');
$client->takeScreenshot('tests/Unit/Panther/screens/statistique.png');

$client->executeScript("document.getElementById('theFolder').click()");
$client->waitForVisibility('.oc-dialog');
$client->takeScreenshot('tests/Unit/Panther/screens/selectFolder.png');

$client->executeScript("document.getElementsByClassName('oc-dialog-close').item(0).click()");
$client->executeScript("document.getElementById('about').click()");
$client->waitForVisibility('#modalConfig');
$client->takeScreenshot('tests/Unit/Panther/screens/about.png');

