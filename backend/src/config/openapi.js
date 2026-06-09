const {
  CATEGORIES,
  SORT_FIELDS,
  SORT_ORDERS,
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  MAX_LIMIT,
} = require("./constants");

function buildOpenApiSpec() {
  return {
    openapi: "3.0.3",
    info: {
      title: "Test Pagination API",
      version: "1.0.0",
      description:
        "API catalogue produits paginee. Les parametres sont valides par whitelist avant toute requete MongoDB.",
    },
    servers: [{ url: "http://localhost:3001", description: "Developpement local" }],
    paths: {
      "/health": {
        get: {
          tags: ["Systeme"],
          summary: "Verification de disponibilite",
          responses: {
            200: {
              description: "Service operationnel",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/HealthResponse" },
                },
              },
            },
          },
        },
      },
      "/api/products": {
        get: {
          tags: ["Produits"],
          summary: "Liste paginee des produits",
          description:
            "Retourne une page de produits avec metadonnees de pagination. Les parametres invalides renvoient une erreur 400.",
          parameters: [
            {
              name: "page",
              in: "query",
              required: false,
              schema: { type: "integer", minimum: 1, default: DEFAULT_PAGE },
              description: "Numero de page (entier >= 1)",
            },
            {
              name: "limit",
              in: "query",
              required: false,
              schema: {
                type: "integer",
                minimum: 1,
                maximum: MAX_LIMIT,
                default: DEFAULT_LIMIT,
              },
              description: `Nombre de produits par page (1-${MAX_LIMIT}, plafonne silencieusement a ${MAX_LIMIT})`,
            },
            {
              name: "category",
              in: "query",
              required: false,
              schema: { type: "string", enum: CATEGORIES },
              description: "Filtre par categorie",
            },
            {
              name: "sort",
              in: "query",
              required: false,
              schema: { type: "string", enum: SORT_FIELDS, default: "createdAt" },
              description: "Champ de tri",
            },
            {
              name: "order",
              in: "query",
              required: false,
              schema: { type: "string", enum: SORT_ORDERS, default: "desc" },
              description: "Ordre de tri",
            },
          ],
          responses: {
            200: {
              description: "Page de produits",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ProductsResponse" },
                },
              },
            },
            400: {
              description: "Parametre de requete invalide",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            429: {
              description: "Limite de requetes depassee",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            500: {
              description: "Erreur serveur",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        HealthResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "ok" },
          },
          required: ["status"],
        },
        Product: {
          type: "object",
          properties: {
            _id: { type: "string", example: "665a1b2c3d4e5f6789012345" },
            name: { type: "string", example: "Baskets running" },
            description: { type: "string", example: "Chaussures legeres pour le sport" },
            price: { type: "number", example: 89.99 },
            category: { type: "string", enum: CATEGORIES, example: "shoes" },
            stock: { type: "integer", example: 42 },
            createdAt: { type: "string", format: "date-time" },
          },
          required: ["name", "price", "category"],
        },
        Pagination: {
          type: "object",
          properties: {
            page: { type: "integer", example: DEFAULT_PAGE },
            limit: { type: "integer", example: DEFAULT_LIMIT },
            total: { type: "integer", example: 5000 },
            totalPages: { type: "integer", example: 500 },
          },
          required: ["page", "limit", "total", "totalPages"],
        },
        ProductsResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/Product" },
            },
            pagination: { $ref: "#/components/schemas/Pagination" },
          },
          required: ["data", "pagination"],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "Parametre invalide : category" },
          },
          required: ["error"],
        },
      },
    },
  };
}

module.exports = { buildOpenApiSpec };
