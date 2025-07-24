-- Fichier d'initialisation de la base de données pour PrismeIA

-- Création de l'extension uuid-ossp si elle n'existe pas
-- Nécessaire pour gen_random_uuid() si vous utilisez une version de PostgreSQL plus ancienne
-- ou si elle n'est pas activée par défaut.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Toutes les instructions de création de schéma (CREATE TABLE, INDEX, ALTER TABLE)
-- et d'insertion de données (INSERT) ont été retirées de ce fichier.
-- Elles sont désormais gérées par Doctrine Migrations (pour le schéma)
-- et Doctrine Fixtures (pour les données de test).