import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 4000;

app.use(express.json());

// Route test simple
app.get("/test", (req, res) => res.send("Test route OK ✅"));

// Routes utilisateurs (optionnel pour l’instant)

app.use("/api/users", userRoutes);

const PORT = 4000;
app.listen(port, () => console.log(`✅ User-Service running on port ${PORT}`));
