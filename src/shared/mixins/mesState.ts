export const mesState = {
  computed: {
    isMesCerrado(): Boolean {
      debugger;
      // @ts-ignore
      const a = this.$store.getters['@onei.ipc/getIsMesCerrado'];
      return a;
    }
  }
};
