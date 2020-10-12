export const STORE_NAME = "@onei.ipc";

export default {
  actions: {},
  getters: {
    getLogo: (state: any) => state.logo,
    getEstablishment: (state: any) => state.establishment,
    getCharacteristicsSpecifications: (state: any) => state.characteristicsSpecifications,
    getTotalCharactToValidate: (state: any) => state.totalCharactToValidate,
    getEditCharacteristicsId: (state: any) => state.editCharacteristicsId,
    getViewCharacteristicsId: (state: any) => state.viewCharacteristicsId,
    getIsMesCerrado: (state: any) => state.isMesCerrado,

    getPlanning1: (state: any) => state.planning1Id,
    getPlanning2: (state: any) => state.planning2Id,
    getUnidadMedida: (state: any) => state.unidadMedidaId,
    getCantidad: (state: any) => state.cantidadId



  },
  mutations: {
    setMesState(state: any, cerrado: boolean) {
      state.isMesCerrado = cerrado;
    },
    setLogo(state: any, payload: any) {
      state.logo = payload
    },
    setEstablishment(state: any, payload: any) {
      state.establishment = payload
    },
    setPhone(state: any, payload: any) {
      state.establishment.phone = payload
    },
    setContact(state: any, payload: any) {
      state.establishment.contact = payload
    },
    setAddress(state: any, payload: any) {
      state.establishment.address = payload
    },
    setName(state: any, payload: any) {
      state.establishment.name = payload
    },
    setMarketId(state: any, payload: any) {
      state.establishment.marketId = payload
    },
    setMarketDescription(state: any, payload: any) {
      state.establishment.marketDescription = payload
    },
    setTypologyId(state: any, payload: any) {
      state.establishment.typologyId = payload
    },
    setStateId(state: any, payload: any) {
      state.establishment.stateId = payload
    },
    setDpaId(state: any, payload: any) {
      state.establishment.dpaId = payload
    },
    setOrganization(state: any, payload: any) {
      state.establishment.organization = payload
    },
    setPlanning1(state: any, payload: any) {
      state.planning1Id = payload
    },
    setPlanning2(state: any, payload: any) {
      state.planning2Id = payload
    },
    setUnidadMedida(state: any, payload: any) {
      state.unidadMedidaId = payload
    },
    setCantidad(state: any, payload: any) {
      state.cantidadId = payload
    },
    resetStore(state: any) {

      state.establishment = {
        phone: 0,
        contact: '',
        address: '',
        name: '',
        marketId: '',
        marketDescription: '',
        typologyId: '',
        stateId: 1,
        dpaId: '',
        code: '',
        organization: ''
      }
      state.characteristicsSpecifications = []
      state.totalCharactToValidate = ''

      state.planning1Id = 0
      state.planning2Id = 0
      state.unidadMedidaId = 0
      state.cantidadId = 0
    },
    resetPlanning2(state: any) {
      state.planning2Id = 0
    },
    resetCharacteristics(state: any) {
      state.characteristicsSpecifications = []
      state.totalCharactToValidate = ''
    },
    addCharacteristics(state: any, payload: any) {
      let found = state.characteristicsSpecifications.find((element: any) => element.characteristicId === payload.characteristicId)
      found != undefined ? found.specificationId = payload.specificationId : state.characteristicsSpecifications.push(payload)
    },
    setTotalCharactToValidate(state: any, payload: any) {
      state.totalCharactToValidate = payload
    },
    setEditCharacteristicsId(state: any, payload: any) {
      state.editCharacteristicsId = payload;
    },
    setViewCharacteristicsId(state: any, payload: any) {
      state.viewCharacteristicsId = payload;
    }
  },
  namespaced: true,
  persistedState: ["establishment", "editCharacteristicsId"],
  plugins: {},
  state: {
    logo: "",
    establishment: {
      phone: 0,
      contact: '',
      address: '',
      name: '',
      marketId: '',
      marketDescription: '',
      typologyId: '',
      oneiIndexId: 1,
      stateId: 1,
      dpaId: '',
      organization: ''
    },

    planning1Id: 0,
    planning2Id: 0,
    unidadMedidaId: 0,
    cantidadId: 0,

    isMesCerrado: false,
    characteristicsSpecifications: [],
    totalCharactToValidate: '',
    editCharacteristicsId: null,
    viewCharacteristicsId: null,
  },
};
