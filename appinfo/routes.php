<?php
/**
 * Create your routes in here. The name is the lowercase name of the controller
 * without the controller part, the stuff after the hash is the method.
 * e.g. page#index -> OCA\Gestion\Controller\PageController->index()
 *
 * The controller class has to be registered in the application.php file since
 * it's instantiated in there
 */
return [
    'routes' => [
	   ['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
       ['name' => 'page#clientcreate', 'url' => '/client/create', 'verb' => 'GET'],
       ['name' => 'page#devis', 'url' => '/devis', 'verb' => 'GET'],
       ['name' => 'page#devisshow', 'url' => '/devis/{numdevis}/show', 'verb' => 'GET'],
       ['name' => 'page#facture', 'url' => '/facture', 'verb' => 'GET'],
       ['name' => 'page#produit', 'url' => '/produit', 'verb' => 'GET'],
	   ['name' => 'page#getClients', 'url' => '/getClients', 'verb' => 'PROPFIND'],
       ['name' => 'page#getDevis', 'url' => '/getDevis', 'verb' => 'PROPFIND'],
       ['name' => 'page#getFactures', 'url' => '/getFactures', 'verb' => 'PROPFIND'],
       ['name' => 'page#getProduits', 'url' => '/getProduits', 'verb' => 'PROPFIND'],
       ['name' => 'page#insertClient', 'url' => '/client/insert', 'verb' => 'POST'],
       ['name' => 'page#insertDevis', 'url' => '/devis/insert', 'verb' => 'POST'],
       ['name' => 'page#updateClient', 'url' => '/client/update', 'verb' => 'POST'],
    ]
];
