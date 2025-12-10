import { Router } from "express";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

const router = Router();
router.get("/debug", (req, res) => {
  console.log("🔍 Route /debug appelée");
  console.log("📦 tasks =", tasks);
  console.log("🔢 tasks.length =", tasks.length);
  
  res.json({
    message: "Info de debug",
    tasksLength: tasks.length,
    tasks: tasks
  });
});
router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
