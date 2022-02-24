<?php

use Symfony\Component\Panther\Client;
require __DIR__.'/../../../vendor/autoload.php';

$client = Client::createFirefoxClient();

$client->request('GET', 'http://127.0.0.1/login');
$client->submitForm('submit-form', [
    'user' => 'nextcloud',
    'password' => 'nextcloud'
]);

sleep(5);

$client->executeScript("document.getElementById('firstrunwizard').getElementsByClassName('icon-close')[0].click()");
$client->request('GET', 'http://127.0.0.1/settings/apps/organization');
$client->executeScript("var els = document.getElementsByClassName('app-name');for(var i = 0; i < els.length; i++){if(els[i].innerHTML.indexOf('Gestion') > -1){els[i].parentNode.getElementsByClassName('enable')[0].click()}}");