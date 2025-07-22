##

## 🗺️ Feuille de Route du Développement par Phases

##

Le développement de PrismeIA est organisé en plusieurs phases distinctes pour une approche structurée et itérative :

- **Phase 0 : Initialisation et Configuration du Projet** (En cours / Terminée)

  - Mise en place du dépôt Git.
  - Structuration des répertoires (`frontend`, `backend`, `docker`, `database`, `docs`, `nginx`).
  - Configuration de l'environnement de développement (VS Code, extensions, formatage).
  - Initialisation du frontend (Next.js, Tailwind CSS, shadcn/ui).
  - Initialisation du backend (Symfony).
  - Configuration de base de Docker.
  - Création des scripts SQL initiaux pour la base de données.

- **Phase 1 : Cœur de l'Authentification et Gestion des Utilisateurs**

  - Implémentation des API d'enregistrement, connexion (email/mdp, OAuth2).
  - Gestion des tokens JWT.
  - APIs de profil utilisateur et de crédits initiaux.
  - Pages frontend d'authentification et de profil basique.

- **Phase 2 : Génération de Contenu IA et Historique**

  - Intégration des API OpenAI (ChatGPT-4 Turbo, DALL·E).
  - APIs pour la génération de texte et d'images, déduction des crédits.
  - APIs pour l'historique des requêtes et les prompts prédéfinis.
  - Interfaces frontend pour la génération de contenu et l'historique.

- **Phase 3 : Gestion des Abonnements et Paiements**

  - Intégration de Stripe pour les abonnements et recharges de crédits.
  - Gestion des webhooks Stripe et facturation.
  - Interfaces frontend pour la gestion des abonnements et paiements.

- **Phase 4 : Back-office et Notifications**

  - APIs d'administration (gestion des utilisateurs, abonnements, prompts).
  - Implémentation des notifications email (SendGrid/Mailgun).
  - Interface d'administration pour le back-office.

- **Phase 5 : Optimisation, Sécurité et Déploiement**
  - Optimisation des performances (caching, BDD).
  - Renforcement de la sécurité (clés API, vulnérabilités).
  - Configuration Docker avancée et déploiement Kubernetes.
  - Mise en place du monitoring, logging et CI/CD.

---

##

## 🚀 PHASE 0 : Initialisation et Configuration du Projet.

##

La **Phase 0 : Initialisation et Configuration du Projet** est désormais **terminée** ! Toutes les fondations nécessaires pour démarrer le développement sont solidement en place.

### Réalisations de la Phase 0

Cette phase a couvert la mise en place de l'environnement de développement et la structure de base du projet, incluant :

1.  **Dépôt Git `PrismeIA` créé :**

    - Le dépôt distant sur GitHub est disponible à l'adresse : `https://github.com/onPV/PrismeIA.git`
    - Le dépôt local a été initialisé et lié au dépôt distant.
    - Un fichier `.gitignore` a été configuré pour exclure les fichiers non essentiels au versionnement du projet global.

2.  **Structure des Répertoires Principaux mise en place :**
    Le projet est organisé avec des dossiers dédiés pour chaque partie de l'application :

    ```
    PrismeIA/
    ├── backend/              # Code source du backend Symfony
    ├── database/             # Scripts SQL d'initialisation de la base de données
    ├── docker-prismeIA/      # Fichiers de configuration Docker Compose et Dockerfiles
    ├── docs/                 # Documentation du projet (ex: diagrammes d'architecture)
    ├── frontend/             # Code source du frontend Next.js
    └── nginx/                # Fichiers de configuration Nginx
    ```

3.  **Environnement de Développement VS Code configuré :**

    - VS Code est configuré avec le projet `PrismeIA` ouvert à sa racine.
    - Les extensions recommandées ont été installées pour une meilleure productivité : ESLint, Prettier, PHP Intelephense, Docker, GitLens, Tailwind CSS IntelliSense, et PostgreSQL.
    - Le formatage automatique du code à l'enregistrement (`format on save`) a été activé avec Prettier pour maintenir une cohérence de code.

