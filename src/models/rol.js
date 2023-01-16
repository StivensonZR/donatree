import pool from "../database/conexion.js";

const rol = {}

rol.consultar = (rol) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('select r.id_rol as id,r.rol from rol as r where r.rol=$1', [rol]);

        if (sql.rowCount > 0) {
            return resolve(sql.rows[0])
        } else {
            return reject('No se encontro el rol')
        }
    })
}

export default rol;