<template>
<!--  <v-content class="padding-top">-->
<!--    <v-container fluid>-->
<!--      <v-layout align-center justify-center>-->
<!--        <UsuarioList v-if="userLoaded" :lista_cargo="lista_cargo" :lista_dpa="lista_dpa"-->
<!--                     :lista_roles="lista_roles"></UsuarioList>-->
<!--      </v-layout>-->
<!--      <v-tooltip left>-->
<!--        <v-btn-->
<!--          bottom-->
<!--          color="green"-->
<!--          dark-->
<!--          fab-->
<!--          fixed-->
<!--          right-->
<!--          slot="activator"-->
<!--          to="/onei/sigip/administracion/usuario/nuevo"-->
<!--        >-->
<!--          <v-icon>add</v-icon>-->
<!--        </v-btn>-->
<!--        <span>{{$t('applications.onei_administracion.modules.usuario.add_usuario_button')}}</span>-->
<!--      </v-tooltip>-->
<!--    </v-container>-->
<!--  </v-content>-->

  <main-content
    title="Lista de usuarios"
  >
<!--    <v-container fluid>-->
<!--      <v-layout align-center justify-center>-->
        <UsuarioList v-if="userLoaded" :lista_cargo="lista_cargo" :lista_dpa="lista_dpa"
                     :lista_roles="lista_roles"></UsuarioList>
<!--      </v-layout>-->
      <v-tooltip left>
        <v-btn
          bottom
          color="green"
          dark
          fab
          fixed
          right
          slot="activator"
          to="/onei/sigip/administracion/usuario/nuevo"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <span>{{$t('applications.onei_administracion.modules.usuario.add_usuario_button')}}</span>
      </v-tooltip>
<!--    </v-container>-->
  </main-content>
</template>
<script lang="ts">
import MainContent from "@shared/components/main-content/main-content";
import VBtn from "@vuetify/components/VBtn";
import VContainer from "@vuetify/components/VGrid/VContainer";
import VContent from "@vuetify/components/VGrid/VContent";
import VFlex from "@vuetify/components/VGrid/VFlex";
import VLayout from "@vuetify/components/VGrid/VLayout";
import VIcon from "@vuetify/components/VIcon";
import VTooltip from "@vuetify/components/VTooltip";
import UsuarioList from "../../components/usuario/UsuarioList.vue";
import {get_users, get_users_page, obtener_cargos, obtener_dpa,obtener_roles} from "../../services/usuario_services";

export default {
  name: "onei-usuario-list-page",
  components: {
    UsuarioList,
    VContainer,
    VContent,
    VLayout,
    VFlex,
    VTooltip,
    VBtn,
    VIcon,
    MainContent,
  },
  data() {
    return {
      userLoaded: true,
      lista_roles: [],
      lista_dpa: [],
      lista_cargo: [],
    };
  },
  created() {
    obtener_roles().then(({data}) => (this.lista_roles = data));
    obtener_dpa().then(({data}) => (this.lista_dpa = data));
    obtener_cargos().then(({data}) => (this.lista_cargo = data));

    // get_users().then(({data}) => {
    //    // this.usuarios = data;
    //     this.userLoaded = true;
    //   }
    // );
  },
  methods: {
    click() {
      this.$store.commit('setSnack', 'Hello from UserList')
    }
  },
  head: {
    title() {
      return {
        inner: this.$i18n.t(
          "applications.onei_administracion.modules.usuario.page_title"
        )
      };
    }
  }
};
</script>
<style lang="stylus" scoped>
  .padding-top {
    padding: 20px 0px 0px 0px !important;
  }
</style>
