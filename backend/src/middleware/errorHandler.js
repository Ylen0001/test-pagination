function errorHandler(err, req, res, _next) {
  console.error(`[${req.method} ${req.path}]`, err.message);

  const status = err.status || 500;
  const message =
    status < 500 || process.env.NODE_ENV !== "production"
      ? err.message || "Une erreur est survenue"
      : "Une erreur interne est survenue";

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
