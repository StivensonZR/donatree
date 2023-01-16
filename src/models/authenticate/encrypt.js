import bcrypt from 'bcryptjs';

const encriptacion = {};

encriptacion.encriptar = async (clave) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(clave, salt);
    return hash;
}

encriptacion.comparar = async (clave, clave_guardada) => {
    var clave_guardada_sin_espacios = clave_guardada.split(" ").join("");
    const comparar = await bcrypt.compare(clave, clave_guardada_sin_espacios)
    return comparar;
}

export default encriptacion;