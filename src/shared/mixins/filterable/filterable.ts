import {IFilterModel} from "@shared/types/filter-types";

export const filterable = {
  data() {
    return {
      filterModel: new IFilterModel()
    }
  },
  mounted() {
    // @ts-ignore
    this.$root.$on('filter-change', (event: IFilterModel) => {
      // @ts-ignore
      this.filterModel = event;
      debugger;
      // @ts-ignore
      if (this.paginModel) {
        // @ts-ignore
        this.paginModel.page = 1;
      }

      // // @ts-ignore
      // alert(JSON.stringify(this.filterModel));
    });
  },
  beforeDestroy() {
    // @ts-ignore
    this.$root.$off('filter-change');
  }
};
