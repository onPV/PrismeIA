#!/bin/sh
set -e

echo "🏗️ Initialisation de l'environnement Symfony..."

# Exécute les migrations de la base de données avant tout
echo "Application des migrations de la base de données..."
php bin/console doctrine:migrations:migrate --env=prod --no-interaction


# Création et permission des répertoires
mkdir -p var/cache var/log
echo "🔐 Correction des droits sur var/"
chown -R www-data:www-data var
chmod -R 775 var

# Lancement des services supervisés
echo "🚀 Lancement de PHP-FPM + Nginx"
php-fpm -D
nginx -g "daemon off;"