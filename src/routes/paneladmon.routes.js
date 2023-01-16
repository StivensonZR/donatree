import { Router } from "express";
import controller from '../controllers/paneladmonController.js'
import usuario from '../models/usuario.js'
const router = Router();
const validar = (req, res, next) => {
    if (req.session.passport) {
        usuario.permisos_usuario(req.session.passport.user.id, res).then((response) => {
            req.session.permisos_usuario = response
            next()
        }).catch((err) => {
            console.log(err)
        })

    } else {
        res.render('./paneladmon')
    }
}

router.get('/panel-admin', validar, controller.vista_paneladmon)



export default router;