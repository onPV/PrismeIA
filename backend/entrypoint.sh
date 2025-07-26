#!/bin/sh
set -e

echo "🏗️ Initialisation de l'environnement Symfony..."

# S'assurer que les dossiers nécessaires existent
mkdir -p var/cache var/log

# Appliquer les permissions correctes
echo "🔐 Correction des droits sur var/"
chown -R www-data:www-data var
chmod -R 775 var

# (Optionnel) Clear cache si nécessaire
# echo "♻️ Suppression du cache précédent..."
# php bin/console cache:clear --env=prod || true

# Lancer le process PHP-FPM
echo "🚀 Lancement de PHP-FPM"
exec php-fpm
