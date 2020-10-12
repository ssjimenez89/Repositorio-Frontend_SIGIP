<template>
  <div class="shell">
    <admin-app-bar :title="title" v-model="drawer"></admin-app-bar>
    <v-bottom-nav
      :active.sync="bottomNav"
      :height="calcHeight"
      :value="true"
      absolute
      class="navigation"
      color="#1976d2"
      dark
      v-if="url"
    >
      <slot name="items-menu"></slot>
    </v-bottom-nav>
    <v-content class="main-container">
      <slot></slot>
      <admin-snack-bar></admin-snack-bar>
    </v-content>
    <admin-app-footer class="footer"></admin-app-footer>
  </div>
</template>


<script lang="ts">
  import Vue from "vue";
  import {VBottomNav} from "@vuetify/components/VBottomNav";
  import VBtn from "@vuetify/components/VBtn";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VIcon from "@vuetify/components/VIcon";

  import {
    VList,
    VListGroup,
    VListTile,
    VListTileAction,
    VListTileAvatar,
    VListTileContent,
    VListTileTitle
  } from "@vuetify/components/VList";
  import VNavigationDrawer from "@vuetify/components/VNavigationDrawer";
  import AdminAppBar from "./AppBar.vue";

  import AdminAppFooter from "./AppFooter.vue";
  import AdminSnackBar from "./SnackBar.vue";

  export default Vue.extend({
    name: "admin-shell",
    components: {
      VBottomNav,
      AdminAppBar,
      AdminAppFooter,
      VBtn,
      VContent,
      VNavigationDrawer,
      VList,
      VListGroup,
      VListTile,
      VListTileAction,
      VListTileAvatar,
      VListTileContent,
      VListTileTitle,
      VIcon,
      AdminSnackBar,
    },
    data() {
      return {
        drawer: null,
        mini: false,
        username: this.$store.getters["@onei.login/username"],
        url: this.$store.state["@router"].fullPath !== '/onei',
        bottomNav: 'recent'
      };
    },
    computed: {
      calcHeight(): Number {
        return (this.$vuetify.breakpoint.smAndDown) ? 40 : 56;
      }
    },
    props: {
      title: {
        type: String,
        required: true
      }
    }
  });
</script>

<style lang="stylus" scoped>
  .shell {
    flex: 1;
  }

  .navigation {
    z-index: 3;
    position: static
  }

  .main-container {
    min-height: 100vh; /* will cover the 100% of viewport */
    overflow: hidden;
    display: block;
    position: relative;
    padding-bottom: 100px !important; /* height of your footer */
  }

  footer {
  }
</style>
