const routes = [
  {

    component: () => import("../pages/establecimiento/EstablecimientoListPage.vue"),
    path: "establecimiento",
    meta:{permisos:["ESTABLECIMIENTO"]},
  },

  {
    component: () => import("../pages/establecimiento/EstablecimientoAddPage.vue"),
    path: "establecimiento/nuevo",
    meta:{permisos:["ESTABLECIMIENTO"]},
  },

  {
    component: () => import("../pages/establecimiento/EstablecimientoEditPage.vue"),
    name:"edit",
    path: "establecimiento/editar/:id",
    meta:{permisos:["ESTABLECIMIENTO"]},
    params:true
  },

  {
    component: () => import("../pages/establecimiento/EstablecimientoViewPage.vue"),
    path: "establecimiento/visualizar/:id",
    meta:{permisos:["ESTABLECIMIENTO"]},
  },

  {
    component: () => import("../components/establecimiento/EstablecimientoStepper.vue"),
    path: "establecimiento/stepper",
    meta:{permisos:["ESTABLECIMIENTO"]},
  },
];
export default routes;
