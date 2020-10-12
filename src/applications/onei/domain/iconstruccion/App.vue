<template>
  <admin-shell :title="$t('applications.onei_administracion.display_name')">
    <template slot="main-menu">
      <onei-construccion-main-menu></onei-construccion-main-menu>
    </template>
    <router-view></router-view>
  </admin-shell>
</template>

<script lang="ts">
  import {getApplication} from "@/applications/onei/utils/applicationsUtil.ts";
  import AdminShell from "@onei/core/components/shell/Shell.vue";
  import OneiConstruccionMainMenu from "./components/MainMenu.vue";

  export default {
    name: "onei-construccion",
    components: {
      OneiConstruccionMainMenu,
      AdminShell,
    },
    created() {
      this.$store.commit("@onei.iconstruccion/setLogo", getApplication(this.$store.state.applications, "@onei/iconstruccion", "logo"))
    },
  };
</script>
