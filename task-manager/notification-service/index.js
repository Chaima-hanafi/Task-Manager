import express from "express";
import bodyParser from "body-parser";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();
const PORT = 4002;


app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/notify", notificationRoutes);

app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
