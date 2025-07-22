# PrismeIA : Votre Assistant Personnel IA

![PrismeIA Logo Placeholder](docs/logo_placeholder.png) Bienvenue sur le dépôt de PrismeIA, une plateforme d'assistant personnel basée sur l'intelligence artificielle. Ce projet vise à offrir aux utilisateurs une interface intuitive pour générer du contenu textuel et visuel en exploitant la puissance des modèles OpenAI (ChatGPT-4 Turbo et DALL·E).

## 💡 Résumé de l'Application

PrismeIA est conçu pour simplifier la création de contenu grâce à l'IA. Que vous ayez besoin de rédiger un email professionnel, de générer des idées, ou de créer des images uniques, PrismeIA met à votre disposition des prompts catégorisés et une gestion de crédits flexible.

La plateforme proposera différents niveaux d'accès :

- **Accès Gratuit/Essai :** Pour découvrir l'application avec un nombre limité de requêtes ou une période d'essai.
- **Abonnements Payants :** Des plans mensuels offrant des crédits pour une utilisation plus intensive, avec des fonctionnalités de gestion d'abonnement avancées.

L'objectif est d'offrir une expérience utilisateur fluide, sécurisée et performante, supportée par une architecture robuste et scalable.

---

## 🗺️ Feuille de Route du Développement par Phases

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

## 🛠️ Présentation Technique

### Architecture Générale

PrismeIA est basée sur une **architecture modulaire / microservices** pour une scalabilité, une résilience et une maintenabilité optimales.

- **Frontend :** Application web moderne et dynamique.
- **API Gateway :** Point d'entrée unique pour toutes les requêtes.
- **Microservices Backend :** Services dédiés à l'authentification, la gestion des utilisateurs/abonnements, la génération IA, les paiements, les notifications, et l'administration.
- **Bases de Données :** PostgreSQL pour les données relationnelles.
- **Services Tiers :** OpenAI (IA), Stripe (Paiement), Keycloak/Auth0 (Authentification), SendGrid/Mailgun (Emailing).
- **Déploiement :** Conteneurisation (Docker) et orchestration (Kubernetes) sur une plateforme cloud.

### Technologies Clés

- **UI/UX :** Tailwind CSS, shadcn/ui
- **Frontend :** React, Next.js (avec App Router)
- **Backend :** PHP avec le framework Symfony
- **Base de Données :** PostgreSQL
- **API Gateway :** Nginx
- **Authentification :** JWT (potentiellement Keycloak/Auth0 plus tard)
- **Paiement :** Stripe
- **Déploiement :** Docker, Kubernetes (sur AWS/GCP/Azure)
- **Monitoring :** Prometheus, Grafana
- **Logging :** ELK Stack / Loki
- **Queuing :** RabbitMQ / Kafka (pour les tâches asynchrones)

---

## 🚀 Avancement du Projet : Phase 0

La **Phase 0 : Initialisation et Configuration du Projet** est désormais **terminée** ! Toutes les fondations nécessaires pour démarrer le développement sont solidement en place.

### Réalisations de la Phase 0

1.  **Dépôt Git `PrismeIA` créé :**

    - Le dépôt distant sur GitHub est disponible à l'adresse : `https://github.com/onPV/PrismeIA.git`
    - Le dépôt local est initialisé et lié au dépôt distant.
    - Un fichier `.gitignore` a été configuré pour exclure les fichiers non essentiels au versionnement.

2.  **Structure des Répertoires Principaux mise en place :**

    ```
    PrismeIA/
    ├── backend/
    ├── database/
    ├── docker/
    ├── docs/
    ├── frontend/
    └── nginx/
    ```

3.  **Environnement de Développement VS Code configuré :**

    - VS Code est ouvert sur le projet `PrismeIA`.
    - Les extensions recommandées ont été installées (ESLint, Prettier, PHP Intelephense, Docker, GitLens, Tailwind CSS IntelliSense, PostgreSQL).
    - Le formatage automatique à l'enregistrement (`format on save`) a été activé avec Prettier.

4.  **Frontend initialisé (Next.js, Tailwind CSS, shadcn/ui) :**

    - Une application Next.js a été créée dans `frontend/src/app` avec TypeScript, Tailwind CSS et l'App Router.
    - Les composants `shadcn/ui` ont été ajoutés et configurés (y compris le passage de `toast` à `sonner`).
    - Une page de démonstration complète (`frontend/src/app/demo-ui/page.tsx`) a été développée pour visualiser tous les composants graphiques majeurs et la palette de couleurs "Slate", essentielle pour le travail du graphiste. Cette page est entièrement fonctionnelle.

5.  **Backend initialisé (Symfony) :**

    - Un projet Symfony a été créé dans le dossier `backend/`.
    - L'utilisation de `symfony server:start` via Symfony CLI est confirmée comme méthode de lancement du serveur de développement.
    - Le fichier `.env` a été configuré avec l'URL de la base de données PostgreSQL qui sera utilisée avec Docker (`DATABASE_URL="postgresql://symfony:symfony@db:5432/prisme_ia?serverVersion=16&charset=utf8"`).
    - Le serveur de développement Symfony a été testé avec succès sur `https://127.0.0.1:8000`.

6.  **Configuration Docker Complète (Frontend, Backend, BDD) :**
    - Les `Dockerfile.dev` pour le frontend (Next.js) et le backend (PHP-FPM) ont été créés et optimisés.
    - Le fichier `nginx/nginx.conf` a été configuré pour servir le frontend et proxyfier les requêtes API vers le backend.
    - Le fichier `docker/docker-compose.yml` orchestre désormais les services `db` (PostgreSQL), `php` (Symfony), `frontend_dev` (Next.js dev server) et `nginx`.
    - Les services Docker ont été démarrés avec succès via `docker compose up --build -d`.
    - L'application frontend est accessible via `http://localhost` et la communication avec le backend via `http://localhost/api/` est établie.

---

## ➡️ Prochaines Étapes

Maintenant que la Phase 0 est terminée et que l'environnement de développement est pleinement opérationnel avec Docker, nous sommes prêts à entamer la **Phase 1 : Cœur de l'Authentification et Gestion des Utilisateurs**.

Cette phase consistera à implémenter les fonctionnalités essentielles de gestion des utilisateurs, y compris :

- **Définition et implémentation des API d'authentification (backend) :**
  - Enregistrement de nouveaux utilisateurs (email/mot de passe).
  - Connexion des utilisateurs (génération de tokens JWT).
  - Gestion des mots de passe oubliés et réinitialisation.
  - Préparation pour l'intégration de l'authentification tierce (Google, LinkedIn).
- **Développement des modèles de données nécessaires (BDD) :**
  - Tables pour les utilisateurs, profils et sessions.
- **Mise en place des interfaces utilisateur (frontend) :**
  - Pages d'inscription et de connexion.
  - Page de profil utilisateur basique (affichage et modification des informations de contact).

---
