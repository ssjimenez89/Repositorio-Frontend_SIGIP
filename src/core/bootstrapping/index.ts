import '@mdi/font/css/materialdesignicons.css'
import VuetifyTransitions from "@vuetify/components/transitions";
import VApp from "@vuetify/components/VApp";
import Vuetify from "@vuetify/components/Vuetify";
import VuetifyDirectives from "@vuetify/directives";
import colors from "@vuetify/util/colors";
import Vue from "vue";
import VueHead from "vue-head";
import Vuebar from 'vuebar';
import {apolloProvider, cacheManager} from "../apollo";
import App from "../App.vue";
import {Applications} from "../application";
import EventBus from "../event-bus";
import * as I18n from "./i18n";
import * as Router from "./router";
import {IRouterBootstrappingPagesConfig} from "./router";
import * as Store from "./store";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {Directives} from "@/core/utils/pluggins";

interface IBootstrappingConfig {
  applications: Applications;
  pages: IRouterBootstrappingPagesConfig;
}

export const bootstrap = (config: IBootstrappingConfig) => {
  const i18n = I18n.bootstrap({
    applications: config.applications,
  });

  const router = Router.bootstrap({
    applications: config.applications,
    pages: config.pages,
  });

  const store = Store.bootstrap({
    applications: config.applications,
    router,
  });


  Vue.use(VueHead);

  Vue.use(Vuebar);

  Vue.use(VueSweetalert2);

  Vue.use(Vuetify, {
    iconfont: 'mdi',
    components: {
      VApp,
      Vuetify,
    },
    directives: VuetifyDirectives,
    theme: {
      accent: colors.pink.base,
      primary: colors.blue.darken2,
    },
    transitions: VuetifyTransitions,
  });

  Vue.use(Directives);
  Vue.prototype.$eventBus = EventBus;
  Vue.prototype.$apolloCache = cacheManager;
  router.beforeEach((to, from, next) => {
    const user = store.getters["@onei.login/username"];
    if (!user && to.name !== 'login') {
      next({path: '/'});
    } else {
      const authorities = store.getters["@onei.login/authorities"];
      if (to.matched.some(record => record.meta.permisos)) {
        if (authorities.some((elem: any) => to.meta.permisos.includes(elem))) {
          // Tiene el permiso que solicita la ruta
          next();
        } else {
          // No tiene el permiso que solicita la ruta
          // Debe redireccionar para la pagina 401 que tenga en el cerrar
          // la ruta del from para que vuelva para pagina anterior
          next({path: '/401'});
        }
      } else {
        // Como no tiene el meta permiso pues sigue su camino
        next();
      }
    }
  });


  return new Vue({
    i18n,
    provide: apolloProvider.provide(),
    render: (h) => h(App),
    router,
    store,
  });
};
