import proyecto from '../models/proyecto.js'
import img from '../models/imagenes.js';
import persona from '../models/persona.js';
import usuario from '../models/usuario.js';
import rol from '../models/rol.js';
import pais from '../models/pais.js';

const controller = {};


controller.vista_panel_admin = (req, res) => {
    var rol = req.session.permisos_usuario[0].rol;
    proyecto.consultar().then((response) => {
        var proyecto = response;
        usuario.consultar_todos_los_usuario().then((response) => {
            console.log(response);
            var usuarios = response
            res.render('./panel_admin', { rol, permisos: req.session.permisos_usuario, proyecto, usuarios })
        }).catch((err) => {
            console.log(err);
        })

    }).catch((err) => {
        console.log(err)
        res.render('./panel_admin', { rol, permisos: req.session.permisos_usuario })
    })

}

controller.crear_proyectos = (req, res) => {
    console.log(req.file);
    proyecto.registrar(req).then((response) => {
        if (response == "se registro el proyecto de manera exitosa") {
        res.redirect('/panel-admin')
           
        } else {
            res.json({ error: "No se registro el proyecto" })
        }
    }).catch((err) => {
        console.log(err);
    })
}


controller.eliminar_proyecto = (req, res) => {
    const { id_responsable, id_proye, id_img } = req.params;
    proyecto.eliminar(id_proye).then((response) => {
        if (response == "El proyecto se elimino de manera correcta") {
            console.log(response);
            img.eliminar(id_img).then((response) => {
                if (response == "se elimino la imagen de manera correcta") {
                    console.log(response);
                    persona.eliminar(id_responsable).then((response) => {
                        if (response == "se elimino la persona de manera correcta") {
                            console.log(response);
                            res.redirect('/panel-admin');
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }).catch((err) => {
        console.log(err);
    })


}

controller.abrir_modal_actualizar_proyecto = (req, res) => {
    const { id_proyecto } = req.body
    proyecto.consultar_proyecto_por_id(id_proyecto).then((response) => {
        res.json(response)
    }).catch((err) => {
        console.log(err);
    })
}

controller.cargar_responsable = (req, res) => {
    usuario.consultar_todos_los_usuario().then((response) => {
        console.log("----------------");
        console.log(response);
        res.json(response)
    }).catch((err) => {
        console.log(err);
        res.json({
            error: err
        })
    })
}


controller.actualizar_proyecto = (req, res) => {
    const { id_proyecto, responsable, nombre_proyecto, descripcion, name_img } = req.body;
    console.log('xxxx');
    img.upload.single(name_img)
    res.send('evio')
    /*   if (req.file) {
          console.log("entro");
          console.log(id_proyecto);
          console.log(responsable);
          console.log(nombre_proyecto);
          console.log(descripcion);
          console.log(name_img);
  
          console.log(req.file);
  
      } else {
          console.log("no entro");
          console.log("entro");
          console.log(id_proyecto);
          console.log(responsable);
          console.log(nombre_proyecto);
          console.log(descripcion);
          console.log(name_img);
  
      }
   */


}

controller.eliminar_usuario = (req, res) => {
    const { id_usuario } = req.body;
    usuario.eliminar(id_usuario).then((response) => {
        console.log(response);
        res.json({
            status: 'ok',
            url: '/panel-admin'
        })
    }).catch((err) => {
        console.log(err);
    })
}


controller.atualizar_rol_usuario = (req, res) => {
    const { id_usuario, role } = req.body;
    rol.consultar(role).then((response) => {
        const id_rol = response.id
        usuario.actualizar_rol(id_usuario, id_rol).then((response) => {
            console.log(response);
            res.json({
                status: 'ok',
                url: '/panel-admin'
            })
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })
}

controller.consultar_usuario = (req, res) => {
    const { user } = req.body;
    usuario.consultar_usuario(user).then((response) => {
        console.log(response);
        res.json(response)
    }).catch((err) => {
        console.log(err);
        res.json({
            err: 'No se encontro el usuario'
        })

    })
}




export default controller