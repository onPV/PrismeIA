<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250723081958 extends AbstractMigration // TON TIMESTAMP ICI
{
    public function getDescription(): string
    {
        return 'Initial migration for User and UserProfile entities'; // Ajoute une description significative
    }

    public function up(Schema $schema): void
    {
        // COPIE ET COLLE ICI LE SQL QUE TU AS FOURNI, ENCADRÉ PAR $this->addSql('');
        $this->addSql('CREATE TABLE user_profiles (user_id UUID NOT NULL, first_name VARCHAR(100) DEFAULT NULL, last_name VARCHAR(100) DEFAULT NULL, phone_number VARCHAR(20) DEFAULT NULL, address TEXT DEFAULT NULL, company_name VARCHAR(255) DEFAULT NULL, credits INT NOT NULL, trial_end_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, is_trial_used BOOLEAN NOT NULL, status VARCHAR(50) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(user_id))');
        $this->addSql('COMMENT ON COLUMN user_profiles.user_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN user_profiles.trial_end_date IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN user_profiles.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN user_profiles.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE users (id UUID NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL ON users (email)');
        $this->addSql('COMMENT ON COLUMN users.id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE user_profiles ADD CONSTRAINT FK_6BBD6130A76ED395 FOREIGN KEY (user_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        // FIN DU SQL À COLLER
    }

    public function down(Schema $schema): void
    {
        // Méthode down pour annuler les changements de la méthode up
        $this->addSql('ALTER TABLE user_profiles DROP CONSTRAINT FK_6BBD6130A76ED395');
        $this->addSql('DROP TABLE user_profiles');
        $this->addSql('DROP TABLE users');
    }
}


