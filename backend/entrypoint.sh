#!/bin/sh
set -e

# Cette commande va maintenant fonctionner grâce à la modification dans bin/console
php bin/console doctrine:migrations:migrate --no-interaction

# Démarre PHP-FPM en arrière-plan
php-fpm -F &

# Démarre Nginx au premier plan
nginx -g 'daemon off;'