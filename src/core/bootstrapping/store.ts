import store from "@/applications/onei/administracion/store";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';
import * as VueRouterSync from "vuex-router-sync";
import {Applications, ApplicationsStore, IApplication} from "../application";

export interface IStoreBootstrappingConfig {
  applications: Applications;
  router: VueRouter;
}

export interface ISnackBarMessage {
  message: String;
  type: String;
}

export interface IAdministratorStore {
  applications: ApplicationsStore;
  snackbar: ISnackBarMessage;
}

const getModules = (applications: Applications) => {
  return applications.reduce((modules: any, currentValue: IApplication) => {
    const {moduleName, module} = currentValue.store;
    modules[moduleName] = module;
    return modules;
  }, {});
};

const getPersistedStates = (state: any, applications: Applications) => {
  return applications.reduce((persisted: any, currentValue: any) => {
    const {moduleName} = currentValue.store;
    const persistedValues = currentValue.store.module.persistedState;

    if (persistedValues) {
      persisted[`${moduleName}`] = {};
      persistedValues.map((values: any) => persisted[`${moduleName}`][values] = (state[moduleName])[values]);
    }
    return persisted;
  }, {});
};

const getApplications = (applications: Applications) => {
  return applications.map((currentValue: IApplication) => {
    const {i18n, store, router, ...baseApplication} = currentValue;
    return {
      router: {
        urlPath: router.urlPath,
      },
      ...baseApplication,
    };
  });
};

export const bootstrap = (config: IStoreBootstrappingConfig) => {
  Vue.use(Vuex);

  const modules = getModules(config.applications);
  const applications = getApplications(config.applications);
  const state: IAdministratorStore = {
    applications,
    snackbar: {
      message: '',
      type: ''
    }
  };

  const store = new Vuex.Store({
    actions: {
      showMessage({commit}, snack) {
        commit('setSnack', snack)
      }
    },
    modules,
    mutations: {
      setSnack(state, snack) {
        state.snackbar = snack
      }
    },
    getters: {
      getMessage: state => state.snackbar.message,
      getMessageType: state => state.snackbar.type,
    },
    plugins: [createPersistedState({
      reducer: (state) => getPersistedStates(state, config.applications),
    })],
    state,
    strict: process.env.NODE_ENV !== "production",
  });

  VueRouterSync.sync(store, config.router, {moduleName: "@router"});

  return store;
};

export default store;
