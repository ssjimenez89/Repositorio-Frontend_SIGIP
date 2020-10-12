const routes = [
  {
    component: () => import("../pages/clasificador/ClasificadorTreeViewPage.vue"),
    path: "clasificador",
    meta: {permisos: ["CLASIFICADORES"]},
  },

  {
    component: () => import("../pages/clasificador/ClasificadorAddPage.vue"),
    path: "clasificador/nuevo",
    meta: {permisos: ["CLASIFICADORES"]},
  },
];
export default routes;
