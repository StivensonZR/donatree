import { Router } from "express";
import controller from '../controllers/panel_adminController.js'
import usuario from '../models/usuario.js'
import img from '../models/imagenes.js'
const router = Router();
const validar = (req, res, next) => {
    if (req.session.passport) {
        usuario.permisos_usuario(req.session.passport.user.id, res).then((response) => {
            req.session.permisos_usuario = response
            next()
        }).catch((err) => {
            console.log(err)
        })
    }
}

router.get('/panel-admin', validar, controller.vista_panel_admin)
/* Proyecto */
router.post('/crear-proyecto', img.upload.single('img_proyecto'), controller.crear_proyectos)
router.post('/abrir/modal/actualizar/proyecto', controller.abrir_modal_actualizar_proyecto)
router.post('/actualizar/proyecto', controller.actualizar_proyecto)
router.post('/cargar/responsable', controller.cargar_responsable)


/* Usuario */
router.post('/eliminar/usuario', controller.eliminar_usuario )
router.post('/actualizar/rol/usuario', controller.atualizar_rol_usuario)
router.post('/buscar/usuario', controller.consultar_usuario)




export default router;