import { Router } from "express";
import controller from '../controllers/donantesController.js'
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
        usuario.consultar_usuario_que_dona(req).then((response) => {
          
            if (response != "No hay donantes") {
                for (let i = 0; i < response.length; i++) {
                    let formato = response[i].fecha.getDate() + "/" + (response[i].fecha.getMonth() + 1) + "/" + response[i].fecha.getFullYear()
                    response[i].fecha = formato
                }
                
                res.render('./donantes', { response })
            } 

        }).catch((err) => {
            res.render('./donantes')
            console.log(err);
        })

    }
}

router.get('/donantes', validar, controller.vista_donantes)



export default router;