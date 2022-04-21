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
       ['name' => 'page#index',                 'url' => '/', 'verb' => 'GET'],
       ['name' => 'page#devis',                 'url' => '/devis', 'verb' => 'GET'],
       ['name' => 'page#facture',               'url' => '/facture', 'verb' => 'GET'],
       ['name' => 'page#produit',               'url' => '/produit', 'verb' => 'GET'],
       ['name' => 'page#config',                'url' => '/config', 'verb' => 'GET'],
       ['name' => 'page#isConfig',              'url' => '/isconfig', 'verb' => 'GET'],
       ['name' => 'page#statistique',           'url' => '/statistique', 'verb' => 'GET'],

       ['name' => 'page#getClients',            'url' => '/getClients', 'verb' => 'PROPFIND'],
       ['name' => 'page#getClient',             'url' => '/client', 'verb' => 'POST'],
       ['name' => 'page#getClientbyiddevis',    'url' => '/clientbyiddevis', 'verb' => 'POST'],
       ['name' => 'page#getConfiguration',      'url' => '/getConfiguration', 'verb' => 'PROPFIND'],
       ['name' => 'page#update',                'url' => '/update', 'verb' => 'POST'],
       ['name' => 'page#insertClient',          'url' => '/client/insert', 'verb' => 'POST'],

       ['name' => 'page#getDevis',              'url' => '/getDevis', 'verb' => 'PROPFIND'],
       ['name' => 'page#devisshow',             'url' => '/devis/{numdevis}/show', 'verb' => 'GET'],
       ['name' => 'page#insertDevis',           'url' => '/devis/insert', 'verb' => 'POST'],
       ['name' => 'page#insertProduitDevis',    'url' => '/insertProduitDevis', 'verb' => 'POST'],

       ['name' => 'page#getFactures',           'url' => '/getFactures', 'verb' => 'PROPFIND'],
       ['name' => 'page#factureshow',           'url' => '/facture/{numfacture}/show', 'verb' => 'GET'],
       ['name' => 'page#insertFacture',         'url' => '/facture/insert', 'verb' => 'POST'],

       ['name' => 'page#getProduits',           'url' => '/getProduits', 'verb' => 'PROPFIND'],
       ['name' => 'page#getProduitsById',       'url' => '/getProduitsById', 'verb' => 'POST'],
       ['name' => 'page#insertProduit',         'url' => '/produit/insert', 'verb' => 'POST'],
       ['name' => 'page#delete',                'url' => '/delete', 'verb' => 'DELETE'],
       
       ['name' => 'page#getStats',              'url' => '/getStats', 'verb' => 'PROPFIND'],
       ['name' => 'page#getAnnualTurnoverPerMonthNoVat', 'url' => '/getAnnualTurnoverPerMonthNoVat', 'verb' => 'PROPFIND'],
       ['name' => 'page#getServerFromMail',     'url' => '/getServerFromMail', 'verb' => 'PROPFIND'],

       //PDF
       ['name' => 'page#sendPDF',               'url' => '/sendPDF', 'verb' => 'POST'],
       ['name' => 'page#savePDF',               'url' => '/savePDF', 'verb' => 'POST'],
       
       ['name' => 'admin#backup',                 'url' => '/backup', 'verb' => 'GET'],

    ]
];
