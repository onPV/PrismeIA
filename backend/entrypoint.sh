#!/bin/sh
set -e

# Applique les migrations en mode production
php bin/console doctrine:migrations:migrate --env=prod --no-interaction

# Démarre les services
php-fpm -F &
nginx -g 'daemon off;'