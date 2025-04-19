/**
 * @file app.js
 * @description Fichier principal de l'application qui configure le serveur Express,
 * se connecte à la base de données via Sequelize, et établit les routes de l'API.
 *
 * Ce fichier effectue les tâches suivantes :
 * - Charge les variables d'environnement via dotenv.
 * - Configure CORS pour autoriser les requêtes depuis les URLs configurées.
 * - Analyse les requêtes JSON entrantes.
 * - Intègre Swagger UI pour la documentation de l'API via la fonction setupSwagger.
 * - Monte les routes jokeRoutes à l'endpoint "/api/v1/jokes".
 * - Authentifie et synchronise la base de données en utilisant Sequelize.
 * - Démarre le serveur Express sur le PORT spécifié et affiche les URLs du serveur et de la documentation.
 *
 * @requires dotenv
 * @requires express
 * @requires cors
 * @requires ./config/database.js
 * @requires ./routes/jokeRoutes.js
 * @requires ./docs/swagger.js
 */
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import jokeRoutes from "./routes/jokeRoutes.js";
import { setupSwagger } from "./docs/swagger.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const FRONT_URL = process.env.FRONT_URL;
const DEV_URL = process.env.DEV_URL;

const app = express();

// Configuration CORS : autorise front de prod et dev local
const allowedOrigins = [FRONT_URL, DEV_URL];
app.use(cors({ origin: allowedOrigins }));

// Parse le JSON des requêtes entrantes
app.use(express.json());

// Documentation Swagger UI
setupSwagger(app);

// Routes de l'application
app.use("/api/v1/jokes", jokeRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to the database.");
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized.");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(
        `📖 Swagger UI available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error("❌ DB connection error:", error);
    process.exit(1);
  }
})();
