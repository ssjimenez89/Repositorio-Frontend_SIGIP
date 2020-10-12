<template>
  <v-list dense>
    <v-list-group prepend-icon="insert_chart">
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>{{$t('applications.onei_iconstruccion.short_name')}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-group>
  </v-list>
</template>

<script lang="ts">
  import VDivider from "@vuetify/components/VDivider";
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
  import VSubheader from "@vuetify/components/VSubheader";
  import VToolbar from "@vuetify/components/VToolbar";

  export default {
    name: "onei-construccion-main-menu",
    components: {
      VDivider,
      VList,
      VListGroup,
      VListTile,
      VListTileContent,
      VListTileTitle,
      VListTileAction,
      VListTileAvatar,
      VSubheader,
      VIcon,
      VToolbar
    },
  };
</script>
