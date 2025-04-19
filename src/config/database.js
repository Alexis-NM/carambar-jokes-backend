import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dialect = process.env.DB_DIALECT;
const storage = process.env.DB_STORAGE;
const logging = process.env.DB_LOGGING === "true" ? console.log : false;

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
