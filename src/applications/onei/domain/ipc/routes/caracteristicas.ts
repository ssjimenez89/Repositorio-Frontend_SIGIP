const routes = [
  {
    component: () => import("../pages/caracteristicas/CaracteristicasListPage.vue"),
    path: "caracteristicas",
    meta:{permisos:["CARACTERISTICAS"]},
  },
  {
    component: () => import("../pages/caracteristicas/CaracteristicasAddPage.vue"),
    path: "caracteristicas/nueva",
    meta:{permisos:["CARACTERISTICAS"]},
  },
  {
    component: () => import("../pages/caracteristicas/CaracteristicasEditPage.vue"),
    path: "caracteristicas/editar",
    meta:{permisos:["CARACTERISTICAS"]},
  },
  {
    component: () => import("../pages/caracteristicas/CaracteristicasViewPage.vue"),
    path: "caracteristicas/visualizar",
    meta:{permisos:["CARACTERISTICAS"]},
  },

];
export default routes;
