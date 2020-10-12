<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
    name: "onei-ipc-main-menu",
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
    data() {
      return {
        items: [
          {
            route: "/onei/sigip/ipc/nomenclador",
            title: this.$i18n
              .t(
                "applications.onei_ipc.main_menu.nomenclador"
              )
              .toString(),
            icon: "class",
            permiso: ["NOMENCLADOR"]
          },
          {

            route: "/onei/sigip/ipc/establecimiento",
            title: this.$i18n
              .t(
                "applications.onei_ipc.main_menu.establecimiento"
              )
              .toString(),
            icon: "domain",
            permiso: ["ESTABLECIMIENTO"],

          },
          {
            route: "/onei/sigip/ipc/variedadEstablecimiento",
            title: this.$i18n
              .t(
                "applications.onei_ipc.main_menu.variedadEstablecimiento"
              )
              .toString(),
            icon: "playlist_add_check",
            permiso: ["VARIEDAD_ESTABLECIMIENTO"]
          },
          {
            route: "/onei/sigip/ipc/clasificador",
            title: this.$i18n
              .t(
                "applications.onei_ipc.main_menu.clasificador"
              )
              .toString(),
            icon: "event_note",
            permiso: ["CLASIFICADORES"]
          },
          {
            route: "/onei/sigip/ipc/caracteristicas",
            title: this.$i18n
              .t(
                "applications.onei_ipc.main_menu.caracteristicas"
              )
              .toString(),
            icon: "settings_ethernet",
            permiso: ["CARACTERISTICAS"]
          },
          {
            route: "/onei/sigip/ipc/planificacion",
            title: this.$i18n
              .t(
                "applications.onei_ipc.main_menu.planificacion"
              )
              .toString(),
            icon: "event_available",
            permiso: ["PLANIFICACION"]
          },
          {
            route: "/onei/sigip/ipc/captaciones/listarcaptaciones",
            title: this.$i18n
              .t(
                "applications.onei_ipc.main_menu.listarcaptaciones"
              )
              .toString(),
            icon: "attach_money",
            permiso: ["CAPTACION_PRECIO"]
          },
          {
            route: "/onei/sigip/ipc/listarPreciosFueraRango",
            title: this.$i18n
              .t(
                "applications.onei_ipc.main_menu.listarPreciosFueraRango"
              )
              .toString(),
            icon: "event_note",
            permiso: ["CAPTACION_PRECIO"],

          },
          {
            route: "/onei/sigip/ipc/imputarPrecio",
            title: this.$i18n
              .t(
                "applications.onei_ipc.main_menu.imputarprecio"
              )
              .toString(),
            icon: "money_off",
            permiso: ["CAPTACION_PRECIO"]
          },
          {
            route: "/onei/sigip/ipc/reportes",
            title: "Reportes",
            icon: "library_books",
            permiso: ["CAPTACION_PRECIO"]
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

<style>
  .flex_basis {
    flex-basis: 12.666667% !important;
  }

</style>
