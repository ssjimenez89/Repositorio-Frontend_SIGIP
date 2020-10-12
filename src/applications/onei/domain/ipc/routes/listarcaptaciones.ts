const routes = [
  {
    component: () => import("../pages/listarcaptaciones/ListarCaptacionesViewPage.vue"),
    path: "captaciones/listarcaptaciones",
    meta:{permisos:["CAPTACION_PRECIO"]},
  },
  {
    component: () => import("../pages/listarcaptaciones/listarFaltantes.vue"),
    path: "captaciones//listarfaltantes",
    meta:{permisos:["CAPTACION_PRECIO"]},
  },
  {
    component: () => import("../pages/listarcaptaciones/ListarPendientesCaptar.vue"),
    path: "captaciones/listarcaptacionesAll",
    meta:{permisos:["CAPTACION_PRECIO"]},
  },
  {
    component: () => import("../pages/captaciones/edit-captaciones-page.vue"),
    path: "captaciones/editCaptacion",
    meta:{permisos:["CAPTACION_PRECIO"]},
  }
];
export default routes;
