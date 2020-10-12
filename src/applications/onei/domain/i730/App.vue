<template>
  <admin-shell :title="$t('applications.onei_administracion.display_name')">
    <template slot="main-menu">
      <onei-i730-main-menu></onei-i730-main-menu>
    </template>
    <router-view></router-view>
  </admin-shell>
</template>

<script lang="ts">
  import {getApplication} from "@/applications/onei/utils/applicationsUtil.ts";
  import AdminShell from "@onei/core/components/shell/Shell.vue";
  import OneiI730MainMenu from "./components/MainMenu.vue";

  export default {
    name: "onei-i730",
    components: {
      OneiI730MainMenu,
      AdminShell,
    },
    created() {
      this.$store.commit("@onei.i730/setLogo", getApplication(this.$store.state.applications, "@onei/i730", "logo"))
    },
  };
</script>
