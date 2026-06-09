const { Router } = require("express");
const validateProductsQuery = require("../middleware/validateProductsQuery");
const { getProducts } = require("../services/products");

const router = Router();

router.get("/products", validateProductsQuery, async (req, res, next) => {
  try {
    const result = await getProducts(req.app.locals.db, req.validatedQuery);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
