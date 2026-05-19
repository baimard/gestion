<?php
return [
    'routes' => [
        ['name' => 'view#index', 'url' => '/', 'verb' => 'GET'],
        ['name' => 'view#devis', 'url' => '/devis', 'verb' => 'GET'],
        ['name' => 'view#facture', 'url' => '/facture', 'verb' => 'GET'],
        ['name' => 'view#produit', 'url' => '/produit', 'verb' => 'GET'],
        ['name' => 'configuration#config', 'url' => '/config', 'verb' => 'GET'],
        ['name' => 'configuration#isConfig', 'url' => '/isconfig', 'verb' => 'GET'],
        ['name' => 'view#statistique', 'url' => '/statistique', 'verb' => 'GET'],
        ['name' => 'view#legalnotice', 'url' => '/legalnotice', 'verb' => 'GET'],
        ['name' => 'view#france', 'url' => '/legalnotice/france', 'verb' => 'GET'],

        ['name' => 'client#getClients', 'url' => '/getClients', 'verb' => 'PROPFIND'],
        ['name' => 'client#getClient', 'url' => '/client', 'verb' => 'POST'],
        ['name' => 'client#getClientbyiddevis', 'url' => '/clientbyiddevis', 'verb' => 'POST'],
        ['name' => 'configuration#getConfiguration', 'url' => '/getConfiguration', 'verb' => 'PROPFIND'],
        ['name' => 'crud#update', 'url' => '/update', 'verb' => 'POST'],
        ['name' => 'configuration#updateConfiguration', 'url' => '/updateConfiguration', 'verb' => 'POST'],
        ['name' => 'client#insertClient', 'url' => '/client/insert', 'verb' => 'POST'],

        ['name' => 'devis#getDevis', 'url' => '/getDevis', 'verb' => 'PROPFIND'],
        ['name' => 'devis#devisshow', 'url' => '/devis/{numdevis}/show', 'verb' => 'GET'],
        ['name' => 'devis#insertDevis', 'url' => '/devis/insert', 'verb' => 'POST'],
        ['name' => 'devis#insertProduitDevis', 'url' => '/insertProduitDevis', 'verb' => 'POST'],

        ['name' => 'facture#getFactures', 'url' => '/getFactures', 'verb' => 'PROPFIND'],
        ['name' => 'facture#factureshow', 'url' => '/facture/{numfacture}/show', 'verb' => 'GET'],
        ['name' => 'facture#insertFacture', 'url' => '/facture/insert', 'verb' => 'POST'],
        
        // PRODUCT
        ['name' => 'produit#getProduits', 'url' => '/getProduits', 'verb' => 'PROPFIND'],
        ['name' => 'produit#getProduitsById', 'url' => '/getProduitsById', 'verb' => 'POST'],
        ['name' => 'produit#insertProduit', 'url' => '/produit/insert', 'verb' => 'POST'],

        // GLOBAL
        ['name' => 'crud#duplicate', 'url' => '/duplicate', 'verb' => 'PUT'],
        ['name' => 'crud#delete', 'url' => '/delete', 'verb' => 'DELETE'],
        ['name' => 'crud#drop', 'url' => '/drop', 'verb' => 'POST'],
        
        // STATS
        ['name' => 'stats#getStats', 'url' => '/getStats', 'verb' => 'PROPFIND'],
        ['name' => 'stats#getAnnualTurnoverPerMonthNoVat', 'url' => '/getAnnualTurnoverPerMonthNoVat', 'verb' => 'PROPFIND'],
        ['name' => 'stats#getServerFromMail', 'url' => '/getServerFromMail', 'verb' => 'PROPFIND'],
        
        // PDF
        ['name' => 'pdf#sendPDF', 'url' => '/sendPDF', 'verb' => 'POST'],
        ['name' => 'pdf#savePDF', 'url' => '/savePDF', 'verb' => 'POST'],
        
        ['name' => 'admin#backup', 'url' => '/backup', 'verb' => 'GET'],
        
        ['name' => 'company#createCompany', 'url' => '/createCompany', 'verb' => 'PUT'],
        ['name' => 'company#deleteCompany', 'url' => '/deleteCompany', 'verb' => 'DELETE'],
        ['name' => 'company#setCurrentCompany', 'url' => '/updateSession', 'verb' => 'POST'],
        ['name' => 'company#addShareUser', 'url' => '/addShareUser', 'verb' => 'POST'],
        ['name' => 'company#delShareUser', 'url' => '/delShareUser', 'verb' => 'DELETE'],

        ['name' => 'pdf#generatePDF', 'url' => '/generatePDF', 'verb' => 'POST'],

        // FACTUR-X
        ['name' => 'pdf#generateFacturX', 'url' => '/generateFacturX', 'verb' => 'POST'],
        ['name' => 'pdf#generateFacturXml', 'url' => '/generateFacturXml', 'verb' => 'POST'],
    ]
];
