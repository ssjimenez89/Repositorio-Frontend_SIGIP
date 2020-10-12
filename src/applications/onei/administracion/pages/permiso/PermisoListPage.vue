<template>
  <v-content class="padding-top">
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex lg10 md10 sm8 xs12>
          <PermisoList :data="permisos"></PermisoList>
        </v-flex>
      </v-layout>
      <v-tooltip left>
        <v-btn
          bottom
          color="green"
          dark
          fab
          fixed
          right
          slot="activator"
          to="/onei/sigip/administracion/permiso/nuevo"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <span>{{$t('applications.onei_administracion.modules.permiso.add_permiso_button')}}</span>
      </v-tooltip>
    </v-container>
  </v-content>
</template>
<script lang="ts">
  import VBtn from "@vuetify/components/VBtn";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import VTooltip from "@vuetify/components/VTooltip";
  import PermisoList from "../../components/permiso/PermisoList";
  import {get_permisos} from "../../services/permiso_services";

  export default {
    name: "onei-permiso-list-page",
    components: {
      PermisoList,
      VContainer,
      VContent,
      VLayout,
      VFlex,
      VTooltip,
      VBtn,
      VIcon
    },
    data() {
      return {
        permisos: []
      };
    },
    mounted() {
      get_permisos().then(({data}) => (this.permisos = data));
    },
    methods: {
      click() {
        this.$store.commit('setSnack', 'Bienvenidos al listado de permisos')
      }
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t(
            "applications.onei_administracion.modules.permiso.page_title"
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
