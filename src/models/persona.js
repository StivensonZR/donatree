import pool from '../database/conexion.js'
const persona = {};

persona.regitrar_persona = (id_nacionalidad, nombre) => {
    return new Promise(async (resolve, reject) => {
        var descripcion = "Este perfil apoya la reforestación de la Amazonia"
        const persona = await pool.query('insert into persona (fk_nacionalidad,nombre_completo,descripcion)values($1,$2,$3) RETURNING *', [id_nacionalidad, nombre, descripcion]);
        if (persona.rowCount > 0) {
            return resolve("se regitro la persona con exito")
        } else {
            return rejects("no se registro la persona")
        }
    })
}

persona.consultar_ultima_persona = () => {
    return new Promise(async (resolve, reject) => {
        const ultima_persona = await pool.query('select max(id_persona) as id from persona');
        if (ultima_persona.rowCount > 0) {
            return resolve(ultima_persona.rows[0].id);
        } else {
            return reject('no se consulto la ultima persona')
        }
    })

}

persona.consultar_persona = (id_usuario) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('select p.id_persona as id, p.nombre_completo as nombre from persona as p inner join usuario as u on p.id_persona = u.fk_persona where u.id_usuario = $1', [id_usuario])
        if (sql.rowCount > 0) {
            return resolve(sql.rows[0])
        } else {
            return reject("error al consultar la persona")
        }
    })
}


persona.registrar_encargado = (resposable) => {
    return new Promise(async (resolve, reject) => {
        var descripcion = "El usuario es un encargado de un proyecto"
        const persona = await pool.query('insert into persona (nombre_completo,descripcion)values($1,$2) RETURNING *', [resposable, descripcion]);
        if (persona.rowCount > 0) {
            return resolve("se regitro la persona encargada con exito")
        } else {
            return rejects("no se registro la persona encargada")
        }
    })
}


persona.eliminar = (id_persona) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query("delete from persona as p where  p.id_persona=$1 RETURNING *", [id_persona])
        if (sql.rowCount) {
            return resolve('se elimino la persona de manera correcta')
        } else {
            return reject('Error al eliminar la persona')
        }
    })
}

persona.actualizar = (id_persona,nombre) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query("update persona set nombre_completo = $1 where id_persona = $2", [nombre,id_persona])
        if (sql.rowCount > 0) {
            return resolve('persona actualizada')
        } else {
            return reject('error al actualizar la persona')
        }

    })
}

persona.eliminar = (id_persona) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('delete from persona as p where p.id_persona =$1 ', [id_persona])
        if (sql.rowCount > 0) {

            return resolve('persona eliminado')
        } else {
            return reject("error al eliminar la persona")
        }
    })
}

export default persona;