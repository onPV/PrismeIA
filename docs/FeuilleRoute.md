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
