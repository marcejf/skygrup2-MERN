import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import pasajerosRoutes from './routes/pasajero.route.js';
import cors from "cors";



const app = express(); //inicializa el servidor 

app.use(cors(
    {
        origin: 'http://localhost:5173',
    }
))

app.use(morgan('dev')); // esto muestra la peticiones  en el servidor 
app.use(express.json());
app.use('/api', authRoutes);
app.use(cookieParser());
app.use('/api', pasajerosRoutes);

export default app;
