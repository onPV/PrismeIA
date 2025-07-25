#!/bin/sh
set -e

# Applique les migrations de la base de données
php bin/console doctrine:migrations:migrate --env=prod--no-interaction

# Démarre PHP-FPM en arrière-plan
php-fpm -F &

# Démarre Nginx au premier plan
nginx -g 'daemon off;'