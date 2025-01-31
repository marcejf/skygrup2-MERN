import { Router } from "express";
import { create } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/vadidator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";




const router = Router();


router.post('/create', validateSchema(registerSchema),create);
router.post('/login', validateSchema(loginSchema),login);
router.get('/verifytoken',verifyToken);




export default router;