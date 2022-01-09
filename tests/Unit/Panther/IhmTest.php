<?php

use Symfony\Component\Panther\Client;
require __DIR__.'/../../../vendor/autoload.php';


$client = Client::createFirefoxClient();

$client->request('GET', 'http://next.cybercorp.fr/apps/gestion');
$client->submitForm('submit-form', [
    'user' => 'baimard',
    'password' => 'Luxomo32' // Not my real pass ...
]);

$client->request('GET', 'http://next.cybercorp.fr/apps/gestion/config');
$client->takeScreenshot('tests/Unit/Panther/screens/config.png');

$client->request('GET', 'http://next.cybercorp.fr/apps/gestion');
$client->takeScreenshot('tests/Unit/Panther/screens/index.png');

$client->request('GET', 'http://next.cybercorp.fr/apps/gestion/devis');
$client->takeScreenshot('tests/Unit/Panther/screens/devis.png');

$client->request('GET', 'http://next.cybercorp.fr/apps/gestion/facture');
$client->takeScreenshot('tests/Unit/Panther/screens/facture.png');

$client->request('GET', 'http://next.cybercorp.fr/apps/gestion/produit');
$client->takeScreenshot('tests/Unit/Panther/screens/produit.png');

$client->executeScript("document.getElementById('theFolder').click()");
$client->waitForVisibility('.oc-dialog');
$client->takeScreenshot('tests/Unit/Panther/screens/selectFolder.png');

$client->executeScript("document.getElementsByClassName('oc-dialog-close')[0].click()");