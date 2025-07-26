#!/bin/sh
set -e

# On peut maintenant retirer le flag --env=prod, car c'est géré dans bin/console
php bin/console doctrine:migrations:migrate --no-interaction

# Démarre PHP-FPM en arrière-plan
php-fpm -F &

# Démarre Nginx au premier plan
nginx -g 'daemon off;'