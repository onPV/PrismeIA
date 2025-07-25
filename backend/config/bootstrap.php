<?php

use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__).'/vendor/autoload.php';

// Charge le .env uniquement si APP_ENV n'est pas 'prod'
if (!isset($_SERVER['APP_ENV']) || $_SERVER['APP_ENV'] !== 'prod') {
    if (class_exists(Dotenv::class) && file_exists(dirname(__DIR__).'/.env')) {
        (new Dotenv())->bootEnv(dirname(__DIR__).'/.env');
    }
}