const perfil = {}
import pool from '../database/conexion.js';
import b from './barrio.js';
import d from './direccion.js';
import t from './telefono.js';
import p from './persona.js';
import c from './tipo_cuenta.js';
perfil.actualizar = (req) => {
    const id_usuario = req.session.passport.user.id;
    return new Promise(async (resolve, reject) => {
        p.consultar_persona(id_usuario).then((response) => {
            const { nombre, direccion, barrio, telefono, tipo_cuenta,descripcion } = req.body;
            const id_persona = response.id;
            ActualizarNombre(id_persona, nombre,descripcion).then((response) => {
                if (response == "nombre actualizado") {
                    b.consultarBarrio().then((response) => {
                        console.log('se actualzio el nombre');
                        if (response == "si existe el barrio") {
                            b.actualizar_barrio(barrio).then((response) => {
                                console.log(response);
                                d.actualizar_direccion(direccion, id_persona).then((response) => {
                                    console.log(response);
                                    if (response == "se actualizo la direccion") {
                                        t.actualizar(telefono, id_persona).then((response) => {
                                            console.log(response);
                                            if (response == "telefono actualizado") {
                                                c.actualizar(req, tipo_cuenta).then((response) => {
                                                    console.log(response);
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
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                        b.registrar_barrio(barrio).then((response) => {
                            console.log(response);
                            d.registrar_direccion(id_persona, direccion).then((response) => {
                                console.log(response);
                                if (response == "direccion registrada") {
                                    t.registrar(id_persona, telefono).then((response) => {
                                        console.log(response);
                                        if (response == "telefono registrado") {
                                            c.actualizar(req, tipo_cuenta).then((response) => {
                                                console.log(response);
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
                        }).catch((err) => {
                            console.log(err);
                        })
                    })
                }
            }).catch((err) => {
                return reject(err)
            });
        }).catch((err) => {
            console.log(err);
        })



    })
}

perfil.consultar_perfil = (id) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('select p.nombre_completo as  nombre,p.descripcion, u.usuario,t.tipo,pa.nacionalidad, te.telefono,d.direccion, b.barrio from persona as p left join telefono as te on te.fk_persona = p.id_persona left join direccion as d on d.fk_persona = p.id_persona left join barrio as b on d.fk_barrio = b.id_barrio inner join pais as pa on p.fk_nacionalidad = pa.id_pais  inner join usuario as u on u.fk_persona = p.id_persona inner join tipo_cuenta as t on u.fk_tipo_cuenta = t.id_tipo_cuenta where u.id_usuario = $1', [id])
        if (sql.rowCount > 0) {
            return resolve(sql.rows[0])
        } else {
            return reject('No se encontro el usuario')
        }
    })
}

const ActualizarNombre = (id_persona, nombre,descripcion) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('UPDATE persona SET nombre_completo = $1, descripcion = $2 where  id_persona = $3 RETURNING *', [nombre,descripcion, id_persona])
        if (sql.rowCount > 0) {
            return resolve("nombre actualizado")
        } else {
            return reject("Error al actualizar el nombre")
        }

    })
}










export default perfil