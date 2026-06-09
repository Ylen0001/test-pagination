# Cahier des charges — Test technique

## 1. Contexte

L’entreprise est une **plateforme e‑commerce** (mode, accessoires, etc.) avec un **gros catalogue**. Aujourd’hui, le site charge **tout le catalogue d’un coup** : temps de chargement élevé, charge inutile côté navigateur et risque de mauvaise expérience utilisateur.

**Objectif du test :** concevoir une solution **paginée côté serveur**, avec **filtres** et **tris**, une gestion des erreurs, et une stack imposée.

---

## 2. Problème à résoudre


| Axes                        | Description                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Performance**             | Ne plus renvoyer ni afficher l’intégralité des articles en une seule requête / un seul rendu.                     |
| **Fonctionnalité**          | Permettre la navigation dans le catalogue (pagination **ou** scroll infini **ou** équivalent — libre choix d’UX). |
| **Recherche / exploration** | **Filtrer** (ex. par catégorie) et **trier** (ex. prix croissant / décroissant).                                  |
| **Fiabilité**               | Pas de crash en cas de paramètres invalides, réseau instable ou réponse vide.                                     |


---

## 3. Périmètre fonctionnel


| Exigence       | Détail                                                                                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pagination** | Stratégie au choix (pages numérotées, « charger plus », scroll infini…) **à condition** que les données soient chargées **par blocs** depuis le backend. |
| **Filtres**    | Au minimum un filtre pertinent sur le catalogue (ex. catégorie) ; possibilité d’en ajouter d’autres si le temps le permet.                               |
| **Tris**       | Au minimum un tri sur un champ numérique ou textuel (ex. **prix** asc / desc).                                                                           |


---

## 4. Contraintes techniques (obligatoires)


| Couche              | Technologie                             |
| ------------------- | --------------------------------------- |
| **Frontend**        | **React** (JavaScript ou TypeScript)    |
| **Backend**         | **Node.js** avec **Express** (JS ou TS) |
| **Base de données** | **MongoDB** — **sans Mongoose**         |


Le reste (outillage, structure des dossiers, librairies UI) est laissé au candidat, dans la mesure où les exigences ci-dessus sont respectées.

---

## 5. Livrables attendus

- API REST (ou équivalent **documenté**) exposant une **liste d’articles paginée**, avec paramètres documentés : `page`, `limit`, filtres, etc..
- Frontend connecté à cette API, avec l’UX de pagination / chargement choisie.
- Gestion des cas limites : valeurs de pagination invalides, liste vide, erreur serveur, etc...

---

## 6. Hors périmètre / libertés

- **Design graphique :** libre (sobriété suffisante pour un test).
- **Modalité d’interaction** (boutons vs scroll infini, etc.) : libre, tant que le chargement reste **incrémental côté serveur**.

---

# Documentation du projet (réalisation)

Complément au cahier des charges ci-dessus : lancement, API, fiabilité et mesures de sécurité ajoutées.

## Lancement

```bash
docker compose up -d
```

| Service  | URL |
| -------- | --- |
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3001 |
| API docs (Swagger) | http://localhost:3001/api-docs |
| OpenAPI JSON | http://localhost:3001/api-docs.json |
| MongoDB  | localhost:27018 (dev uniquement) |

## API — `GET /api/products`

Liste paginée côté serveur (cf. §3 et §5 du cahier des charges). Documentation interactive : [Swagger UI](http://localhost:3001/api-docs).

### Paramètres

| Paramètre  | Type    | Défaut      | Description |
| ---------- | ------- | ----------- | ----------- |
| `page`     | entier  | `1`         | Numéro de page (≥ 1) |
| `limit`    | entier  | `10`        | Produits par page (1–100) |
| `category` | string  | —           | Filtre : `shoes`, `clothing`, `accessories`, `bags` |
| `sort`     | string  | `createdAt` | Tri : `createdAt`, `price`, `name` |
| `order`    | string  | `desc`      | Ordre : `asc`, `desc` |

### Exemples

```bash
curl "http://localhost:3001/api/products"
curl "http://localhost:3001/api/products?category=shoes&sort=price&order=asc&page=2&limit=5"
```

### Réponse

```json
{
  "data": [ /* produits */ ],
  "pagination": { "page": 1, "limit": 10, "total": 5000, "totalPages": 500 }
}
```

## Fiabilité (cas limites — §2 et §5)

| Cas | Comportement |
| --- | ------------ |
| Paramètres invalides (`page=-1`, `category=hack`) | `400` + message d'erreur |
| Liste vide (filtre sans résultat, page hors range) | `200` + `data: []` |
| Erreur serveur | `500` + message générique en production |
| Réseau / API indisponible (frontend) | Message d'erreur affiché, pas de crash |

## Sécurité (renfort — hors exigence minimale)

Mesures ajoutées en complément de l'axe **fiabilité** du cahier des charges :

- Validation stricte des paramètres par whitelist (aucun paramètre utilisateur passé brut à MongoDB)
- `helmet`, CORS restrictif, rate limiting, `express-mongo-sanitize`
- Error handler centralisé (pas de fuite de stack trace en production)
- Variables d'environnement externalisées (voir `.env.example`)

> MongoDB est exposé sur le port `27018` uniquement pour le développement local via Docker.

## Stack

Conforme au §4 : React (Vite), Node.js/Express, MongoDB natif (sans Mongoose).

