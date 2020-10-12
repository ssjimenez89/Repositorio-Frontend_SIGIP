import {IApplication} from "@onei/core/application";
import logo from "./assets/logo.svg";
import i18n from "./i18n";
import router from "./router";
import store, {STORE_NAME} from "./store";

const application: IApplication = {
  category: "categories.ipc",
  description: "applications.onei_iconstruccion.description",
  displayName: "applications.onei_iconstruccion.display_name",
  i18n,
  id: "@onei/iconstruccion",
  logo,
  router,
  shortName: "applications.onei_iconstruccion.short_name",
  store: {
    module: store,
    moduleName: STORE_NAME,
  },
};

export default application;