4.  **Frontend initialisé (Next.js, Tailwind CSS, shadcn/ui) :**

    - Une application Next.js a été créée dans le dossier `frontend/src/app`, configurée avec TypeScript, Tailwind CSS et l'App Router.
    - Les composants `shadcn/ui` ont été ajoutés et configurés (`sonner` remplaçant `toast` pour les notifications).
    - Une page de démonstration complète (`frontend/src/app/demo-ui/page.tsx`) a été développée pour visualiser tous les composants graphiques majeurs de `shadcn/ui` et la palette de couleurs "Slate", offrant une référence visuelle clé pour le graphiste.

5.  **Backend initialisé (Symfony) :**

    - Un projet Symfony a été créé dans le dossier `backend/`, fournissant une base solide pour la logique métier.
    - Le fichier `.env` a été configuré pour la connexion à la base de données PostgreSQL via Docker : `DATABASE_URL="postgresql://symfony:symfony@db:5432/prisme_ia?serverVersion=16&charset=utf8"`.
    - Le serveur de développement Symfony a été testé avec succès sur `https://127.0.0.1:8000` via la `symfony CLI`.

6.  **Configuration Docker Complète (Frontend, Backend, BDD) :**
    - Les `Dockerfile.dev` spécifiques ont été créés et optimisés pour la construction des images Docker du frontend (Node.js) et du backend (PHP-FPM).
    - Le fichier `nginx/nginx.conf` a été configuré pour agir comme reverse proxy, servant le frontend et acheminant les requêtes API vers le backend.
    - Le fichier `docker-prismeIA/docker-compose.yml` orchestre désormais l'ensemble des services : `db` (PostgreSQL), `php` (Symfony), `frontend_dev` (Next.js dev server), et `nginx`.
    - Les services Docker ont été démarrés avec succès via `docker compose up --build -d` depuis le dossier `docker-prismeIA/`.
    - L'application frontend est accessible via `http://localhost` et la communication avec le backend via `http://localhost/api/` est établie (en attente de la définition des routes API dans la Phase 1).

---

##

## ➡️ PHASE 1 : Cœur de l'Authentification et Gestion des Utilisateurs

##

Maintenant que la Phase 0 est terminée et que l'environnement de développement est pleinement opérationnel avec Docker, nous sommes prêts à entamer la **Phase 1 : Cœur de l'Authentification et Gestion des Utilisateurs**.

### Détail de la Phase 1 : Cœur de l'Authentification et Gestion des Utilisateurs

Cette phase se concentrera sur la mise en place des fonctionnalités essentielles permettant aux utilisateurs de s'inscrire, de se connecter et de gérer les informations de base de leur profil, y compris leurs crédits.

**Objectifs principaux de la Phase 1 :**

