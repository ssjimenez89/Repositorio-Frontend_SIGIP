import {IFilterModel} from "@shared/types";

export const filterModelProperty = {
  props: {
    filterModel: {
      required: true,
      type: Object,
      default: () => new IFilterModel()
    }
  }
};
