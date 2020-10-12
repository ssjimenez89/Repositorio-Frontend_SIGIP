export const URL_PATH = "administracion";

const routes = {
  children: [
    {
      component: () => import("./pages/WelcomePage.vue"),
      path: "",
    },
    {
      component: () => import("./pages/usuario/UsuarioListPage.vue"),
      path: "usuarios",
      meta:{permisos:["USUARIO"]},
    },

    {
      component: () => import("./pages/usuario/UsuarioAddPage.vue"),
      path: "usuario/nuevo",
      meta:{permisos:["USUARIO"]},
    },

    {
      component: () => import("./pages/usuario/UsuarioEditPage.vue"),
      path: "usuario/edit-usuario/:id",
      meta:{permisos:["USUARIO"]},
    },
    {
      component: () => import("./pages/usuario/UsuarioVisualizarPage.vue"),
      path: "usuario/visualizar/:id",
      meta:{permisos:["USUARIO"]},
    },
    {
      component: () => import("./pages/usuario/CambiarPasswordPage.vue"),
      path: "usuario/cambiarpassword/:id",
      meta:{permisos:["USUARIO"]},
    },

    {
      component: () => import("./pages/rol/RolListPage.vue"),
      path: "roles",
      meta:{permisos:["ROL"]},
    },

    {
      component: () => import("./pages/rol/RolAddPage.vue"),
      path: "rol/nuevo",
      meta:{permisos:["ROL"]},
    },

    {
      component: () => import("./pages/rol/RolEditPage.vue"),
      path: "rol/editar/:id",
      meta:{permisos:["ROL"]},
    },

    {
      component: () => import("./pages/traza/TrazaListPage.vue"),
      path: "trazas",
      meta:{permisos:["TRAZAS"]},
    }

  ],
  component: () => import("./App.vue"),
  path: URL_PATH,
};

export default {
  routes,
  urlPath: URL_PATH,
};
