// src/app.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import jokeRoutes from "./routes/jokeRoutes.js";
import { setupSwagger } from "./docs/swagger.js";

dotenv.config();

const PORT = process.env.PORT;
const FRONT_URL = process.env.FRONT_URL;

const app = express();

app.use(
  cors({
    origin: FRONT_URL,
  })
);

app.use(express.json());
setupSwagger(app);
app.use("/api/v1/jokes", jokeRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to the database.");
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized.");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(
        `📖 Swagger UI available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error("❌ DB connection error:", error);
    process.exit(1);
  }
})();
