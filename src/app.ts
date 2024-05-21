import express from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = express();

app.use(express.json());

app.use("/api", userRoutes)
app.use("/api", postRoutes)

export default app;