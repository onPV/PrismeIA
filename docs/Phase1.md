# Phase 1 : Mise en Place de l'Authentification et du Profil Utilisateur

**Objectif :** Construire le socle de l'application avec un système d'authentification robuste (inscription, connexion, mot de passe oublié) et une gestion de profil utilisateur basique.

---

## Étapes de la Phase 1

1.1. **Configuration Initiale de l'Environnement de Développement (Terminée) :**
_ Installation et configuration de Docker et Docker Compose.
_ Mise en place des services : Nginx, PHP-FPM, PostgreSQL, et Next.js (Node.js). \* Création de la structure des dossiers `backend` (Symfony) et `frontend` (Next.js).

1.2. **Initialisation des Projets Symfony et Next.js (Terminée) :**
_ Création des projets de base pour Symfony et Next.js.
_ Configuration du proxy Nginx pour rediriger les appels `/api` vers le backend Symfony. \* Mise en place des scripts `start-prisme.sh` et `stop-prisme.sh` pour une gestion simplifiée de l'environnement.

1.3. **Mise en Place de l'Authentification JWT (JSON Web Tokens) (Terminée) :**
_ Installation et configuration du bundle `lexik/jwt-authentication-bundle`.
_ Création de l'entité `User` et `UserProfile`.
_ Développement de l'endpoint API `POST /api/auth/register` pour l'inscription.
_ Développement de l'endpoint API `POST /api/auth/login` pour la connexion (récupération du token JWT).
_ Implémentation du endpoint `POST /api/token/refresh` pour le rafraîchissement des tokens.
_ Sécurisation des routes API nécessitant une authentification.

1.4. **Gestion du Profil Utilisateur (Terminée) :**
_ Création des endpoints API pour la gestion du profil :
_ `GET /api/profile` pour récupérer les informations de l'utilisateur connecté.
_ `PUT /api/profile` pour mettre à jour les informations.
_ Développement des pages frontend correspondantes pour afficher et modifier le profil.

1.5. **Implémentation du Mot de Passe Oublié/Réinitialisation (Terminée) :**
_ Ajout des champs `resetPasswordToken` et `resetPasswordTokenExpiresAt` à l'entité `User`.
_ Implémentation des endpoints API :
_ `POST /api/auth/forgot-password` pour l'envoi d'un email avec un lien de réinitialisation.
_ `POST /api/auth/reset-password/{token}` pour le traitement de la réinitialisation.
_ Intégration de `symfony/mailer` pour l'envoi d'emails via un template Twig.
_ Configuration des variables d'environnement (`MAILER_DSN`, `APP_FRONTEND_URL`) pour le développement local et la production. \* Création des pages frontend (`/auth/forgot-password` et `/auth/reset-password/[token]`) et de la page de confirmation d'envoi d'email.
_ **Configuration de l'envoi d'emails (Terminée) :**
_ Installation et configuration de `symfony/mailer`.
_ Mise en place de **Mailtrap** comme service SMTP pour l'environnement de développement local.
_ Validation du bon envoi des emails de réinitialisation via l'inbox Mailtrap depuis l'environnement Docker.

1.6. **Préparation pour l'authentification OAuth2 (Google, LinkedIn) (Reportée) :** \* _Cette étape est reportée à une phase ultérieure pour se concentrer sur les fonctionnalités principales._

