#!/bin/sh
set -e

echo "Lancement du test ultime de bin/console..."

# On exécute notre script de test
php bin/console

echo "Test de bin/console termine avec le code de sortie : $?"