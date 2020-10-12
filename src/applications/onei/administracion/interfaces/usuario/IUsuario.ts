export interface IUsuario {
  nombrecompleto?:string;
  primernombre: string;
  segundonombre?: string;
  primerapellido: string;
  segundoapellido: string;
  activo:boolean;
  dpa:number;
  cargo:number;
  email: string;
  idTrabajador?: number;
  username: string;
  password: string;
  confirmpassword: string;
  permisos?:any[];
  roles?:any[];
  cod_dpa: string;
  denom_cargo: string;
  activo_busqueda:number;
}

