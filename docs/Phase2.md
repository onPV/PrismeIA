# ➡️ PHASE 2 : Création du Panneau d'Administration (utilisateurs & categories )

## **Objectif :** L'objectif de cette phase est de doter l'application d'une interface d'administration robuste et sécurisée en utilisant le bundle EasyAdmin. Ce panneau permettra à un administrateur de gérer les entités principales de l'application, en commençant par les utilisateurs (création, modification, suppression) et les catégories d'IA. Cette étape est cruciale pour la gestion et la modération de la plateforme avant d'ouvrir l'inscription au public.

- **Phase 2.1 : Installation et Configuration Initiale d'EasyAdmin**

  - Installer le bundle easycorp/easyadmin-bundle via Composer.

  - Générer le "Dashboard Controller", qui sera le point d'entrée de l'interface d'administration.

  - Configurer la sécurité (security.yaml) pour protéger la route /admin et la réserver aux utilisateurs ayant le ROLE_ADMIN.

- **Phase 2.2 : Gestion des Utilisateurs (CRUD)**

  - Générer un "CRUD Controller" pour l'entité User.

  - Configurer les champs à afficher dans la liste et les formulaires (email, rôles, etc.).

  - Personnaliser le formulaire de création/édition pour gérer correctement le hachage des mots de passe.

- **Phase 2.3 : Gestion des Catégories d'IA (CRUD)**

  - Générer un "CRUD Controller" pour l'entité IaCategory.

  - Configurer les champs à afficher (nom, description, etc.).

---

# ➡️ PHASE 2 : Profil Utilisateur, Crédits et Abonnements

**Objectif :** Enrichir l'application en permettant aux utilisateurs de gérer leur profil, de visualiser leurs crédits et de comprendre les différents plans d'abonnement. Cette phase pose les bases pour la monétisation future.

---

## Étapes de la Phase 2

### 1. Backend (Symfony)

- **1.1. Modèles de Données (Doctrine) :**

  - [ ] Vérifier que l'entité `UserProfile` contient bien les champs `credits`, `trial_end_date`, et `is_trial_used`.
  - [ ] Créer une nouvelle entité `SubscriptionPlan` pour stocker les différents plans d'abonnement (ex: Gratuit, Pro) avec leurs caractéristiques (nom, prix, crédits accordés, durée).
  - [ ] Mettre à jour la base de données via une nouvelle migration Doctrine.

- **1.2. Implémentation de l'API de Profil Utilisateur :**

  - [ ] Créer un nouveau contrôleur `Api/UserController`.
  - [ ] Développer l'endpoint `GET /api/users/me` pour récupérer les informations de l'utilisateur connecté et de son profil (y compris crédits et statut d'essai).
  - [ ] Développer l'endpoint `PUT /api/users/me` pour mettre à jour les informations de base du profil (prénom, nom, etc.).
  - [ ] Développer l'endpoint `PUT /api/users/me/password` pour permettre à un utilisateur connecté de changer son mot de passe.

- **1.3. Logique de Gestion des Crédits Initiaux et d'Essai :**
  - [ ] Modifier le service d'inscription (`AuthController::register`) pour y intégrer la logique d'essai :
    - Assigner les **400 crédits initiaux**.
    - Définir la date de fin d'essai à **7 jours** après l'inscription.

### 2. Base de Données (PostgreSQL)

- **2.1. Insertion des Données Initiales :**
  - [ ] Créer une nouvelle classe de Fixtures (`SubscriptionPlanFixtures`) pour insérer les plans d'abonnement de base dans la base de données.

### 3. Frontend (Next.js)

- **3.1. Création de la Page de Profil / Tableau de Bord :**
  - [ ] Développer une page `/dashboard` ou `/profile`.
  - [ ] Intégrer un appel à l'API `GET /api/users/me` pour afficher les informations de l'utilisateur.
  - [ ] Afficher de manière visible les crédits restants et le statut de la période d'essai.
  - [ ] Créer un formulaire permettant de modifier les informations du profil (appel à `PUT /api/users/me`).
  - [ ] Créer un formulaire séparé pour le changement de mot de passe (appel à `PUT /api/users/me/password`).

---

## Critères de Validation pour la Phase 2

- **[ ]** Un nouvel utilisateur reçoit bien 400 crédits et une période d'essai de 7 jours à l'inscription.
- **[ ]** Un utilisateur connecté peut accéder à une page de profil et voir ses informations, y compris ses crédits.
- **[ ]** Un utilisateur peut mettre à jour son prénom et son nom.
- **[ ]** Un utilisateur peut changer son mot de passe depuis son espace profil.
- **[ ]** La base de données contient les différents plans d'abonnement définis.
