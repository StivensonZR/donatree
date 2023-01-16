import { Router } from "express";
import controller from '../controllers/adoptarbolController.js'

const router = Router();


router.get('/adoptar-arbol', controller.vista_adoptarbol)



export default router;