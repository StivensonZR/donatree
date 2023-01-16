import pool from '../database/conexion.js';
import p from '../models/persona.js';
import i from '../models/imagenes.js';
import { resolve } from 'path';
const proyecto = {}


proyecto.registrar = (req) => {
    return new Promise((resolve, reject) => {
        const { resposable, nombre_proyecto, descripcion_proyecto } = req.body;
        p.registrar_encargado(resposable).then((response) => {
            console.log(response);
            if (response == "se regitro la persona encargada con exito") {
                i.registar(req).then((response) => {
                    console.log(response);
                    registrar_proyecto(req, nombre_proyecto, descripcion_proyecto).then((response) => {
                        if (response == "se registro el proyecto") {
                            console.log(response)
                            return resolve('se registro el proyecto de manera exitosa')
                        }
                    }).catch((err) => {
                        console.log(err);
                        return reject(err)
                    })
                }).catch((err) => {
                    console.log(err);
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    })

}

const registrar_proyecto = (req, proyecto, descripcion) => {
    const id_usuario = req.session.passport.user.id;
    return new Promise((resolve, reject) => {
        p.consultar_ultima_persona().then((response) => {
            const id_responsable = response
            i.consultar_ultima_imagen().then(async (response) => {
                const id_imagen = response
                const sql = await pool.query('insert into proyecto(fk_responsable,fk_usuario,fk_img,proyecto, descripcion,estado)values($1,$2,$3,$4,$5,$6)RETURNING *', [id_responsable, id_usuario, id_imagen, proyecto, descripcion, true])
                if (sql.rowCount > 0) {
                    return resolve('se registro el proyecto')
                } else {
                    return reject('error , no se registro el proyecto')
                }
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err);
        })

    })
}


proyecto.consultar = () => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('select r.id_persona as id_responsable, r.nombre_completo as responsable,i.id_imagen as id_img,i.url as img, p.id_proyecto as id_proye ,p.proyecto ,p.descripcion from proyecto as p inner join persona as r on p.fk_responsable= r.id_persona inner join imagen as i on p.fk_img = i.id_imagen')
        if (sql.rowCount > 0) {
            return resolve(sql.rows)
        } else {
            return reject('no hay proyectos')
        }
    })
}

proyecto.consultar_proyecto_por_id = (id_proyecto) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('select r.id_persona as id_responsable, r.nombre_completo as responsable,i.id_imagen as id_img,i.url as img, p.id_proyecto as id_proye ,p.proyecto ,p.descripcion from proyecto as p inner join persona as r on p.fk_responsable= r.id_persona inner join imagen as i on p.fk_img = i.id_imagen where p.id_proyecto = $1', [id_proyecto])
        if (sql.rowCount > 0) {
            return resolve(sql.rows[0])
        } else {
            return reject('no hay proyectos')
        }
    })
}

proyecto.actualizar = (id_proyecto, proyecto, descripcion) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('update proyecto set proyecto = $1, descripcion = $2 where id_proyecto = $3 RETURNING *', [proyecto, descripcion, id_proyecto])
        if (sql.rowCount > 0) {
            return resolve('El proyecto se ha actualizado de manera correcta')
        } else {
            return reject('Error al actualizar el proyecto')
        }
    })
}
proyecto.eliminar = (id_proyecto) => {

    return new Promise(async (resolve, reject) => {
        const sql = await pool.query("delete from proyecto as p where  p.id_proyecto=$1 RETURNING *", [id_proyecto])
        if (sql.rowCount) {
            return resolve('El proyecto se elimino de manera correcta')
        } else {
            return reject('Error al eliminar el proyecto')
        }
    })
}

export default proyecto