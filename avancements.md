# Avancements

## Setup projet

- Installation GitHub CLI (`gh` v2.93.0) et authentification compte `Ylen0001`
- Fork du repo Finlive → `https://github.com/Ylen0001/test-pagination`
- Remotes configurés : `origin` (fork), `upstream` (finlive)
- Projet lancé via Docker Compose (mongo, backend, frontend)

## Documentation

- Création de `avancements.md` (suivi des modifications)

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
- Route `GET /health)` (GOT IT)
- Constantes de validation préparées (`categories`, `sort`, `limit` max) (ASK)
- `docker-compose` : variables `NODE_ENV` et `CORS_ORIGIN` (ASK)
