import pool from '../database/conexion.js';
const telefono = {}


telefono.registrar = (id_persona, telefono) => {
    return new Promise(async (resolve, reject) => {
        var sql = await pool.query('insert into telefono(fk_persona,telefono)values($1,$2)', [id_persona, telefono])
        if (sql.rowCount > 0) {
            return resolve('telefono registrado')
        } else {
            return reject('error al registrar el telefono')
        }
    })
}


telefono.actualizar = (telefono, id_persona) => {
    return new Promise(async (resolve, reject) => {
        var sql = await pool.query('update telefono set telefono = $1 where fk_persona=$2', [telefono, id_persona])
        if (sql.rowCount > 0) {
            return resolve('telefono actualizado')
        } else {
            return reject('error al actualizar el telefono')
        }
    })
}
telefono.eliminar = (id_telefono) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('delete from telefono as t where t.id_telefono =$1 ', [id_telefono])
        if (sql.rowCount > 0) {
            return resolve('error al eliminar el telefono')
        } else {
            return reject("error al eliminar el telefono")
        }
    })
}

export default telefono