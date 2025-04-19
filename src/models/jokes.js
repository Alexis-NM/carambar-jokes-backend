import { DataTypes } from "sequelize";

/**
 * Initialise et retourne le modèle Joke.
 *
 * Cette fonction fabrique définit le modèle Sequelize "Joke" avec les attributs suivants :
 *   - id : Un entier auto-incrémenté servant de clé primaire.
 *   - content : Un champ de texte non nul avec une validation pour s'assurer qu'il n'est pas vide.
 *
 * Le modèle est associé à la table "jokes" dans la base de données et est configuré avec des timestamps
 * et une nomenclature en underscore pour les colonnes.
 *
 * @param {Object} sequelize - L'instance Sequelize utilisée pour la définition du modèle.
 * @returns {Model} L'instance du modèle Sequelize représentant une Joke.
 */
export default (sequelize) => {
  return sequelize.define(
    "Joke",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le contenu de la blague ne peut pas être vide.",
          },
        },
      },
    },
    {
      tableName: "jokes",
      timestamps: true,
      underscored: true,
    }
  );
};
