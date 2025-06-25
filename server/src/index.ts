import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import geminiRoutes from "./routes/gemini";
import tasksRoutes from "./routes/tasks";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "development") {
  app.use(clerkMiddleware());
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/tasks", tasksRoutes);
app.use("/api/gemini", geminiRoutes);

app.get("/", (_, res) => {
  res.send("Web3Dev Backend is running.");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));