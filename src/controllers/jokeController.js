import db from "../models/index.js";
const { Joke } = db;

// Create a new joke
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

// Get all jokes
export const getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    return res.json(jokes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get a joke by ID
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

// Get a random joke
export const getRandomJoke = async (req, res) => {
  try {
    const count = await Joke.count();
    const randomIndex = Math.floor(Math.random() * count);
    const randomJoke = await Joke.findOne({ offset: randomIndex });
    return res.json(randomJoke);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
