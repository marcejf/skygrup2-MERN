import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import pasajerosRoutes from './routes/pasajero.route.js';
import cors from "cors";
import reservaRouter from "./routes/reserva.route.js"
import vuelosRoutes from "./routes/vuelos.route.js";
import avionRoutes from "./routes/avion.route.js";



const app = express(); //inicializa el servidor 



app.use(cors(
    {
        origin: 'http://localhost:5173', //puerto del frontend
        credentials: true, //habilita credenciales para cookies 
    }
))

app.use(morgan('dev')); // esto muestra la peticiones  en el servidor 
app.use('/api', authRoutes);
app.use(cookieParser());
app.use(express.json());
app.use('/api', pasajerosRoutes);
app.use('/api', reservaRouter);  
app.use('/api', vuelosRoutes);
app.use('/api', avionRoutes);


export default app;
