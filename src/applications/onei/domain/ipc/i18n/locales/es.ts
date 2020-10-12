export default {
  description: "Administración de Índices y Precios del Consumidor",
  display_name: "Índices y Precios del Consumidor",
  short_name: "IPC",
  main_menu: {
    clasificador: "Clasificadores",
    establecimiento: "Establecimientos",
    nomenclador: "Nomencladores",
    variedadEstablecimiento: "Variedad Establecimiento",
    caracteristicas: "Características",
    listarcaptaciones: "Captaciones de Precio",
    listarPreciosFueraRango: "Precios Fuera de Rango",
    imputarprecio:"Imputar Precio",

    planificacion: "Planificación"
  },
  modules: {
    clasificador: {
      page_title: "Gestión de Clasificadores",
      pages: {},
    },
    variedad: {
      page_title: "Adicionar variedad",
      list_variedad: {
        header_list: {
          code: "Código de variedad",
          name: "Nombre de variedad",
        },
        action_list: {
          specification: "Especificaciones de la variedad",
          no_specification: "No hay características asociada a esta variedad",
        }
      }
    },
    caracteristicas: {
      page_title: "Gestión de Características",
      page: {
        list: {
          add_button: "Registrar característica",
          header: {
            nombre: "Nombre",
            especificaciones: "Especificaciones",
            estado: "Estado",
            acciones: "Acciones"
          },
          search: {
            nombre: "Nombre"
          },
          action_list: {
            edit: "Editar",
            view: "Visualizar",
            delete: "Eliminar",
            disable: "Desactivar",
            enable: "Activar",
            estado: {
              disable: "Desactivo",
              enable: "Activo",
            }
          },
          dialog_delete: {
            dialog_tittle: "Eliminar característica",
            message: "¿Está seguro que desea eliminar la característica seleccionada?",
            sub_message: "*Se eliminarán todas sus especificaciones.",
            button: {
              ok: "Si",
              cancel: "No",
            }
          }
        },
        add: {
          page_title: "Adicionar características",
          form_title: "Registrar nueva característica",
          fields: {
            name: "Nombre",
            active: "Activo",
            label_especificaciones: "Especificaciones",
            header_especificaciones: {
              nombre: "Nombre",
              acciones: "Acciones"
            },
            dialog_add: {
              dialog_tittle: "Registrar especificación",
              name: "Nombre",
              button: {
                save: "Guardar",
                cancel: "Cancelar",
                adicionar_especificacion: "Adicionar"
              }
            },
            dialog_edit: {
              dialog_tittle: "Actualizar especificación",
            }
          }
        },
        edit: {
          page_title: "Editar características",
          form_title: "Editar característica",
          fields: {
            name: "Nombre",
            active: "Activo",
            label_especificaciones: "Especificaciones",
            header_especificaciones: {
              nombre: "Nombre",
              acciones: "Acciones",
              estado: "Estado"
            },
            dialog_add: {
              dialog_tittle: "Registrar especificación",
              name: "Nombre",
              button: {
                save: "Guardar",
                cancel: "Cancelar",
                adicionar_especificacion: "Adicionar"
              }
            },
            dialog_edit: {
              dialog_tittle: "Actualizar especificación",
            },
            dialog_delete: {
              dialog_tittle: "Eliminar especificación",
              message: "¿Está seguro que desea eliminar la especificación seleccionada?",
              button: {
                ok: "Si",
                cancel: "No",
              }
            }
          },
          action_list: {
            edit: "Editar",
            delete: "Eliminar",
            disable: "Desactivar",
            enable: "Activar",
            estado: {
              disable: "Desactivo",
              enable: "Activo",
            }
          }
        },
        view: {
          page_title: "Visualizar características",
          form_title: "Visualizar característica",
          fields: {
            name: "Nombre",
            active: "Activo",
            label_especificaciones: "Especificaciones",
            header_especificaciones: {
              nombre: "Nombre",
              estado: "Estado"
            },
          }
        }
      },
    },
    establecimiento: {
      messages: {
        alert_delete: "¿Está seguro que desea eliminar el establecimiento seleccionado?",
        add_success: "Se ha guardado correctamente el establecimiento",
        add_error: "Error al intentar registrar el establecimiento",
        edit_success: "Se ha actualizado correctamente el establecimiento",
        edit_error: "Error al intentar actualizar el establecimiento",
        delete_success: "Se ha eliminado correctamente el establecimiento",
        delete_error: "Error al intentar eliminar el establecimiento"
      },
      pages: {
        add_establecimiento: {
          form_reset_button: "Limpiar",
          form_send_button: "Aceptar",
          form_title: "Registrar nuevo establecimiento",
          page_title: "Nuevo establecimiento",
        },
        list_establecimiento: {
          action_list: {
            add: "Nuevo establecimiento",
            delete: "Eliminar establecimiento",
            edit: "Modificar establecimiento",
            view: "Visualizar establecimiento",
            relation: "Relacionar variedad al establecimiento ",
            add_variety: "Añadir variedad",
            next: "CONTINÚE",
            save: "Guardar",
            previous: "Anterior"
          },
          header_list: {
            state: "Estado",
            code: "Código",
            variety: "Variedad",
            establishment: "Establecimiento",
            typology: "Tipología",
            market: "Mercado",
            address: "Dirección",
            actions: "Acciones"
          },
          list_search_label: "Buscar",
          list_title: "Lista de establecimiento"
        },
        edit_establecimiento: {
          form_title: "Modificar establecimiento",
          page_title: "Modificar establecimiento"
        },
        view_establecimiento: {
          form_title: "Visualizar establecimiento",
          page_title: "Visualizar establecimiento"
        },
        relations_variety_establishment: {
          form_title: "Relacionar Variedad y Establecimiento",
          page_title: "Relacionar Variedad y Establecimiento",
        }
      },
      page_title: "Gestión de Establecimientos",
      add_button: "Registrar establecimiento",
      types: {
        Category: "Categoría",
        Observation: "Observación",
        Incidence: "Incidencia",
        Market: "Mercado",
        Typology: "Tipología",

        categoria: "Categoría",
        observacion: "Observación",
        incidencia: "Incidencia",
        mercado: "Mercado",
        tipologia: "Tipología"
      },
      fields: {
        establishment: "Establecimiento",
        dpa: "DPA",
        market: "Mercado",
        typology: "Tipología",
        date: "Fecha a captar",
        name: "Nombre",
        address: "Dirección",
        contact: "Nombre del contacto",
        phone: "Teléfono del contacto",
        active: "Activo",
        search: "Buscar",
        true: "Alta",
        false: "Baja",
        code: "Código",
        variety: "Variedad",
        day: "Día a captar",
        Baja: "Alta",
        Alta: "Baja",
        cantidad: "Cantidad",
        unidadMedida: "Unidad de medida"
      }
    },
    nomenclador: {
      messages: {
        add_success: "Se ha guardado correctamente el nomenclador",
        add_error: "Error al intentar registrar el nomenclador",
        edit_success: "Se ha actualizado correctamente el nomenclador",
        edit_error: "Error al intentar actualizar el nomenclador"
      },
      pages: {
        add_nomenclador: {
          form_reset_button: "Limpiar",
          form_send_button: "Aceptar",
          form_title: "Registrar nuevo nomenclador",
          page_title: "Nuevo nomenclador",
        },
        list_nomenclador: {
          action_list: {
            add: "Nuevo nomenclador",
            delete: "Eliminar nomenclador",
            edit: "Modificar nomenclador",
            view: "Visualizar nomenclador"
          },
          header_list: {
            id: "Id",
            description: "Nombre",
            type: "Tipo de nomenclador",
            active: "Activo",
            actions: "Acciones"
          },
          list_search_label: "Buscar",
          list_title: "Lista de nomencladores"
        },
        edit_nomenclador: {
          form_title: "Modificar nomenclador",
          page_title: "Modificar nomenclador"
        },
        view_nomenclador: {
          form_title: "Visualizar nomenclador",
          page_title: "Visualizar nomenclador"
        }
      },
      page_title: "Gestión de Nomencladores",
      add_nomenclador_button: "Registrar nomenclador",
      types: {
        Cargo: "Cargo",
        Category: "Categoría",
        Observation: "Observación",
        Incidence: "Incidencia",
        Market: "Mercado",
        Typology: "Tipología",
        DPA: "DPA",
        Currency: "Moneda",
        WeighingType: "Tipo de ponderación",
        VarietyType: "Tipo de variedad",
        ClassifierType: "Tipo de clasificador",
        MeasurementUnit: "Unidad de Medida",
        MeasurementUnitType: "Tipo de Unidad de Medida",
        Region: "Región",

        cargo: "Cargo",
        categoria: "Categoría",
        observacion: "Observación",
        incidencia: "Incidencia",
        mercado: "Mercado",
        tipologia: "Tipología",
        dpa: "DPA",
        moneda: "Moneda",
        tipo_ponderacion: "Tipo de ponderación",
        tipo_variedad: "Tipo de variedad",
        tipo_clasificador: "Tipo de clasificador",
        unidad_medida: "Unidad de Medida",
        tipo_unidad_medida: "Tipo de Unidad de Medida",
        region: "Región"
      },
      fields: {
        name: "Nombre",
        type_nomenclator: "Tipo de nomenclador",
        active: "Activo",
        acronym: "Siglas",
        code: "Código",
        categories: "Categorias",
        regiones: "Regiones",
        tipo_unidad_medidas: "Tipo de Unidad de Medida",
        imputed: "Imputado",
        search: "Buscar",
        true: "si",
        false: "no"
      },
      link: {
        Cargo: "cargo",
        Category: "categoria",
        Observation: "observacion",
        Incidence: "incidencia",
        Market: "mercado",
        Typology: "tipologia",
        Dpa: "dpa",
        Moneda: "moneda",
        Tipo_Ponderacion: "tipo ponderación",
        Tipo_Variedad: "tipo variedad",
        Tipo_Clasificador: "tipo clasificador",
        Unidad_Medida: "unidad de medida",
        Tipo_Unidad_Medida: "tipo unidad de medida",
        Region: "región"
      }
    },
    variedadEstablecimiento: {
      messages: {
        alert_delete: "¿Está seguro que desea eliminar la variedad en el establecimiento?",
        add_success: "Se ha relacionado correctamente la variedad en el establecimiento",
        add_error: "Error al intentar relacionar la variedad en el establecimiento",
        edit_success: "Se ha actualizado correctamente la variedad en el establecimiento",
        edit_error: "Error al intentar actualizar la variedad en el establecimiento",
        delete_success: "Se ha eliminado correctamente la variedad en el establecimiento",
        delete_error: "Error al intentar eliminar la variedad en el establecimiento"
      },
      page_title: "Gestionar Variedad-Establecimiento",
      pages: {
        list_variedad_establecimiento: {
          action_list: {
            add: "Nuevo variedad establecimiento",
            delete: "Eliminar variedad establecimiento",
            edit: "Modificar variedad establecimiento",
            view: "Visualizar variedad establecimiento"
          },
          header_list: {
            state: "Estado",
            variety: "Variedad",
            establishment: "Establecimiento",
            market: "Mercado",
            dpa: "DPA",
            date: "Fecha a captar",
            um: "UM",
            actions: "Acciones"
          },
          list_search_label: "Buscar",
          list_title: "Variedades - Establecimientos"
        },
        edit_variedad_establecimiento: {
          form_title: "Modificar variedad establecimiento",
          page_title: "Modificar variedad establecimiento"
        },
        view_variedad_establecimiento: {
          form_title: "Visualizar variedad establecimiento",
          page_title: "Visualizar variedad establecimiento"
        }
      },
      fields: {
        varieties: "Variedad"
      }
    },
    listarCaptaciones: {
      page_title: "Captaciones de Precio",
      self_component: {

        market: "Mercado",
        tipology: "Tipologia",
        establecimiento: "Establecimiento",
        month: "Mes",
        year: "Año",
        dpa: "DPA",
        variedad: "Variedad",
        select_date: "Seleccione la fecha",
        user: "Usuario",
        search: "Buscar",
        io: "I/O",
        moneda: "Moneda",
        date: "Fecha",
        cantidad: "Cantidad",
        um: "UM",
        action: "Acciones",
        precio: "Precio",
        rows_per_page: "Filas por página",
        expor: "Exportar",
        faltantes: "Faltantes"
      }
    },

    listarPreciosFueraRango: {
      page_title: "Precios Fuera de Rango",
      self_component: {
        market: "Mercado",
        variacion: "Variacion",
        establecimiento: "Establecimiento",
        month: "Mes",
        year: "Año",
        dpa: "DPA",
        um:"UM",
        variedad: "Variedad",
        semana: "Semana de Captacion",
        precio: "Precios",
        aprobar: "Aprobar",
        desaprobar: "Desaprobar",
        export: "Exportar",
        anterior: "Anterior",
        actual: "Actual",
        relativo: "Relativo",
        sustituido: "Sustituido"

      },

    },
    imputarprecio: {
      page_title: "Imputar Precio",
      self_component: {
        market: "Mercado",
        variacion: "Variacion",
        establecimiento: "Establecimiento",
        month: "Mes",
        year: "Año",
        dpa: "DPA",
        um:"UM",
        tipologia:"Tipologia",
        variedad: "Variedad",
        semana: "Semana de Captacion",
        precio: "Precios",
        imputar: "Imputar",
        desaprobar: "Desaprobar",
        export: "Exportar",
        anterior: "Precio Anterior",
        actual: "Precio Actual",
        relativo: "Relativo",
        sustituido: "Sustituido",
        incidencias: "Incidencias",
        observacion: "Observacion",
        acciones: "Acciones"

      },
},
    planificacion: {
      page_title: "Generar Planificación Anual",
      btn_generar: "Generar Planificación",
      messages: {
        add_success: "Se ha generado correctamente la Planificación",
        add_error: "Error al generar la Planificación"
      }
    }
  },
  messages: {
    confirmation: "Confirmación",
    acept: "Aceptar",
    cancel: "Cancelar",
    required: "Este campo es requerido"
  },
  components: {
    table: {
      dataIterator: {
        rowsPerPageText: "datos por página:",
        rowsPerPageAll: "Todo",
        pageText: "{0}-{1} of {2}",
        no_result_search: "No hay datos que mostrar",
        nextPage: "Siguiente pagina",
        prevPage: "Pagina Anterior"
      },
      dataTable: {
        rowsPerPageText: "Filas por página:"
      },
      no_data: "Ningún dato disponible",
    }
  },
  page_title: "IPC"
};
