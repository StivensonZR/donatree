import { Router } from "express";
import controller from '../controllers/indexController.js'
import usuario from "../models/usuario.js";

const router = Router();

const validar = (req, res, next) => {

    if (req.session.passport) {
console.log("este es mi pasport");
console.log(req.session.passport);
        usuario.permisos_usuario(req.session.passport.user.id, res).then((response) => {
            req.session.permisos_usuario = response
            next()
        }).catch((err) => {
            console.log(err)
            console.log("eeeeeeeee");
        })

    } else {
        res.render('./index')
    }
}

router.get('/', validar, controller.vista_index)



export default router;