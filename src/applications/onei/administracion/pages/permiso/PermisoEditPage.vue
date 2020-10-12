<template>
  <v-content class="padding-top">
    <v-container>
      <v-layout align-center justify-center row>
        <v-flex lg10 md10 sm8 xs12>
          <PermisoEdit :data="permiso" ></PermisoEdit>
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
  import PermisoEdit from "../../components/permiso/PermisoEdit";
  import {get_permiso} from "../../services/permiso_services";

  export default {
    name: "onei-permiso-edit-page",
    components: {
      VContainer,
      VContent,
      VLayout,
      VFlex,
      PermisoEdit,
    },
    data() {
      return {
        permiso: {}
      };
    },
    created() {
      let idpermiso;
      get_permiso(idpermiso).then(({data}) => (this.permiso = data));
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t(
            "applications.onei_administracion.modules.permiso.pages.edit_permiso.page_title"
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
