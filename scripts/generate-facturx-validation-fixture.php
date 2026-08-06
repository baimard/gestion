<?php

declare(strict_types=1);

$projectDirectory = dirname(__DIR__);

require $projectDirectory . '/vendor/autoload.php';
require $projectDirectory . '/lib/Service/ElectronicInvoiceIdentifiers.php';
require $projectDirectory . '/lib/Service/FacturXService.php';

use OCA\Gestion\Service\FacturXService;

if ($argc !== 2) {
	fwrite(STDERR, "Usage: php scripts/generate-facturx-validation-fixture.php <output.xml>\n");
	exit(2);
}

$invoice = (object)[
	'date' => '2026-08-06',
	'date_paiement' => '2026-09-06',
	'num' => 'F-2026-0001',
	'type_paiement' => '58',
	'prenom' => 'Alice',
	'nom' => 'Martin',
];
$company = (object)[
	'entreprise' => 'Gestion SAS',
	'adresse' => '1 rue de Paris',
	'zip_code' => '75001',
	'city_name' => 'Paris',
	'pays' => 'FR',
	'mail' => 'billing@gestion.example',
	'vat_number' => 'FR40303265045',
	'iban' => 'FR7630006000011234567890189',
	'legal_one' => 'SIRET: 30326504500018',
	'legal_two' => 'SIREN: 303265045',
];
$customer = (object)[
	'adresse' => '10 avenue de Lyon',
	'zip_code' => '69001',
	'city_name' => 'Lyon',
	'country_code' => 'FR',
	'mail' => 'accounting@customer.example',
	'company_identification' => '552100554',
	'vat_number' => 'FR82552100554',
];
$products = [
	(object)[
		'description' => 'Consulting service',
		'prix_unitaire' => 100,
		'quantite' => 2,
		'vat' => 20,
		'vat_category' => 'S',
	],
];

$xml = (new FacturXService())->buildXml($invoice, $company, $products, $customer);
if (file_put_contents($argv[1], $xml) === false) {
	fwrite(STDERR, "Unable to write Factur-X validation fixture to {$argv[1]}\n");
	exit(1);
}
