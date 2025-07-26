#!/bin/sh
set -e

echo "================================================="
echo "DEBUT DU SCRIPT DE VERIFICATION DE FICHIER"
echo "Contenu du fichier /var/www/html/bin/console :"
echo "-------------------------------------------------"

# Affiche le contenu du fichier console dans les logs
cat /var/www/html/bin/console

echo "-------------------------------------------------"
echo "FIN DU CONTENU DU FICHIER. Tentative d'execution..."
echo "================================================="

# On essaie quand même de lancer la commande pour voir l'erreur
php bin/console doctrine:migrations:migrate --no-interaction