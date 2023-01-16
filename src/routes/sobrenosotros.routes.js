import { Router } from "express";
import controller from '../controllers/sobrenosotrosController.js'
const router = Router();


router.get('/sobrenosotros', controller.vista_sobrenosotros)



export default router;