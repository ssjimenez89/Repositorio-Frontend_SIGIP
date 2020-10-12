import {IApplication} from "@onei/core/application";
import logo from "./assets/logo.svg";
import i18n from "./i18n";
import router from "./router";
import store, {STORE_NAME} from "./store";

const application: IApplication = {
  category: "categories.ipc",
  description: "applications.onei_i730.description",
  displayName: "applications.onei_i730.display_name",
  i18n,
  id: "@onei/i730",
  logo,
  router,
  shortName: "applications.onei_i730.short_name",
  store: {
    module: store,
    moduleName: STORE_NAME,
  },
};

export default application;
