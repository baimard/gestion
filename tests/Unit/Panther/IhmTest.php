<?php

use Symfony\Component\Panther\Client;
use Facebook\WebDriver\WebDriverDimension;
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

$client->request('GET', $baseUrl . '/index.php/login');
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

$desktopLayout = $client->executeScript(<<<'JS'
const modal = document.querySelector('#product_selector_modal .modal-content');
const list = document.getElementById('product_selector_list');
const option = list.querySelector('.product-selector-option');
return {
    modalWidth: modal.getBoundingClientRect().width,
    listWidth: list.clientWidth,
    optionWidth: option.getBoundingClientRect().width,
    viewportWidth: window.innerWidth,
    computedWidth: getComputedStyle(modal).width,
    computedMaxWidth: getComputedStyle(modal).maxWidth,
    listFits: list.scrollWidth <= list.clientWidth + 1,
    fontWeight: getComputedStyle(option).fontWeight,
};
JS);
if (
    $desktopLayout['modalWidth'] < 900
    || $desktopLayout['optionWidth'] < $desktopLayout['listWidth'] - 2
    || !$desktopLayout['listFits']
    || (int)$desktopLayout['fontWeight'] >= 600
) {
    throw new RuntimeException('The desktop product selector layout is not usable: ' . json_encode($desktopLayout));
}

$client->manage()->window()->setSize(new WebDriverDimension(1095, 700));
$tabletLayout = $client->executeScript(<<<'JS'
const list = document.getElementById('product_selector_list');
const option = list.querySelector('.product-selector-option');
return {
    listWidth: list.clientWidth,
    optionWidth: option.getBoundingClientRect().width,
    listFits: list.scrollWidth <= list.clientWidth + 1,
};
JS);
if ($tabletLayout['optionWidth'] < $tabletLayout['listWidth'] - 2 || !$tabletLayout['listFits']) {
    throw new RuntimeException('The product selector rows do not fill the list: ' . json_encode($tabletLayout));
}

$client->manage()->window()->setSize(new WebDriverDimension(390, 844));
$client->takeScreenshot('tests/Unit/Panther/screens/productSelectorMobile.png');
$mobileLayout = $client->executeScript(<<<'JS'
const modal = document.querySelector('#product_selector_modal .modal-content');
const list = document.getElementById('product_selector_list');
return {
    modalFits: modal.getBoundingClientRect().right <= window.innerWidth + 1,
    listFits: list.scrollWidth <= list.clientWidth + 1,
};
JS);
if (!$mobileLayout['modalFits'] || !$mobileLayout['listFits']) {
    throw new RuntimeException('The mobile product selector layout overflows horizontally.');
}

$client->manage()->window()->setSize(new WebDriverDimension(1440, 900));
$client->executeScript("document.querySelector('.product-selector-option[aria-selected=\"true\"]').click(); document.getElementById('product_selector_confirm').click()");
$client->waitForInvisibility('#product_selector_modal');

$client->executeScript("document.querySelector('.createInvoiceFromQuote').click()");
$client->waitFor('#factureid');
$client->waitFor('html[data-gestion-document-ready="true"]');
$client->takeScreenshot('tests/Unit/Panther/screens/factureShow.png');

$client->request('GET', $baseUrl . '/index.php/apps/gestion/facture');
$client->waitFor('#facture');
$client->takeScreenshot('tests/Unit/Panther/screens/facture.png');
$client->executeScript("document.getElementById('newInvoice').click()");
$client->waitForVisibility('#invoice_quote_selector_modal');
$client->waitFor('#invoice_quote_selector_list .product-selector-option');
$client->takeScreenshot('tests/Unit/Panther/screens/invoiceQuoteSelector.png');
$client->executeScript("document.querySelector('#invoice_quote_selector_modal .modalClose').click()");
$client->waitForInvisibility('#invoice_quote_selector_modal');

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
