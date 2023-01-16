import passport from 'passport';
import { Strategy } from 'passport-local';
import pool from '../../database/conexion.js'
import encriptar from './encrypt.js'
import usu from '../../models/usuario.js';
export var bandera_clave;
export var bandera_usuario;

passport.use('local.inicio.sesion', new Strategy({
    usernameField: 'usuario',
    passwordField: 'clave',
    passReqToCallback: true
}, async (req, usuario, clave, done) => {
    var user;
    usu.consultar_usuario(usuario).then(async (res) => {
        bandera_usuario = 'usuario_si_existe'
        const validar_clave = await encriptar.comparar(clave, res.c);
        user = res;
        if (validar_clave) {
            bandera_clave = 'clave_correcta'
            done(null, user);
        } else {
            bandera_clave = 'clave_incorrecta'
            done(null, user);
        }
    }).catch((err) => {
        user = {
            id: 1,
            usu: 'no existe',
            c: 'no existe'
        }
        console.log(err)
        bandera_usuario = 'usuario_no_existe'
        done(null, user);

    })

}));

passport.use('local.registro', new Strategy({
    usernameField: 'usuario',
    passwordField: 'clave',
    passReqToCallback: true
}, async (req, usuario, clave, done) => {
    try {
        const {nombre, nacionalidad, usuario, clave } = req.body;
        const clave_encriptada = await encriptar.encriptar(clave);
        const user = {
            nombre,
            nacionalidad,
            usuario,
            clave_encriptada
        }
        usu.consultar_usuario(user.usuario).then((res) => {
            console.log(res)
            bandera_usuario = 'usuario_si_existe'
            user.id = 1
            return done(null, user)
        }).catch((err) => {
            console.log(err)
            bandera_usuario = 'usuario_no_existe'
            usu.regitrar_usuario(user)
            usu.ConsultaUltimoUsuario().then((res) => {
                user.id = res
                return done(null, user)
            }).catch((err) => {
                console.log(err)
            })
        });

    } catch (err) {
        console.log("Error " + err)
    }
}));


passport.serializeUser((usuario, done) => {
    done(null, usuario)
})

passport.deserializeUser(async (usuario, done) => {
    const sql = await pool.query('select u.id_usuario as id, u.usuario,u.clave from usuario as u where u.id_usuario = $1', [usuario.id])
    if (sql.rowCount > 0) {
        done(null, sql.rows[0])
    } else {
        done(null, 1)
    }
})

export default passport