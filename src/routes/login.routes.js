import { Router } from "express";
import controller from '../controllers/loginController.js'
import passport from 'passport';
import { bandera_clave, bandera_usuario } from '../models/authenticate/passport.js'
const router = Router();

router.get('/login', controller.vista_login)
router.post('/cargar-nacionalidad', controller.cargar_nacionalidad)

router.post('/registrar-usuario', passport.authenticate('local.registro'), (req, res) => res.json({
    status: 'ok',
    usuario: bandera_usuario,
    /* url:'/panel-admin' */
}));

router.post('/inicio-sesion', passport.authenticate('local.inicio.sesion'), (req, res, next) => {
    res.json({
        status: "ok",
        url: '/',
        usuario: bandera_usuario,
        clave: bandera_clave
    })
});



export default router;