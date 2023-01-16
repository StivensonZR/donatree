const controller = {}

controller.cerrar_sesion = (req, res) => {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                req.session = null;
                console.log("El usuario cerro sesion");
                res.json({
                    status:'ok',
                    url:'/'
                })
            }
        });
    }
}

export default controller;