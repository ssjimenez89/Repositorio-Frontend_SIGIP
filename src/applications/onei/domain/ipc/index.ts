import {IApplication} from "@onei/core/application";
import logo from "./assets/logo.svg";
import i18n from "./i18n";
import router from "./router";
import store, {STORE_NAME} from "./store";

const application: IApplication = {
  category: "categories.ipc",
  description: "applications.onei_ipc.description",
  displayName: "applications.onei_ipc.display_name",
  i18n,
  id: "@onei/ipc",
  logo,
  router,
  shortName: "applications.onei_ipc.short_name",
  store: {
    module: store,
    moduleName: STORE_NAME,
  },
};

export default application;
