# Carambar Jokes API (Backend)

![Render](https://img.shields.io/badge/deployed%20on-Render-blue) ![Swagger](https://img.shields.io/badge/docs-Swagger-47BCF8)

## Description

API REST pour gérer une collection de blagues Carambar. Fournit des endpoints pour créer, lister, consulter par ID et récupérer une blague aléatoire.

## Prérequis

- Node.js ≥ 16
- npm
- Un compte sur [Render](https://render.com/) (pour le déploiement)

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/alexis-nm/carambar-jokes-backend.git
   cd carambar-jokes-backend
   ```
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Créer un fichier `.env` à la racine :
   ```env
   DB_DIALECT=sqlite
   DB_STORAGE=./db.sqlite
   DB_LOGGING=false
   PORT=3000
   FRONT_URL=https://alexis-nm.github.io
   ```
4. Lancer en mode développement :
   ```bash
   npm run dev
   ```
5. (Optionnel) Peupler la base avec les blagues initiales :
   ```bash
   npm run seed
   ```

## Usage

Une fois démarré, l’API est accessible à :
```
http://localhost:3000/api/v1/jokes
```

### Déploiement sur Render

Le service est déployé automatiquement sur Render.
- URL de base : `https://carambar-jokes-backend.onrender.com/api/v1`
- Swagger UI : `https://carambar-jokes-backend.onrender.com/api-docs`

## Endpoints

| Route                        | Méthode | Paramètres                | Description                                 |
| ---------------------------- | ------- | ------------------------- | ------------------------------------------- |
| `/api/v1/jokes`              | GET     | —                         | Récupère toutes les blagues                 |
| `/api/v1/jokes/:id`          | GET     | `id` (integer, path)      | Récupère une blague par son identifiant     |
| `/api/v1/jokes/random`       | GET     | —                         | Récupère une blague aléatoire               |
| `/api/v1/jokes`              | POST    | `{ content: string }`     | Crée une nouvelle blague                    |

---

*Bonne dégustation de blagues !*