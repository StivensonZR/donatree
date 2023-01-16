const cerrar_sesion = document.getElementById('cerrar-sesion');
if (cerrar_sesion != null && cerrar_sesion != undefined && cerrar_sesion != "") {

    cerrar_sesion.addEventListener('click', () => {
        fetch("/cerrar-sesion", {
            method: "post",
        }).then(res => res.json())
            .then(res => {
                if (res.status == 'ok') {
                    window.location.href = res.url;
                }
            })
    })
}