const routes = [
  {
    component: () => import("../pages/planificacion/planificacionPage.vue"),
    path: "planificacion",
    meta:{permisos:["PLANIFICACION"]},
  },
];
export default routes;
