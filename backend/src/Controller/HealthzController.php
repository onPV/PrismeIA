<?php

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
