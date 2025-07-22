#!/bin/bash

# Script pour arrêter l'environnement de développement PrismeIA
clear

# Couleurs pour les messages
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "************************************************"
echo "Tentative d'arrêt de l'environnement PrismeIA..."
echo "************************************************"

# 1. Vérifier si Docker est en cours d'exécution
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Erreur : Docker ne semble pas être en cours d'exécution.${NC}"
    exit 1
fi

# 2. Se positionner dans le répertoire docker
SCRIPT_DIR=$(dirname "$0")
cd "$SCRIPT_DIR/../docker-prismeIA" || { echo -e "${RED}Erreur : Le répertoire 'docker' n'a pas été trouvé.${NC}"; exit 1; }
echo ""
echo -e "${YELLOW} -> Arrêt des conteneurs Docker et suppression des volumes...${NC}"
echo ""

# 3. Arrêter Docker Compose
docker compose down -v

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}**************************************************${NC}"
    echo -e "${GREEN}L'environnement PrismeIA a été arrêté avec succès.${NC}"
    echo -e "${GREEN}**************************************************${NC}"
    echo ""
fi