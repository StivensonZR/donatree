
import pool from '../database/conexion.js'
const pais = {}
//export var nacionalidad = new Array();

pais.ConsultarNaniconalidad = async () => {
    const sql = await pool.query('select pais.nacionalidad as na from pais');
    return new Promise((resolve, reject) => {
        if (sql.rowCount > 0) {
            var nacionalidad = new Array()
            sql.rows.forEach(function (item) {
                nacionalidad.push(item)
            });
           
            return resolve(sql.rows)
        } else {
            return reject("Error no se consulto la nacionalidad de manera correcta")
        }
    })
}

pais.ConsultarNacioanlidad = async (nacionalidad) => {
    const sql = await pool.query('select p.id_pais as id, p.pais,p.nacionalidad from pais as p where p.nacionalidad = $1', [nacionalidad])
    return new Promise((resolve, reject) => {
        if (sql.rowCount > 0) {
            return resolve(sql.rows[0])
        } else {
            return reject("No se encontro registros de nacionaldiad")
        }
    });

}

export default pais;