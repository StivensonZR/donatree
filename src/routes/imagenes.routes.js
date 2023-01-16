import { Router } from "express";
import  img from "../models/imagenes.js";

const router = Router();

router.post('/cargar-img',img.upload.single('file'), controller.vista_index)
    
export default router;