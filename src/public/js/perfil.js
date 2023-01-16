const perfil = document.getElementById('perfil');
if (perfil != undefined && perfil != null && perfil != "") {


    const cuenta = document.getElementById('tipo_cuenta')
    const btn_actua_perfil = document.getElementById('btn_actua_perfil')




    const cargar_tipo_cuenta = () => {
        fetch("/tipo-cuenta", {
            method: "post",
        }).then(res => res.json())
            .then(res => {
                llenar_tipo_de_cuenta(res.cuenta, res.tipo)
            })
    }

    const llenar_tipo_de_cuenta = (datos) => {
        datos.forEach(element => {
            const option = document.createElement('option');
            option.text = element;
            cuenta.appendChild(option);
        });

    }


    const actualizar_perfil = () => {
        btn_actua_perfil.addEventListener('click', () => {
            var tipo_cuenta = cuenta.options[cuenta.selectedIndex].text
            var datos = new URLSearchParams();
            const nombre_perfil = document.getElementById('nombre_perfil').value;
            const barrio = document.getElementById('barrio').value;
            const direccion = document.getElementById('direccion').value;
            const telefono = document.getElementById('telefono').value;
            const descripcion = document.getElementById('descripcion').value;
            if (nombre_perfil != "") {
                if (barrio != "") {
                    if (direccion) {
                        if (telefono) {
                            if (descripcion != "") {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Datos actualizados de manera correcta',
                                    showConfirmButton: true,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.href = "http://localhost:5000/mi-perfil";
                                    }
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Debe ingresar la descripcion',
                                    footer: 'Ayudanos a la reforestacion'
                                })
                            }
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Debe ingresar el telefono',
                                footer: 'Ayudanos a la reforestacion'
                            })
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Debe ingresar la direccion',
                            footer: 'Ayudanos a la reforestacion'
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Debe ingresar el barrio',
                        footer: 'Ayudanos a la reforestacion'
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debe ingresar el nombre',
                    footer: 'Ayudanos a la reforestacion'
                })
            }
            datos.append("nombre", nombre_perfil);
            datos.append("barrio", barrio);
            datos.append("direccion", direccion);
            datos.append("telefono", telefono);
            datos.append("tipo_cuenta", tipo_cuenta);
            datos.append("descripcion", descripcion);
            fetch("/actualizar-perfil", {
                method: "post",
                body: datos,
            }).then(res => res.json())
                .then(res => {
                    console.log('datos enviados');
                })
        })

    }










    const main = () => {
        actualizar_perfil();

        cargar_tipo_cuenta();
    }

    main();
}
