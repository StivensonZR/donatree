import pool from '../database/conexion.js';
const barrio = {}

barrio.consultarBarrio = () => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('select b.barrio from barrio as b inner join direccion as d on d.fk_barrio= b.id_barrio')
        if (sql.rowCount > 0) {
            return resolve('si existe el barrio');
        } else {
            return reject('no existe el barrio')
        }
    })
}

barrio.registrar_barrio = (barrio) => {
    return new Promise(async (resolve, reject) => {
        var sql = await pool.query('insert into barrio(barrio) values($1)', [barrio])
        if (sql.rowCount > 0) {
            return resolve('barrio registardo');
        } else {
            return reject('error al registrar el barrio')
        }

    })
}

barrio.actualizar_barrio = (barrio) => {
    return new Promise(async (resolve, reject) => {
        var sql = await pool.query('update barrio set barrio = $1 from  barrio as b inner join direccion as d on d.fk_barrio= b.id_barrio', [barrio])
        if (sql.rowCount > 0) {
            return resolve('barrio actualizado');
        } else {
            return reject('error al actualizar el barrio')
        }

    })
}

barrio.ultimo_barrio = () => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('select max(b.id_barrio) as id from barrio as b')
        if (sql.rowCount > 0) {
            return resolve(sql.rows[0].id)
        } else {
            return reject('Error al consultar el ultimo barrio')
        }
    })
}

barrio.eliminar = (id_barrio) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('delete from barrio as b where b.id_barrio =$1 ', [id_barrio])
        if (sql.rowCount > 0) {

            return resolve('barrio  eliminado')
        } else {
            return reject("error al eliminar el barrio")
        }
    })
}

export default barrio;