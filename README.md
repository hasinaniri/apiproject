# API Etudiants — REST CRUD (Express + TypeScript + PostgreSQL)

Mini-projet d'API REST respectant l'architecture MVC, avec CRUD complet sur la
ressource `etudiants` et gestion centralisee des erreurs.

## Stack

- Node.js 20
- Express
- TypeScript
- PostgreSQL (`pg`)
- dotenv
- nodemon (rechargement automatique en dev)

## Architecture (MVC)

```
src/
├── config/
│   ├── db.ts           # connexion PostgreSQL (pool)
│   └── init.sql         # script de creation de la table
├── controllers/
│   └── etudiant.controller.ts   # logique metier (Controller)
├── models/
│   └── etudiant.model.ts        # requetes SQL (Model)
├── routes/
│   └── etudiant.routes.ts       # definition des routes
├── middlewares/
│   └── errorHandler.ts          # gestion centralisee des erreurs
├── types/
│   ├── AppError.ts
│   └── Etudiant.ts
├── app.ts               # configuration Express
└── server.ts             # point d'entree (lance le serveur)
```

## Installation

### 1. Prerequis
- Node.js version 20 (`node -v` doit afficher `v20.x.x`)
- PostgreSQL installe et lance

### 2. Installer les dependances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copier `.env.example` vers `.env` et adapter les valeurs :

```bash
cp .env.example .env
```

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=api_etudiants
```

### 4. Creer la base de donnees et la table

```bash
createdb api_etudiants
psql -d api_etudiants -f src/config/init.sql
```

### 5. Lancer le serveur en developpement

```bash
npm run dev
```

Le serveur demarre sur `http://localhost:3000` et affiche `Hello World` sur `/`.

### 6. Build et production

```bash
npm run build
npm start
```

## Routes disponibles

| Action                       | Methode | URL              | Code succes |
|-------------------------------|---------|-------------------|-------------|
| Lister tous les etudiants     | GET     | `/etudiants`       | 200         |
| Lire un etudiant precis       | GET     | `/etudiants/:id`   | 200         |
| Creer un etudiant             | POST    | `/etudiants`       | 201         |
| Modifier (complet)            | PUT     | `/etudiants/:id`   | 200         |
| Modifier (partiel)            | PATCH   | `/etudiants/:id`   | 200         |
| Supprimer                      | DELETE  | `/etudiants/:id`   | 204         |

### Exemple de corps (POST / PUT)

```json
{
  "nom": "Rakoto",
  "prenom": "Jean",
  "email": "jean.rakoto@example.com"
}
```

## Tester avec Postman

Une collection Postman est fournie : `postman_collection.json`.
Importer ce fichier dans Postman (bouton **Import**) pour avoir toutes les
requetes pretes (GET, POST, PUT, PATCH, DELETE).

## Gestion des erreurs

Toutes les erreurs passent par un middleware central (`src/middlewares/errorHandler.ts`) :
- Renvoie un JSON `{ success: false, message }`
- Code 404 si une route ou une ressource n'existe pas
- Code 400 si des champs obligatoires manquent
- Code 500 pour les erreurs serveur inattendues

## Conventional Commits

Voir [CONVENTIONAL_COMMITS.md](./CONVENTIONAL_COMMITS.md) pour la convention
de nommage des commits utilisee dans ce projet.

## Pousser le projet sur GitHub

```bash
git init
git add .
git commit -m "feat: initialiser l'API etudiants (Express + TypeScript + PostgreSQL)"
git branch -M main
git remote add origin <URL_DE_TON_DEPOT_GITHUB>
git push -u origin main
```
