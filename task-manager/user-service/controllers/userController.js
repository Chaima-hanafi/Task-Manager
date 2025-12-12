import fs from "fs/promises";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Fichier JSON pour stocker les utilisateurs
const usersFile = join(__dirname, "../users.json");

// --- Fonctions utilitaires internes ---
// Lire les utilisateurs
const readUsers = async () => {
  try {
    const data = await fs.readFile(usersFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return []; // si le fichier n'existe pas encore
  }
};

// Écrire les utilisateurs
const writeUsers = async (users) => {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
};

// --- Contrôleurs ---
// GET /api/users
export const getUsers = async (req, res) => {
  const users = await readUsers();
  res.json(users);
};

// POST /api/users/register
export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  const users = await readUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Utilisateur déjà existant." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), email, password: hashedPassword };

  users.push(newUser);
  await writeUsers(users);

  res.status(201).json({ message: "Utilisateur créé avec succès ✅", user: { id: newUser.id, email: newUser.email } });
};

// POST /api/users/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const users = await readUsers();

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Mot de passe incorrect ❌" });
  }

  res.json({ message: "Connexion réussie ✅", user: { id: user.id, email: user.email } });
};

// DELETE /api/users/delete
export const deleteUser = async (req, res) => {
  const { email } = req.body;
  let users = await readUsers();

  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) {
    return res.status(404).json({ message: "Utilisateur non trouvé." });
  }

  users.splice(userIndex, 1);
  await writeUsers(users);

  res.json({ message: "Compte supprimé avec succès 🗑️" });
};
