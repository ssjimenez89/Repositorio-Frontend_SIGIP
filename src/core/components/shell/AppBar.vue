<template>
  <v-toolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp" apps class="app_bar_image" dark
  >
    <v-toolbar-title v-if="url">
      <!--<v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>-->
    </v-toolbar-title>
    <slot name="content"></slot>
    <v-spacer></v-spacer>
    <admin-fullscreen-button></admin-fullscreen-button>
    <v-btn exact icon to="/onei">
      <v-icon>home</v-icon>
    </v-btn>
    <admin-launchpad v-if="url"></admin-launchpad>
    <!--<admin-notifications-button></admin-notifications-button>-->
    <admin-profile-button></admin-profile-button>
  </v-toolbar>
</template>

<script lang="ts">
  import Vue from "vue";
  import VBtn from "@vuetify/components/VBtn";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VIcon from "@vuetify/components/VIcon";
  import {VToolbar, VToolbarSideIcon, VToolbarTitle} from "@vuetify/components/VToolbar";
  import AdminFullscreenButton from "./FullscreenButton.vue";
  import AdminLaunchpad from "./Launchpad.vue";
  import AdminNotificationsButton from "./NotificationsButton.vue";
  import AdminProfileButton from "./ProfileButton.vue";

  export default Vue.extend({
    name: "admin-app-bar",
    components: {
      AdminFullscreenButton,
      AdminLaunchpad,
      AdminNotificationsButton,
      AdminProfileButton,
      VBtn,
      VIcon,
      VSpacer,
      VToolbar,
      VToolbarSideIcon,
      VToolbarTitle,
    },
    data() {
      return {
        url: this.$store.state["@router"].fullPath !== '/onei'
      }
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      value: Boolean,
    },
    methods: {},
  });
</script>

<style lang="stylus" scoped>
  .app_bar_image {
    background: url("../../../assets/Banner4.png") no-repeat;
    height: 60px;
    background-color: #0560b6;
  }
</style>
