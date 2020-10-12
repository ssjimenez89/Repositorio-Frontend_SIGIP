const routes = [
  {
    component: () => import("../pages/variedad/VariedadListPage.vue"),
    path: "variedad/:establishmentId-:typologyId-:marketId",
    meta:{permisos:["ESTABLECIMIENTO"]},
  },
];
export default routes;
