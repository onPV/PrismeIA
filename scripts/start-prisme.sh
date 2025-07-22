#!/bin/bash

# Script pour démarrer l'environnement de développement PrismeIA
clear

# Couleurs pour les messages
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "*****************************************************"
echo "Tentative de démarrage de l'environnement PrismeIA..."
echo "*****************************************************"

# 1. Vérifier si Docker est en cours d'exécution
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED} -> Erreur : Docker ne semble pas être en cours d'exécution.${NC}"
    echo "    Veuillez démarrer Docker Desktop et réessayer."
    exit 1
fi

# 2. Se positionner dans le répertoire docker
# Le script est dans /scripts, donc on remonte d'un niveau et on va dans /docker
SCRIPT_DIR=$(dirname "$0")
cd "$SCRIPT_DIR/../docker-prismeIA" || { echo -e "${RED}Erreur : Le répertoire 'docker' n'a pas été trouvé.${NC}"; exit 1; }

echo ""
echo "Lancement et reconstruction des conteneurs Docker (cela peut prendre un moment la première fois)..."
echo ""

# 3. Lancer Docker Compose
docker compose up --build -d

# 4. Vérifier le statut
if [ $? -eq 0 ]; then
    echo ""
    echo "******************************************************************************"
    echo -e "${GREEN} -> L'environnement PrismeIA a été démarré avec succès !${NC}"
    echo "    L'application est accessible sur http://localhost"
    echo "******************************************************************************"
    echo ""
else
    echo "******************************************************************************"
    echo -e "${RED}Une erreur est survenue lors du lancement des conteneurs Docker.${NC}"
    echo "******************************************************************************"
    echo ""
fi