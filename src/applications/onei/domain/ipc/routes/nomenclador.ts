const routes = [
  {
    component: () => import("../pages/WelcomePage.vue"),
    path: "",
  },
  {
    component: () => import("../pages/nomenclador/NomencladorListPage.vue"),
    path: "nomenclador",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/NomencladorAddPage.vue"),
    path: "nomenclador/nuevo",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/CargoEditPage.vue"),
    path: "nomenclador/editar/cargo/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/GenericNomEditPage.vue"),
    path: "nomenclador/editar/tipo/:type/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/GenericNomViewPage.vue"),
    path: "nomenclador/view/tipo/:type/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/CargoViewPage.vue"),
    path: "nomenclador/view/cargo/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/CategoriaEditPage.vue"),
    path: "nomenclador/editar/categoria/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/CategoriaViewPage.vue"),
    path: "nomenclador/view/categoria/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },

  {
    component: () => import("../pages/nomenclador/RegionEditPage.vue"),
    path: "nomenclador/editar/region/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/RegionViewPage.vue"),
    path: "nomenclador/view/region/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },

  {
    component: () => import("../pages/nomenclador/IncidenciaEditPage.vue"),
    path: "nomenclador/editar/incidencia/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/IncidenciaViewPage.vue"),
    path: "nomenclador/view/incidencia/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/MercadoEditPage.vue"),
    path: "nomenclador/editar/mercado/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/MercadoViewPage.vue"),
    path: "nomenclador/view/mercado/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },

  {
    component: () => import("../pages/nomenclador/ObservacionEditPage.vue"),
    path: "nomenclador/editar/observacion/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/ObservacionViewPage.vue"),
    path: "nomenclador/view/observacion/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },

  {
    component: () => import("../pages/nomenclador/TipologiaEditPage.vue"),
    path: "nomenclador/editar/tipologia/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/TipologiaViewPage.vue"),
    path: "nomenclador/view/tipologia/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },

  {
    component: () => import("../pages/nomenclador/DPAEditPage.vue"),
    path: "nomenclador/editar/dpa/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/DPAViewPage.vue"),
    path: "nomenclador/view/dpa/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },

  {
    component: () => import("../pages/nomenclador/MonedaEditPage.vue"),
    path: "nomenclador/editar/moneda/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/MonedaViewPage.vue"),
    path: "nomenclador/view/moneda/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/TipoPonderacionEditPage.vue"),
    path: "nomenclador/editar/tipo_ponderacion/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/TipoPonderacionViewPage.vue"),
    path: "nomenclador/view/tipo_ponderacion/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/TipoVariedadEditPage.vue"),
    path: "nomenclador/editar/tipo_variedad/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/TipoVariedadViewPage.vue"),
    path: "nomenclador/view/tipo_variedad/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/TipoClasificadorEditPage.vue"),
    path: "nomenclador/editar/tipo_clasificador/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/TipoClasificadorViewPage.vue"),
    path: "nomenclador/view/tipo_clasificador/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/TipoUnidadMedidaEditPage.vue"),
    path: "nomenclador/editar/tipo_unidad_medida/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },
  {
    component: () => import("../pages/nomenclador/TipoUnidadMedidaViewPage.vue"),
    path: "nomenclador/view/tipo_unidad_medida/:id",
    meta:{permisos:["NOMENCLADOR"]},
  },

];
export default routes
