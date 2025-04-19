import express from "express";
import {
  createJoke,
  getAllJokes,
  getJokeById,
  getRandomJoke,
} from "../controllers/jokeController.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/jokes:
 *   post:
 *     summary: Crée une nouvelle blague
 *     tags:
 *       - Jokes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Pourquoi le ciel est bleu ?"
 *     responses:
 *       201:
 *         description: Blague créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Joke"
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur interne
 */
router.post("/", createJoke);

/**
 * @openapi
 * /api/v1/jokes:
 *   get:
 *     summary: Récupère toutes les blagues
 *     tags:
 *       - Jokes
 *     responses:
 *       200:
 *         description: Tableau de blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Joke"
 *       500:
 *         description: Erreur interne
 */
router.get("/", getAllJokes);

/**
 * @openapi
 * /api/v1/jokes/random:
 *   get:
 *     summary: Récupère une blague aléatoire
 *     tags:
 *       - Jokes
 *     responses:
 *       200:
 *         description: Blague aléatoire
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Joke"
 *       500:
 *         description: Erreur interne
 */
router.get("/random", getRandomJoke);

/**
 * @openapi
 * /api/v1/jokes/{id}:
 *   get:
 *     summary: Récupère une blague par ID
 *     tags:
 *       - Jokes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la blague
 *     responses:
 *       200:
 *         description: Blague trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Joke"
 *       404:
 *         description: Blague non trouvée
 *       500:
 *         description: Erreur interne
 */
router.get("/:id", getJokeById);

export default router;