1.  **Backend - Service d'Authentification (Symfony) :**

    - **Mise en place de Symfony Security :** Configuration du composant de sécurité de Symfony pour la gestion des utilisateurs, des encodeurs de mots de passe, des firewalls et des accès.
    - **Création des Entités Doctrine :** Génération des entités Doctrine (mapping objet-relationnel) pour les tables `users` et `user_profiles` dans le dossier `backend/src/Entity/`.
    - **Implémentation de l'Inscription (Registration API) :**
      - Endpoint API `POST /api/auth/register`.
      - Validation des données (email, mot de passe).
      - Hachage sécurisé des mots de passe.
      - Création d'un nouvel utilisateur dans la table `users` et son profil associé dans `user_profiles` (avec les 400 crédits initiaux pour l'essai gratuit et la date de fin d'essai).
      - Génération d'un token JWT à la fin de l'inscription pour connexion immédiate (ou renvoi vers la page de connexion).
    - **Implémentation de la Connexion (Login API) :**
      - Endpoint API `POST /api/auth/login`.
      - Authentification des utilisateurs par email/mot de passe.
      - Génération et renvoi d'un **token JWT** valide pour l'authentification des requêtes futures.
      - Gestion des erreurs d'authentification (identifiants invalides).
    - **Gestion des Tokens JWT :**
      - Installation et configuration de `lexik/jwt-authentication-bundle`.
      - Configuration de la génération et de la validation des tokens JWT pour sécuriser les routes API.
      - Implémentation de l'API de rafraîchissement de token (`POST /api/auth/refresh-token`).
    - **Implémentation du Mot de Passe Oublié/Réinitialisation :**
      - Endpoint API `POST /api/auth/forgot-password` (envoi d'un email avec un lien de réinitialisation).
      - Endpoint API `POST /api/auth/reset-password` (traitement de la réinitialisation via un token).
    - **Préparation pour l'authentification OAuth2 (Google, LinkedIn) :**
      - Intégration et configuration de `knpuniversity/oauth2-client-bundle`.
      - Définition des endpoints `GET /api/auth/login/google` et `GET /api/auth/login/linkedin` pour initier le processus OAuth. (L'intégration complète viendra plus tard).

2.  **Backend - Service Utilisateur et Abonnements (Symfony) - Partie Profil et Crédits :**

    - **Création des Entités Doctrine :** Vérification/création des entités pour `user_profiles` et `subscription_plans` (avec les données de base des plans).
    - **Implémentation de l'API de Profil Utilisateur :**
      - Endpoint API `GET /api/users/me` (récupération des informations de l'utilisateur connecté, y compris les crédits restants et le statut d'essai).
      - Endpoint API `PUT /api/users/me` (mise à jour des informations de profil de l'utilisateur).
      - Endpoint API `PUT /api/users/me/password` (changement de mot de passe sécurisé).
      - Endpoint API `PUT /api/users/me/email` (changement d'email avec mécanisme de confirmation si nécessaire).
    - **Logique de Gestion des Crédits Initiaux et d'Essai :**
      - Assignation de 400 crédits et début de la période d'essai de 7 jours lors de l'inscription.

3.  **Base de Données (PostgreSQL) :**

    - **Mise à jour des Migrations Doctrine :** Utilisation de Doctrine Migrations pour créer et appliquer les schémas de base de données pour les tables `users`, `user_profiles` et `subscription_plans`.
    - **Insertion des Données Initiales :** Insertion des plans d'abonnement de base (`subscription_plans`).

4.  **Frontend (Next.js) :**
    - **Pages d'Authentification :**
      - Développement des pages `login` et `register` (avec des formulaires stylisés par `shadcn/ui`).
      - Intégration des appels aux API d'inscription et de connexion du backend.
      - Gestion du stockage sécurisé du token JWT (par exemple, dans les cookies HTTP-Only ou local storage avec des précautions).
      - Redirection après connexion/inscription réussie vers le tableau de bord.
    - **Tableau de Bord Utilisateur (Basique) :**
      - Page `dashboard` affichant un message de bienvenue et les **crédits restants**.
      - Message incitatif à l'abonnement si l'utilisateur est en essai ou n'a plus de crédits (sans la logique de paiement pour l'instant).
    - **Page de Profil Utilisateur :**
      - Interface pour visualiser et modifier les informations du profil (`nom`, `prénom`, `email`, `mot de passe`).
      - Intégration des appels aux API de profil backend.

**Critères de Validation pour la Phase 1 :**

- Un nouvel utilisateur peut s'inscrire avec succès et se connecter.
- Un utilisateur connecté peut voir son nombre de crédits initiaux.
- Un utilisateur peut modifier les informations de son profil (nom, email, mot de passe).
- Les erreurs d'authentification (mauvais identifiants, mot de passe oublié) sont gérées correctement.
- Tous les appels API sont sécurisés par le token JWT (sauf `register`, `login`, `forgot-password`).

---
