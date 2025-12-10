import {tasks} from "../models/taskModel.js";
import axios from "axios";

// GET all tasks
export const getTasks = (req, res) => {
  res.json(tasks);
};

// CREATE a task 

export const createTask = async (req, res) => {

  const { title, description, deadline } = req.body;

  const task = {
    id: Date.now(),
    title,
    description,
    deadline,
    status: "pending",
  };

  tasks.push(task);
  try {
    await axios.post("http://localhost:4002/notify", {
      event: "TASK_CREATED",
      data: {
        taskId: task.id,
        title: task.title
      }
    });
    console.log("Notif envoyée ✔️");
  } catch (err) {
    console.error("Erreur en envoyant la notification ❌", err.message);
  }
  res.status(201).json(task);
};

// GET task by ID
export const getTaskById = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
};

// UPDATE task
export const updateTask = (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Task not found" });

  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
};

// DELETE task
export const deleteTask = (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Task deleted" });
};
