
const controller = {};


controller.vista_paneladmon = (req, res) => {
    var rol = req.session.permisos_usuario[0].rol;
    res.render('./paneladmon', {
        rol,
        permisos: req.session.permisos_usuario
    })
}


export default controller