#!/bin/sh
set -e

echo "🏗️ Initialisation de l'environnement Symfony..."

echo "============================================="
echo "DEBUT DU TEST DE DIAGNOSTIC NGINX"
echo "Contenu de /etc/nginx/nginx.conf DANS le conteneur :"
echo "---------------------------------------------"

# Affiche le contenu du fichier de configuration Nginx utilisé
cat /etc/nginx/nginx.conf

echo "---------------------------------------------"
echo "FIN DU CONTENU. Tentative de démarrage des services..."
echo "============================================="


# 1. Exécute les migrations pour créer la structure de la base de données
echo "Application des migrations de la base de données..."
php bin/console doctrine:migrations:migrate --env=prod --no-interaction

# 2. Ajout : Charge les données initiales de votre fichier AppFixtures.php
echo "Chargement des données initiales (fixtures)..."
php bin/console doctrine:fixtures:load --env=prod --no-interaction

# Création et permission des répertoires
mkdir -p var/cache var/log
echo "🔐 Correction des droits sur var/"
chown -R www-data:www-data var
chmod -R 775 var

# Lancement des services
echo "🚀 Lancement de PHP-FPM + Nginx"
# Note : php-fpm -F & est légèrement plus robuste que -D pour la gestion des processus
php-fpm -F &
nginx -g "daemon off;"