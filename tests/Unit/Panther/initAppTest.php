<?php

use Symfony\Component\Panther\Client;
require __DIR__.'/../../../vendor/autoload.php';

$baseUrl = rtrim(getenv('NEXTCLOUD_BASE_URL') ?: 'http://127.0.0.1:8080', '/');
$username = getenv('NEXTCLOUD_TEST_USER');
$password = getenv('NEXTCLOUD_TEST_PASSWORD');
if (!$username || !$password) {
    throw new RuntimeException('Set NEXTCLOUD_TEST_USER and NEXTCLOUD_TEST_PASSWORD for a disposable Nextcloud test account.');
}

$client = Client::createFirefoxClient();

$crawler = $client->request('GET', $baseUrl . '/index.php/apps/gestion');

$form = $crawler->selectButton('Log in')->form();
$form['user'] = $username;
$form['password'] = $password;
$client->submit($form);

sleep(5);

$client->executeScript("document.getElementById('firstrunwizard').getElementsByClassName('header-close')[0].click()");
$client->request('GET', $baseUrl . '/settings/apps/organization');
$client->executeScript("var els = document.getElementsByClassName('app-name');for(var i = 0; i < els.length; i++){if(els[i].innerHTML.indexOf('Gestion') > -1){els[i].parentNode.getElementsByClassName('enable')[0].click()}}");