#!/bin/sh
set -e

echo "================================================="
echo "DEBUT DU SCRIPT ENTRYPOINT.SH - VERSION DE TEST"
echo "Si vous voyez ce message, le bon script est execute."
echo "La commande de migration qui va etre lancee est :"
echo "php bin/console doctrine:migrations:migrate --env=prod --no-interaction"
echo "================================================="

# On exécute la VRAIE commande maintenant
php bin/console doctrine:migrations:migrate --env=prod --no-interaction

echo "================================================="
echo "MIGRATION TERMINEE. Demarrage des services..."
echo "================================================="

# Démarre PHP-FPM en arrière-plan
php-fpm -F &

# Démarre Nginx au premier plan
nginx -g 'daemon off;'