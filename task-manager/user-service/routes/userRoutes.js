import express from "express";
import { registerUser, loginUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/delete", deleteUser);

export default router;
