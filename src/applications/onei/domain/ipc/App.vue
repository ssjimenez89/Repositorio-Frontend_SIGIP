<template>
  <admin-shell :title="$t('applications.onei_administracion.display_name')">
    <template slot="items-menu">
      <onei-ipc-main-menu></onei-ipc-main-menu>
    </template>
    <v-scroll-y-transition mode="out-in">
      <router-view></router-view>
    </v-scroll-y-transition>
  </admin-shell>
</template>

<script>
  import {getApplication} from "@/applications/onei/utils/applicationsUtil.ts";
  import AdminShell from "@onei/core/components/shell/Shell.vue";
  import {VScrollYTransition} from "@vuetify/components/transitions";
  import OneiIpcMainMenu from "./components/MainMenu.vue";
  import gql from 'graphql-tag';

  export default {
    name: "onei-ipc",
    components: {
      OneiIpcMainMenu,
      AdminShell,
      VScrollYTransition
    },
    apollo: {
      isClosed: {
        query: gql`query{
          isMonthClosed
      }`,
        update(data) {
          this.$store.commit("@onei.ipc/setMesState", data.isMonthClosed);
        }
      }
    },
    created() {
      this.$store.commit("@onei.ipc/setLogo", getApplication(this.$store.state.applications, "@onei/ipc", "logo"));

    },
  };
</script>
