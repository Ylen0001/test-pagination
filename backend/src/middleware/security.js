const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

const corsMiddleware = cors({
  origin: corsOrigin,
  methods: ["GET"],
});

const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de requetes, reessayez plus tard" },
});

function applySecurityMiddleware(app) {
  app.use(helmet());
  app.use(corsMiddleware);
  app.use(mongoSanitize());
}

module.exports = { applySecurityMiddleware, apiRateLimiter };
