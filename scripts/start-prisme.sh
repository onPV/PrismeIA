#!/bin/bash

# Rendre le script robuste en se basant sur son propre emplacement
SCRIPT_DIR=$(dirname "$0")
PROJECT_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)

echo "*****************************************************"
echo "Tentative de démarrage de l'environnement PrismeIA..."
echo "*****************************************************"

# Variable pour détecter l'option de réinitialisation de la BDD
RESET_DB_MIGRATIONS=false

# Vérifier les arguments passés au script
for arg in "$@"; do
  if [ "$arg" == "-bdd" ]; then
    RESET_DB_MIGRATIONS=true
    echo "Option -bdd détectée : La base de données et les migrations seront réinitialisées."
    break
  fi
done

# 1. Arrêter et supprimer tous les conteneurs et volumes existants
# Ceci garantit une reconstruction propre, y compris une nouvelle base de données.
echo "Arrêt et suppression des conteneurs et volumes Docker existants..."
cd "$PROJECT_ROOT/docker-prismeIA" || { echo "Erreur: Le répertoire docker-prismeIA/ n'existe pas ou n'est pas accessible."; exit 1; }
docker compose down -v

# 2. Lancer et reconstruire tous les services Docker
echo "Lancement et reconstruction des conteneurs Docker (cela peut prendre un moment la première fois)..."
docker compose up --build -d

# Attendre que les services essentiels soient prêts (spécialement la BDD et PHP-FPM)
echo "Attente que la base de données et le service PHP soient prêts..."
sleep 15 # Attendre 15 secondes. Ajuster si besoin pour votre machine.
         # Cela donne le temps aux conteneurs de démarrer complètement.

# 3. Logique de réinitialisation des migrations si l'option -bdd est activée
if [ "$RESET_DB_MIGRATIONS" = true ]; then
    echo "Suppression des fichiers de migration existants..."
    # Supprimer tous les fichiers de migration PHP
    docker compose exec php sh -c "rm -f /var/www/html/migrations/*.php"

    echo "Génération d'une nouvelle migration initiale pour le schéma actuel..."
    # Exécuter make:migration. On ne vérifie pas son succès ici directement,
    # car il peut émettre des avertissements même en cas de succès.
    # La vérification réelle du schéma se fera avec doctrine:migrations:migrate.
    docker compose exec php php bin/console make:migration --no-interaction
    
    # Afficher un message basé sur l'intention, pas sur la sortie exacte de make:migration
    echo "make:migration a été exécuté. Si des changements ont été détectés, une nouvelle migration a été créée."
else
    echo "Option -bdd non utilisée. Application des migrations existantes."
fi

# 4. Appliquer les migrations Doctrine à la base de données
# Cette commande exécutera toutes les migrations disponibles dans le dossier 'migrations'.
echo "Application des migrations Doctrine..."
docker compose exec php php bin/console doctrine:migrations:migrate --no-interaction
 
# Vérifier si la commande de migration a réussi
if [ $? -eq 0 ]; then
    echo "Migrations appliquées avec succès."
else
    echo "Erreur lors de l'application des migrations. Veuillez vérifier les logs Docker (docker compose logs php)."
    exit 1 # Quitte le script avec une erreur si la mise à jour du schéma échoue
fi

# 5. Charger les fixtures Doctrine (données de test)
echo "Chargement des données de test (fixtures Doctrine)..."
docker compose exec php php bin/console doctrine:fixtures:load --no-interaction
    
# Vérifier si le chargement des fixtures a réussi
if [ $? -eq 0 ]; then
    echo "Données de test chargées avec succès."
else
    echo "Erreur lors du chargement des données de test. Veuillez vérifier les logs Docker (docker compose logs php)."
    exit 1 # Quitte le script avec une erreur si le chargement des fixtures échoue
fi

echo "*****************************************************"
echo "Démarrage de l'environnement PrismeIA terminé."
echo "Vous pouvez vérifier l'état avec 'docker compose ps' dans le dossier docker-prismeIA."
echo "Frontend: http://localhost"
echo "API Backend: http://localhost/api/"
echo "*****************************************************"
