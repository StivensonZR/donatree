const usuario = document.getElementById('panel-admin')
if (usuario != null && usuario != undefined && usuario != "") {
  var btn_eliminar = document.querySelectorAll('.btn_eliminar_usuario');
  btn_eliminar.forEach(boton => {
    boton.addEventListener('click', () => {
      var id_usuario = boton.id
      var delimitador;
      for (let i = 0; i < id_usuario.length + 1; i++) {
        if (id_usuario.substring(i, (i + 1)) == "/") {
          delimitador = i
        }
      }
      var id_user = id_usuario.substring(0, delimitador);
      var correo = id_usuario.substring(delimitador + 1, id_usuario.length);
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Eliminar Usuario',
        text: "¿Realemete quieres eliminar este usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'si, eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          var datos = new URLSearchParams();
          datos.append("id_usuario", id_user)
          datos.append("correo", correo)
          fetch("/eliminar/usuario", {
            method: "post",
            body: datos
          }).then(res => res.json())
            .then(res => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuario eliminado de manera correcta',
                showConfirmButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  if (res.status == "ok") {
                    window.location.href = res.url;
                  }
                }
              })

            })
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'No se ha eliminado el usuario :)',
            'error'
          )
        }
      })
    })
  });



  var btn_actualizar = document.querySelectorAll('.btn_actualizar_usuario');
  btn_actualizar.forEach(boton => {
    boton.addEventListener('click', () => {
      $('#edit-usuario').modal('show');
      var id_usuario = boton.id
      var btn_confirmar = document.getElementById('btn_actualizar_usuario');
      btn_confirmar.addEventListener('click', () => {
        const rol = document.getElementById('rol').value

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Actualizar Usuario',
          text: "¿Realemete quieres volver administrador este usuario?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'si, actualizar',
          cancelButtonText: 'No, cancelar',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            var datos = new URLSearchParams();
            datos.append("id_usuario", id_usuario)
            datos.append("role", rol)
            swalWithBootstrapButtons.fire(
              fetch("/actualizar/rol/usuario", {
                method: "post",
                body: datos
              }).then(res => res.json())
                .then(res => {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Datos actualizados de manera correcta',
                    showConfirmButton: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      $('#edit-usuario').modal('hide')
                      window.location.href = res.url;
                    }
                  })
                })
            )
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'No se ha actualizado el usuario :)',
              'error'
            )
          }
        })
      })
    })
  });



  const cargar_nacionalidad = () => {
    fetch("/cargar-nacionalidad", {
      method: "post",
    }).then(res => res.json())
      .then(res => {
        llenar_nacionalidad(res);
      })
  }

  const llenar_nacionalidad = (datos) => {
    const nacionalidad = document.getElementById('nacionalidad');
    for (let i = 0; i < datos.nacionalidad.length; i++) {
      const selector = document.createElement('option');
      selector.text = datos.nacionalidad[i].na;
      nacionalidad.appendChild(selector);
    }
  }



  const registrar_usuario = () => {
    const btnRegistrarUsuario = document.getElementById('btn-registrar-usuario');
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
                          if (res.status == "ok") {
                            $('#exampleModal2').modal('hide')
                            window.location.href = 'http://localhost:5000/panel-admin';
                          }
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


  const Buscar = () => {
    const btn_buscar = document.getElementById('btn_buscar');

    btn_buscar.addEventListener('click', () => {
      const buscar = document.getElementById('input_buscar').value;
      if (buscar != "" && buscar != "undefined") {

        var datos = new URLSearchParams();
        datos.append("user", buscar);
        fetch("/buscar/usuario", {
          method: "post",
          body: datos,
        }).then(res => res.json())
          .then(res => {
            console.log('hppp res');

            if (res.err == "No se encontro el usuario") {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario no existe',
                footer: 'Ayudanos a la reforestacion'
              })
            } else {
              const table = document.getElementById("tabla_usuario")
              table.innerHTML = '<thead class="table-dark"><td>Usuario</td><td> Nombre</td><td>  Teléfono</td> <td>Rol Usuario</td><td></td></thead>  <tbody id="datos_usuario"> <tr> <td> ' + res.usu + ' </td><td>' + res.nombre_completo + '</td><td>' + res.telefono + '</td><td>' + res.rol + '</td><td><button id=' + res.id + ' onclick = "actualizar_usuario_consultado(' + res.id + ')"   class="btn btn_actualizar_usuario  "><span class="material-icons">block</span></button>  <button  id=' + res.id + ' onclick = "eliminar_usuario_consultado(' + res.id + ')" class="btn btn_eliminar_usuario"> <span class="material-icons"> person_remove</span></button></td></tbody>'
            }
          })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debes ingresar el correo que deseas buscar',
          footer: 'Ayudanos a la reforestacion'
        })
      }

    })
  }

  function actualizar_usuario_consultado(id_usuario) {
    $('#edit-usuario').modal('show');
    var btn_confirmar = document.getElementById('btn_actualizar_usuario');
    btn_confirmar.addEventListener('click', () => {
      const rol = document.getElementById('rol').value
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Actualizar Usuario',
        text: "¿Realemete quieres volver administrador este usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'si, actualizar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          var datos = new URLSearchParams();
          datos.append("id_usuario", id_usuario)
          datos.append("role", rol)
          swalWithBootstrapButtons.fire(
            fetch("/actualizar/rol/usuario", {
              method: "post",
              body: datos
            }).then(res => res.json())
              .then(res => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Datos actualizados de manera correcta',
                  showConfirmButton: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    $('#edit-usuario').modal('hide')
                    window.location.href = res.url;
                  }
                })
              })
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'No se ha actualizado el usuario :)',
            'error'
          )
        }
      })
    })



  }

  function eliminar_usuario_consultado(id_user) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Eliminar Usuario',
      text: "¿Realemete quieres eliminar este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        var datos = new URLSearchParams();
        datos.append("id_usuario", id_user)

        fetch("/eliminar/usuario", {
          method: "post",
          body: datos
        }).then(res => res.json())
          .then(res => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario eliminado de manera correcta',
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                if (res.status == "ok") {
                  window.location.href = res.url;
                }
              }
            })

          })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'No se ha eliminado el usuario :)',
          'error'
        )
      }
    })

  }



  const main = () => {
    cargar_nacionalidad();
    registrar_usuario();
    Buscar();
  }

  main();


}