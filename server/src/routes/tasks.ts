// import { Router, Request, Response } from "express";
// import { db } from "../db";
// import { tasks } from "../db/schema";
// import { eq } from "drizzle-orm";
// import { asyncHandler } from "../utils/asyncHandler";

// const router = Router();

// router.get(
//   "/",
//   asyncHandler(async (_req: Request, res: Response) => {
//     const userId = "dev-user";
//     const allTasks = await db.select().from(tasks).where(eq(tasks.userId, userId));
//     res.json(allTasks);
//   })
// );

// router.post(
//   "/",
//   asyncHandler(async (req: Request, res: Response) => {
//     try {
//       const userId = "dev-user";
//       const { title, status } = req.body;

//       if (!title) {
//         return res.status(400).json({ error: "Title is required" });
//       }

//       const newTask = await db
//         .insert(tasks)
//         .values({
//           title,
//           status: status || "todo",
//           userId,
//           createdAt: new Date(), // optional for clarity
//         })
//         .returning();

//       res.status(201).json(newTask[0]);
//     } catch (err) {
//       console.error(" DB Insert Error:", err);
//       res.status(500).json({ error: "Failed to insert task" });
//     }
//   })
// );

// export default router;
import { Router, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();


let tasks: {
  id: number;
  userId: string;
  title: string;
  status: "todo" | "done";
  createdAt: Date;
}[] = [];

let nextId = 1;

router.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const userId = "dev-user";
    const userTasks = tasks.filter((t) => t.userId === userId);
    res.json(userTasks);
  })
);

router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { title, status } = req.body;
    const userId = "dev-user";

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask = {
      id: nextId++,
      userId,
      title,
      status: status || "todo",
      createdAt: new Date(),
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  })
);

export default router;