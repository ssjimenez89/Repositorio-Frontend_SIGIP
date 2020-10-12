<template>
  <v-content class="padding-top">
    <v-container>
      <v-layout align-center justify-center row>
        <v-flex lg10 md10 sm8 xs12>
          <UsuarioVisualizar v-if="userLoaded" :usuario="usuario"></UsuarioVisualizar>
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
import UsuarioVisualizar from "../../components/usuario/UsuarioVisualizar";
import {obtener_usuario} from "../../services/usuario_services";

export default {
  name: "onei-usuario-visualizar-page",
  components: {
    VContainer,
    VContent,
    VLayout,
    VFlex,
    UsuarioVisualizar,
  },
  data() {
    return {
      usuario: {},
      userLoaded : false,
    };
  },
  created() {
    const idUsuario = this.$route.params.id;
    obtener_usuario(idUsuario).then(({data}) => {
      this.usuario = data;
      this.userLoaded = true;
    });
  },
  head: {
    title() {
      return {
        inner: this.$i18n.t(
          "applications.onei_administracion.modules.usuario.pages.visualizar_usuario.page_title"
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
