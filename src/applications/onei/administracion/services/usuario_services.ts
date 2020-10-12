import {IUsuario} from "@/applications/onei/administracion/interfaces/usuario/IUsuario";
import {RestAPIBase} from "@/applications/onei/config/axios-config.ts";
import {AxiosPromise, AxiosRequestConfig} from "axios";


function get_users(): any {
  return RestAPIBase
    .get("/usuario/all", {
      headers: {
        "Content-type": "application/json"
      }
    })
}

function get_users_page(page: any, form: any): any {
  return RestAPIBase
    .post(`/usuario/list?page=${parseInt(page.page) - 1}&size=${page.rowsPerPage}&sort=${"id"}`, form)
}

function registrar_usuario(user: IUsuario): AxiosPromise<any> {
  return RestAPIBase.post("/usuario", user)
}

function cambiar_password(id: string, user: Object): AxiosPromise<any> {
  return RestAPIBase.post("/usuario/cambiarpasswd/" + id + "", user)
}

function actualizar_usuario(id: string, user: Object): AxiosPromise<any> {
  return RestAPIBase.put("/usuario/" + id + "", user)
}

function activar_desactivar_usuario(id: string, user: Object): AxiosPromise<any> {
  return RestAPIBase.post("/usuario/cambiaractivo/" + id + "", user)
}

function obtener_roles(): AxiosPromise<any> {
  return RestAPIBase.get('/rol/roles', {
    params: {
      todos: false
    }
  })
}

function obtener_permisos(): AxiosPromise<any> {
  return RestAPIBase.get("/permiso/permisos")
}

function obtener_dpa(): AxiosPromise<any> {
  return RestAPIBase.get("/dpa/all")
}

function obtener_cargos(): AxiosPromise<any> {
  return RestAPIBase.get("/cargo/all")
}

function obtener_usuario(idUsuario: string): AxiosPromise<any> {
  const url = "/usuario/" + idUsuario + "";
  return RestAPIBase.get(url.toString());
}

function obtener_obj_dpa(idDpa: string): AxiosPromise<any> {
  const url = "/dpa/" + idDpa + "";
  return RestAPIBase.get(url.toString());
}

function obtener_cargo(idCargo: string): AxiosPromise<any> {
  const url = "/cargo/" + idCargo + "";
  return RestAPIBase.get(url.toString());
}

export {
  get_users,
  registrar_usuario,
  cambiar_password,
  obtener_roles,
  obtener_permisos,
  obtener_dpa,
  obtener_cargos,
  obtener_usuario,
  activar_desactivar_usuario,
  actualizar_usuario,
  obtener_cargo,
  obtener_obj_dpa,
  get_users_page,
};
