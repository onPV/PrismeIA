<?php

# test de santé de l'application
# https://prismeia-backend-staging.onrender.com/healthz
#
#   qui répond 200 OK si : si Le Kernel Symfony boot correctement & l’application est fonctionnelle
#   sinon 500 Internal Server Error
#endregion

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HealthzController
{
    #[Route('/healthz', name: 'healthz', methods: ['GET'])]
    public function __invoke(): Response
    {
        return new Response('OK', Response::HTTP_OK, ['Content-Type' => 'text/plain']);
    }
}

