import express from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/TaskRoutes.js";
import dotenv from 'dotenv';
import cors from "cors";

// Autoriser ton frontend

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: `http://${process.env.FRONTEND_IP}:5173`
}));

// Routes
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`✅Task service running on port ${PORT}`);
});
