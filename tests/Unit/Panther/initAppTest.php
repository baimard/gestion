<?php

use Symfony\Component\Panther\Client;

$client = Client::createFirefoxClient();

$crawler = $client->request('GET', 'http://127.0.0.1/index.php/apps/gestion');

$form = $crawler->selectButton('Log in')->form();
$form['user'] = 'nextcloud';
$form['password'] = 'nextcloud';
$client->submit($form);

sleep(5);

$client->executeScript("document.getElementById('firstrunwizard').getElementsByClassName('header-close')[0].click()");
$client->request('GET', 'http://127.0.0.1/settings/apps/organization');
$client->executeScript("var els = document.getElementsByClassName('app-name');for(var i = 0; i < els.length; i++){if(els[i].innerHTML.indexOf('Gestion') > -1){els[i].parentNode.getElementsByClassName('enable')[0].click()}}");