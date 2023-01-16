import proyecto from '../models/proyecto.js';
const controller = {};


controller.vista_proyectos = (req, res) => {
    var rol = req.session.permisos_usuario[0].rol;
    proyecto.consultar().then((response) => {
        var proyecto = response;
        res.render('./proyectos', { rol, permisos: req.session.permisos_usuario, proyecto})
    }).catch((err) => {
        console.log(err)
        res.render('./proyectos', { rol, permisos: req.session.permisos_usuario})
    })
}



export default controller