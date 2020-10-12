<template>
  <main-content
    :title="$i18n.t('applications.onei_administracion.modules.rol.pages.rol_list.list_title')"

  >
    <RolList2 :data="roles"></RolList2>
    <v-tooltip left>
      <v-btn
        bottom
        color="green"
        dark
        fab
        fixed
        right
        slot="activator"
        to="/onei/sigip/administracion/rol/nuevo"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <span>{{$t('applications.onei_administracion.modules.rol.add_rol_button')}}</span>
    </v-tooltip>
  </main-content>
</template>
<script lang="ts">
import VBtn from "@vuetify/components/VBtn";
import {VSpacer} from "@vuetify/components/VGrid";
import VContainer from "@vuetify/components/VGrid/VContainer";
import VContent from "@vuetify/components/VGrid/VContent";
import VFlex from "@vuetify/components/VGrid/VFlex";
import VLayout from "@vuetify/components/VGrid/VLayout";
import VIcon from "@vuetify/components/VIcon";
import VTooltip from "@vuetify/components/VTooltip";
import RolList from "../../components/rol/RolList";
import RolList2 from "../../components/rol/RolList2";
import {get_roles} from "../../services/rol_services";
import MainContent from "@shared/components/main-content/main-content";

export default {
  name: "onei-rol-list-page",
  components: {
    RolList,
    RolList2,
    VContainer,
    VContent,
    VLayout,
    VFlex,
    VTooltip,
    VBtn,
    VSpacer,
    MainContent,
    VIcon
  },
  data() {
    return {
      roles: [],

  };
  },
  mounted() {
    get_roles().then(({data}) => (this.roles = data));
  },
  methods: {
    click() {
      this.$store.commit('setSnack', 'Bienvenidos al listado de roles')
    }
  },
  head: {
    title() {
      return {
        inner: this.$i18n.t(
          "applications.onei_administracion.modules.rol.page_title"
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
