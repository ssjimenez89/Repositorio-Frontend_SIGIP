import {bootstrap} from "@onei/core/bootstrapping";
import * as ServiceWorker from "@onei/core/service-worker";
// Administracion
import OneiAdministracionApplication from "./applications/onei/administracion";
// Aplications Modules
import OneiI110Application from "./applications/onei/domain/i110";
import OneiI730Application from "./applications/onei/domain/i730";
import OneiIConstruccionApplication from "./applications/onei/domain/iconstruccion";
import OneiIpcApplication from "./applications/onei/domain/ipc";
// Login Module
import OneiLoginApplication from "./applications/onei/login";

const {$store, $i18n} = bootstrap({
  applications: [
    OneiAdministracionApplication,
    OneiIpcApplication,
    OneiLoginApplication,
    OneiIConstruccionApplication,
    OneiI110Application,
    OneiI730Application,
  ],
  pages: {
    homePage: () => import("@onei/core/pages/Home.vue"),
    loginPage: () => import("@onei/applications/onei/login/App.vue"),
    notFoundPage: () => import("@onei/core/pages/NotFoundPage.vue"),
    page401Page: () => import("@onei/core/pages/401.vue"),
  },
}).$mount("#app");

export {$store, $i18n};

ServiceWorker.bootstrap();
