import express from "express";

const app = express();
app.use(express.json());

// Route test simple
app.get("/test", (req, res) => res.send("Test route OK ✅"));

// Routes utilisateurs (optionnel pour l’instant)
import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ User-Service running on port ${PORT}`));