1.7. **Déploiement Initial sur Render (Base de Données + Backend) (Terminée)**
_ **Base de Données :** Création d'un service **PostgreSQL managé** sur le plan gratuit de Render pour l'environnement de staging.
_ **Backend :** Création d'un **Web Service** sur Render pour déployer le conteneur Docker du backend (`Dockerfile.prod`).
_ **Configuration des variables d'environnement** sur Render, incluant `DATABASE_URL`, `APP_ENV=prod`, `APP_DEBUG=0`, `MAILER_DSN` pour la production, et les clés JWT.
_ **Résolution des problèmes de déploiement :**
_ **Problème initial :** L'application ne démarrait pas, levant une erreur `Unable to read .env file` car elle se lançait en mode `dev` au lieu de `prod`.
_ **Diagnostics effectués :**
_ Confirmation via `printenv` que les variables d'environnement étaient bien présentes dans le conteneur.
_ Confirmation via `cat` que les derniers fichiers (`entrypoint.sh`, `bin/console`) étaient bien utilisés lors du déploiement.
_ **Cause finale identifiée :** Le processus `php` en ligne de commande, lancé depuis le script `entrypoint.sh`, n'héritait pas correctement des variables d'environnement du shell parent dans l'environnement d'exécution de Render.
_ **Solution finale implémentée :** Remplacement de l'appel direct à `php bin/console doctrine:migrations:migrate` par un script PHP dédié (`run_migrations.php`). Ce script force l'environnement en `prod` puis exécute la commande de migration de manière programmatique, contournant ainsi le problème de transmission des variables. \* **Statut :** Le service backend est maintenant **déployé avec succès**, les migrations de la base de données sont appliquées, et l'application répond correctement aux health checks (ex: `/healthz`).

---

## Critères de Validation pour la Phase 1

- **[✓]** Un nouvel utilisateur peut s'inscrire avec succès et se connecter.
- **[✓]** Les erreurs d'authentification (mauvais identifiants) sont gérées correctement.
- **[✓]** Un utilisateur peut demander la réinitialisation de son mot de passe, recevoir un email, et réinitialiser son mot de passe avec succès via le lien fourni.
- **[✓]** Un utilisateur connecté peut consulter et mettre à jour les informations de son profil (nom, email, mot de passe).
- **[✓]** Toutes les routes API sensibles (comme `/api/profile`) sont bien protégées par le token JWT et inaccessibles sans authentification valide.
- **[✓]** Les tokens JWT peuvent être rafraîchis pour maintenir la session de l'utilisateur active.
- **[✓]** L'environnement de développement Docker est stable et les scripts de gestion fonctionnent comme prévu.
- **[✓]** La base de données est déployée et accessible sur Render.
- **[✓]** Le service backend est déployé sur Render, démarre sans erreur et répond aux requêtes.
- **[ ]** Le service frontend est déployé et communique correctement avec le backend via le système de proxy de Render.
- **[ ]** Un utilisateur peut s'inscrire et se connecter sur l'environnement de production.

---

---

---

➡️ PHASE 1 : Cœur de l'Authentification et Gestion des Utilisateurs
Détail de la Phase 1 : Cœur de l'Authentification et Gestion des Utilisateurs
Cette phase se concentrera sur la mise en place des fonctionnalités essentielles permettant aux utilisateurs de s'inscrire, de se connecter et de gérer les informations de base de leur profil, y compris leurs crédits.

Objectifs principaux de la Phase 1 :
Backend - Service d'Authentification (Symfony) :

