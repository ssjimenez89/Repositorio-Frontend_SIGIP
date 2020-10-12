export const STORE_NAME = "@onei.i730";

export default {
  actions: {},
  getters: {
    getLogo: state => state.logo
  },
  mutations: {
    setLogo(state: any, payload: any) {
      state.logo = payload;
    },
  },
  namespaced: true,
  plugins: {},
  state: {
    logo: ""
  },
};
