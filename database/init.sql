-- database/init.sql
-- Création de l'extension uuid-ossp pour les UUIDs générés
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des utilisateurs de base (pour la connexion)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des profils utilisateurs (informations additionnelles et crédits)
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, -- Clé étrangère vers la table users
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(20),
    address TEXT,
    company_name VARCHAR(255),
    credits INTEGER DEFAULT 0,
    trial_end_date TIMESTAMP,
    is_trial_used BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des catégories d'IA
CREATE TABLE IF NOT EXISTS ia_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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