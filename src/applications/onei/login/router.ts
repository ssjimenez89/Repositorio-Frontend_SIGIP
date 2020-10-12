export const URL_PATH = "login";

const routes = {
  children: [],
  component: () => import("./App.vue"),
  path: URL_PATH,
};

export default {
  routes,
  urlPath: URL_PATH,
};
