const { Router } = require("express");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const { buildOpenApiSpec } = require("../config/openapi");

const router = Router();
const openApiSpec = buildOpenApiSpec();

const swaggerHelmet = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'", "data:"],
    },
  },
});

router.get("/api-docs.json", swaggerHelmet, (_req, res) => {
  res.json(openApiSpec);
});

router.use(
  "/api-docs",
  swaggerHelmet,
  swaggerUi.serve,
  swaggerUi.setup(openApiSpec, {
    customSiteTitle: "Test Pagination API",
  })
);

module.exports = router;
