<?php

use Symfony\Component\Panther\Client;
require __DIR__.'/../../../../../3rdparty/autoload.php';
require __DIR__.'/../../../vendor/autoload.php';

$baseUrl = rtrim(
	getenv('NEXTCLOUD_BASE_URL') ?: 'http://dev.cybercorp.fr',
	'/'
);
$username = getenv('NEXTCLOUD_TEST_USER') ?: 'nextcloud';
$password = getenv('NEXTCLOUD_TEST_PASSWORD') ?: 'Gestion-Panther-2026!';

$client = Client::createFirefoxClient(
	null,
	['--headless', '--width=1440', '--height=900']
);

$client->request('GET', $baseUrl . '/login');
$client->waitFor('#user');

$form = $client->getCrawler()->filter('form')->form();
$form['user'] = $username;
$form['password'] = $password;
$client->submit($form);

$client->request('GET', $baseUrl . '/index.php/apps/gestion/config');
$client->waitFor('#modalConfig');
$client->takeScreenshot('tests/Unit/Panther/screens/config.png');

$client->request('GET', $baseUrl . '/index.php/apps/gestion');
$client->waitFor('#client');
$client->takeScreenshot('tests/Unit/Panther/screens/index.png');

$client->request('GET', $baseUrl . '/index.php/apps/gestion/devis');
$client->waitFor('#devis');
$client->takeScreenshot('tests/Unit/Panther/screens/devis.png');
$quotePath = $client->getCrawler()->filter('.document-actions a')->attr('href');

$client->request('GET', $baseUrl . '/index.php/apps/gestion/produit');
$client->waitFor('#produit');
$client->executeScript("if (!document.querySelector('#produit .editable[data-column=\"reference\"]')) document.getElementById('newProduit').click()");
$client->waitFor('#produit .editable[data-column="reference"]');

$client->request('GET', str_starts_with($quotePath, 'http') ? $quotePath : $baseUrl . $quotePath);
$client->waitFor('html[data-gestion-document-ready="true"]');
$client->executeScript("if (!document.querySelector('.product-reference-selector')) document.getElementById('devisAdd').click()");
$client->waitFor('.product-reference-selector');
$client->takeScreenshot('tests/Unit/Panther/screens/devisShow.png');

$client->executeScript("document.querySelector('.product-reference-selector').click()");
$client->waitForVisibility('#product_selector_modal');
$client->waitFor('.product-selector-option');
$client->takeScreenshot('tests/Unit/Panther/screens/productSelector.png');

$client->executeScript("document.querySelector('.product-selector-option[aria-selected=\"true\"]').dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))");
$client->waitForInvisibility('#product_selector_modal');

$client->request('GET', $baseUrl . '/index.php/apps/gestion/facture');
$client->waitFor('#facture');
$client->takeScreenshot('tests/Unit/Panther/screens/facture.png');

$client->request('GET', $baseUrl . '/index.php/apps/gestion/produit');
$client->waitFor('#produit');
$client->takeScreenshot('tests/Unit/Panther/screens/produit.png');

$client->request('GET', $baseUrl . '/index.php/apps/gestion/statistique');
$client->waitFor('#theFolder');
$client->takeScreenshot('tests/Unit/Panther/screens/statistique.png');

$client->executeScript("document.getElementById('theFolder').click()");
$client->waitForVisibility('.modal-container__close');
$client->takeScreenshot('tests/Unit/Panther/screens/selectFolder.png');

$client->executeScript("document.getElementsByClassName('modal-container__close').item(0).click()");
$client->waitForInvisibility('.modal-container');

$client->executeScript("document.getElementById('about').click()");
$client->waitForVisibility('#modalConfig');
$client->takeScreenshot('tests/Unit/Panther/screens/about.png');
