import Router from "express";
import { createAviones } from "../controllers/aviones.controller.js";
import { getAviones } from "../controllers/aviones.controller.js";
import { searchAvion } from "../controllers/aviones.controller.js";
import { updateAvion } from "../controllers/aviones.controller.js";
import { deleteAvion } from "../controllers/aviones.controller.js";
import { validateSchema } from "../middlewares/vadidator.middleware.js";
import { createAvionesSchema } from "../schemas/aviones.schema.js";


const router = Router();

router.post('/createAviones', validateSchema(createAvionesSchema), createAviones);
router.get('/getAviones', getAviones);
router.get('/searchAvion/:id', searchAvion);
router.put('/updateAvion/:id', updateAvion);
router.delete('/deleteAvion/:id', deleteAvion);


export default router;