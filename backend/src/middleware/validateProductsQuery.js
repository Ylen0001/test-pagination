const {
  CATEGORIES,
  SORT_FIELDS,
  SORT_ORDERS,
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  MAX_LIMIT,
} = require("../config/constants");

function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  return err;
}

function parsePositiveInt(value, fieldName) {
  if (value === undefined || value === "") return undefined;

  const num = Number(value);
  if (!Number.isInteger(num) || num < 1) {
    throw badRequest(`Parametre invalide : ${fieldName}`);
  }

  return num;
}

function parseProductsQuery(query) {
  const page = parsePositiveInt(query.page, "page") ?? DEFAULT_PAGE;
  let limit = parsePositiveInt(query.limit, "limit") ?? DEFAULT_LIMIT;

  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

  const category = query.category?.trim() || undefined;
  if (category && !CATEGORIES.includes(category)) {
    throw badRequest(`Parametre invalide : category`);
  }

  const sort = query.sort?.trim() || "createdAt";
  if (!SORT_FIELDS.includes(sort)) {
    throw badRequest(`Parametre invalide : sort`);
  }

  const order = query.order?.trim() || "desc";
  if (!SORT_ORDERS.includes(order)) {
    throw badRequest(`Parametre invalide : order`);
  }

  return { page, limit, category, sort, order };
}

function validateProductsQuery(req, _res, next) {
  try {
    req.validatedQuery = parseProductsQuery(req.query);
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = validateProductsQuery;
