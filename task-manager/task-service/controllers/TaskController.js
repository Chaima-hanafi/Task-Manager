import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from "axios";

// Configuration du chemin vers tasks.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tasksFilePath = path.join(__dirname, '../data/tasks.json');

// Créer le dossier data s'il n'existe pas
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Créer le fichier tasks.json s'il n'existe pas
if (!fs.existsSync(tasksFilePath)) {
  fs.writeFileSync(tasksFilePath, JSON.stringify([], null, 2));
  console.log("📁 Fichier tasks.json créé");
}

// Fonction pour lire les tasks depuis le fichier
const readTasks = () => {
  try {
    const data = fs.readFileSync(tasksFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Erreur lecture tasks.json:", error.message);
    return [];
  }
};

// Fonction pour sauvegarder les tasks dans le fichier
const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
    console.log("💾 Tasks sauvegardées dans tasks.json");
  } catch (error) {
    console.error("❌ Erreur sauvegarde tasks.json:", error.message);
  }
};

// Charger les tasks au démarrage du module
console.log("🚀 Module taskController chargé");
console.log("📂 Chemin tasks.json:", tasksFilePath);
console.log("📊 Tasks actuelles:", readTasks().length, "tasks");

// ==========================================
// CONTROLLERS
// ==========================================

// GET all tasks
export const getTasks = (req, res) => {
  console.log("📋 GET /tasks appelé");
  const tasks = readTasks();
  console.log("   Nombre de tasks:", tasks.length);
  res.json(tasks);
};

// CREATE a task
const NOTIFICATION_IP = process.env.NOTIFICATION_IP;
export const createTask = async (req, res) => {
  console.log("\n=== CREATE TASK ===");
  console.log("➕ Body reçu:", req.body);

  const { title, description, deadline } = req.body;

  const task = {
    id: Date.now(),
    title,
    description,
    deadline,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  console.log("✨ Task créée:", task);

  // Lire les tasks actuelles
  const tasks = readTasks();
  
  // Ajouter la nouvelle task
  tasks.push(task);
  
  // Sauvegarder dans le fichier
  saveTasks(tasks);

  console.log("✅ Task ajoutée. Total:", tasks.length);

  // Envoyer notification
  try {
    await axios.post(`http://${NOTIFICATION_IP}:4002/notify`, {
      event: "TASK_CREATED",
      data: {
        taskId: task.id,
        title: task.title
      }
    });
    console.log("📧 Notif envoyée ✔️");
  } catch (err) {
    console.error("❌ Erreur notification:", err.message);
  }

  res.status(201).json(task);
};

// GET task by ID
export const getTaskById = (req, res) => {
  console.log("🔍 GET task by ID:", req.params.id);
  
  const tasks = readTasks();
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    console.log("❌ Task non trouvée");
    return res.status(404).json({ message: "Task not found" });
  }

  console.log("✅ Task trouvée:", task);
  res.json(task);
};

// UPDATE task
export const updateTask = (req, res) => {
  console.log("✏️ UPDATE task ID:", req.params.id);
  
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id == req.params.id);

  if (index === -1) {
    console.log("❌ Task non trouvée");
    return res.status(404).json({ message: "Task not found" });
  }

  // Mettre à jour la task
  tasks[index] = { 
    ...tasks[index], 
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  // Sauvegarder dans le fichier
  saveTasks(tasks);

  console.log("✅ Task mise à jour:", tasks[index]);
  res.json(tasks[index]);
};

// DELETE task
export const deleteTask = (req, res) => {
  console.log("🗑️ DELETE task ID:", req.params.id);
  
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id == req.params.id);

  if (taskIndex === -1) {
    console.log("❌ Task non trouvée");
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks[taskIndex];
  
  // Supprimer la task
  tasks.splice(taskIndex, 1);

  // Sauvegarder dans le fichier
  saveTasks(tasks);

  console.log("🗑️ Task supprimée:", deletedTask.title);
  console.log("✅ Tasks restantes:", tasks.length);

  res.json({ message: "Task deleted" });
};