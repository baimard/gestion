<?php

use Symfony\Component\Panther\Client;
use Facebook\WebDriver\WebDriverDimension;
$serverRoot = getenv('NEXTCLOUD_SERVER_ROOT') ?: dirname(__DIR__, 5);
if (!is_file($serverRoot.'/3rdparty/autoload.php')) {
    throw new RuntimeException('Set NEXTCLOUD_SERVER_ROOT to the Nextcloud server directory.');
}
require $serverRoot.'/3rdparty/autoload.php';
require __DIR__.'/../../../vendor/autoload.php';

$baseUrl = rtrim(
	getenv('NEXTCLOUD_BASE_URL') ?: 'http://127.0.0.1:8080',
	'/'
);
$username = getenv('NEXTCLOUD_TEST_USER');
$password = getenv('NEXTCLOUD_TEST_PASSWORD');
if (!$username || !$password) {
    throw new RuntimeException('Set NEXTCLOUD_TEST_USER and NEXTCLOUD_TEST_PASSWORD for a disposable demo account.');
}

function capture(Client $client, string $filename): void {
    $client->executeAsyncScript('const done = arguments[arguments.length - 1]; document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(done)));');
    $client->takeScreenshot(__DIR__.'/screens/'.$filename);
}

$client = Client::createFirefoxClient(
	getenv('GECKODRIVER_PATH') ?: __DIR__.'/../../../drivers/geckodriver',
	['--headless', '--width=1920', '--height=1080']
);

$client->request('GET', $baseUrl . '/index.php/login');
$client->waitFor('#user');

$form = $client->getCrawler()->filter('form')->form();
$form['user'] = $username;
$form['password'] = $password;
$client->submit($form);
$client->waitFor('#header');

$client->request('GET', $baseUrl . '/index.php/apps/gestion/config');
$client->waitFor('.gestion-settings-page');
$client->waitFor('#CurrentCompany-select option');
if ($client->getCrawler()->filter('#gestion-announcement')->count()) {
    $client->waitForVisibility('#gestion-announcement');
    $client->executeScript("document.querySelector('[data-dismiss-announcement]').click()");
    $client->waitForInvisibility('#gestion-announcement');
}
if ($companyId = getenv('NEXTCLOUD_TEST_COMPANY_ID')) {
    if (!ctype_digit($companyId)) throw new RuntimeException('Invalid demo company id.');
    $status = $client->executeAsyncScript(<<<'JS'
const companyID = arguments[0], done = arguments[arguments.length - 1];
fetch(OC.generateUrl('/apps/gestion/updateSession'), {
    method: 'POST', headers: {'Content-Type': 'application/json', requesttoken: OC.requestToken},
    body: JSON.stringify({companyID}),
}).then(response => done(response.status)).catch(() => done(0));
JS, [$companyId]);
    if ($status !== 200) throw new RuntimeException('The demo company is not accessible.');
    $client->request('GET', $baseUrl . '/index.php/apps/gestion/config');
    $client->waitFor('.gestion-settings-page');
}
capture($client, 'config.png');

$client->request('GET', $baseUrl . '/index.php/apps/gestion');
$client->waitFor('#client tbody .editable');
capture($client, 'index.png');

$client->request('GET', $baseUrl . '/index.php/apps/gestion/devis');
$client->waitFor('#devis tbody .document-actions a');
capture($client, 'devis.png');
$quotePath = $client->getCrawler()->filter('.gestion-quote-lock:not(.is-locked)')->last()->attr('href');

$client->request('GET', $baseUrl . '/index.php/apps/gestion/produit');
$client->waitFor('#produit');
$client->executeScript("if (!document.querySelector('#produit .editable[data-column=\"reference\"]')) document.getElementById('newProduit').click()");
$client->waitFor('#produit .editable[data-column="reference"]');

$client->request('GET', str_starts_with($quotePath, 'http') ? $quotePath : $baseUrl . $quotePath);
$client->waitFor('html[data-gestion-document-ready="true"]');
$client->executeScript("if (!document.querySelector('.product-reference-selector')) document.getElementById('devisAdd').click()");
$client->waitFor('.product-reference-selector');
capture($client, 'devisShow.png');

$client->executeScript("document.querySelector('.product-reference-selector').click()");
$client->waitForVisibility('#product_selector_modal');
$client->waitFor('.product-selector-option');
capture($client, 'productSelector.png');

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
capture($client, 'productSelectorMobile.png');
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

$client->manage()->window()->setSize(new WebDriverDimension(1920, 1080));
$client->executeScript("document.querySelector('.product-selector-option[aria-selected=\"true\"]').click(); document.getElementById('product_selector_confirm').click()");
$client->waitForInvisibility('#product_selector_modal');

$client->executeScript("document.querySelector('.createInvoiceFromQuote').click()");
$client->waitFor('#factureid');
$client->waitFor('html[data-gestion-document-ready="true"]');
capture($client, 'factureShow.png');

$client->request('GET', $baseUrl . '/index.php/apps/gestion/facture');
$client->waitFor('#facture tbody .document-actions a');
capture($client, 'facture.png');
$client->executeScript("document.getElementById('newInvoice').click()");
$client->waitForVisibility('#invoice_quote_selector_modal');
$client->waitFor('#invoice_quote_selector_list .product-selector-option');
capture($client, 'invoiceQuoteSelector.png');
$client->executeScript("document.querySelector('#invoice_quote_selector_modal .modalClose').click()");
$client->waitForInvisibility('#invoice_quote_selector_modal');

$client->request('GET', $baseUrl . '/index.php/apps/gestion/produit');
$client->waitFor('#produit tbody .editable');
capture($client, 'produit.png');

$client->request('GET', $baseUrl . '/index.php/apps/gestion/statistique');
$client->waitFor('#Statistical tbody tr');
capture($client, 'statistique.png');

$client->executeScript("document.getElementById('theFolder').click()");
$client->waitForVisibility('.modal-container__close');
capture($client, 'selectFolder.png');

$client->executeScript("document.getElementsByClassName('modal-container__close').item(0).click()");
$client->waitForInvisibility('.modal-container');

$client->executeScript("document.getElementById('about').click()");
$client->waitForVisibility('#modalConfig');
capture($client, 'about.png');
$client->quit();
echo "Store screenshots generated in tests/Unit/Panther/screens.\n";
