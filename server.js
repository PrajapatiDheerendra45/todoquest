import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import todoRoutes from './routes/todoRoutes.js';

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
