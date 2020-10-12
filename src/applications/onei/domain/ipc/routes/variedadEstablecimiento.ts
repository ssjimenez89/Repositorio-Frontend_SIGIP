const routes = [
  {
    component: () => import("../pages/variedadEstablecimiento/VariedadEstablecimientoListPage.vue"),
    path: "variedadEstablecimiento",
    meta:{permisos:["VARIEDAD_ESTABLECIMIENTO"]},
  },
  {
    component: () => import("../pages/variedadEstablecimiento/VariedadEstablecimientoEditPage.vue"),
    path: "variedadEstablecimiento/editar/:id",
    meta:{permisos:["VARIEDAD_ESTABLECIMIENTO"]},
  },
  {
    component: () => import("../pages/variedadEstablecimiento/VariedadEstablecimientoViewPage.vue"),
    path: "variedadEstablecimiento/visualizar/:id",
    meta:{permisos:["VARIEDAD_ESTABLECIMIENTO"]},
  },
];
export default routes;
