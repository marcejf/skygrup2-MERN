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
import agendamientoRouter from "./routes/agendamiento.route.js";


const app = express();


app.use(cors(
    {
        origin: 'http://localhost:5173', //puerto del frontend
        credentials: true, //habilita credenciales para cookies 
    }
))

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.use('/api', authRoutes);
app.use('/api', pasajerosRoutes);
app.use('/api', reservaRouter);  
app.use('/api', vuelosRoutes);
app.use('/api', avionRoutes);
app.use('/api',agendamientoRouter);


export default app;
