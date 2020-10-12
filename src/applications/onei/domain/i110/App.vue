<template>
  <admin-shell :title="$t('applications.onei_administracion.display_name')">
    <template slot="main-menu">
      <onei-i110-main-menu></onei-i110-main-menu>
    </template>
    <router-view></router-view>
  </admin-shell>
</template>

<script lang="ts">
  import {getApplication} from "@/applications/onei/utils/applicationsUtil.ts";
  import AdminShell from "@onei/core/components/shell/Shell.vue";
  import OneiI110MainMenu from "./components/MainMenu.vue";

  export default {
    name: "onei-i110",
    components: {
      OneiI110MainMenu,
      AdminShell,
    },
    created() {
      this.$store.commit("@onei.i110/setLogo", getApplication(this.$store.state.applications, "@onei/i110", "logo"))
    },
  };
</script>
