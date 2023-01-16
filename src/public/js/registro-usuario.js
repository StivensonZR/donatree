const registro = document.getElementById('registro-usaurio');
if (registro != undefined && registro != null && registro != "") {

    const btnRegistrarUsuario = document.getElementById('btn-registrar-usuario');
    const $btnSignIn = document.querySelector('.sign-in-btn'),
        $btnSignUp = document.querySelector('.sign-up-btn'),
        $signUp = document.querySelector('.sign-up'),
        $signIn = document.querySelector('.sign-in');
    window.onload = function () {
        login();
        cargar_nacionalidad();
    }


    const login = () => {


        document.addEventListener('click', e => {
            if (e.target === $btnSignIn || e.target === $btnSignUp) {
                $signIn.classList.toggle('active');
                $signUp.classList.toggle('active')
            }
        });
    }

    const cargar_nacionalidad = () => {
        fetch("/cargar-nacionalidad", {
            method: "post",
        }).then(res => res.json())
            .then(res => {
                llenar_nacionalidad(res);
            })
    }

    const llenar_nacionalidad = (datos) => {
        for (let i = 0; i < datos.nacionalidad.length; i++) {
            const selector = document.createElement('option');
            selector.text = datos.nacionalidad[i].na;
            nacionalidad.appendChild(selector);
        }
    }

    const registrar_usuario = () => {
        btnRegistrarUsuario.addEventListener('click', () => {
            const nombre_completo = document.getElementById('nombre_usuario').value;
            const nacionalidad = document.getElementById('nacionalidad').value;
            const usuario = document.getElementById('usuario').value;
            const clave = document.getElementById('clave').value;
            var datos = new URLSearchParams();
            if (nombre_completo != "") {
                if (nacionalidad != "Seleccione su nacionalidad") {
                    if (usuario != "") {
                        if (clave != "") {
                            datos.append("nombre", nombre_completo);
                            datos.append("nacionalidad", nacionalidad);
                            datos.append("usuario", usuario);
                            datos.append("clave", clave);
                            fetch("/registrar-usuario", {
                                method: "post",
                                body: datos
                            }).then(res => res.json())
                                .then(res => {
                                    if (res.status == "ok") {
                                        if (res.usuario == "usuario_no_existe") {
                                            const swalWithBootstrapButtons = Swal.mixin({
                                                customClass: {
                                                    confirmButton: 'btn btn-success',
                                                },
                                                buttonsStyling: false
                                            })
                                            swalWithBootstrapButtons.fire({
                                                title: 'Felicidades',
                                                text: "Has registrado los datos con Exito",
                                                icon: 'success',
                                                width: 600,
                                                padding: '3em',
                                                color: '#000000',
                                                backdrop: `
                                               rgba(0,0,123,0.4)`,
                                                showCancelButton: false,
                                                confirmButtonText: 'Ok',
                                                reverseButtons: true
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    $signIn.classList.toggle('active'),
                                                        $signUp.classList.toggle('active')
                                                }
                                            })
                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Oops...',
                                                text: 'El usuario ya existe',
                                                footer: 'Ayudanos a la reforestacion'
                                            })
                                        }
                                    }
                                })

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Debes registar tu contraseña',
                                footer: 'Ayudanos a la reforestacion'
                            })
                        }

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Debes registrar tu usuario ',
                            footer: 'Ayudanos a la reforestacion'
                        })
                    }

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Debes seleccionar tu nacionalidad',
                        footer: 'Ayudanos a la reforestacion'
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debes registrar tu nombre completo',
                    footer: 'Ayudanos a la reforestacion'
                })
            }


        })
    }

    const main = () => {
        registrar_usuario();
    }

    main();



}

