const routes = new Array<any>();
routes.push({
  component: () => import("../pages/WelcomePage.vue"),
  path: "",
});
const initializeRoutes = () => routes;

export default initializeRoutes
