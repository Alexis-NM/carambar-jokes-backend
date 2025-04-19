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

/**
 * @constant {string[]}
 * @description Un tableau contenant les noms des fichiers JavaScript dans le répertoire courant, à l'exception du fichier de base.
 *              Cette liste est utilisée pour importer dynamiquement tous les fichiers de modèles pour un traitement ultérieur.
 */
const modelFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith(".js"));

for (const file of modelFiles) {
  const modelModule = await import(path.join(__dirname, file));
  const model = modelModule.default(sequelize);
  db[model.name] = model;
}

// Expose les instances Sequelize
/**
 * @property {Sequelize} sequelize - L'instance principale de Sequelize pour les requêtes.
 * @property {import('sequelize').Sequelize} Sequelize - La classe Sequelize pour accéder aux classes et types.
 */
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
