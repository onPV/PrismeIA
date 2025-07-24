<?php

namespace App\DataFixtures;

use App\Entity\User; // Fix: Add missing use statement for User
use App\Entity\UserProfile;
use App\Entity\IaCategory; 
use Doctrine\Bundle\FixturesBundle\Fixture; // Fix: Add missing use statement for Fixture
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Uid\Uuid; // Pour générer les UUIDs

class AppFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {
    }

    public function load(ObjectManager $manager): void
    {
        // --- Insertion des catégories IA ---
        $categoriesData = [
            ['Communication', 'Catégorie pour la génération de contenu lié à la communication.', true],
            ['RH', 'Catégorie pour la génération de contenu lié aux ressources humaines.', true],
            ['Administration', 'Catégorie pour la génération de contenu administratif.', true],
            ['Commerce', 'Catégorie pour la génération de contenu commercial.', true],
            ['Généraliste', 'Catégorie pour les prompts généraux et divers.', true],
        ];

        foreach ($categoriesData as $data) {
            $category = new IaCategory();
            $category->setName($data[0]);
            $category->setDescription($data[1]);
            $category->setIsActive($data[2]);
            $manager->persist($category);
        }

        // --- Insertion des utilisateurs et profils ---
        $usersData = [
            [
                'email' => 'admin@prismeia.com',
                'password' => 'admin', // Le mot de passe en clair pour la fixture
                'roles' => ['ROLE_ADMIN', 'ROLE_USER'],
                'firstName' => 'Admin',
                'lastName' => 'PrismeIA',
                'phone' => '0123456789',
                'address' => '123 Rue de lAdmin',
                'city' => 'Paris',
                'zip' => '75001',
                'country' => 'France'
            ],
            [
                'email' => 'user1@prismeia.com',
                'password' => 'user1', // Le mot de passe en clair pour la fixture
                'roles' => ['ROLE_USER'],
                'firstName' => 'Utilisateur',
                'lastName' => 'Un',
                'phone' => '0987654321',
                'address' => '456 Avenue des Tests',
                'city' => 'Lyon',
                'zip' => '69002',
                'country' => 'France'
            ],
            [
                'email' => 'user2@prismeia.com',
                'password' => 'user2', // Le mot de passe en clair pour la fixture
                'roles' => ['ROLE_USER'],
                'firstName' => 'Utilisateur',
                'lastName' => 'Deux',
                'phone' => '0611223344',
                'address' => '789 Boulevard des Essais',
                'city' => 'Marseille',
                'zip' => '13008',
                'country' => 'France'
            ],
            [
                'email' => 'user3@prismeia.com',
                'password' => 'user3', // Le mot de passe en clair pour la fixture
                'roles' => ['ROLE_USER'],
                'firstName' => 'Utilisateur',
                'lastName' => 'Trois',
                'phone' => '0755667788',
                'address' => '101 Rue de la Démo',
                'city' => 'Toulouse',
                'zip' => '31000',
                'country' => 'France'
            ],
            [
                'email' => 'user4@prismeia.com',
                'password' => 'user4', // Le mot de passe en clair pour la fixture
                'roles' => ['ROLE_USER'],
                'firstName' => 'Utilisateur',
                'lastName' => 'Quatre',
                'phone' => '0499887766',
                'address' => '202 Avenue des Projets',
                'city' => 'Nice',
                'zip' => '06000',
                'country' => 'France'
            ],
        ];

        foreach ($usersData as $userData) {
            $user = new User();
            $user->setEmail($userData['email']);
            $user->setRoles($userData['roles']);
            $user->setPassword(
                $this->passwordHasher->hashPassword(
                    $user,
                    $userData['password']
                )
            );
            $manager->persist($user);

            $userProfile = new UserProfile();
            $userProfile->setOwner($user); // Lie le profil à l'utilisateur
            $userProfile->setFirstName($userData['firstName']);
            $userProfile->setLastName($userData['lastName']);
            $userProfile->setPhoneNumber($userData['phone']);
            $userProfile->setAddress($userData['address']);
            $userProfile->setCity($userData['city']);
            $userProfile->setZipCode($userData['zip']);
            $userProfile->setCountry($userData['country']);
            $manager->persist($userProfile);
        }

        $manager->flush(); // Exécute toutes les insertions en base de données
    }
}
// --- Fin de la classe AppFixtures ---