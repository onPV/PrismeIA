#!/bin/sh
set -e
# Assurer les droits d'exécution (runtime, important avec volumes)
chown -R www-data:www-data var
chmod -R 775 var

echo "========== Shell Environment =========="
printenv | grep APP_

echo "========== PHP getenv() APP_ENV =========="
php -r 'echo "APP_ENV=" . getenv("APP_ENV") . PHP_EOL;'
php -r 'echo "APP_DEBUG=" . getenv("APP_DEBUG") . PHP_EOL;'

echo "========== PHP $_ENV dump =========="
php -r 'print_r($_ENV);'

echo "========== Symfony migration start =========="
php bin/console doctrine:migrations:migrate --env=prod --no-interaction

echo "========== Starting services =========="
php-fpm -F &
nginx -g 'daemon off;'
