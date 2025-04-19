import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

// __filename et __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const db = {};

// On lit tous les modèles du dossier
const modelFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith(".js"));

// Import séquentiel grâce au top-level await
for (const file of modelFiles) {
  const modelModule = await import(path.join(__dirname, file));
  const model = modelModule.default(sequelize);
  db[model.name] = model;
}

// Exposer sequelize et la classe Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
