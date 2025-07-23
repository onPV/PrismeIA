-- database/init.sql
-- Création de l'extension uuid-ossp pour les UUIDs générés
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des catégories d'IA (NON GÉRÉE PAR DOCTRINE POUR L'INSTANT, MAIS NÉCESSAIRE)
CREATE TABLE IF NOT EXISTS ia_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP -- Type mis à jour pour cohérence
);

-- Ajout de données initiales pour les catégories d'IA
INSERT INTO ia_categories (name, description) VALUES
    ('Communication', 'Catégorie pour la génération de contenu lié à la communication.')
    ON CONFLICT (name) DO NOTHING; -- Évite les erreurs si déjà inséré
INSERT INTO ia_categories (name, description) VALUES
    ('RH', 'Catégorie pour la génération de contenu lié aux ressources humaines.')
    ON CONFLICT (name) DO NOTHING;
INSERT INTO ia_categories (name, description) VALUES
    ('Administration', 'Catégorie pour la génération de contenu administratif.')
    ON CONFLICT (name) DO NOTHING;
INSERT INTO ia_categories (name, description) VALUES
    ('Commerce', 'Catégorie pour la génération de contenu commercial.')
    ON CONFLICT (name) DO NOTHING;
INSERT INTO ia_categories (name, description) VALUES
    ('Généraliste', 'Catégorie pour les prompts généraux et divers.')
    ON CONFLICT (name) DO NOTHING;