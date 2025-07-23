#!/bin/bash

echo "*****************************************************"
echo "Tentative de démarrage de l'environnement PrismeIA..."
echo "*****************************************************"

# 1. Arrêter et supprimer tous les conteneurs et volumes existants
# Ceci garantit une reconstruction propre, y compris une nouvelle base de données
echo "Arrêt et suppression des conteneurs et volumes Docker existants..."
cd docker-prismeIA/ || { echo "Erreur: Le répertoire docker-prismeIA/ n'existe pas ou n'est pas accessible."; exit 1; }
docker compose down -v

# 2. Lancer et reconstruire tous les services Docker
echo "Lancement et reconstruction des conteneurs Docker (cela peut prendre un moment la première fois)..."
docker compose up --build -d

# Attendre que les services essentiels soient prêts (spécialement la BDD et PHP-FPM)
echo "Attente que la base de données et le service PHP soient prêts..."
sleep 15 # Attendre 15 secondes. Ajuster si besoin pour votre machine.
         # Cela donne le temps aux conteneurs de démarrer complètement.

# 3. Mettre à jour le schéma de la base de données via Doctrine (pour l'environnement de développement)
# Cette commande va créer/mettre à jour les tables en fonction des entités.
# --force est utilisé car nous réinitialisons la BDD à chaque fois.
echo "Mise à jour du schéma de la base de données via Doctrine..."
docker compose exec php php bin/console doctrine:schema:update --force

# Vérifier si la commande de mise à jour du schéma a réussi
if [ $? -eq 0 ]; then
    echo "Schéma de la base de données mis à jour avec succès."
else
    echo "Erreur lors de la mise à jour du schéma de la base de données. Veuillez vérifier les logs Docker (docker compose logs php)."
    exit 1 # Quitte le script avec une erreur si la mise à jour du schéma échoue
fi

# Retourner à la racine du projet
cd ../ || exit # Retourne au répertoire parent (racine du projet)

echo "*****************************************************"
echo "Démarrage de l'environnement PrismeIA terminé."
echo "Vous pouvez vérifier l'état avec 'docker compose ps' dans le dossier docker-prismeIA."
echo "Frontend: http://localhost"
echo "API Backend: http://localhost/api/"
echo "*****************************************************"