1.1. Mise en place de Symfony Security et Création des Entités Doctrine (Terminée) :
Configuration de symfony/security-bundle et symfony/uid.
Configuration de Doctrine pour les types UUID dans doctrine.yaml.
Création des entités User et UserProfile (avec owner et #[MapsId]).
Génération et application réussie d'une migration Doctrine unique pour les tables users et user_profiles après résolution des problèmes d'historique et de init.sql.

1.2. Implémentation de l'Inscription (Registration API) (Terminée et Validée) :
Création du contrôleur Api/AuthController avec l'endpoint POST /api/auth/register.
Implémentation de la logique de validation, hachage du mot de passe, création et persistance des entités User et UserProfile.
Résolution des problèmes clés rencontrés :

- Erreurs de syntaxe PHP dues à des copier-coller.
- Problèmes de routage Nginx (requêtes /api/ envoyées au frontend Next.js).
- Erreurs ClassNotFoundError (LexikJWTAuthenticationBundle introuvable) dues à des problèmes de cache Composer/Symfony dans le build Docker.
- Problèmes persistants de synchronisation de base de données et de migrations Doctrine (table users ou ia_categories inexistante, contraintes manquantes), résolus par une réinitialisation complète et l'automatisation de doctrine:schema:update --force via start-prisme.sh.
  Tests avec REST Client sous VS Code validés pour les scénarios de succès (201 Created), email déjà utilisé (409 Conflict), et données manquantes (400 Bad Request).

  1.3. Implémentation de la Connexion (Login API) (Terminée et Validée) :
  Endpoint API POST /api/auth/login implémenté et validé.
  Authentification des utilisateurs par email/mot de passe fonctionnelle.
  Génération et renvoi d'un token JWT valide et d'un refresh token en cas de succès.
  Gestion des erreurs d'authentification (identifiants invalides) validée.

  1.4. Gestion des Tokens JWT (Sécurisation des Routes et Rafraîchissement) (Terminée et Validée) :
  Installation et configuration réussie de lexik/jwt-authentication-bundle et gesdinet/jwt-refresh-token-bundle.
  Protection des routes API via JWT validée (IS_AUTHENTICATED_FULLY).
  Implémentation et validation de l'API de rafraîchissement de token (POST /api/token/refresh) via un contrôleur personnalisé (App\Controller\Api\RefreshTokenController).
  Le rafraîchissement des tokens fonctionne et émet de nouveaux JWT.

  1.5. Implémentation du Mot de Passe Oublié/Réinitialisation (Terminée et Validée) :
  Backend :
  Ajout des champs resetPasswordToken et resetPasswordTokenExpiresAt à l'entité User.
  Création du contrôleur Api/ResetPasswordController avec l'endpoint POST /api/auth/forgot-password (envoi d'un email avec un lien de réinitialisation) et POST /api/auth/reset-password/{token} (traitement de la réinitialisation via un token unique et à durée limitée).
  Installation de symfony/mailer et symfony/twig-bundle pour la génération d'emails HTML via des templates Twig (emails/reset_password.html.twig).
  Utilisation d'une variable d'environnement APP_FRONTEND_URL pour générer dynamiquement les liens de réinitialisation (local vs. déploiement).
  Frontend (Next.js App Router) :
  Développement de la page frontend/src/app/auth/forgot-password/page.tsx pour la demande de réinitialisation.
  Développement de la page frontend/src/app/auth/reset-password/[token]/page.tsx pour la réinitialisation effective du mot de passe (route dynamique).
  Ajout d'un lien "Mot de passe oublié ?" sur la page de connexion.
  Création d'une page d'accueil (frontend/src/app/page.tsx) pour la redirection post-connexion/réinitialisation, affichant l'email de l'utilisateur et un bouton de déconnexion.
  Résolution des problèmes clés rencontrés lors de l'implémentation de la 1.5 :

- Undefined type 'App\\Entity\\IaCategory' : Résolu par la création de l'entité IaCategory et son dépôt, ainsi que l'installation et la configuration de StofDoctrineExtensionsBundle pour les champs Timestampable.
- Undefined method 'setCity' (et similaires) dans AppFixtures : Résolu par l'ajout des propriétés et méthodes correspondantes (city, zipCode, country) dans l'entité UserProfile.
- You must configure a "Symfony\Component\Mime\BodyRendererInterface" : Résolu par l'installation de symfony/twig-bundle et la suppression de configurations manuelles conflictuelles dans services.yaml.
- Connection could not be established with host "ssl://null:465" : Résolu par la définition correcte de MAILER_DSN dans backend/Dockerfile.dev (après avoir vérifié qu'il n'était pas lu depuis docker-compose.yml ou .env).
- Failed to authenticate on SMTP server : Résolu par la correction des identifiants (mot de passe) Mailtrap dans le MAILER_DSN du Dockerfile.dev.
- 404 sur la route dynamique frontend (/auth/reset-password/[token]) : Résolu par la correction de la structure de dossier Next.js ([token]/page.tsx avec les crochets) et la configuration Nginx pour proxyfier correctement les routes non-API vers le frontend.
- Tables users ou ia_categories vides/manquantes après démarrage : Résolu par la refonte du script start-prisme.sh (ajout de l'option -bdd pour une réinitialisation complète), la minimalisation de init.sql (ne contenant que la création d'extension et les INSERT de données), et l'utilisation de Doctrine Fixtures (AppFixtures.php) pour l'insertion des données de test (avec hachage des mots de passe).
  -Undefined property '$parameterBag' dans ResetPasswordController : Résolu par la déclaration explicite de la propriété $parameterBag avant le constructeur du contrôleur.
