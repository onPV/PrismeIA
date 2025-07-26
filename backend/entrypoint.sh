#!/bin/sh
set -e

echo "🏗️ Initialisation de l'environnement Symfony..."

# Création et permission des répertoires
mkdir -p var/cache var/log
echo "🔐 Correction des droits sur var/"
chown -R www-data:www-data var
chmod -R 775 var

# Lancement des services supervisés
echo "🚀 Lancement de PHP-FPM + Nginx"
php-fpm -D
nginx -g "daemon off;"