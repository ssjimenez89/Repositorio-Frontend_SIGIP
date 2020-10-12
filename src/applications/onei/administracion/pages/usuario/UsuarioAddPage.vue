<template>
  <v-content class="padding-top">
    <v-container>
      <v-layout align-center justify-center row>
        <v-flex lg10 md10 sm8 xs12>
          <UsuarioAdd :data=[] :lista_roles="lista_roles" :lista_cargo="lista_cargo":lista_dpa="lista_dpa"></UsuarioAdd>
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
import UsuarioAdd from "../../components/usuario/UsuarioAdd.vue";
import {obtener_cargos,obtener_dpa,obtener_roles} from "../../services/usuario_services";

export default {
  name: "onei-usuario-add-page",
  components: {
    VContainer,
    VContent,
    VLayout,
    VFlex,
    UsuarioAdd,
  },
  data() {
    return {
      lista_roles: [],
      lista_dpa:[],
      lista_cargo:[],
    };
  },
  created() {
    obtener_roles().then(({data}) => (this.lista_roles = data));
    obtener_dpa().then(({data}) => (this.lista_dpa = data));
    obtener_cargos().then(({data}) => (this.lista_cargo = data));
  },
  head: {
    title() {
      return {
        inner: this.$i18n.t(
          "applications.onei_administracion.modules.usuario.pages.add_usuario.page_title"
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
