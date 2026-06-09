const { Router } = require("express");
const { apiRateLimiter } = require("../middleware/security");
const healthRouter = require("./health");

const router = Router();

router.use("/health", healthRouter);
router.use("/api", apiRateLimiter);

module.exports = router;
