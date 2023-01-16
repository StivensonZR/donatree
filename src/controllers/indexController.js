
const controller = {};


controller.vista_index = (req, res) => {
    var rol = req.session.permisos_usuario[0].rol;

   
    res.render('./index', {
        rol,
        permisos: req.session.permisos_usuario
    })
}


export default controller