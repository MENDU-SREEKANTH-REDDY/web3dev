import { Router, Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { requireAuth } from "../utils/auth";

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * @swagger
 * /api/gemini:
 *   post:
 *     summary: Generate tasks from Gemini API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *                 example: Learn React
 *     responses:
 *       200:
 *         description: List of generated tasks
 */
router.post("/", requireAuth, async (req: Request, res: Response) => {
  const { topic } = req.body;

  if (!topic) {
    res.status(400).json({ error: "Topic is required" });
    return;
  }

  // 🧪 Fast mock in dev
  if (process.env.NODE_ENV === "development") {
    res.json({
      tasks: [
        `Quick intro to ${topic}`,
        `Watch a video on ${topic}`,
        `Do a mini project in ${topic}`,
        `Summarize ${topic} basics`,
        `Try a challenge related to ${topic}`,
      ],
    });
    return;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Give 5 short tasks to learn ${topic}. No numbers.`;
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    const tasks = text.split("\n").map((line) => line.trim()).filter(Boolean);
    res.json({ tasks });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Failed to generate tasks" });
  }
});

export default router;
