# Avancements

## Setup projet

- Installation GitHub CLI (`gh` v2.93.0) et authentification compte `Ylen0001`
- Fork du repo Finlive → `https://github.com/Ylen0001/test-pagination`
- Remotes configurés : `origin` (fork), `upstream` (finlive)
- Projet lancé via Docker Compose (mongo, backend, frontend)

## Documentation

- Création de `avancements.md` (suivi des modifications)
- Dossier `Journal de bord/` créé — déplacement de ce fichier + schéma CI

## Convention de commit (format 2 — Conventional Commits + type `security`)

```
<type>(<scope>): <description courte>

[corps optionnel avec tirets]
```

**Types utilisés :**
- `security` — durcissement, validation, protection (focus principal)
- `feat` — nouvelle fonctionnalité (API, UI…)
- `fix` — correction de bug
- `chore` — tâches techniques sans impact fonctionnel (config, deps, structure)
- `docs` — documentation uniquement
- `refactor` — restructuration sans changement de comportement

**Exemple :**
```
security(backend): add HTTP hardening and project structure

- helmet, CORS restrictif, rate limiting, mongo-sanitize
- error handler centralise, route /health
- .gitignore, .env.example, structure routes/middleware/services
```

## Phase 0 — Fondations

- Commit : `security(backend): add HTTP hardening and project structure`
- Ajout `.gitignore` et `.env.example`   (GOT IT)
- Structure backend : `routes/`, `middleware/`, `services/`, `config/` (GOT IT)
- Middleware sécurité : helmet, CORS restrictif, rate limiting, mongo-sanitize (GOT IT)
- Error handler centralisé + handler 404 (GOT IT)
- Route `GET /health` (GOT IT)

### Notes Phase 0

**Constantes de validation** (`backend/src/config/constants.js`) — listes blanches préparées pour la Phase 1 : catégories, champs de tri, ordres, limites de pagination. On n'acceptera que ces valeurs dans l'API.

**`NODE_ENV`** — indique l'environnement (`development` / `production`). En prod, l'error handler masque les détails des erreurs serveur.

**`CORS_ORIGIN`** — URL du frontend autorisée à appeler l'API (`http://localhost:5173`). Bloque les requêtes cross-origin depuis d'autres domaines.

**`mongo-sanitize`** — middleware qui supprime les opérateurs MongoDB (`$ne`, `$gt`…) des entrées utilisateur. Filet de sécurité contre l'injection NoSQL, en complément de la validation par whitelist.

## CI

- Workflow GitHub Actions `.github/workflows/ci.yml`
- Job **Backend** : `npm ci`, syntax check, smoke test `/health` avec MongoDB
- Job **Frontend** : `npm ci`, `vite build`
- Job **Docker** : `docker compose build`
- Ajout `frontend/package-lock.json` pour builds reproductibles
- Commit : `chore(ci): add GitHub Actions pipeline`
- Schéma CI : voir `ci-schema.md`
- CD / hébergement : non prévu pour l'instant

## Phase 1 — API produits paginée

- Branche : `feat/api-products-pagination`
- Commit : `feat(api): add paginated products endpoint`
- `GET /api/products` avec pagination serveur (`page`, `limit`, `skip`/`limit` MongoDB)
- Validation stricte des query params via whitelist (`validateProductsQuery.js`)
- Service `products.js` : filtre catégorie, tri, comptage total
- Réponse `{ data, pagination: { page, limit, total, totalPages } }`
- Cas limites : params invalides → 400, liste vide → 200 + `[]`

## Phase 2 — Frontend connecté à l'API

- Couche `api/products.js` pour les appels HTTP
- Hook `useProducts` : fetch, loading, error, annulation au démontage
- Composants `ProductCard` et `Pagination`
- Filtres et tris branchés sur l'API, reset page → 1 au changement
- Affichage nom, catégorie, prix + navigation Précédent / Suivant

## Documentation et durcissement CI

- Section « Documentation du projet » ajoutée au README (sans modifier le cahier des charges)
- Doc API, fiabilité (cas limites) et sécurité alignées sur les §2, §3 et §5 du sujet
- CI : `npm audit --audit-level=high` + tests `/api/products` et rejet `category=hack`

## Phase 3 — Charger plus (branche `feat/load-more`)

- Bouton « Charger plus » à la place de Précédent/Suivant
- Même styles CSS (classe `.pagination` conservée)
- Produits accumulés au clic, grille reste visible pendant le chargement
- Compteur « X sur Y produits », reset au changement filtre/tri

## Phase 4 — UI palette (branche `feat/ui-palette`)

- Option Pantone : **White Onyx** / **Burnished Lilac** / **Rhodonite**
- 60/30/10 : fond `#F0EEEC` / surfaces `#9B8FA8` / accent `#7A4F5E`
- Style épuré premium : pierre claire, lilas bruni, rose minéral
- Texte catégorie en **Burnt Sienna** (`#9E5B42`), libellés FR
- Prix en **Stone Grey** (`#4C4147`) — variante claire entre Taupe Grey et Shadow Grey
- Texte catégorie **Burnt Sienna**, polish UI : DM Sans, header structuré, skeleton loading, cartes hiérarchisées

## Phase 5 — Swagger (branche `feat/swagger`)

- Spec OpenAPI 3.0 generee depuis les constantes de validation (`config/openapi.js`)
- Swagger UI sur `/api-docs`, spec JSON sur `/api-docs.json`
- CSP Helmet assouplie uniquement sur les routes de documentation
- CI : verification `/api-docs.json` et `/api-docs/`

## Phase 6 — Polish UI états (branche `feat/ui-polish`)

- Etat vide contextuel (filtre categorie vs catalogue vide)
- Erreur initiale avec bouton Reessayer
- Erreur load more sans masquer la grille deja chargee
- Message de fin : « Tous les produits sont affiches »
- Cartes : ligne d'accent rhodonite + badge pill categorie
- Footer : onglets pills (A propos, Contact, Rejoindre, FAQ, Livraison, CGV)
