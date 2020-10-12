<template>
  <Shell title="Home">
    <v-content class="container-padding">
      <h1 class="grey--text text--darken-3 mb-2 headline font-weight-bold text-xs-center">
        Sistema para la Gestión de
        Índices y Precios
      </h1>
      <h2 class="subheading grey--text text--darken-3 text-xs-center font-weight-bold">SIGIP-ONEI</h2>
      <v-container
        :key="applications.category"
        fluid
        grid-list-lg
        grid-list-sm
        text-xs-center
        v-for="(applications) in categorizedApplications"
      >
        <v-layout row wrap>
          <v-flex :key="application.id" lg3 md3 sm3 v-for="application in applications" xs12>
            <avatar-item
              :link="getApplicationLink(application)"
              :url="application.logo"
              :name="$t(application.shortName)"
              :description="$t(application.description)"
            ></avatar-item>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </Shell>
</template>

<script lang="ts">
  import Vue from "vue";
  import AvatarItem from "@shared/components/avatar-item/avatar-item";
  import VBtn from "@vuetify/components/VBtn";
  import {VCard, VCardMedia} from "@vuetify/components/VCard";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import VImg from "@vuetify/components/VImg";
  import {VListGroup, VListTileContent, VListTileTitle} from "@vuetify/components/VList";
  import VList from "@vuetify/components/VList/VList";
  import VListTile from "@vuetify/components/VList/VListTile";
  import VListTileAction from "@vuetify/components/VList/VListTileAction";
  import VNavigationDrawer from "@vuetify/components/VNavigationDrawer";
  import VSubheader from "@vuetify/components/VSubheader";
  import {IApplicationStore} from "../application";
  import Shell from "../components/shell/Shell.vue";

  export default Vue.extend({
    name: "admin-home-page",
    components: {
      AvatarItem,
      VSubheader,
      VImg,
      VCard,
      VCardMedia,
      Shell,
      VNavigationDrawer,
      VBtn,
      VContainer,
      VContent,
      VFlex,
      VIcon,
      VLayout,
      VList,
      VListGroup,
      VListTile,
      VListTileAction,
      VListTileContent,
      VListTileTitle
    },
    head: {
      title: {
        inner: "Sistema para la Gestión de Índices y Precios"
      }
    },
    data() {
      return {
        drawer: null,
        mini: false,
        username: this.$store.getters["@onei.login/username"],
        items: []
      };
    },
    methods: {
      getApplicationLink(application: IApplicationStore):any {
        return `/onei/sigip/${application.router.urlPath}`;
      }
    },
    computed: {
      categorizedApplications():any {
        return this.$store.state.applications.reduce(
          (categories: any, application: IApplicationStore) => {
            if (application.category !== "categories.login") {
              categories[application.category] =
                categories[application.category] || [];
              categories[application.category].push(application);
            }
            return categories;
          },
          {}
        );
      }
    },
    watch:{},
  });
</script>
<style lang="stylus" scoped>
  .container-padding {
    padding: 40px 0px 0px !important;
  }
</style>
