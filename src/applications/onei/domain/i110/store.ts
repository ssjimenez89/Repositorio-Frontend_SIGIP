export const STORE_NAME = "@onei.i110";

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
