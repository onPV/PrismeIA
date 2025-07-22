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
