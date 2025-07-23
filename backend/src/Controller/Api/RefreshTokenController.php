<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Gesdinet\JWTRefreshTokenBundle\Generator\RefreshTokenGeneratorInterface;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken;

#[Route('/api', name: 'api_')]
class RefreshTokenController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private RefreshTokenManagerInterface $refreshTokenManager,
        private RefreshTokenGeneratorInterface $refreshTokenGenerator,
        private JWTTokenManagerInterface $jwtManager
    ) {
    }

    #[Route('/token/refresh', name: 'api_refresh_token', methods: ['POST'])]
    public function refresh(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $refreshTokenString = $data['refresh_token'] ?? null;

        if (empty($refreshTokenString)) {
            return $this->json(['message' => 'Refresh token manquant.'], Response::HTTP_BAD_REQUEST);
        }

        // Cherche le refresh token en base de données
        $refreshToken = $this->refreshTokenManager->get($refreshTokenString);

        if (null === $refreshToken || !$refreshToken->isValid()) {
            return $this->json(['message' => 'Refresh token invalide ou expiré.'], Response::HTTP_UNAUTHORIZED);
        }

        // Récupère l'utilisateur associé au refresh token
        $username = $refreshToken->getUsername();

        // Assurez-vous que l'EntityManager est utilisé pour le repository
        $userRepository = $this->entityManager->getRepository(User::class); 

        /** @var User $user */
        $user = $userRepository->findOneBy(['email' => $username]); 

        if (null === $user) {
            return $this->json(['message' => 'Utilisateur associé au refresh token introuvable.'], Response::HTTP_UNAUTHORIZED);
        }

        // Supprime l'ancien refresh token (pour éviter la réutilisation d'un même refresh token)
        $this->refreshTokenManager->delete($refreshToken);

        // Génère un nouveau JWT
        $newJwt = $this->jwtManager->create($user);

        $validity = new \DateTime();
        $ttl = $this->getParameter('gesdinet_jwt_refresh_token.ttl');
        $validity->modify('+ ' . $ttl . ' seconds');

        $newRefreshToken = new RefreshToken();
        $newRefreshToken->setUsername($user->getUserIdentifier());
        $newRefreshToken->setRefreshToken($this->refreshTokenGenerator->createForUserWithTtl($user, $ttl));
        $newRefreshToken->setValid($validity);

        $this->refreshTokenManager->save($newRefreshToken);

        return $this->json([
            'token' => $newJwt,
            'refresh_token' => $newRefreshToken->getRefreshToken(),
        ], Response::HTTP_OK);
    }
}