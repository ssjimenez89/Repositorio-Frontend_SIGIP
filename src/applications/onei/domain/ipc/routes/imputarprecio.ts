const routes = [
  {
    component: () => import("../pages/listarImputarPrecios/imputarPrecioViewPage.vue"),
    path: "imputarprecio",
    meta:{permisos:["CAPTACION_PRECIO"]},
  }
];
export default routes;
