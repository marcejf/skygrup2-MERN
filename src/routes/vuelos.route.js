import Router from "express";
import { createVuelos } from "../controllers/vuelo.controller.js";
import { getVuelos } from "../controllers/vuelo.controller.js";
import { searchVuelo } from "../controllers/vuelo.controller.js";
import { updateVuelo } from "../controllers/vuelo.controller.js";
import { deleteVuelo } from "../controllers/vuelo.controller.js";
import { validateSchema } from "../middlewares/vadidator.middleware.js";
import { createVuelosSchema } from "../schemas/vuelo.schema.js";


const router = Router();  
    

router.post('/createVuelos', validateSchema(createVuelosSchema), createVuelos);
router.get('/getVuelos', getVuelos );
router.get('/searchVuelo/:id', searchVuelo);
router.put('/updateVuelo/:id', updateVuelo);
router.delete('/deleteVuelo/:id', deleteVuelo);

 
export default router;


