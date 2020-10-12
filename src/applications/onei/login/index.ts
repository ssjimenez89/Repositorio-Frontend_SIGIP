import {IApplication} from "@onei/core/application";
import logo from "./assets/logo.svg";
import i18n from "./i18n";
import router from "./router";
import store, {STORE_NAME} from "./store";

const application: IApplication = {
  category: "categories.login",
  description: "applications.onei_login.description",
  displayName: "applications.onei_login.display_name",
  i18n,
  id: "@onei/login",
  logo,
  router,
  store: {
    module: store,
    moduleName: STORE_NAME,
  },
};

export default application;
