import express from 'express';
import taskRoutes from './routes/TaskRoutes.js';

const app = express();
const port = 3002;

app.use(express.json);

app.use('/tasks',taskRoutes);
app.listen(port, () =>{ console.log("task service running on port "+ port)});