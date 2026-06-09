const { Router } = require("express");
const { apiRateLimiter } = require("../middleware/security");
const healthRouter = require("./health");
const productsRouter = require("./products");

const router = Router();

router.use("/health", healthRouter);
router.use("/api", apiRateLimiter);
router.use("/api", productsRouter);

module.exports = router;
