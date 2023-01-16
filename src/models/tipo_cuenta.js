import pool from '../database/conexion.js';
const cuenta = {};


cuenta.actualizar = (req, cuenta) => {
    return new Promise(async (resolve, reject) => {
        const id_usuario = req.session.passport.user.id;
        var cue;
        if (cuenta == "Empresarial") {
            cue = 1
        } else {
            cue = 2
        }

        const sql = await pool.query('update usuario set fk_tipo_cuenta = $1 where usuario.id_usuario=$2', [cue, id_usuario])
        if (sql.rowCount > 0) {
            return resolve('tipo de cuenta actualizada')
        } else {
            return reject("error al actualizar el tipo de cuenta")
        }
    })
}

export default cuenta;