const controller = {};
import usuario from '../models/usuario.js';
import perfil from '../models/perfil.js';
import validar from '../models/validaciones.js';

var cuenta;
controller.vista_perfil = (req, res) => {
    const id = req.session.passport.user.id;
    perfil.consultar_perfil(id).then((response) => {
        const user = {
            nombre: response.nombre,
            usuario: response.usuario,
            tipo: response.tipo,
            descripcion: response.descripcion,
            nacionalidad: response.nacionalidad,
            telefono: validar.telefono(response.telefono),
            direccion: validar.datos(response.direccion),
            barrio: validar.datos(response.barrio)
        }
        cuenta = user.tipo
        res.render('./perfil', user)
    }).catch((err) => {
        console.log(err);
    })
}


controller.tipo_cuenta = (req, res) => {
    usuario.consultar_tipo_de_cuenta().then((response) => {
        res.json({
            tipo: cuenta,
            cuenta: response
        })
    }).catch((err) => {
        console.log(err);
    })
}

controller.actualizar_perfil = (req) => {
    perfil.actualizar(req).then((response) => {
     console.log(response);
    }).catch((err) => {
        console.log(err);
    })
}



export default controller