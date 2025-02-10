import Router from "express";
import {crearAgendamiento} from "../controllers/agendamiento.controller.js";
import {obtenerAgendamientos} from "../controllers/agendamiento.controller.js";
import {obtenerAgendamientoPorId} from "../controllers/agendamiento.controller.js";
import {actualizarAgendamiento} from "../controllers/agendamiento.controller.js";
import {eliminarAgendamiento} from "../controllers/agendamiento.controller.js";
import { validateSchema } from "../middlewares/vadidator.middleware.js";
import { agendamientoSchema } from "../schemas/agendamiento.js";



const router = Router();


router.post('/crearAgendamiento', validateSchema(agendamientoSchema), crearAgendamiento);
router.get('/obtenerAgendamientos', obtenerAgendamientos);
router.get('/obtenerAgendamientoPorId/:id', obtenerAgendamientoPorId);
router.put('/actualizarAgendamiento/:id ', actualizarAgendamiento);
router.delete('/eliminarAgendamiento/:id', eliminarAgendamiento);


export default router;