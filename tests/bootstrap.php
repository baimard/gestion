<?php
require_once __DIR__.'/../../../lib/base.php';
require_once __DIR__ . '/../vendor/autoload.php';

if(!class_exists('\PHPUnit\Framework\TestCase')) {
	require_once('PHPUnit/Autoload.php');
}

\OC_App::loadApp('gestion');