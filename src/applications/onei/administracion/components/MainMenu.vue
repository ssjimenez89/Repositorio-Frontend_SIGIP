<template>
  <div>
    <v-item-group>
      <v-layout row>
        <v-flex
          :key="n.title"
          class="text-md-center flex_basis"
          md2
          v-for="n in items"
          v-if="can(n.permiso)"
          xs12
        >
          <v-item>
            <v-btn
              :to="n.route"
              flat
            >
              <span class="hidden-sm-and-down">{{n.title}}</span>
              <v-icon>{{n.icon}}</v-icon>
            </v-btn>
          </v-item>
        </v-flex>
      </v-layout>
    </v-item-group>
  </div>
</template>

<script lang="ts">
  import VBtn from "@vuetify/components/VBtn";
  import {VCard, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import VDivider from "@vuetify/components/VDivider";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import {VItem, VItemGroup} from "@vuetify/components/VItemGroup";
  import {
    VList,
    VListGroup,
    VListTile,
    VListTileAction,
    VListTileAvatar,
    VListTileContent,
    VListTileTitle
  } from "@vuetify/components/VList";
  import VSpeedDial from "@vuetify/components/VSpeedDial";
  import VSubheader from "@vuetify/components/VSubheader";
  import VToolbar from "@vuetify/components/VToolbar";
  import {$can} from "@/applications/onei/utils/applicationsUtil";

  export default {
    name: "onei-admin-main-menu",
    components: {
      VItem,
      VCard,
      VItemGroup,
      VCardText,
      VCardTitle,
      VLayout,
      VFlex,
      VContainer,
      VDivider,
      VBtn,
      VList,
      VListGroup,
      VListTile,
      VListTileContent,
      VListTileTitle,
      VListTileAction,
      VListTileAvatar,
      VSubheader,
      VIcon,
      VToolbar,
      VSpeedDial
    },
    data(){
      return {
        items: [
          {
            route: "/onei/sigip/administracion/usuarios",
            title: this.$i18n
              .t(
                "applications.onei_administracion.main_menu.usuario"
              )
              .toString(),
            icon: "account_circle",
            permiso: ["USUARIO"]
          },
          {
            route: "/onei/sigip/administracion/trazas",
            title: this.$i18n
              .t(
                "applications.onei_administracion.main_menu.traza"
              )
              .toString(),
            icon: "list",
            permiso: ["TRAZAS"]
          },
          {
            route: "/onei/sigip/administracion/roles",
            title: this.$i18n
              .t(
                "applications.onei_administracion.main_menu.rol"
              )
              .toString(),
            icon: "security",
            permiso: ["ROL"]
          },

        ]
      }
    },
    methods:{
      can(data:Array<String>){
        return $can(data);
      }
    }
  };
</script>
