import { Router } from "express";
import { create } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/vadidator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import{ auth} from "../middlewares/auth.middlewares.js";
import { check } from "../middlewares/auth.middlewares.js";




const router = Router();


router.post('/create', validateSchema(registerSchema),create);
router.post('/login', validateSchema(loginSchema),login);
router.get('/verifytoken',verifyToken);

router.get("/admin", auth, check("admin"), (req, res) => {
    res.json({ message: "Welcome, admin!" });
  });
  
router.get("/superadmin", auth, check("superadmin"), (req, res) => {
    res.json({ message: "Welcome, superadmin!" });
  });


export default router;