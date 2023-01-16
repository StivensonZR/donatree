import { Router } from "express";
import controller from '../controllers/proyectosController.js'
import usuario from '../models/usuario.js'
import proyecto from '../models/proyecto.js'
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
        proyecto.consultar().then((response) => {
            var proyecto = response;
            res.render('./proyectos', { proyecto })
        }).catch((err) => {
            console.log(err)
            res.render('./proyectos')
        })
    }
}

router.get('/proyectos', validar, controller.vista_proyectos)




export default router;