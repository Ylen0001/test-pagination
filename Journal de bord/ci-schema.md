# Schéma CI — GitHub Actions

Déclenché à chaque push ou pull request sur `main`.

```mermaid
flowchart TD
    A[git push sur main] --> B[GitHub Actions]
    B --> C[Job Backend]
    B --> D[Job Frontend]
    B --> E[Job Docker]
    C --> C1[npm ci]
    C1 --> C2[syntax check]
    C2 --> C3[Mongo + serveur + /health]
    D --> D1[npm ci]
    D1 --> D2[vite build]
    E --> E1[docker compose build]
    C3 --> F{Tous verts ?}
    D2 --> F
    E1 --> F
    F -->|Oui| G[CI passed]
    F -->|Non| H[CI failed]
```

## Détail des jobs

| Job | Vérifications |
|-----|---------------|
| **Backend** | Install deps, syntaxe JS, démarrage serveur + Mongo, `GET /health` |
| **Frontend** | Install deps, build de production Vite |
| **Docker** | Construction des images via `docker compose build` |
