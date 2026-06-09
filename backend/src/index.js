const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const routes = require("./routes");
const { applySecurityMiddleware } = require("./middleware/security");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/shop";

async function start() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log("Connecte a MongoDB");

  const db = client.db("shop");
  app.locals.db = db;
  app.locals.mongoClient = client;

  applySecurityMiddleware(app);
  app.use(express.json({ limit: "10kb" }));

  app.use(routes);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Serveur demarre sur http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error("Erreur de demarrage :", err.message);
  process.exit(1);
});
