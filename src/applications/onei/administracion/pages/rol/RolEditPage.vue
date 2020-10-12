<!--suppress ALL -->
<template>
  <v-content class="padding-top">
    <v-container>
      <v-layout align-center justify-center row>
        <v-flex lg10 md10 sm8 xs12>
          <RolEdit :data="rol"></RolEdit>
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
import RolEdit from "../../components/rol/RolEdit";
import {IRol} from "../../interfaces/rol/IRol";
import {get_permisos, get_permisos_contenga, get_rol} from "../../services/rol_services";

export default {
  name: "onei-rol-edit-page",
  components: {
    VContainer,
    VContent,
    VLayout,
    VFlex,
    RolEdit,
  },

  data() {
    return {
      rol: {}
    };
  },

  created() {
    const idRol = this.$route.params.id;
    get_rol(idRol).then(({data}) => {
          (this.rol = data)
        });
  },
  head: {
    title() {
      return {
        inner: this.$i18n.t(
          "applications.onei_administracion.modules.rol.pages.edit_rol.page_title"
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
