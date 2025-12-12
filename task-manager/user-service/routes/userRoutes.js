import express from "express";
import { registerUser, loginUser, deleteUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

// ✅ Lister tous les utilisateurs
router.get("/", getUsers);

// ✅ Inscription
router.post("/register", registerUser);

// ✅ Connexion
router.post("/login", loginUser);

// ✅ Suppression
router.delete("/delete", deleteUser);

export default router;
