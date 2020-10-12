export default {
  description: "Administración del Sistema de Índices y Precios",
  display_name: "Administración",
  short_name: "Administración",
  main_menu: {
    rol: "Roles",
    traza: "Trazas",
    usuario: "Usuarios",
  },
  modules: {
    usuario: {
      pages: {
        add_usuario: {
          form_reset_button: "Limpiar",
          form_send_button: "Aceptar",
          form_title: "Registrar nuevo usuario",
          page_title: "Nuevo usuario",
        },
        usuario_list: {
          action_list: {
            add: "Nuevo usuario",
            delete: "Eliminar usuario",
            edit: "Modificar usuario",
            visualizar: "Visualizar usuario",
            cambiar_password: "Cambiar password",
            activar: "Activar usuario",
            desactivar: "Desactivar usuario",
          },
          header_list: {
            actions: "Acciones",
            cargo: "Cargo",
            dpa: "Dpa",
            nombre: "Nombre",
            primer_apellido: "Primer apellido",
            segundo_apellido: "Segundo apellido",
            usuario: "Usuario",
            activo: "Activo",
          },
          list_search_label: "Buscar",
          list_title: "Lista de usuarios",
          page_title: "Lista de usuarios",
        },
        edit_usuario: {
          page_title: "Modificar usuario",
          form_title: "Actualizar usuario",
        },
        visualizar_usuario:{
          page_title: "Visualizar usuario",
        },
        cambiar_password:{
          page_title: "Cambiar contraseña",
          form_title: "Cambiar contraseña",
        }
      },
      page_title: "Administración de Usuarios",
      add_usuario_button: "Nuevo usuario",
    },
    rol: {
      pages: {
        add_rol: {
          form_reset_button: "Limpiar",
          form_send_button: "Aceptar",
          form_title: "Registrar nuevo rol",
          page_title: "Nuevo rol",
          rol: "Rol",
        },
        rol_list: {
          action_list: {
            add: "Nuevo rol",
            enable: "Activar rol",
            disable: "Desactivar rol",
            edit: "Modificar rol",
          },
          header_list: {
            descripcion: "Descripción",
            permiso: "Permiso",
            activo: "Activo"
          },
          list_search_label: "Buscar",
          list_title: "Listado de roles",
          page_title: "Listado de roles",
        },
        edit_rol: {
          page_title: "Modificar rol",
          form_send_button: "Actualizar",
          form_title: "Modificar rol",
        },
      },
      page_title: "Administración de roles",
      required: "Este campo es obligatorio.",
      add_rol_button: "Nuevo rol"
    },
    traza:{
      pages:{
        traza_list:{
          page_title: "Listar Trazas",
        }
      },
    }
  },
  page_title: "Sistema de Administración"
};
