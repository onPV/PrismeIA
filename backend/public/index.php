<?php

use App\Kernel;

// ----- DÉBUT DE LA MODIFICATION DE FORCE -----
// Si une variable d'environnement spécifique à Render existe, on force le mode production.
if (isset($_SERVER['RENDER_SERVICE_ID']) || getenv('RENDER_SERVICE_ID')) {
    $_SERVER['APP_ENV'] = 'prod';
    $_SERVER['APP_DEBUG'] = '0';
    $_ENV['APP_ENV'] = 'prod';
    $_ENV['APP_DEBUG'] = '0';
}
// ----- FIN DE LA MODIFICATION DE FORCE -----

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};