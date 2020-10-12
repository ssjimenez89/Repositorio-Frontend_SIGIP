import {IPermiso} from "@/applications/onei/administracion/interfaces/permiso/IPermiso";
import {RestAPIBase} from "@/applications/onei/config/axios-config";



function get_permisos(): any {
  return RestAPIBase
    .get("/permiso/all", {
      headers: {
        "Content-type": "application/json"
      }
    })
}

function add_permiso(permiso: IPermiso): any {
  console.log(RestAPIBase.post("/permiso", permiso, { headers: {
      "Content-type": "application/json"
  }}));
  // return

  // RestAPIBase.post("/permiso/",  permiso, {
  //   headers: {
  //     "Content-type": "application/json"
  //   }
  // })
}


function get_permiso(id): any {
  return RestAPIBase
    .get("/permiso/{id}" , {
      headers: {
        "Content-type": "application/json"
      }
    })
}





export {get_permisos, add_permiso, get_permiso};
