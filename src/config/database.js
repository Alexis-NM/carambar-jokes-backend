import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dialect = process.env.DB_DIALECT;
const storage = process.env.DB_STORAGE;
const logging = process.env.DB_LOGGING === "true" ? console.log : false;

/**
 * Configuration de l'instance Sequelize.
 *
 * Cette instance de Sequelize est initialisée avec les propriétés suivantes :
 * - dialect: Spécifie le dialecte de la base de données à utiliser.
 * - storage: Définit l'option de stockage pour la base de données.
 * - logging: Configure le comportement de journalisation.
 * - define: Définit les options par défaut pour la définition des modèles, incluant :
 *   - timestamps: Ajoute automatiquement les champs createdAt et updatedAt aux modèles.
 *   - underscored: Utilise des noms de champs en minuscules séparés par un underscore pour les propriétés des modèles.
 *
 * @constant {Sequelize} sequelize - L'instance Sequelize configurée.
 */
const sequelize = new Sequelize({
  dialect,
  storage,
  logging,
  define: {
    timestamps: true,
    underscored: true,
  },
});

export default sequelize;
