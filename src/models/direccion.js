const direccion = {}
import pool from '../database/conexion.js';
import barrio from './barrio.js';
direccion.actualizar_direccion = (direccion, id_persona) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('update direccion set direccion = $1 from direccion as d inner join persona as p on d.fk_persona = p.id_persona where p.id_persona = $2', [direccion, id_persona])
        if (sql.rowCount > 0) {
            return resolve('se actualizo la direccion')
        } else {
            return reject('error al actualizar la direccion')
        }
    })
}
direccion.registrar_direccion = (id_persona, direccion) => {
    return new Promise(async (resolve, reject) => {
        barrio.ultimo_barrio().then(async (response) => {
            if (response != "") {
                const sql = await pool.query('insert into direccion(fk_persona,fk_barrio,direccion)values($1,$2,$3)', [id_persona, response, direccion])
                if (sql.rowCount > 0) {
                    return resolve('direccion registrada')
                } else {
                    return reject('error al registrar la direccion')
                }
            }

        }).catch((err) => {
            console.log(err);
        })

    })
}


direccion.eliminar = (id_direccion) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('delete from direccion as d where d.id_direccion =$1', [id_direccion])
        if (sql.rowCount > 0) {
            return resolve('direccion eliminada')
        } else {
            return reject("error al eliminar la direccion")
        }
    })
}


export default direccion;