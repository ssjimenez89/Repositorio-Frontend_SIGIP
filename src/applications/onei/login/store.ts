import {login, logout, refreshToken} from "@/applications/onei/utils/Oauth2Util.ts";
import User from "@/applications/onei/utils/User.ts";
import {IToken} from "./interfaces/ILogin";

export const STORE_NAME = "@onei.login";

export default {
  actions: {
    login({commit}: any, loginData: any) {
      return new Promise((resolve, reject) => {
        const {username, password} = loginData;
        login(username, password)
          .then(({data}: any) => {
            localStorage.token = data.access_token;
            localStorage.refresh_token = data.refresh_token;
            localStorage.is_auth = true;
            commit("login_details", localStorage.token);
            resolve();
          })
          .catch(error => reject(error))
      });
    },
    logout({commit}: any) {
      logout();
      commit("logout");
    },
    refreshToken({commit}: any) {
      return new Promise((resolve, reject) => {
        refreshToken().then((data) => {
          commit("login_details", localStorage.token);
          resolve(data);
        }).catch((error) => reject(error))
      });
    }
  },
  getters: {
    authorities: (state:any) => state.login_details ? state.login_details.authorities : null,
    login_details: (state:any) => state.login_details,
    username: (state:any) => state.login_details ? state.login_details.user_name : null,
    userId: (state:any) => state.login_details ? state.login_details.user_id : null,
    jasper: (state:any) => state.login_details ? state.login_details.jasper : null,
  },
  mutations: {
    login_details(state: any, payload: any) {
      state.login_details = User.from(payload);
    },
    other(state: any, payload: any) {
      state.other = payload;
    },
    logout(state: any) {
      state.login_details = null;
    }
  },
  namespaced: true,
  persistedState: ["login_details"],
  state: {
    login_details: "",
  },
};
