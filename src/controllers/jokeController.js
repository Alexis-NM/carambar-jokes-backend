import db from "../models/index.js";
const { Joke } = db;

// Créer une nouvelle blague
export const createJoke = async (req, res) => {
  try {
    const { content } = req.body;
    const newJoke = await Joke.create({ content });
    return res.status(201).json(newJoke);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        errors: error.errors.map((e) => e.message),
      });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Obtenir toutes les blagues
export const getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    return res.json(jokes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Obtenir une blague par ID
export const getJokeById = async (req, res) => {
  try {
    const { id } = req.params;
    const joke = await Joke.findByPk(id);
    if (!joke) {
      return res.status(404).json({ message: "Joke not found." });
    }
    return res.json(joke);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Obtenir une blague aléatoire différente de la dernière blague
export const getRandomJoke = async (req, res) => {
  try {
    const lastJokeId = req.query.lastJokeId
      ? Number(req.query.lastJokeId)
      : null;
    const where = lastJokeId ? { id: { [Op.ne]: lastJokeId } } : {};
    const count = await Joke.count({ where });

    if (count === 0) {
      const fallback = await Joke.findByPk(lastJokeId);
      return res.json(fallback);
    }
    const randomOffset = Math.floor(Math.random() * count);

    const randomJoke = await Joke.findOne({
      where,
      offset: randomOffset,
    });

    return res.json(randomJoke);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};