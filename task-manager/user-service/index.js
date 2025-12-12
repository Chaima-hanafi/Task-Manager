import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// ✅ Initialiser Express AVANT d'utiliser app.use
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173" // autorise ton frontend
}));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ User-Service running on port ${PORT}`);
});
