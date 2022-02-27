<?php

use Symfony\Component\Panther\Client;
require __DIR__.'/../../../vendor/autoload.php';

$client = Client::createFirefoxClient();
$client->request('GET', 'http://127.0.0.1');

$client->executeScript("document.getElementById('showAdvanced').click()");
$client->waitForVisibility('#mysql');
$client->executeScript("document.getElementById('mysql').click()");

$client->submitForm("Finish setup", [
    'adminlogin' => 'nextcloud',
    'adminpass' => 'nextcloud',
    'dbuser' => 'nextcloud',
    'dbpass' => 'nextcloud',
    'dbname' => 'nextcloud',
    'dbhost' => 'database',
    'dbtype' => 'mysql'
]);