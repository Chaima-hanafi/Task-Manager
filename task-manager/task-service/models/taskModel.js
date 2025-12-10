import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Pour obtenir __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin vers le fichier tasks.json
const tasksFilePath = path.join(__dirname, '../data/tasks.json');

// Créer le dossier data s'il n'existe pas
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Créer le fichier tasks.json s'il n'existe pas
if (!fs.existsSync(tasksFilePath)) {
  fs.writeFileSync(tasksFilePath, JSON.stringify([], null, 2));
}

// Fonction pour lire les tasks depuis le fichier
export const readTasksFromFile = () => {
  try {
    const data = fs.readFileSync(tasksFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Erreur lecture tasks.json:", error.message);
    return [];
  }
};

// Fonction pour sauvegarder les tasks dans le fichier
export const saveTasksToFile = (tasks) => {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
    console.log("💾 Tasks sauvegardées dans tasks.json");
  } catch (error) {
    console.error("❌ Erreur sauvegarde tasks.json:", error.message);
  }
};

// Charger les tasks au démarrage
export let tasks = readTasksFromFile();
console.log("🚀 Tasks chargées depuis le fichier:", tasks.length, "tasks");