#!/bin/bash

# Rendre le script robuste en se basant sur son propre emplacement
SCRIPT_DIR=$(dirname "$0")
PROJECT_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)

echo "*****************************************************"
echo "Tentative de démarrage de l'environnement PrismeIA..."
echo "*****************************************************"

# Se placer à la racine du projet pour toutes les commandes
cd "$PROJECT_ROOT" || { echo "Erreur: Le répertoire racine du projet n'a pas pu être trouvé."; exit 1; }

# Variable pour détecter l'option de réinitialisation de la BDD
RESET_DB_MIGRATIONS=false
for arg in "$@"; do
  if [ "$arg" == "-bdd" ]; then
    RESET_DB_MIGRATIONS=true
    echo "Option -bdd détectée : La base de données et les migrations seront réinitialisées."
    break
  fi
done

# 1. Arrêter les conteneurs en utilisant explicitement le fichier .env
echo "Arrêt et suppression des conteneurs et volumes Docker existants..."
docker compose --env-file .env -f docker-prismeIA/docker-compose.yml down -v

# 2. Lancer et reconstruire les conteneurs en utilisant explicitement le fichier .env
echo "Lancement et reconstruction des conteneurs Docker..."
docker compose --env-file .env -f docker-prismeIA/docker-compose.yml up --build -d

# Attendre que les services essentiels soient prêts
echo "Attente que la base de données et le service PHP soient prêts..."
sleep 15

# 3. Logique de réinitialisation des migrations
if [ "$RESET_DB_MIGRATIONS" = true ]; then
    echo "Suppression des fichiers de migration existants..."
    docker compose --env-file .env -f docker-prismeIA/docker-compose.yml exec php sh -c "rm -f /var/www/html/migrations/*.php"

    echo "Génération d'une nouvelle migration initiale..."
    docker compose --env-file .env -f docker-prismeIA/docker-compose.yml exec php php bin/console make:migration --no-interaction
    
    echo "make:migration a été exécuté."
else
    echo "Option -bdd non utilisée. Application des migrations existantes."
fi

# 4. Appliquer les migrations
echo "Application des migrations Doctrine..."
docker compose --env-file .env -f docker-prismeIA/docker-compose.yml exec php php bin/console doctrine:migrations:migrate --no-interaction
if [ $? -ne 0 ]; then
    echo "Erreur lors de l'application des migrations. Arrêt."
    exit 1
fi
echo "Migrations appliquées avec succès."

# 5. Charger les fixtures
echo "Chargement des données de test (fixtures Doctrine)..."
docker compose --env-file .env -f docker-prismeIA/docker-compose.yml exec php php bin/console doctrine:fixtures:load --no-interaction
if [ $? -ne 0 ]; then
    echo "Erreur lors du chargement des données de test. Arrêt."
    exit 1
fi
echo "Données de test chargées avec succès."

echo "*****************************************************"
echo "Démarrage de l'environnement PrismeIA terminé."
echo "Frontend: http://localhost"
echo "API Backend: http://localhost/api/"
echo "*****************************************************"