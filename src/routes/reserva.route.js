import express from "express";
import Router from "express"
import { crearReserva } from "../controllers/reserva.controller.js";
import { obtenerReservas } from "../controllers/reserva.controller.js";
import { obtenerReservaById } from "../controllers/reserva.controller.js";
import { actualizarReserva } from "../controllers/reserva.controller.js";
import { eliminarReserva } from "../controllers/reserva.controller.js";
import { createReservaSchema } from "../schemas/reserva.schema.js";
import { validateSchema } from "../middlewares/vadidator.middleware.js";


const router = Router();
 

router.post('/crearReserva',validateSchema(createReservaSchema),crearReserva);
router.get('/obtenerReservas',obtenerReservas);
router.get('/obtenerReserva/:id',obtenerReservaById);
router.put('/actualizarReserva/:id',actualizarReserva);
router.delete('/eliminarReserva/:id',eliminarReserva);


export default router;
 