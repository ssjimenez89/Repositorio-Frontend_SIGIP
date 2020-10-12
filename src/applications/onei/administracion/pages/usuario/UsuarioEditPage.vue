<template>
  <v-content class="padding-top">
    <v-container>
      <v-layout align-center justify-center row>
        <v-flex lg10 md10 sm8 xs12>
          <UsuarioEdit  v-if="userLoaded" :lista_cargo="lista_cargo" :lista_dpa="lista_dpa"
                        :usuario="usuario"></UsuarioEdit>

        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script lang="ts">
import VContainer from "@vuetify/components/VGrid/VContainer";
import VContent from "@vuetify/components/VGrid/VContent";
import VFlex from "@vuetify/components/VGrid/VFlex";
import VLayout from "@vuetify/components/VGrid/VLayout";
import UsuarioEdit from "../../components/usuario/UsuarioEdit.vue";
import {obtener_cargos, obtener_dpa, obtener_usuario} from "../../services/usuario_services";

export default {
  name: "onei-usuario-edit-page",
  components: {
    VContainer,
    VContent,
    VLayout,
    VFlex,
    UsuarioEdit,
  },
  data() {
    return {
      lista_dpa: [],
      lista_cargo: [],
      usuario: {},
      userLoaded: false
    };
  },
  created() {
    const idUsuario = this.$route.params.id;
    obtener_usuario(idUsuario).then(({data}) => {
      this.usuario = data;
      this.userLoaded = true;
    });
    // obtener_roles().then(({data}) => (this.lista_roles = data));
    obtener_dpa().then(({data}) => (this.lista_dpa = data));
    obtener_cargos().then(({data}) => (this.lista_cargo = data));
  },
  head: {
    title() {
      return {
        inner: this.$i18n.t(
          "applications.onei_administracion.modules.usuario.pages.edit_usuario.page_title"
        )
      };
    }
  }
};
</script>
<style lang="stylus" scoped>
  .padding-top
    padding: 20px 0px 0px 0px !important;
</style>
