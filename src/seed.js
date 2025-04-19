import dotenv from "dotenv";
import sequelize from "./config/database.js";
import db from "./models/index.js";

dotenv.config();

const { Joke } = db;

/**
 * Un tableau de blagues initiales utilisé dans l'application.
 * Chaque élément du tableau est une chaîne qui représente un jeu de mots humoristique ou un calembour.
 *
 * @constant {string[]}
 */
const initialJokes = [
  "Quelle est la femelle du hamster ? L’Amsterdam",
  "Que dit un oignon quand il se cogne ? Aïe",
  "Quel est l'animal le plus heureux ? Le hibou, parce que sa femme est chouette.",
  "Pourquoi le football c'est rigolo ? Parce que Thierry en rit",
  "Quel est le sport le plus fruité ? La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.",
  "Que se fait un Schtroumpf quand il tombe ? Un Bleu",
  "Quel est le comble pour un marin ? Avoir le nez qui coule",
  "Qu'est ce que les enfants usent le plus à l'école ? Le professeur",
  "Quel est le sport le plus silencieux ? Le para-chuuuut",
  "Quel est le comble pour un joueur de bowling ? C’est de perdre la boule",
];

async function seed() {
  try {
    await sequelize.authenticate();
    await Joke.destroy({ where: {} });
    const jokes = initialJokes.map((content) => ({ content }));
    await Joke.bulkCreate(jokes);
    console.log(`✅ Inserted ${jokes.length} jokes.`);
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

seed();
