<?php

use Symfony\Component\Panther\Client;
require __DIR__.'/../../../vendor/autoload.php';

$client = Client::createFirefoxClient();
$client->request('GET', 'http://127.0.0.1');

$client->executeScript("document.getElementById('showAdvanced').click()");
$client->waitForVisibility('#pgsql');
$client->executeScript("document.getElementById('pgsql').click()");

$client->submitForm("Finish setup", [
    'adminlogin' => 'nextcloud',
    'adminpass' => 'nextcloud',
    'dbuser' => 'nextcloud',
    'dbpass' => 'nextcloud',
    'dbname' => 'nextcloud',
    'dbhost' => 'database',
    'dbtype' => 'pgsql'
]);