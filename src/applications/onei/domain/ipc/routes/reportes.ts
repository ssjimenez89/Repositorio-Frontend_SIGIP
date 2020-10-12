const routes = [
  {
    component: () => import("../pages/reportes/ReportesPage"),
    path: "reportes",
    meta:{permisos:["REPORTES"]},
  },
];
export default routes;
