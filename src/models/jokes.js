import { DataTypes } from "sequelize";

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
