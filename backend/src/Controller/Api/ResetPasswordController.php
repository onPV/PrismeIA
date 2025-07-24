<?php
// backend/src/Controller/Api/ResetPasswordController.php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

#[Route('/api', name: 'api_')]
class ResetPasswordController extends AbstractController
{
    public function __construct(
        private UserRepository $userRepository,
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher,
        private MailerInterface $mailer,
        private ParameterBagInterface $parameterBag,
    ) {}

    #[Route('/auth/forgot-password', name: 'auth_forgot_password', methods: ['POST'])]
    public function forgotPassword(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;

        if (!$email) {
            return new JsonResponse(['message' => 'Email est requis.'], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->userRepository->findOneBy(['email' => $email]);

        // Pour des raisons de sécurité, ne pas indiquer si l'email existe ou non.
        // Toujours renvoyer un succès pour éviter l'énumération des utilisateurs.
        if (!$user) {
            return new JsonResponse(['message' => 'Si un compte avec cet email existe, un lien de réinitialisation a été envoyé.'], Response::HTTP_OK);
        }

        // Générer un token unique
        $token = Uuid::v4()->toRfc4122();
        $user->setResetPasswordToken($token);
        // Définir une expiration (ex: 1 heure)
        $user->setResetPasswordTokenExpiresAt(new \DateTimeImmutable('+1 hour'));
        $this->entityManager->flush();

        // Envoyer l'email de réinitialisation
        try {
            // IMPORTANT : Remplacez 'https://mapp-frontend-staging.onrender.com' par l'URL réelle de votre frontend sur Render.
            $frontendBaseUrl = $this->parameterBag->get('app.frontend_base_url');
            $resetUrl = $frontendBaseUrl . '/auth/reset-password/' . $token;

            $emailMessage = (new TemplatedEmail())
                ->from('no-reply@onparticipe.fr') // Remplacez par votre adresse d'envoi réelle
                ->to($user->getEmail())
                ->subject('Réinitialisation de votre mot de passe PrismeIA')
                ->htmlTemplate('emails/reset_password.html.twig') // Chemin vers le template Twig
                ->context([
                    'resetUrl' => $resetUrl,
                    'user' => $user,
                ]);

            $this->mailer->send($emailMessage);

        } catch (\Exception $e) {
            error_log('Erreur lors de l\'envoi de l\'email de réinitialisation: ' . $e->getMessage());
            // En production, vous pouvez logguer l'erreur mais renvoyer un succès pour la sécurité.
        }

        return new JsonResponse(['message' => 'Si un compte avec cet email existe, un lien de réinitialisation a été envoyé.'], Response::HTTP_OK);
    }

    #[Route('/auth/reset-password/{token}', name: 'auth_reset_password', methods: ['POST'])]
    public function resetPassword(Request $request, string $token): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $newPassword = $data['newPassword'] ?? null;

        if (!$newPassword) {
            return new JsonResponse(['message' => 'Un nouveau mot de passe est requis.'], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->userRepository->findOneBy(['resetPasswordToken' => $token]);

        if (!$user || $user->getResetPasswordTokenExpiresAt() < new \DateTimeImmutable()) {
            return new JsonResponse(['message' => 'Lien invalide ou expiré.'], Response::HTTP_BAD_REQUEST);
        }

        // Mettre à jour le mot de passe
        $hashedPassword = $this->passwordHasher->hashPassword($user, $newPassword);
        $user->setPassword($hashedPassword);
        // Invalider le token après utilisation
        $user->setResetPasswordToken(null);
        $user->setResetPasswordTokenExpiresAt(null);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Votre mot de passe a été réinitialisé avec succès.'], Response::HTTP_OK);
    }
}