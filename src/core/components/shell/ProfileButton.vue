<template>
  <div class="text-xs-center">
    <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
    >
      <v-btn
        class="user_profile"
        color="#FFFFF"
        dark
        flat
        large
        left
        slot="activator"
      >
        <v-list-tile-avatar>
          <v-icon medium>account_circle</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="body-2 font-weight-bold">{{username}}</v-list-tile-title>
        </v-list-tile-content>
      </v-btn>
      <v-list>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Salir</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import {logout} from "@/applications/onei/utils/Oauth2Util.ts";
  import VBadge from "@vuetify/components/VBadge";
  import VBtn from "@vuetify/components/VBtn";
  import {VCard, VCardActions} from "@vuetify/components/VCard";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VIcon from "@vuetify/components/VIcon";
  import {
    VList,
    VListTile,
    VListTileAction,
    VListTileAvatar,
    VListTileContent,
    VListTileTitle
  } from "@vuetify/components/VList";
  import VMenu from "@vuetify/components/VMenu";
  import {VToolbar} from "@vuetify/components/VToolbar";

  export default Vue.extend({
    name: "admin-profile-button",
    components: {
      VBadge,
      VBtn,
      VCard,
      VCardActions,
      VIcon,
      VMenu,
      VSpacer,
      VToolbar,
      VList,
      VListTile,
      VListTileAction,
      VListTileContent,
      VListTileTitle,
      VListTileAvatar
    },
    data() {
      return {
        username: this.$store.getters["@onei.login/username"]
      };
    },
    methods: {
      logout: () => logout()
    },
  });
</script>
<style lang="stylus" scoped>
  .user_profile {
    padding 0 14px;
  }
</style>
