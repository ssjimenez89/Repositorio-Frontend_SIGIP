<template>
  <admin-shell :title="$t('applications.onei_administracion.display_name')">
    <template slot="items-menu">
      <onei-admin-main-menu></onei-admin-main-menu>
    </template>
    <v-scroll-y-transition mode="out-in">
      <router-view></router-view>
    </v-scroll-y-transition>
  </admin-shell>
</template>

<script lang="ts">
  import {getApplication} from "@/applications/onei/utils/applicationsUtil.ts";
  import {VScrollYTransition} from "@vuetify/components/transitions";
  import AdminShell from "@onei/core/components/shell/Shell.vue";
  import OneiAdminMainMenu from "./components/MainMenu.vue";

  export default {
    name: "onei-admin",
    components: {
      OneiAdminMainMenu,
      AdminShell,
      VScrollYTransition,
    },
    created() {
      this.$store.commit("@onei.administracion/setLogo",
        getApplication(this.$store.state.applications, "@onei/administracion", "logo"));
    }
  };
</script>
