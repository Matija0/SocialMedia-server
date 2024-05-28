import express from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import validateEnv from './utils/validateEnv';
import cors from 'cors';

validateEnv();

const app = express();

app.use(express.json());

app.use(cors())

app.use('/uploads', express.static('uploads'));

app.use("/api", userRoutes)
app.use("/api", postRoutes)

export default app;