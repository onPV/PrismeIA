<?php

use App\Kernel;
use Symfony\Component\HttpFoundation\Request;

require dirname(__DIR__).'/vendor/autoload.php';

// 🔐 Détection manuelle de l'environnement
$env = getenv('APP_ENV') ?: (getenv('RENDER') ? 'prod' : 'dev');
$debug = (bool)(getenv('APP_DEBUG') ?? ($env !== 'prod'));

$kernel = new Kernel($env, $debug);
$request = Request::createFromGlobals();

$response = $kernel->handle($request);
$response->send();

$kernel->terminate($request, $response);
