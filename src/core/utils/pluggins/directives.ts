import {loadCustomDirectives} from "@/core/utils/directives";


export const Directives = {
  install: (Vue: any, options?: Object) => {
    loadCustomDirectives(Vue);
  }
};
