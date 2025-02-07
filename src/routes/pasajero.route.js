import { Router } from "express";
import { createPasajeros, getPasajeros } from "../controllers/pasajeros.controller.js";
import { validateSchema } from "../middlewares/vadidator.middleware.js";
import { createPasajeroSchema } from "../schemas/pasajero.schema.js";
import { updatePasajero } from "../controllers/pasajeros.controller.js";
import { deletePasajero } from "../controllers/pasajeros.controller.js";
import { buscarPasajero } from "../controllers/pasajeros.controller.js";


const router = Router();

router.post('/createPasajeros', validateSchema(createPasajeroSchema),createPasajeros);
router.get('/getPasajeros', getPasajeros);
router.put('/updatePasajero/:id', updatePasajero);
router.delete('/deletePasajero/:id', deletePasajero);
router.get('/buscarPasajero', buscarPasajero);


export default router;    
