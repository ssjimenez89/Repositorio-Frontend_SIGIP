<template>
  <v-menu bottom
          origin="center center"
          transition="scale-transition">
    <v-btn icon slot="activator">
      <v-icon>more_vert</v-icon>
    </v-btn>
    <v-list>
      <template v-for="item in items">
        <v-list-tile :to="item.to" v-if="item.to" v-permisos:only="item.permisos">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            {{item.text}}
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="bindFunction(item.action.func, item.action.args)()" v-if="item.action" v-permisos:only="item.permisos">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            {{item.text}}
          </v-list-tile-title>
        </v-list-tile>
      </template>


    </v-list>
  </v-menu>
</template>

<script>
  import {VList, VListTile, VListTileAction, VListTileContent, VListTileTitle} from "@vuetify/components/VList";
  import VIcon from "@vuetify/components/VIcon";
  import VMenu from "@vuetify/components/VMenu";
  import VBtn from "@vuetify/components/VBtn";


  export default {
    name: "actions-menu",
    components: {
      VList,
      VListTile,
      VListTileAction,
      VListTileContent,
      VListTileTitle,
      VMenu,
      VIcon,
      VBtn
    },
    props: {
      items: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    created() {

    },
    data() {
      return {
        action: null
      }
    },
    methods: {
      bindFunction(func, args) {
        return func.bind(undefined, ...args);
      }
    }
  }
</script>

<style scoped>

</style>