- Avertissements WARN[0000] The "JWT\_..." variable is not set. : Résolu par la définition des variables JWT directement dans docker-prismeIA/.env pour être lues par Docker Compose.
- Lien de réinitialisation pointant vers Render en local : Résolu par l'utilisation d'une variable d'environnement APP_FRONTEND_URL (définie dans backend/.env.dev pour http://localhost et sur Render pour l'URL déployée) et son injection dans ResetPasswordController.

  1.6. Préparation pour l'authentification OAuth2 (Google, LinkedIn) :
  Intégration et configuration de knpuniversity/oauth2-client-bundle.
  Définition des endpoints GET /api/auth/login/google et GET /api/auth/login/linkedin pour initier le processus OAuth. (L'intégration complète viendra plus tard).

* _Cette étape est reportée à une phase ultérieure pour se concentrer sur les fonctionnalités principales._

Backend - Service Utilisateur et Abonnements (Symfony) - Partie Profil et Crédits :
2.1. Création des Entités Doctrine :
Vérification/création des entités pour user_profiles et subscription_plans (avec les données de base des plans).

2.2. Implémentation de l'API de Profil Utilisateur :
Endpoint API GET /api/users/me (récupération des informations de l'utilisateur connecté, y compris les crédits restants et le statut d'essai).
Endpoint API PUT /api/users/me (mise à jour des informations de profil de l'utilisateur).
Endpoint API PUT /api/users/me/password (changement de mot de passe sécurisé).
Endpoint API PUT /api/users/me/email (changement d'email avec mécanisme de confirmation si nécessaire).

2.3. Logique de Gestion des Crédits Initiaux et d'Essai :
Assignation de 400 crédits et début de la période d'essai de 7 jours lors de l'inscription.

Base de Données (PostgreSQL) :
3.1. Mise à jour des Migrations Doctrine :
Utilisation de Doctrine Migrations pour créer et appliquer les schémas de base de données pour les tables users, user_profiles et subscription_plans.

3.2. Insertion des Données Initiales :
Insertion des plans d'abonnement de base (subscription_plans).
Les données de test pour les utilisateurs et catégories IA sont maintenant gérées par Doctrine Fixtures (AppFixtures.php).

Frontend (Next.js) :
4.1. Pages d'Authentification :
Développement des pages login et register (avec des formulaires stylisés par shadcn/ui).
Intégration des appels aux API d'inscription et de connexion du backend.
Gestion du stockage sécurisé du token JWT (par exemple, dans les cookies HTTP-Only ou local storage avec des précautions).
Redirection après connexion/inscription réussie vers le tableau de bord (/).

4.2. Tableau de Bord Utilisateur (Basique) :
Page dashboard affichant un message de bienvenue et les crédits restants.
Message incitatif à l'abonnement si l'utilisateur est en essai ou n'a plus de crédits (sans la logique de paiement pour l'instant).

4.3. Page de Profil Utilisateur :
Interface pour visualiser et modifier les informations du profil (nom, prénom, email, mot de passe).

Intégration des appels aux API de profil backend.
Critères de Validation pour la Phase 1 :
Un nouvel utilisateur peut s'inscrire avec succès et se connecter.
Un utilisateur connecté peut voir son nombre de crédits initiaux.
Un utilisateur peut modifier les informations de son profil (nom, email, mot de passe).
Les erreurs d'authentification (mauvais identifiants, mot de passe oublié) sont gérées correctement.
Un utilisateur peut demander la réinitialisation de son mot de passe via email et le réinitialiser avec succès via le lien reçu.
Tous les appels API sont sécurisés par le token JWT (sauf register, login, forgot-password, reset-password, et token/refresh).

---

---

---

### 1.1. Backend - Mise en place de Symfony Security et Création des Entités Doctrine

Cette sous-phase est fondamentale pour la sécurité de ton application et la structure de tes données utilisateurs.

**Objectifs de cette étape :**

- Installation des composants de sécurité de Symfony (`symfony/security-bundle`).
- Vérification de l'installation de Doctrine ORM (`symfony/orm-pack`).
- Configuration de Doctrine pour la gestion des identifiants universels uniques (UUIDs).
- Génération des entités Doctrine pour les tables `users` et `user_profiles`, en s'assurant qu'elles utilisent des UUIDs et sont correctement liées par une relation `OneToOne`.

#### Instructions Détaillées :

1.  **Installation des Composants Symfony :**

    - Assurez-vous d'être dans le répertoire `backend/` de votre projet.
    - Installez le bundle de sécurité de Symfony :
      ```bash
      composer require symfony/security-bundle
      ```
    - Vérifiez que Doctrine ORM est bien installé (normalement déjà présent avec `symfony/skeleton`) :
      ```bash
      composer require symfony/orm-pack
      ```
    - Installez le composant Symfony UID pour la gestion des UUIDs :
      ```bash
      composer require symfony/uid
      ```

2.  **Configuration de Doctrine pour les UUIDs :**

    - Ouvrez le fichier `backend/config/packages/doctrine.yaml`.
    - Modifiez ou ajoutez la section `dbal` pour inclure la configuration des types UUID :

      ```yaml
      # backend/config/packages/doctrine.yaml

      doctrine:
        dbal:
          url: "%env(resolve:DATABASE_URL)%"
          types:
            uuid: Symfony\Bridge\Doctrine\Types\UuidType
          mapping_types:
            uuid: uuid
        orm:
          auto_generate_proxy_classes: true
          naming_strategy: doctrine.orm.naming_strategy.underscore_nonescaped
          auto_mapping: true
          mappings:
            App:
              is_bundle: false
              type: attribute
              dir: "%kernel.project_dir%/src/Entity"
              prefix: 'App\Entity'
              alias: App
      ```

    - Enregistrez le fichier.

3.  **Génération des Entités Doctrine (`User` et `UserProfile`) :**

            a. **Création de l'entité `User` :**
            _ Exécutez l'assistant de création d'utilisateur :
            `bash

        php bin/console make:user
        `    _ Répondez aux questions comme suit :

    _ **The name of the User entity class:**`User` _ **Do you want to store user data in your database (via Doctrine)?**`yes` _ **Enter a property name for your username:**`email` _ **Do you want to hash passwords using bcrypt?**`yes`\* **Do you want to add a`roles`field to your User entity?**`yes`

            b. **Modification de l'entité `User` pour utiliser un UUID comme ID :**
            _ Ouvrez `backend/src/Entity/User.php`.
            _ Remplacez la propriété `$id` et ses annotations par :

            ````php
            // backend/src/Entity/User.php (extrait)

                    use Doctrine\ORM\Mapping as ORM;
                    use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;

                    #[ORM\Entity(repositoryClass: UserRepository::class)]
                    #[ORM\Table(name: 'users')]
                    class User implements UserInterface, PasswordAuthenticatedUserInterface
                    {
                        #[ORM\Id]
                        #[ORM\Column(type: 'uuid', unique: true)]
                        #[ORM\GeneratedValue(strategy: 'CUSTOM')]
                        #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
                        private ?string $id = null;

                        // ... (le reste de la classe User)
                    }
                    ```
                * Enregistrez le fichier.

            c. **Création de l'entité `UserProfile` :**
            _ Exécutez l'assistant de création d'entité :
            `bash
                php bin/console make:entity UserProfile
                `
            _ Répondez aux questions comme suit pour les champs :
            _ `first_name` (`string`, `100`, nullable `yes`)
            _ `last_name` (`string`, `100`, nullable `yes`)
            _ `phone_number` (`string`, `20`, nullable `yes`)
            _ `address` (`text`, nullable `yes`)
            _ `company_name` (`string`, `255`, nullable `yes`)
            _ `credits` (`integer`, nullable `no`, default `400`)
            _ `trial_end_date` (`datetime_immutable`, nullable `yes`)
            _ `is_trial_used` (`boolean`, nullable `no`, default `false`)
            _ `status` (`string`, `50`, nullable `no`, default `'active'`)
            _ `created_at` (`datetime_immutable`, nullable `no`, default `CURRENT_TIMESTAMP`) \* `updated_at` (`datetime_immutable`, nullable `no`, default `CURRENT_TIMESTAMP`)

                * Pour la relation `OneToOne` avec `User` :
                    * **New field name:** `user`
                    * **Field type:** `ManyToOne` (oui, choisissez `ManyToOne` ici pour démarrer la relation)
                    * **What entity does this field reference?** `User`
                    * **Is the `User.userProfiles` property allowed to be null?** `no`
                    * **Do you want to add a new property to `App\Entity\User` for the other side of the relationship?** `yes`
                    * **Change its name?** `userProfile` (au singulier)
                    * **What type of relationship is this?** `OneToOne`
                    * **Is `App\Entity\UserProfile.user` allowed to be null?** `no`

            d. **Ajustement de l'ID de `UserProfile` et de son constructeur :**
            _ Ouvrez `backend/src/Entity/UserProfile.php`.
            _ Remplacez la propriété `$id` et son constructeur par le code suivant pour lier l'ID du profil à celui de l'utilisateur et initialiser les valeurs par défaut :
            ```php
            // backend/src/Entity/UserProfile.php (extrait)

                    use Doctrine\ORM\Mapping as ORM;
                    use App\Entity\User; // N'oubliez pas l'import de User

                    #[ORM\Entity(repositoryClass: UserProfileRepository::class)]
                    #[ORM\Table(name: 'user_profiles')]
                    class UserProfile
                    {
                        #[ORM\Id]
                        #[ORM\Column(type: 'uuid', unique: true)]
                        private ?string $id = null;

                        #[ORM\OneToOne(targetEntity: User::class, inversedBy: 'userProfile', cascade: ['persist', 'remove'])]
                        #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id', nullable: false, unique: true)]
                        private ?User $user = null;

                        // ... (autres propriétés)

                        public function __construct(User $user)
                        {
                            $this->user = $user;
                            $this->id = $user->getId();
                            $this->credits = 400;
                            $this->isTrialUsed = false;
                            $this->status = 'active';
                            $this->createdAt = new \DateTimeImmutable();
                            $this->updatedAt = new \DateTimeImmutable();
                        }

                        // ... (getters et setters, y compris getId() et setUser())
                    }
                    ```
                * Assurez-vous que la méthode `setUser` dans `UserProfile.php` met également à jour l'ID du profil si l'utilisateur est défini :
                    ```php
                    public function setUser(?User $user): static
                    {
                        $this->user = $user;
                        if ($user !== null) {
                            $this->id = $user->getId();
                        } else {
                            $this->id = null;
                        }
                        return $this;
                    }
                    ```
                * Enregistrez les fichiers `backend/src/Entity/User.php` et `backend/src/Entity/UserProfile.php`.

            ````

4.  **Mise à Jour du Schéma de la Base de Données (Migrations Doctrine) :**
    - Assurez-vous que vos conteneurs Docker (en particulier `prismeia_db`) sont démarrés (`docker compose up -d` depuis `docker-prismeIA/`).
    - Générez une nouvelle migration Doctrine pour créer les tables basées sur vos entités :
      ```bash
      cd backend
      php bin/console make:migration
      ```
    - Appliquez la migration à votre base de données :
      ```bash
      php bin/console doctrine:migrations:migrate
      ```
      Confirmez en tapant `yes`.

#### Critères de Validation pour l'Étape 1.1 :

- Le bundle `symfony/security-bundle` est installé.
- Le composant `symfony/uid` est installé.
- Le fichier `backend/config/packages/doctrine.yaml` a été mis à jour avec le type UUID.
- Les entités `backend/src/Entity/User.php` et `backend/src/Entity/UserProfile.php` sont créées, utilisent des UUIDs, et ont une relation `OneToOne` correcte.
- Une nouvelle migration Doctrine a été générée avec succès.
- La migration a été appliquée avec succès à votre base de données PostgreSQL, créant les tables `users` et `user_profiles` avec les colonnes et relations définies.

---

---

---

### 1.2. Implémentation de l'Inscription (Registration API)

Cette sous-phase est dédiée à la création de l'API permettant aux nouveaux utilisateurs de s'inscrire sur la plateforme PrismeIA.

**Objectifs de cette étape :**

- Créer un contrôleur API dédié à l'authentification (`AuthController`).
- Implémenter l'endpoint `POST /api/auth/register`.
- Gérer la validation des données d'entrée (email, mot de passe).
- Assurer le hachage sécurisé du mot de passe de l'utilisateur.
- Créer une nouvelle entité `User` et son `UserProfile` associé (avec les 400 crédits initiaux pour l'essai gratuit et la date de fin d'essai).
- Persister les nouvelles entités en base de données.
- Retourner une réponse JSON appropriée (succès ou erreur).

#### Instructions Détaillées :

1.  **Création du Contrôleur d'Authentification :**

    - Assurez-vous d'être dans le répertoire `backend/` de votre terminal.
    - Générez un nouveau contrôleur API avec la commande `make:controller` :
      ```bash
      php bin/console make:controller Api/AuthController
      ```
      - **The name of the controller class (e.g. `BlogController`):** `Api/AuthController`

2.  **Implémentation de la Logique d'Inscription (Register) :**

    - Ouvrez le fichier `backend/src/Controller/Api/AuthController.php`.
    - Remplacez tout son contenu par le code suivant, qui inclut la logique d'inscription :

    ```php
    <?php

    namespace App\Controller\Api;

    use App\Entity\User;
    use App\Entity\UserProfile;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\JsonResponse;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
    use Symfony\Component\Routing\Attribute\Route;
    use Symfony\Component\Validator\Validator\ValidatorInterface;

    #[Route('/api', name: 'api_')]
    class AuthController extends AbstractController
    {
        public function __construct(
            private EntityManagerInterface $entityManager,
            private UserPasswordHasherInterface $passwordHasher,
            private ValidatorInterface $validator
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
    ```

    - Enregistrez le fichier.

3.  **Vérification des Services Nécessaires (Installation de `symfony/validator`) :**
    - Pour que le `ValidatorInterface` soit disponible, vous devrez peut-être installer le composant Validator si ce n'est pas déjà fait :
      - Assurez-vous d'être dans le répertoire `backend/` de votre terminal.
      - Exécutez :
        ```bash
        composer require symfony/validator
        ```

#### Critères de Validation pour l'Étape 1.2 :

- Le contrôleur `Api/AuthController` est créé.
- La méthode `register` est implémentée pour gérer l'inscription d'un utilisateur.
- Les validations de base (email/password non vides, email unique) sont effectuées.
- Le mot de passe est haché en utilisant `UserPasswordHasherInterface`.
- Un utilisateur (`User`) et son profil (`UserProfile`) sont créés et persistés en base de données.
- Le `UserProfile` est correctement associé à l'`User` avec les crédits initiaux (400) et le statut d'essai.
- Une réponse JSON avec le statut `201 Created` et les informations de l'utilisateur est retournée en cas de succès.
- Une réponse JSON avec un code d'erreur (400 Bad Request, 409 Conflict) est retournée en cas d'échec de la validation ou si l'email existe déjà.

---

---

---

Guide de Déploiement sur Render
Le déploiement se fera en trois parties principales : la base de données, le backend, puis le frontend.

1. Déploiement de la Base de Données (PostgreSQL)
   La base de données est le socle, nous commençons donc par elle.

Dans votre tableau de bord Render, cliquez sur "New" -> "PostgreSQL".

Donnez-lui un nom unique (ex: prismeia-db).

Choisissez la région (ex: Frankfurt) et la version de PostgreSQL.

Cliquez sur "Create Database".

Une fois la base de données créée, Render vous fournira plusieurs informations de connexion. Celle qui nous intéresse le plus est l'"Internal Connection String". Elle ressemble à postgres://.... Copiez cette URL, nous en aurons besoin pour le backend.

2. Déploiement du Backend (Symfony)
   Le backend sera déployé en tant que "Web Service" à partir de son Dockerfile.

Dans votre tableau de bord Render, cliquez sur "New" -> "Web Service".

Connectez votre compte GitHub et sélectionnez votre dépôt PrismeIA.

Configuration du service :

Name : Donnez-lui un nom (ex: prismeia-backend).

Runtime : Choisissez Docker. Render détectera votre Dockerfile.

Root Directory : Spécifiez backend. C'est très important pour que Render sache où trouver le Dockerfile et le code source.

Health Check Path : Mettez / pour le moment.

Configuration des Variables d'Environnement :
C'est l'étape la plus critique. Allez dans l'onglet "Environment" et ajoutez les variables suivantes :

APP_ENV: prod

APP_SECRET: VOTRE_SECRET_A_GENERER (Générez-en un avec openssl rand -base64 32 dans votre terminal et collez le résultat).

DATABASE_URL: Collez l'URL de connexion interne de votre base de données Render que vous avez copiée à l'étape précédente.

MAILER_DSN: votre_dsn_de_production (ex: smtp://apikey:VOTRE_CLE_SENDGRID@smtp.sendgrid.net:587). N'utilisez pas vos identifiants Mailtrap ici.

APP_FRONTEND_URL: Mettez l'URL que votre frontend aura sur Render (ex: https://prismeia-frontend.onrender.com).

JWT_PASSPHRASE: votre_passphrase

JWT_SECRET_KEY: Collez ici le contenu complet de votre fichier config/jwt/private.pem.

JWT_PUBLIC_KEY: Collez ici le contenu complet de votre fichier config/jwt/public.pem.

Cliquez sur "Create Web Service". Le premier build peut prendre un certain temps.

3. Déploiement du Frontend (Next.js)
   Le frontend sera également un "Web Service" pour pouvoir gérer les redirections d'API.

Dans votre tableau de bord Render, cliquez sur "New" -> "Web Service".

Sélectionnez à nouveau votre dépôt PrismeIA.

Configuration du service :

Name : Donnez-lui un nom (ex: prismeia-frontend).

Root Directory : Spécifiez frontend.

Runtime : Choisissez Node.

Build Command : npm install && npm run build

Start Command : npm start

Ajout de la Règle de Redirection (Proxy) :
C'est ce qui permettra à votre frontend de communiquer avec votre backend.

Allez dans l'onglet "Redirects/Rewrites".

Cliquez sur "Add Rule".

Source Path : /api/:path\*

Destination URL : https://prismeia-backend.onrender.com/api/:path* (remplacez prismeia-backend par le nom réel de votre service backend).

Assurez-vous que le "Action" est bien réglé sur Rewrite.

Cliquez sur "Create Web Service".

4. Étapes Post-Déploiement
   Une fois les services déployés (ils auront une icône verte "deployed"), il reste une étape manuelle cruciale.

Exécuter les Migrations de la Base de Données :

Allez sur le tableau de bord de votre service backend (prismeia-backend).

Cliquez sur l'onglet "Shell".

Une fois la console connectée, tapez la commande suivante pour créer les tables :

Bash

php bin/console doctrine:migrations:migrate
Tapez yes pour confirmer.

(Optionnel) Charger les Fixtures :

Si vous voulez vos données de test, exécutez dans la même console :

Bash

php bin/console doctrine:fixtures:load
✅ Validation Finale
Votre application devrait maintenant être en ligne !

Accédez à l'URL de votre frontend (https://prismeia-frontend.onrender.com).

Testez tout le flux : inscription, réception de l'email, connexion, demande de mot de passe oublié, etc.

Félicitations, une fois cette étape terminée, vous aurez une application entièrement déployée et prête pour la Phase 2 !
