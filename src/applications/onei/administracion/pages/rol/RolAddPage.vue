<template>
  <v-content class="padding-top">
    <v-container>
      <v-layout align-center justify-center row>
        <v-flex lg10 md10 sm8 xs12>
          <RolAdd :data=[] :permisosss="lista_permisos"></RolAdd>
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
  import RolAdd from "../../components/rol/RolAdd";
  import {get_permisos} from "../../services/rol_services";

  export default {
    name: "onei-rol-add-page",
    components: {
      VContainer,
      VContent,
      VLayout,
      VFlex,
      RolAdd,
    },
    data() {
      return {
        lista_permisos: [],
      };
    },
    created() {
      get_permisos().then(({data}) => (this.lista_permisos = data));
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t(
            "applications.onei_administracion.modules.rol.pages.add_rol.page_title"
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
