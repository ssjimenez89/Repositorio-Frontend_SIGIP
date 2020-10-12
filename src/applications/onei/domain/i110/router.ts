import initializeRoutes from "./routes";

export const URL_PATH = "manufacturera";

const routes = {
  children: initializeRoutes(),
  component: () => import("./App.vue"),
  path: URL_PATH,
};

export default {
  routes,
  urlPath: URL_PATH,
};
