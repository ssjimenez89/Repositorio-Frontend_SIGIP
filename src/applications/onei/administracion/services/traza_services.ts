import {ITraza} from "@/applications/onei/administracion/interfaces/traza/ITraza";
import {RestAPIBase} from "@/applications/onei/config/axios-config";


function get_trazas_page(page: any, form: any): any {
  return RestAPIBase
    .post(`/traza/list?page=${parseInt(page.page) - 1}&size=${page.rowsPerPage}`, form)
}


// @ts-ignore
export { get_trazas_page};
