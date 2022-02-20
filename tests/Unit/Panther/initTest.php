<?php

use Symfony\Component\Panther\Client;
require __DIR__.'/../../../vendor/autoload.php';

$client = Client::createFirefoxClient();

$client->request('GET', 'http://next.cybercorp.fr');

$client->executeScript("document.getElementById('showAdvanced').click()");
$client->waitForVisibility('#mysql');
$client->executeScript("document.getElementById('mysql').click()");

$client->submitForm('Terminer l\'installation', [
    'adminlogin' => 'nextcloud',
    'adminpass' => 'nextcloud',
    'dbuser' => 'nextcloud',
    'dbpass' => 'nextcloud',
    'dbname' => 'nextcloud',
    'dbhost' => 'database',
    'dbtype' => 'mysql'
]);

$client = Client::createFirefoxClient();

$client->request('GET', 'http://next.cybercorp.fr/login');
$client->submitForm('submit-form', [
    'user' => 'nextcloud',
    'password' => 'nextcloud'
]);
sleep(5);
$client->executeScript("document.getElementById('firstrunwizard').getElementsByClassName('icon-close')[0].click()");
$client->request('GET', 'http://next.cybercorp.fr/settings/apps/organization');
$client->executeScript("var els = document.getElementsByClassName('app-name');for(var i = 0; i < els.length; i++){if(els[i].innerHTML.indexOf('Gestion') > -1){els[i].parentNode.getElementsByClassName('enable')[0].click()}}");