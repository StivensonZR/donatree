const validar = {}
export var pago = false;
validar.datos = (dato) => {
    if (dato == undefined || dato == "" || dato == null) {
        return "No_registra"
    } else {
        return dato
    }
}

validar.telefono = (telefono) => {
    if (telefono == undefined || telefono == "" || telefono == null) {
        telefono = 123;
        return telefono
    } else {
        return telefono
    }
}




export default validar;