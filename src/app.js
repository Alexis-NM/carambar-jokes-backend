import dotenv from "dotenv";
import express from "express";
import sequelize from "./config/database.js";
import jokeRoutes from "./routes/jokeRoutes.js";
import { setupSwagger } from "./docs/swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger UI
setupSwagger(app);

// Routes
app.use("/api/v1/jokes", jokeRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
      console.log(
        `📖 Swagger UI available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error("❌ DB connection error:", error);
    process.exit(1);
  }
})();
