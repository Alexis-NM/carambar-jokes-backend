import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

// Création de __filename et __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Carambar Jokes API",
      version: "1.0.0",
      description:
        "API pour gérer les blagues Carambar (CRUD + joke aléatoire)",
    },
    servers: [
      {
        url: process.env.BASE_URL,
        description: "Server local",
      },
    ],
    components: {
      schemas: {
        Joke: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            content: {
              type: "string",
              example: "Quelle est la femelle du hamster ? L’Amsterdam",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "../routes/*.js"),
    path.join(__dirname, "../controllers/*.js"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
