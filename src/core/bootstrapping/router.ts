import Vue, {AsyncComponent} from "vue";
import Router from "vue-router";
import {Applications, IApplication} from "../application";
import ApplicationsPage from "../pages/Applications.vue";
import store from './store'
export interface IRouterBootstrappingPagesConfig {
  loginPage: AsyncComponent
  notFoundPage: AsyncComponent
  homePage: AsyncComponent
  page401Page: AsyncComponent
}

export interface IRouterBootstrappingConfig {
  applications: Applications;
  pages: IRouterBootstrappingPagesConfig;
}
const getStore = function(){
  return store;
};
const getRoutes = (applications: Applications) =>
  applications.map((application: IApplication) => application.router.routes);

export const bootstrap = (config: IRouterBootstrappingConfig) => {
  Vue.use(Router);

  const applicationRoutes = getRoutes(config.applications);

   const rout = new Router({
    mode: "history",
    routes: [
      {component: config.pages.loginPage, name: "login", path: "/"},
      {component: config.pages.homePage, name: "onei", path: "/onei"},
      {redirect: {name: "onei"}, component: ApplicationsPage, path: "/onei/sigip", children: applicationRoutes},
      {path: "/404", component: config.pages.notFoundPage, name: "notFound"},
      {path: "/401", component: config.pages.page401Page, name: "notAccess"},
      {path: "*", redirect: {name: "notFound"}},
    ],
  });


   return rout;
};
