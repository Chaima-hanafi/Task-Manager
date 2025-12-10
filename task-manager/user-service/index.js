import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
// Route test simple
app.get("/test", (req, res) => res.send("Test route OK ✅"));

// Routes utilisatpostmaneurs (optionnel pour l’instant)

app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`✅ User-Service running on port ${PORT}`));
