import {IRol} from "@/applications/onei/administracion/interfaces/rol/IRol";
import {RestAPIBase} from "@/applications/onei/config/axios-config";



function get_roles(): any {
  return RestAPIBase.get('/rol/roles', {
    params: {
      todos: true
    }
  })
}

function get_rol(idRol: string): any {
  const url = "/rol/"+ idRol + "";
  return RestAPIBase
    .get( url.toString(), {
      headers: {
        "Content-type": "application/json"
      }
    })
}

function get_usuarios(rol: string): any {
  const url = "/usuario/roll/"+ rol + "";
  return RestAPIBase
    .get( url.toString(), {
      headers: {
        "Content-type": "application/json"
      }
    })
}

function update_rol(idRol: string, rol: IRol): any {
  const url = "/rol/"+ idRol + "";
  return RestAPIBase
    .put( url.toString(), rol, {
      headers: {
        "Content-type": "application/json"
      }
    })
}

function delete_rol(idRol: string): any {
  const url = "/rol/delete/"+ idRol + "";
  return RestAPIBase
    .delete( url.toString(),  {
      headers: {
        "Content-type": "application/json"
      }
    })
}

function get_permisos(): any {
  return RestAPIBase
    .get("/permiso/all", {
      headers: {
        "Content-type": "application/json"
      }
    })
}

function get_permisos_contenga(permisos: []): any {
  return RestAPIBase
    .post("/permiso/permisosin",permisos, {
      headers: {
        "Content-type": "application/json"
      }
    })
}

function add_rol(rol: IRol): any {
  return RestAPIBase.post("/rol", rol, { headers: {
      "Content-type": "application/json"
  }});
}



// @ts-ignore
export { get_roles, get_rol, update_rol, delete_rol, get_permisos, add_rol, get_permisos_contenga, get_usuarios };
