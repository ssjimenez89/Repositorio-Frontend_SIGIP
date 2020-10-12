const routes = [
  {
    component: () => import("../pages/listarPreciosFueraRango/ListarPreciosFueraRangoViewPage.vue"),
    path: "listarPreciosFueraRango",
    //meta:{permisos:["PRECIO_FUERA_RANGO"]},
  },
];
export default routes;
