import dotenv from 'dotenv';
import {fileURLToPath} from "url"

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import todoRoutes from './routes/todoRoutes.js';
import path from "path"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config(); 
connectDB();

const app = express();
app.use(cors());
app.use(express.json());




app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

app.use(express.static(path.join(__dirname,"./client/build")))

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
