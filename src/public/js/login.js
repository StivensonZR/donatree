
const contenedorlogin = document.getElementById('contenedor-login');
if (contenedorlogin != undefined && contenedorlogin != null && contenedorlogin != "") {
    const btn_login = document.getElementById('btn_login');
    window.onload = function () {
        login();
    }


    const login = () => {
        const $btnSignIn = document.querySelector('.sign-in-btn'),
            $btnSignUp = document.querySelector('.sign-up-btn'),
            $signUp = document.querySelector('.sign-up'),
            $signIn = document.querySelector('.sign-in');

        document.addEventListener('click', e => {
            if (e.target === $btnSignIn || e.target === $btnSignUp) {
                $signIn.classList.toggle('active');
                $signUp.classList.toggle('active')
            }
        });
    }

    const iniciarSesion = () => {
        btn_login.addEventListener('click', () => {
           
            const usuario = document.getElementById('login-usuario').value
            const clave = document.getElementById('login-clave').value

            if (usuario != "") {
                if (clave != "") {
                    var datos = new URLSearchParams();
                    datos.append("usuario", usuario);
                    datos.append("clave", clave);
                    fetch("/inicio-sesion", {
                        method: "post",
                        body: datos
                    }).then(res => res.json())
                        .then(res => {
                          
                            if (res.status == "ok") {
                                if (res.usuario == "usuario_si_existe") {
                                    if (res.clave == "clave_correcta") {
                                        window.location.href = res.url;
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Contraseña incorrecta',
                                            footer: 'Ayudanos a la reforestacion'
                                        })
                                    }
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'El usuario no existe',
                                        footer: 'Ayudanos a la reforestacion'
                                    })
                                }
                            }


                        })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Debes ingresa tu contraseña',
                        footer: 'Ayudanos a la reforestacion'
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debes ingresar tu usuario',
                    footer: 'Ayudanos a la reforestacion'
                })
            }

        })
    }

    const main = () => {
        iniciarSesion();
    }

    main();




}

