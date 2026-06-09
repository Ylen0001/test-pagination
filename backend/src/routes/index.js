const { Router } = require("express");
const { apiRateLimiter } = require("../middleware/security");
const docsRouter = require("./docs");
const healthRouter = require("./health");
const productsRouter = require("./products");

const router = Router();

router.use(docsRouter);
router.use("/health", healthRouter);
router.use("/api", apiRateLimiter);
router.use("/api", productsRouter);

module.exports = router;
