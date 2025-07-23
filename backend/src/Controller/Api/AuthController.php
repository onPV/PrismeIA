<?php

namespace App\Controller\Api; // CORRECTION : Namespace mis à jour ici

use App\Entity\User;
use App\Entity\UserProfile; // Importe l'entité UserProfile
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface; // Pour hacher les mots de passe
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface; // Pour la validation des données

#[Route('/api', name: 'api_')]
class AuthController extends AbstractController // CORRECTION : Nom de la classe sans "Api/"
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher,
        private ValidatorInterface $validator // Injection du service de validation
    ) {
    }

    #[Route('/auth/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // 1. Validation des données d'entrée
        if (empty($data['email']) || empty($data['password'])) {
            return $this->json([
                'message' => 'Email et mot de passe sont requis.',
                'errors' => ['email' => 'L\'email est requis.', 'password' => 'Le mot de passe est requis.']
            ], Response::HTTP_BAD_REQUEST);
        }

        $email = $data['email'];
        $plainPassword = $data['password'];

        // Vérifie si l'utilisateur existe déjà
        $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($existingUser) {
            return $this->json([
                'message' => 'Un utilisateur avec cet email existe déjà.'
            ], Response::HTTP_CONFLICT); // 409 Conflict
        }

        // 2. Création de l'entité User
        $user = new User();
        $user->setEmail($email);
        $user->setRoles(['ROLE_USER']); // Assigne le rôle par défaut

        // Hachage du mot de passe
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $plainPassword
        );
        $user->setPassword($hashedPassword);

        // Validation de l'entité User avant persistance (peut être étendu avec des contraintes)
        $errors = $this->validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return $this->json(['message' => 'Erreurs de validation de l\'utilisateur.', 'errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }


        // 3. Création de l'entité UserProfile et association
        $userProfile = new UserProfile($user); // Passe l'objet User au constructeur de UserProfile
        // Les valeurs par défaut (crédits, etc.) sont définies dans le constructeur de UserProfile

        $user->setUserProfile($userProfile); // Associe le profil à l'utilisateur

        // 4. Persistance des données
        $this->entityManager->persist($user);
        $this->entityManager->persist($userProfile); // Persiste aussi le profil
        $this->entityManager->flush();

        return $this->json([
            'message' => 'Inscription réussie !',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'credits' => $userProfile->getCredits(),
                'trialEndDate' => $userProfile->getTrialEndDate() ? $userProfile->getTrialEndDate()->format('Y-m-d H:i:s') : null,
                'status' => $userProfile->getStatus(),
            ]
        ], Response::HTTP_CREATED); // 201 Created
    }
}