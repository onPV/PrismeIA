##

## ➡️ PHASE 1 : Cœur de l'Authentification et Gestion des Utilisateurs

##

### Détail de la Phase 1 : Cœur de l'Authentification et Gestion des Utilisateurs

Cette phase se concentrera sur la mise en place des fonctionnalités essentielles permettant aux utilisateurs de s'inscrire, de se connecter et de gérer les informations de base de leur profil, y compris leurs crédits.

**Objectifs principaux de la Phase 1 :**

1.  **Backend - Service d'Authentification (Symfony) :**
    1.1. **Mise en place de Symfony Security et Création des Entités Doctrine (Terminée) :**
    _ Configuration de `symfony/security-bundle` et `symfony/uid`.
    _ Configuration de Doctrine pour les types UUID dans `doctrine.yaml`.
    _ Création des entités `User` et `UserProfile` (avec `owner` et `#[MapsId]`).
    _ Génération et application réussie d'une migration Doctrine unique pour les tables `users` et `user_profiles` après résolution des problèmes d'historique et de `init.sql`.
    1.2. **Implémentation de l'Inscription (Registration API) (Terminée et Validée) :**
    _ Création du contrôleur `Api/AuthController` avec l'endpoint `POST /api/auth/register`.
    _ Implémentation de la logique de validation, hachage du mot de passe, création et persistance des entités `User` et `UserProfile`.
    _ **Résolution des problèmes clés rencontrés :**
    _ Erreurs de syntaxe PHP dues à des copier-coller.
    _ Problèmes de routage Nginx (requêtes /api/ envoyées au frontend Next.js).
    _ Erreurs `ClassNotFoundError` (`LexikJWTAuthenticationBundle` introuvable) dues à des problèmes de cache Composer/Symfony dans le build Docker.
    _ Problèmes persistants de synchronisation de base de données et de migrations Doctrine (table `users` ou `ia_categories` inexistante, contraintes manquantes), résolus par une réinitialisation complète et l'automatisation de `doctrine:schema:update --force` via `start-prisme.sh`.
    _ Tests avec REST Client sous VS Code validés pour les scénarios de succès (`201 Created`), email déjà utilisé (`409 Conflict`), et données manquantes (`400 Bad Request`).
    1.3. **Implémentation de la Connexion (Login API) :**
    _ Endpoint API `POST /api/auth/login`.
    _ Authentification des utilisateurs par email/mot de passe.
    _ Génération et renvoi d'un **token JWT** valide pour l'authentification des requêtes futures.
    _ Gestion des erreurs d'authentification (identifiants invalides).
    1.4. **Gestion des Tokens JWT :**
    _ Installation et configuration de `lexik/jwt-authentication-bundle`.
    _ Configuration de la génération et de la validation des tokens JWT pour sécuriser les routes API.
    _ Implémentation de l'API de rafraîchissement de token (`POST /api/auth/refresh-token`).
    1.5. **Implémentation du Mot de Passe Oublié/Réinitialisation :**
    _ Endpoint API `POST /api/auth/forgot-password` (envoi d'un email avec un lien de réinitialisation).
    _ Endpoint API `POST /api/auth/reset-password` (traitement de la réinitialisation via un token).
    1.6. **Préparation pour l'authentification OAuth2 (Google, LinkedIn) :**
    _ Intégration et configuration de `knpuniversity/oauth2-client-bundle`. \* Définition des endpoints `GET /api/auth/login/google` et `GET /api/auth/login/linkedin` pour initier le processus OAuth. (L'intégration complète viendra plus tard).

2.  **Backend - Service Utilisateur et Abonnements (Symfony) - Partie Profil et Crédits :**
    2.1. **Création des Entités Doctrine :**
    _ Vérification/création des entités pour `user_profiles` et `subscription_plans` (avec les données de base des plans).
    2.2. **Implémentation de l'API de Profil Utilisateur :**
    _ Endpoint API `GET /api/users/me` (récupération des informations de l'utilisateur connecté, y compris les crédits restants et le statut d'essai).
    _ Endpoint API `PUT /api/users/me` (mise à jour des informations de profil de l'utilisateur).
    _ Endpoint API `PUT /api/users/me/password` (changement de mot de passe sécurisé).
    _ Endpoint API `PUT /api/users/me/email` (changement d'email avec mécanisme de confirmation si nécessaire).
    2.3. **Logique de Gestion des Crédits Initiaux et d'Essai :**
    _ Assignation de 400 crédits et début de la période d'essai de 7 jours lors de l'inscription.

3.  **Base de Données (PostgreSQL) :**
    3.1. **Mise à jour des Migrations Doctrine :**
    _ Utilisation de Doctrine Migrations pour créer et appliquer les schémas de base de données pour les tables `users`, `user_profiles` et `subscription_plans`.
    3.2. **Insertion des Données Initiales :**
    _ Insertion des plans d'abonnement de base (`subscription_plans`).

4.  **Frontend (Next.js) :**
    4.1. **Pages d'Authentification :**
    _ Développement des pages `login` et `register` (avec des formulaires stylisés par `shadcn/ui`).
    _ Intégration des appels aux API d'inscription et de connexion du backend.
    _ Gestion du stockage sécurisé du token JWT (par exemple, dans les cookies HTTP-Only ou local storage avec des précautions).
    _ Redirection après connexion/inscription réussie vers le tableau de bord.
    4.2. **Tableau de Bord Utilisateur (Basique) :**
    _ Page `dashboard` affichant un message de bienvenue et les **crédits restants**.
    _ Message incitatif à l'abonnement si l'utilisateur est en essai ou n'a plus de crédits (sans la logique de paiement pour l'instant).
    4.3. **Page de Profil Utilisateur :**
    _ Interface pour visualiser et modifier les informations du profil (`nom`, `prénom`, `email`, `mot de passe`).
    _ Intégration des appels aux API de profil backend.

**Critères de Validation pour la Phase 1 :**

- Un nouvel utilisateur peut s'inscrire avec succès et se connecter.
- Un utilisateur connecté peut voir son nombre de crédits initiaux.
- Un utilisateur peut modifier les informations de son profil (nom, email, mot de passe).
- Les erreurs d'authentification (mauvais identifiants, mot de passe oublié) sont gérées correctement.
- Tous les appels API sont sécurisés par le token JWT (sauf `register`, `login`, `forgot-password`).

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
